import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json({ ok: true, data: categories });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "Gagal mengambil kategori" },
      { status: 500 }
    );
  }
}
