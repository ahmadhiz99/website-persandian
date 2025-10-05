import { NextResponse } from "next/server";
import { createReadStream } from "fs";
import path from "path";
import { stat } from "fs/promises";
import { Readable } from "node:stream";

export async function GET(
  request: Request,
   { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params; // harus di-await
    const filePath = path.join(process.cwd(), "uploads", "images", filename);

    // const filePath = path.join(process.cwd(), "uploads", "images", params.filename);

    // pastikan file ada
    const fileStat = await stat(filePath);

    if (!fileStat.isFile()) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const nodeStream = createReadStream(filePath);
    const webStream = Readable.toWeb(nodeStream) as unknown as globalThis.ReadableStream<Uint8Array>;

    return new Response(webStream, {
      headers: {
        "Content-Type": "image/jpeg", // bisa dinamis sesuai ekstensi
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "File not found " + err }, { status: 404 });
  }
}
