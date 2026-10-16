"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { siteConfig } from "@/content/siteConfig";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PageHeroBanner } from "@/components/ui/PageHeroBanner";
import { ScrollReveal } from "@/components/motion";
import {
  Mail,
  MessageSquare,
  Phone,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  Send,
  Loader2,
} from "lucide-react";

function ContactFormInner() {
  const searchParams = useSearchParams();
  const prefilledService = searchParams.get("service") || "";
  const prefilledProject = searchParams.get("project") || "";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    service: prefilledService || (prefilledProject ? "Custom Web Applications" : ""),
    description: prefilledProject ? `I am interested in building a system similar to ${prefilledProject}. ` : "",
    budget: "",
    preferredContact: "Email" as "Email" | "WhatsApp" | "Phone Call",
    companyWebsite: "", // Honeypot field
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
    reference?: string;
  } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const servicesList = [
    "Website Design & Development",
    "Custom Web Applications",
    "E-Commerce Development",
    "Business Management Systems",
    "API & Systems Integration",
    "Website Maintenance & Technical Support",
    "Other / Consultative Architecture",
  ];

  const budgetRanges = [
    "Flexible / To Be Estimated",
    "KES 30,000 – KES 80,000",
    "KES 80,000 – KES 200,000",
    "KES 200,000 – KES 500,000",
    "KES 500,000+",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFieldErrors({});
    setSubmitResult(null);

    // Client-side quick validation
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = "Full name is required";
    if (!formData.email.trim()) errors.email = "Email address is required";
    if (!formData.service) errors.service = "Please select a service";
    if (!formData.description.trim() || formData.description.trim().length < 10) {
      errors.description = "Please describe your project (minimum 10 characters)";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitResult({
          success: true,
          message: data.message,
          reference: data.data?.reference,
        });
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          organization: "",
          service: "",
          description: "",
          budget: "",
          preferredContact: "Email",
          companyWebsite: "",
        });
      } else {
        setSubmitResult({
          success: false,
          message: data.error || "Failed to submit inquiry. Please try again or reach out on WhatsApp.",
        });
      }
    } catch (err) {
      setSubmitResult({
        success: false,
        message: "Network error. Please message us directly on WhatsApp or email.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      {/* Left Column: Inquiry Form */}
      <ScrollReveal direction="right" distance={24} duration={0.65} className="lg:col-span-7">
        <div className="bg-white/95 backdrop-blur-md p-6 sm:p-10 rounded-2xl border border-[#DDE3E8] shadow-2xl">
        {submitResult?.success ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 bg-[#19B6A4]/15 text-[#15A392] rounded-full flex items-center justify-center mx-auto border border-[#19B6A4]/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-heading font-extrabold text-2xl text-[#101B2B]">
              Inquiry Sent Successfully!
            </h3>
            {submitResult.reference && (
              <div className="inline-block px-3 py-1 bg-[#F7F6F2] border border-[#DDE3E8] rounded font-mono text-xs text-[#172331]">
                Tracking Reference: <strong>{submitResult.reference}</strong>
              </div>
            )}
            <p className="text-sm text-[#526273] max-w-md mx-auto leading-relaxed">
              {submitResult.message}
            </p>
            <div className="pt-4">
              <Button
                onClick={() => setSubmitResult(null)}
                variant="secondary"
                size="md"
              >
                Send Another Message
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="border-b border-[#DDE3E8] pb-4 mb-2">
              <h2 className="font-heading font-bold text-xl text-[#101B2B]">
                Project Inquiry Form
              </h2>
              <p className="text-xs text-[#526273] mt-1">
                Fill in the details below. We review every submission personally and respond promptly.
              </p>
            </div>

            {submitResult && !submitResult.success && (
              <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{submitResult.message}</span>
              </div>
            )}

            {/* Honeypot field (hidden for robots) */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="companyWebsite">Website</label>
              <input
                type="text"
                id="companyWebsite"
                name="companyWebsite"
                value={formData.companyWebsite}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Row 1: Full Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#101B2B] mb-1.5"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. David Mwangi"
                  required
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-[#19B6A4] focus:border-[#19B6A4] text-[#172331] placeholder:text-[#526273]/60 ${
                    fieldErrors.fullName
                      ? "border-red-400 bg-red-50"
                      : "border-[#DDE3E8] bg-[#F7F6F2]"
                  }`}
                />
                {fieldErrors.fullName && (
                  <p className="text-[11px] text-red-500 mt-1">
                    {fieldErrors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#101B2B] mb-1.5"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  required
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-[#19B6A4] focus:border-[#19B6A4] text-[#172331] placeholder:text-[#526273]/60 ${
                    fieldErrors.email
                      ? "border-red-400 bg-red-50"
                      : "border-[#DDE3E8] bg-[#F7F6F2]"
                  }`}
                />
                {fieldErrors.email && (
                  <p className="text-[11px] text-red-500 mt-1">
                    {fieldErrors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Row 2: Phone Number & Organization */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#101B2B] mb-1.5"
                >
                  Phone Number <span className="text-[#526273] font-normal">(Optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. +254 712 345 678"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE3E8] bg-[#F7F6F2] text-[#172331] placeholder:text-[#526273]/60 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-[#19B6A4] focus:border-[#19B6A4]"
                />
              </div>

              <div>
                <label
                  htmlFor="organization"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#101B2B] mb-1.5"
                >
                  Organization / Business <span className="text-[#526273] font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  placeholder="e.g. Apex Enterprises Ltd"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE3E8] bg-[#F7F6F2] text-[#172331] placeholder:text-[#526273]/60 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-[#19B6A4] focus:border-[#19B6A4]"
                />
              </div>
            </div>

            {/* Row 3: Service Selection */}
            <div>
              <label
                htmlFor="service"
                className="block text-xs font-semibold uppercase tracking-wider text-[#101B2B] mb-1.5"
              >
                Service Required <span className="text-red-500">*</span>
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-[#19B6A4] focus:border-[#19B6A4] text-[#172331] ${
                  fieldErrors.service
                    ? "border-red-400 bg-red-50"
                    : "border-[#DDE3E8] bg-[#F7F6F2]"
                }`}
              >
                <option value="" className="bg-white text-[#172331]">Select a service category...</option>
                {servicesList.map((s) => (
                  <option key={s} value={s} className="bg-white text-[#172331]">
                    {s}
                  </option>
                ))}
              </select>
              {fieldErrors.service && (
                <p className="text-[11px] text-red-500 mt-1">
                  {fieldErrors.service}
                </p>
              )}
            </div>

            {/* Row 4: Project Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-xs font-semibold uppercase tracking-wider text-[#101B2B] mb-1.5"
              >
                Project Description & Operational Goals <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe what you need built, the operational challenge you are solving, or key features required..."
                required
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-[#19B6A4] focus:border-[#19B6A4] text-[#172331] placeholder:text-[#526273]/60 ${
                  fieldErrors.description
                    ? "border-red-400 bg-red-50"
                    : "border-[#DDE3E8] bg-[#F7F6F2]"
                }`}
              />
              {fieldErrors.description && (
                <p className="text-[11px] text-red-500 mt-1">
                  {fieldErrors.description}
                </p>
              )}
            </div>

            {/* Row 5: Estimated Budget & Preferred Contact Method */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="budget"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#101B2B] mb-1.5"
                >
                  Estimated Budget <span className="text-[#526273] font-normal">(Optional)</span>
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE3E8] bg-[#F7F6F2] text-[#172331] text-sm font-sans focus:outline-none focus:ring-2 focus:ring-[#19B6A4] focus:border-[#19B6A4]"
                >
                  <option value="" className="bg-white text-[#172331]">Select budget range...</option>
                  {budgetRanges.map((b) => (
                    <option key={b} value={b} className="bg-white text-[#172331]">
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#101B2B] mb-1.5">
                  Preferred Contact Method
                </label>
                <div className="grid grid-cols-3 gap-2 pt-0.5">
                  {(["Email", "WhatsApp", "Phone Call"] as const).map((method) => (
                    <button
                      type="button"
                      key={method}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, preferredContact: method }))
                      }
                      className={`py-2 px-2 text-xs rounded-md font-medium border text-center transition-colors ${
                        formData.preferredContact === method
                          ? "bg-[#19B6A4] text-[#101B2B] border-[#19B6A4] font-bold shadow-sm"
                          : "bg-[#F7F6F2] text-[#526273] border-[#DDE3E8] hover:bg-[#EAE8E1] hover:text-[#101B2B]"
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg bg-[#19B6A4] text-[#101B2B] font-heading font-extrabold text-sm hover:bg-[#15A392] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#19B6A4] disabled:opacity-60 shadow-md"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting Inquiry...</span>
                  </>
                ) : (
                  <>
                    <span>Send Project Inquiry</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
              <p className="text-[11px] text-[#526273] text-center mt-2 font-sans">
                We respect your privacy. No spam. You will hear back directly from the developer.
              </p>
            </div>
          </form>
        )}
        </div>
      </ScrollReveal>

      {/* Right Column: Direct Channels & Information */}
      <ScrollReveal direction="left" distance={24} duration={0.65} className="lg:col-span-5 space-y-6">
        {/* Direct WhatsApp Card */}
        <div className="p-6 rounded-2xl bg-[#1D2D40]/85 backdrop-blur-md border border-[#34465A] hover:border-[#19B6A4]/40 shadow-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-[#19B6A4] text-[#101B2B] flex items-center justify-center font-bold">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-[#F7F6F2]">
                WhatsApp Direct Chat
              </h3>
              <p className="text-xs text-[#19B6A4] font-semibold">
                Immediate response during business hours
              </p>
            </div>
          </div>
          <p className="text-xs text-[#AAB5C2] leading-relaxed mb-4">
            Prefer a direct messaging conversation to ask quick questions or share documents? Reach out on our verified business WhatsApp.
          </p>
          <Button
            href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
              siteConfig.whatsappText
            )}`}
            external
            variant="primary"
            size="md"
            className="w-full"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Start WhatsApp Chat
          </Button>
        </div>

        {/* Contact Info Box */}
        <div className="p-6 rounded-2xl bg-[#1D2D40]/85 backdrop-blur-md border border-[#34465A] shadow-xl space-y-4">
          <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-[#C8A96B] pb-3 border-b border-[#34465A]">
            Direct Contact Information
          </h3>

          <div className="space-y-3.5 text-xs">
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#19B6A4] flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#F7F6F2] block">Business Email:</span>
                <a
                  href={`mailto:${siteConfig.recipientEmail}?subject=Project%20Inquiry%20-%20Instaweb%20Solutions`}
                  className="text-[#AAB5C2] hover:text-[#19B6A4] transition-colors"
                >
                  {siteConfig.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MessageSquare className="w-4 h-4 text-[#19B6A4] flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#F7F6F2] block">Instant Messaging:</span>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                    siteConfig.whatsappText
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#19B6A4] hover:underline transition-colors font-medium inline-flex items-center gap-1.5"
                >
                  <span>WhatsApp Business Chat</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#19B6A4] flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#F7F6F2] block">Location:</span>
                <span className="text-[#AAB5C2]">
                  {siteConfig.location} (Delivering systems worldwide)
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#19B6A4] flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#F7F6F2] block">Working Hours:</span>
                <span className="text-[#AAB5C2]">
                  Monday – Friday: 8:00 AM – 6:00 PM EAT
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quality Commitment Card */}
        <div className="p-6 rounded-2xl bg-[#1D2D40]/85 backdrop-blur-md border border-[#34465A] text-xs space-y-2.5 shadow-xl">
          <div className="flex items-center gap-2 font-bold text-[#F7F6F2]">
            <ShieldCheck className="w-4 h-4 text-[#19B6A4]" />
            <span>Our Commitment to Inquirers</span>
          </div>
          <ul className="space-y-1.5 text-[#AAB5C2]">
            <li>• Direct communication with the engineer building your system.</li>
            <li>• Honest technical guidance, even if you don't need custom code.</li>
            <li>• Transparent milestone pricing with zero hidden fees.</li>
          </ul>
        </div>
      </ScrollReveal>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full">
      <PageHeroBanner
        badge="Start A Discussion"
        title="Have a Project in Mind? Let's Discuss It."
        description="Tell us what you're planning, the challenge you're trying to solve, or the software you need. We'll explore how Instaweb Solutions Ltd can help."
      />

      {/* Main Form & Contact Section */}
      <section className="py-16 sm:py-24 bg-transparent border-b border-[#34465A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense
            fallback={
              <div className="p-12 text-center text-sm font-mono text-[#AAB5C2]">
                Loading inquiry portal...
              </div>
            }
          >
            <ContactFormInner />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
