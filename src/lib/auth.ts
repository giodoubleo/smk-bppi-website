import crypto from "crypto";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

function getSecret(): string {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) {
    throw new Error(
      "NEXTAUTH_SECRET belum diset. Salin .env.example ke .env lalu isi dengan: node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\""
    );
  }
  return secret;
}
export const COOKIE_NAME = "bppi_admin_session";

// Helper to hash password with SHA-256 (compatible with seed.ts)
export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

// Generate signed session token: "userId:expiry:signature"
export function createSessionToken(userId: string): string {
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
  const data = `${userId}:${expiresAt}`;
  const signature = crypto.createHmac("sha256", getSecret()).update(data).digest("hex");
  return `${data}:${signature}`;
}

// Verify session token
export function verifySessionToken(token: string): { valid: boolean; userId?: string } {
  try {
    const parts = token.split(":");
    if (parts.length !== 3) return { valid: false };

    const [userId, expiresAtStr, signature] = parts;
    const expiresAt = parseInt(expiresAtStr, 10);

    if (Date.now() > expiresAt) return { valid: false };

    const expectedSignature = crypto
      .createHmac("sha256", getSecret())
      .update(`${userId}:${expiresAtStr}`)
      .digest("hex");

    if (signature !== expectedSignature) return { valid: false };

    return { valid: true, userId };
  } catch {
    return { valid: false };
  }
}

// Get currently authenticated admin user from cookies
export async function getAuthenticatedAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const { valid, userId } = verifySessionToken(token);
  if (!valid || !userId) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, role: true },
    });
    return user;
  } catch {
    return null;
  }
}
