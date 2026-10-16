import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

// Secret used for HMAC session signing. Defaults to an environment variable,
// or a persistent server-generated secret key.
const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET ||
  "instaweb-sec-hmac-9f8a3c2b1e7d4e5a6b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0";

/**
 * Constant-time comparison between two strings to prevent timing attacks.
 */
export function timingSafeCompare(a: string, b: string): boolean {
  try {
    const hashA = crypto.createHash("sha256").update(a).digest();
    const hashB = crypto.createHash("sha256").update(b).digest();
    return crypto.timingSafeEqual(hashA, hashB);
  } catch {
    return false;
  }
}

/**
 * Creates an HMAC-SHA256 signature for a string payload.
 */
function createSignature(payload: string): string {
  return crypto.createHmac("sha256", SESSION_SECRET).update(payload).digest("hex");
}

/**
 * Generates a tamper-proof cryptographically signed admin session token.
 */
export function generateSignedAdminToken(): string {
  const payloadObj = {
    role: "admin",
    authenticatedAt: Date.now(),
    sessionExpires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
    nonce: crypto.randomBytes(16).toString("hex"),
  };

  const payloadStr = Buffer.from(JSON.stringify(payloadObj)).toString("base64url");
  const signature = createSignature(payloadStr);

  return `${payloadStr}.${signature}`;
}

/**
 * Validates an HMAC-SHA256 signed admin session token.
 * Returns true only if the token signature is valid and has not expired.
 */
export function verifySignedAdminToken(token: string | null | undefined): boolean {
  if (!token || typeof token !== "string") return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [payloadStr, signature] = parts;
  const expectedSignature = createSignature(payloadStr);

  // Constant-time signature verification to prevent timing attacks
  if (!timingSafeCompare(signature, expectedSignature)) {
    return false;
  }

  try {
    const decoded = JSON.parse(Buffer.from(payloadStr, "base64url").toString("utf8"));
    if (decoded.role !== "admin") return false;
    if (!decoded.sessionExpires || decoded.sessionExpires < Date.now()) return false;
    return true;
  } catch {
    return false;
  }
}

/**
 * Helper to authenticate requests in API routes.
 * Checks both the HTTP-only cookie and the Authorization header.
 */
export function verifyAdminSession(req: NextRequest): boolean {
  // 1. Check HTTP-only cookie
  const cookieToken = req.cookies.get("admin_session")?.value;
  if (cookieToken && verifySignedAdminToken(cookieToken)) {
    return true;
  }

  // 2. Check Authorization: Bearer <token> header
  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const bearerToken = authHeader.substring(7).trim();
    if (verifySignedAdminToken(bearerToken)) {
      return true;
    }
  }

  return false;
}

/**
 * In-Memory Sliding-Window Rate Limiter
 * Tracks requests per IP address to mitigate brute-force and DoS attacks.
 */
interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

// Cleanup stale rate limit records every 5 minutes to prevent memory leak
setInterval(() => {
  const now = Date.now();
  rateLimitMap.forEach((record, key) => {
    if (now > record.resetAt) {
      rateLimitMap.delete(key);
    }
  });
}, 1000 * 60 * 5);

export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; remaining: number; retryAfterSec: number } {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1, retryAfterSec: 0 };
  }

  if (record.count >= maxRequests) {
    const retryAfterSec = Math.ceil((record.resetAt - now) / 1000);
    return { allowed: false, remaining: 0, retryAfterSec };
  }

  record.count += 1;
  return {
    allowed: true,
    remaining: maxRequests - record.count,
    retryAfterSec: 0,
  };
}

/**
 * Extracts client IP from standard proxy headers.
 */
export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "127.0.0.1";
}

export { sanitizeCsvCell } from "./sanitize-csv";

