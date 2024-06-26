import { Pinecone, PineconeRecord } from "@pinecone-database/pinecone";
import {
  RecursiveCharacterTextSplitter,
  Document,
} from "@pinecone-database/doc-splitter";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import md5 from "md5";

import { downloadFromS3 } from "./server-s3";
import { getEmbeddings } from "./embeddings";
import { convertToAscii } from "./utils";

export const getPineconeClient = () => {
  return new Pinecone({
    // environment: process.env.PINECONE_ENVIRONMENT!,
    apiKey: process.env.PINECONE_API_KEY!,
  });
};

type PDFPage = {
  pageContent: string;
  metadata: {
    loc: { pageNumber: number; fileKey: string };
  };
};

export async function loadS3IntoPinecone(fileKey: string) {
  // 1. obtain the pdf -> downlaod and read from pdf
  console.log("downloading s3 into file system");
  const file_name = await downloadFromS3(fileKey);
  if (!file_name) {
    throw new Error("could not download from s3");
  }
  //   1.2. getting text from pdf
  console.log("loading pdf into memory" + file_name);
  // @ts-ignore
  const loader = new PDFLoader(file_name);
  const pages = (await loader.load()) as PDFPage[];
  // 2. split and segment the pdf in efficient short format
  // pages = Array(13) -to-> Array(1000)
  const documents = await Promise.all(
    pages.map(prepareDocument)
    // pages.map((page) => prepareDocument(page, fileKey))
  );

  //3. vectorise and embed individual documents
  const vectors = await Promise.all(documents.flat().map(embedDocument));
  // documents.flat().map((doc) => embedDocument(doc, fileKey))
  // );

  console.log("STEP 3", vectors);

  // 4. upload to pinecone
  const client = await getPineconeClient();
  const pineconeIndex = await client.Index("cha-gpt-pdf");

  console.log("Inserting vectors into pinecone", vectors);
  // const namespace = pineconeIndex.namespace(convertToAscii(fileKey));
  // await namespace.upsert(vectors);
  const request = vectors;
  const namespace = pineconeIndex.namespace(convertToAscii(fileKey));
  await pineconeIndex.upsert(request);
  await namespace.upsert(vectors);
  console.log("Inserted vectors into pinecone");

  return documents;
}

// 3.
async function embedDocument(doc: Document) {
  try {
    // doc -> vector
    const embeddings = await getEmbeddings(doc.pageContent);
    const hash = md5(doc.pageContent);
    return {
      id: hash,
      values: embeddings,
      metadata: {
        text: doc.metadata.text,
        pageNumber: doc.metadata.pageNumber,
      },
    } as PineconeRecord;
  } catch (error) {
    console.log("error embedding document", error);
    throw error;
  }
}

export const truncateStringByBytes = (str: string, bytes: number) => {
  const enc = new TextEncoder();
  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};

// 2.
async function prepareDocument(page: PDFPage) {
  let { pageContent, metadata } = page;
  pageContent = pageContent.replace(/\n/g, "");
  //  SPLIT THE DOCS
  const splitter = new RecursiveCharacterTextSplitter();
  const docs = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: truncateStringByBytes(pageContent, 36000),
      },
    }),
  ]);
  return docs;
}
