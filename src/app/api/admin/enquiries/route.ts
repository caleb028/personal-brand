import { NextRequest, NextResponse } from "next/server";
import { getAllEnquiries, createEnquiry } from "@/lib/enquiries-store";
import { verifyAdminSession } from "@/lib/security";
import { z } from "zod";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    // Enforce authentication on admin queries
    if (!verifyAdminSession(req)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Valid administrator session required." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.toLowerCase().trim() || "";
    const status = searchParams.get("status") || "all";
    const service = searchParams.get("service") || "all";

    let enquiries = await getAllEnquiries();

    if (status !== "all") {
      enquiries = enquiries.filter((e) => e.status === status);
    }

    if (service !== "all") {
      enquiries = enquiries.filter((e) => e.service === service);
    }

    if (search) {
      enquiries = enquiries.filter(
        (e) =>
          e.fullName.toLowerCase().includes(search) ||
          e.email.toLowerCase().includes(search) ||
          e.phone.toLowerCase().includes(search) ||
          e.organization.toLowerCase().includes(search) ||
          e.service.toLowerCase().includes(search) ||
          e.description.toLowerCase().includes(search) ||
          e.reference.toLowerCase().includes(search)
      );
    }

    return NextResponse.json({
      success: true,
      data: enquiries,
      count: enquiries.length,
    });
  } catch (error) {
    console.error("Admin enquiries GET error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch enquiries" },
      { status: 500 }
    );
  }
}

const manualEnquirySchema = z.object({
  fullName: z.string().min(2, "Full name required").max(100),
  email: z.string().email("Valid email required").max(150),
  phone: z.string().max(30).optional().or(z.literal("")),
  organization: z.string().max(120).optional().or(z.literal("")),
  service: z.string().min(1, "Service required").max(100),
  description: z.string().min(5, "Description required").max(3000),
  budget: z.string().max(100).optional().or(z.literal("")),
  preferredContact: z.enum(["Email", "WhatsApp", "Phone Call"]).default("WhatsApp"),
  priority: z.enum(["low", "medium", "high", "urgent"]).default("medium"),
});

export async function POST(req: NextRequest) {
  try {
    // Enforce authentication on manual creation
    if (!verifyAdminSession(req)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Valid administrator session required." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const validated = manualEnquirySchema.parse(body);

    const newEnquiry = await createEnquiry({
      fullName: validated.fullName.trim(),
      email: validated.email.trim(),
      phone: (validated.phone || "").trim(),
      organization: (validated.organization || "").trim(),
      service: validated.service.trim(),
      description: validated.description.trim(),
      budget: validated.budget || "To be estimated",
      preferredContact: validated.preferredContact,
      status: "new",
      isRead: true, // Created by admin so already read
      priority: validated.priority,
    });

    return NextResponse.json({
      success: true,
      message: "Enquiry logged successfully.",
      data: newEnquiry,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Admin enquiries POST error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create enquiry" },
      { status: 500 }
    );
  }
}
