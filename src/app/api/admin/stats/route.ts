import { NextRequest, NextResponse } from "next/server";
import { getEnquiriesStats, getAllEnquiries } from "@/lib/enquiries-store";
import { verifyAdminSession } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    if (!verifyAdminSession(req)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Valid administrator session required." },
        { status: 401 }
      );
    }

    const stats = await getEnquiriesStats();
    const all = await getAllEnquiries();
    const recent = all.slice(0, 5);

    return NextResponse.json({
      success: true,
      stats: {
        ...stats,
        recent,
      },
    });
  } catch (error) {
    console.error("Admin stats GET error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
