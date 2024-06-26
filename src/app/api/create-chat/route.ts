import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { getS3Url } from "@/lib/client-s3";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { loadS3IntoPinecone } from "@/lib/pincecone";

export async function POST(req: Request, res: Response) {
  const { userId } = await auth(); // CLERK
  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { file_key, file_name } = body;
    console.log("ROUTE", file_key);

    await loadS3IntoPinecone(file_key);
    // CREATE NEW CHAT IN DB
    const chat_id = await db
      .insert(chats)
      .values({
        fileKey: file_key,
        pdfName: file_name,
        pdfUrl: getS3Url(file_key),
        userId,
      })
      .returning({
        insertedId: chats.id,
      });
    console.log("GET ID", chat_id);

    return NextResponse.json(
      { chat_id: chat_id[0].insertedId },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
