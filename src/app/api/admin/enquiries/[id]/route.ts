import { NextRequest, NextResponse } from "next/server";
import {
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
} from "@/lib/enquiries-store";
import { verifyAdminSession } from "@/lib/security";
import { z } from "zod";

export const dynamic = "force-dynamic";

function isValidId(id: string): boolean {
  return typeof id === "string" && /^[a-zA-Z0-9_\-]{3,40}$/.test(id);
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!verifyAdminSession(req)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Valid administrator session required." },
        { status: 401 }
      );
    }

    if (!isValidId(params.id)) {
      return NextResponse.json(
        { success: false, error: "Invalid inquiry ID format." },
        { status: 400 }
      );
    }

    const enquiry = await getEnquiryById(params.id);
    if (!enquiry) {
      return NextResponse.json(
        { success: false, error: "Enquiry not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: enquiry });
  } catch (error) {
    console.error("Admin single enquiry GET error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch enquiry" },
      { status: 500 }
    );
  }
}

const updateSchema = z.object({
  status: z
    .enum(["new", "in_progress", "contacted", "closed", "archived"])
    .optional(),
  priority: z.enum(["low", "medium", "high", "urgent"]).optional(),
  isRead: z.boolean().optional(),
  newNote: z.string().max(2000).optional(),
  auditAction: z.string().max(200).optional(),
  budget: z.string().max(100).optional(),
  phone: z.string().max(30).optional(),
  email: z.string().email().max(150).optional(),
  fullName: z.string().max(100).optional(),
  organization: z.string().max(120).optional(),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!verifyAdminSession(req)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Valid administrator session required." },
        { status: 401 }
      );
    }

    if (!isValidId(params.id)) {
      return NextResponse.json(
        { success: false, error: "Invalid inquiry ID format." },
        { status: 400 }
      );
    }

    const body = await req.json();
    const validated = updateSchema.parse(body);

    const updated = await updateEnquiry(params.id, validated);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Enquiry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Enquiry updated successfully",
      data: updated,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Admin enquiry PATCH error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update enquiry" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!verifyAdminSession(req)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Valid administrator session required." },
        { status: 401 }
      );
    }

    if (!isValidId(params.id)) {
      return NextResponse.json(
        { success: false, error: "Invalid inquiry ID format." },
        { status: 400 }
      );
    }

    const deleted = await deleteEnquiry(params.id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Enquiry not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      message: "Enquiry deleted successfully",
    });
  } catch (error) {
    console.error("Admin enquiry DELETE error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete enquiry" },
      { status: 500 }
    );
  }
}
