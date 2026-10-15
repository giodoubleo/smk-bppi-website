import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const majors = await prisma.major.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: { select: { achievements: true } },
      },
    });
    return NextResponse.json({ ok: true, data: majors });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "Gagal mengambil data jurusan" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, description, competency, facilities, prospects, color } = body;

    if (!id || !name || !description) {
      return NextResponse.json(
        { ok: false, error: "Nama dan deskripsi jurusan wajib diisi" },
        { status: 400 }
      );
    }

    const updated = await prisma.major.update({
      where: { id },
      data: {
        name: name.trim(),
        description: description.trim(),
        competency: competency?.trim() || "",
        facilities: facilities?.trim() || "",
        prospects: prospects?.trim() || "",
        color: color?.trim() || null,
      },
    });

    return NextResponse.json({ ok: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "Gagal memperbarui data jurusan" },
      { status: 500 }
    );
  }
}
