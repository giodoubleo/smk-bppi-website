import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const announcements = await prisma.announcement.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ ok: true, data: announcements });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "Gagal mengambil data pengumuman" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, priority, status } = body;

    if (!title || !content) {
      return NextResponse.json(
        { ok: false, error: "Judul dan konten wajib diisi" },
        { status: 400 }
      );
    }

    let defaultAuthor = await prisma.user.findFirst();
    if (!defaultAuthor) {
      defaultAuthor = await prisma.user.create({
        data: {
          name: "Administrator SMK BPPI",
          email: "admin@smkbppi.sch.id",
          password: "admin",
          role: "SUPER_ADMIN",
        },
      });
    }

    const baseSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const uniqueSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    const announcement = await prisma.announcement.create({
      data: {
        title: title.trim(),
        slug: uniqueSlug,
        content: content.trim(),
        priority: priority || "NORMAL",
        status: status || "PUBLISHED",
        publishedAt: status === "PUBLISHED" ? new Date() : null,
        authorId: defaultAuthor.id,
      },
    });

    return NextResponse.json({ ok: true, data: announcement });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "Gagal membuat pengumuman" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, content, priority, status } = body;

    if (!id || !title || !content) {
      return NextResponse.json(
        { ok: false, error: "Data pengumuman tidak lengkap" },
        { status: 400 }
      );
    }

    const existing = await prisma.announcement.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { ok: false, error: "Pengumuman tidak ditemukan" },
        { status: 404 }
      );
    }

    const newStatus = status || "PUBLISHED";
    const publishedAt =
      newStatus === "PUBLISHED"
        ? existing.publishedAt || new Date()
        : null;

    const updated = await prisma.announcement.update({
      where: { id },
      data: {
        title: title.trim(),
        content: content.trim(),
        priority: priority || "NORMAL",
        status: newStatus,
        publishedAt,
      },
    });

    return NextResponse.json({ ok: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "Gagal mengupdate pengumuman" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { ok: false, error: "ID pengumuman tidak diberikan" },
        { status: 400 }
      );
    }

    await prisma.announcement.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "Gagal menghapus pengumuman" },
      { status: 500 }
    );
  }
}
