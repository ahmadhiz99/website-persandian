import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Handler untuk method GET (Mengambil semua Ticket)
export async function GET(
  req: Request,
  { params }: { params: Promise<{ ticket: string }> }
) {
  const { ticket } = await params;

  const form = await prisma.requestForm.findUnique({
    where: { ticket },
    include: {
      logStatus: {
        orderBy: {createdAt: 'desc'}
      },
    }
  });

  if (!form) {
    return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
  }

  return NextResponse.json(form);
}