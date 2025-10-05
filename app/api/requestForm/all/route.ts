import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Handler untuk method GET (Mengambil semua requestForm)
export async function GET() {
  try {
    const [data, total] = await Promise.all([
      prisma.requestForm.findMany({
        orderBy: { id: "desc" }, // terbaru ke lama
      }),
      prisma.requestForm.count(),
    ]);

    return NextResponse.json(
      {
        success: true,
        total,
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saat mengambil requestForm:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}
