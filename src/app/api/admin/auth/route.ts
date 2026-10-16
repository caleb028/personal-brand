import { NextRequest, NextResponse } from "next/server";
import {
  generateSignedAdminToken,
  timingSafeCompare,
  checkRateLimit,
  getClientIp,
} from "@/lib/security";
import { getAdminPasscode } from "@/lib/settings-store";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const clientIp = getClientIp(req);

    // 1. Enforce rate limiting: max 5 login attempts per 15 minutes per IP
    const rateLimit = checkRateLimit(`admin-login:${clientIp}`, 5, 15 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many login attempts. Please wait ${rateLimit.retryAfterSec} seconds before trying again.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfterSec),
          },
        }
      );
    }

    const body = await req.json();
    const passcode = typeof body?.passcode === "string" ? body.passcode.trim() : "";

    if (!passcode) {
      return NextResponse.json(
        { success: false, error: "Administrator passcode is required." },
        { status: 400 }
      );
    }

    // 2. Fetch persisted master passcode (from settings store or env variable)
    const expectedPasscode = await getAdminPasscode();

    // 3. Constant-time comparison to prevent timing attacks
    const isValid = timingSafeCompare(passcode, expectedPasscode);

    if (isValid) {
      // 4. Generate cryptographically signed HMAC-SHA256 session token
      const token = generateSignedAdminToken();

      const response = NextResponse.json({
        success: true,
        message: "Authenticated successfully",
        token,
      });

      // 5. Store in HTTP-Only, Secure, SameSite Cookie
      response.cookies.set("admin_session", token, {
        httpOnly: true, // Shields cookie from XSS access
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    return NextResponse.json(
      {
        success: false,
        error: "Invalid administrator passcode. Please try again.",
        remainingAttempts: rateLimit.remaining,
      },
      { status: 401 }
    );
  } catch (error) {
    console.error("Admin auth error:", error);
    return NextResponse.json(
      { success: false, error: "Authentication system error" },
      { status: 500 }
    );
  }
}
