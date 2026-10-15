import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const news = await prisma.news.findMany({
      include: {
        category: true,
        author: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ ok: true, data: news });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "Gagal mengambil data berita" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, excerpt, content, categoryId, thumbnail, status, isFeatured } = body;

    if (!title || !content || !categoryId) {
      return NextResponse.json(
        { ok: false, error: "Judul, konten, dan kategori wajib diisi" },
        { status: 400 }
      );
    }

    // Ensure author exists
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

    // Create unique slug
    const baseSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const uniqueSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    const news = await prisma.news.create({
      data: {
        title: title.trim(),
        slug: uniqueSlug,
        excerpt: excerpt?.trim() || null,
        content: content.trim(),
        thumbnail: thumbnail?.trim() || null,
        status: status || "PUBLISHED",
        isFeatured: Boolean(isFeatured),
        publishedAt: status === "PUBLISHED" ? new Date() : null,
        categoryId,
        authorId: defaultAuthor.id,
      },
    });

    return NextResponse.json({ ok: true, data: news });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "Gagal membuat berita baru" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, excerpt, content, categoryId, thumbnail, status, isFeatured } = body;

    if (!id || !title || !content || !categoryId) {
      return NextResponse.json(
        { ok: false, error: "Data berita tidak lengkap" },
        { status: 400 }
      );
    }

    const existing = await prisma.news.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { ok: false, error: "Berita tidak ditemukan" },
        { status: 404 }
      );
    }

    const newStatus = status || "PUBLISHED";
    const publishedAt =
      newStatus === "PUBLISHED"
        ? existing.publishedAt || new Date()
        : null;

    const updated = await prisma.news.update({
      where: { id },
      data: {
        title: title.trim(),
        excerpt: excerpt?.trim() || null,
        content: content.trim(),
        thumbnail: thumbnail?.trim() || null,
        status: newStatus,
        isFeatured: Boolean(isFeatured),
        publishedAt,
        categoryId,
      },
    });

    return NextResponse.json({ ok: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "Gagal mengupdate berita" },
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
        { ok: false, error: "ID berita tidak diberikan" },
        { status: 400 }
      );
    }

    await prisma.news.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "Gagal menghapus berita" },
      { status: 500 }
    );
  }
}
