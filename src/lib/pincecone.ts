import { Pinecone } from "@pinecone-database/pinecone";
import { downloadFromS3 } from "./server-s3";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

export const getPineconeClient = () => {
  return new Pinecone({
    // environment: process.env.PINECONE_ENVIRONMENT!,
    apiKey: process.env.PINECONE_API_KEY!,
  });
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
  const pages = await loader.load();
  return pages;
}
