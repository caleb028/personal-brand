import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession, timingSafeCompare } from "@/lib/security";
import {
  getAdminPasscode,
  updateAdminPasscode,
  getAdminSettingsMetadata,
} from "@/lib/settings-store";
import { z } from "zod";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    if (!verifyAdminSession(req)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Valid administrator session required." },
        { status: 401 }
      );
    }

    const metadata = await getAdminSettingsMetadata();
    return NextResponse.json({
      success: true,
      settings: metadata,
    });
  } catch (error) {
    console.error("Admin settings GET error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

const updatePasscodeSchema = z.object({
  currentPasscode: z.string().min(1, "Current passcode is required"),
  newPasscode: z.string().min(6, "New passcode must be at least 6 characters").max(100),
});

export async function POST(req: NextRequest) {
  try {
    if (!verifyAdminSession(req)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Valid administrator session required." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const validated = updatePasscodeSchema.parse(body);

    const actualPasscode = await getAdminPasscode();
    const isCurrentValid = timingSafeCompare(validated.currentPasscode, actualPasscode);

    if (!isCurrentValid) {
      return NextResponse.json(
        { success: false, error: "Current passcode is incorrect. Verification failed." },
        { status: 403 }
      );
    }

    const updated = await updateAdminPasscode(validated.newPasscode);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Failed to persist new passcode to server." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Master administrator passcode has been updated on the server.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Admin settings POST error:", error);
    return NextResponse.json(
      { success: false, error: "Server error updating settings" },
      { status: 500 }
    );
  }
}
