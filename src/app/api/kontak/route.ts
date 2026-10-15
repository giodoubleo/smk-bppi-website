import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Simple in-memory rate limiting map: ip -> lastSubmissionTime
const rateLimitMap = new Map<string, number>();

export async function POST(request: Request) {
  try {
    // 1. IP Rate Limiting (1 message every 20 seconds per IP)
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown-ip";

    const lastTime = rateLimitMap.get(ip);
    const now = Date.now();
    if (lastTime && now - lastTime < 20000) {
      return NextResponse.json(
        { error: "Mohon tunggu beberapa saat sebelum mengirim pesan kembali." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, phone, subject, message, website } = body;

    // 2. Honeypot Bot Detection
    // Bots usually fill all hidden inputs. If 'website' has a value, discard silently.
    if (website) {
      return NextResponse.json({ ok: true });
    }

    // 3. Validation & Sanitization
    const trimmedName = name?.trim();
    const trimmedEmail = email?.trim().toLowerCase();
    const trimmedSubject = subject?.trim();
    const trimmedMessage = message?.trim();
    const trimmedPhone = phone?.trim();

    if (!trimmedName || !trimmedEmail || !trimmedSubject || !trimmedMessage) {
      return NextResponse.json(
        { error: "Nama, email, subjek, dan pesan wajib diisi." },
        { status: 400 }
      );
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { error: "Format alamat email tidak valid." },
        { status: 400 }
      );
    }

    // Length constraints
    if (trimmedName.length > 100) {
      return NextResponse.json({ error: "Nama terlalu panjang (maks. 100 karakter)." }, { status: 400 });
    }
    if (trimmedSubject.length > 200) {
      return NextResponse.json({ error: "Subjek terlalu panjang (maks. 200 karakter)." }, { status: 400 });
    }
    if (trimmedMessage.length > 3000) {
      return NextResponse.json({ error: "Pesan terlalu panjang (maks. 3000 karakter)." }, { status: 400 });
    }

    // 4. Save to Database
    await prisma.contactMessage.create({
      data: {
        name: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone || null,
        subject: trimmedSubject,
        message: trimmedMessage,
      },
    });

    // Update rate limit timestamp
    rateLimitMap.set(ip, now);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengirim pesan. Silakan coba lagi." },
      { status: 500 }
    );
  }
}