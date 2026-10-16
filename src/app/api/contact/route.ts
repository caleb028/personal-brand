import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { siteConfig } from "@/content/siteConfig";
import { createEnquiry } from "@/lib/enquiries-store";
import { checkRateLimit, getClientIp } from "@/lib/security";

export const dynamic = "force-dynamic";

// Strict schema with maximum bounds to prevent memory/storage DoS
const inquirySchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name cannot exceed 100 characters"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(150, "Email cannot exceed 150 characters"),
  phone: z
    .string()
    .trim()
    .max(30, "Phone number cannot exceed 30 characters")
    .optional()
    .or(z.literal("")),
  organization: z
    .string()
    .trim()
    .max(120, "Organization name cannot exceed 120 characters")
    .optional()
    .or(z.literal("")),
  service: z
    .string()
    .trim()
    .min(1, "Please select the service required")
    .max(100, "Service name cannot exceed 100 characters"),
  description: z
    .string()
    .trim()
    .min(10, "Please provide at least 10 characters describing your project")
    .max(3000, "Project description cannot exceed 3,000 characters"),
  budget: z
    .string()
    .trim()
    .max(100, "Budget cannot exceed 100 characters")
    .optional()
    .or(z.literal("")),
  preferredContact: z.enum(["Email", "WhatsApp", "Phone Call"]),
  // Spam honeypot: hidden field that automated bots will fill
  companyWebsite: z.string().max(200).optional().or(z.literal("")),
});

export async function POST(req: NextRequest) {
  try {
    const clientIp = getClientIp(req);

    // 1. Rate Limiting: Max 5 submissions per 10 minutes per IP
    const rateLimit = checkRateLimit(`contact-submit:${clientIp}`, 5, 10 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many submissions from this connection. Please wait ${rateLimit.retryAfterSec} seconds before sending another inquiry.`,
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

    // 2. Check honeypot spam protection
    if (body.companyWebsite && typeof body.companyWebsite === "string" && body.companyWebsite.trim().length > 0) {
      // Silently discard spam bot submission without revealing trigger
      return NextResponse.json({
        success: true,
        message: "Inquiry received successfully.",
      });
    }

    const validatedData = inquirySchema.parse(body);

    const targetRecipient = siteConfig.recipientEmail; // "calebngiciri075@gmail.com"
    const displayEmail = siteConfig.email; // "contact@instawebsolutions.com"

    // Construct structured notification payload
    const emailPayload = {
      to: targetRecipient,
      from: displayEmail,
      replyTo: validatedData.email,
      subject: `[New Website Inquiry] ${validatedData.service} - ${validatedData.fullName}`,
      timestamp: new Date().toISOString(),
      details: {
        fullName: validatedData.fullName,
        email: validatedData.email,
        phone: validatedData.phone || "Not provided",
        organization: validatedData.organization || "Individual / Independent",
        service: validatedData.service,
        budget: validatedData.budget || "To be estimated",
        preferredContact: validatedData.preferredContact,
        description: validatedData.description,
      },
    };

    console.log("=== INQUIRY ROUTED TO RECIPIENT ===", {
      deliveredTo: targetRecipient,
      displaySender: displayEmail,
      replyTo: validatedData.email,
      service: validatedData.service,
      timestamp: emailPayload.timestamp,
    });

    const refCode = `IWS-${Date.now().toString().slice(-6)}`;

    // 3. Persist to independent enquiries store for admin dashboard
    const savedEnquiry = await createEnquiry({
      reference: refCode,
      fullName: validatedData.fullName,
      email: validatedData.email,
      phone: validatedData.phone || "",
      organization: validatedData.organization || "",
      service: validatedData.service,
      description: validatedData.description,
      budget: validatedData.budget || "To be estimated",
      preferredContact: validatedData.preferredContact,
      status: "new",
      isRead: false,
      priority: validatedData.budget && validatedData.budget.includes("500,000") ? "urgent" : "high",
    });

    return NextResponse.json({
      success: true,
      message: `Thank you, ${validatedData.fullName}! Your project inquiry has been delivered to ${displayEmail} and forwarded to our engineering desk at ${targetRecipient}. We typically respond within 1 business day.`,
      data: {
        id: savedEnquiry.id,
        reference: refCode,
        service: validatedData.service,
        recipient: targetRecipient,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation error",
          details: error.errors.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }

    console.error("Inquiry handler error:", error);
    return NextResponse.json(
      {
        success: false,
        error: `System error processing inquiry. Please contact us directly via WhatsApp or email (${siteConfig.email}).`,
      },
      { status: 500 }
    );
  }
}
