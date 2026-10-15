import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const galleries = await prisma.gallery.findMany({
      include: {
        _count: { select: { images: true } },
        images: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ ok: true, data: galleries });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "Gagal mengambil data galeri" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, coverImage, imageUrls } = body;

    if (!title) {
      return NextResponse.json(
        { ok: false, error: "Judul album wajib diisi" },
        { status: 400 }
      );
    }

    const baseSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const uniqueSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    const gallery = await prisma.gallery.create({
      data: {
        title: title.trim(),
        slug: uniqueSlug,
        description: description?.trim() || null,
        coverImage: coverImage?.trim() || null,
      },
    });

    // If initial image URLs provided
    if (Array.isArray(imageUrls) && imageUrls.length > 0) {
      await prisma.galleryImage.createMany({
        data: imageUrls.map((url: string) => ({
          albumId: gallery.id,
          image: url.trim(),
          title: title.trim(),
        })),
      });
    }

    return NextResponse.json({ ok: true, data: gallery });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "Gagal membuat album galeri" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, description, coverImage, imageUrls } = body;

    if (!id || !title) {
      return NextResponse.json(
        { ok: false, error: "Data album tidak lengkap" },
        { status: 400 }
      );
    }

    const updated = await prisma.gallery.update({
      where: { id },
      data: {
        title: title.trim(),
        description: description?.trim() || null,
        coverImage: coverImage?.trim() || null,
      },
    });

    // If additional image URLs provided during edit
    if (Array.isArray(imageUrls) && imageUrls.length > 0) {
      await prisma.galleryImage.createMany({
        data: imageUrls.map((url: string) => ({
          albumId: id,
          image: url.trim(),
          title: title.trim(),
        })),
      });
    }

    return NextResponse.json({ ok: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "Gagal mengupdate galeri" },
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
        { ok: false, error: "ID galeri tidak diberikan" },
        { status: 400 }
      );
    }

    // Safely delete associated images first in SQLite
    await prisma.galleryImage.deleteMany({ where: { albumId: id } });
    await prisma.gallery.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "Gagal menghapus galeri" },
      { status: 500 }
    );
  }
}
