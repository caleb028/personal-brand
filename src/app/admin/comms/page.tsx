"use client";

import React, { useState, useEffect } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { siteConfig } from "@/content/siteConfig";
import { Enquiry } from "@/lib/enquiries-store";
import {
  Send,
  MessageSquare,
  Mail,
  Phone,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
} from "lucide-react";

export default function AdminCommsPage() {
  const [recipientPhone, setRecipientPhone] = useState("");
  const [clientName, setClientName] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

  useEffect(() => {
    const fetchEnquiries = () => {
      fetch("/api/admin/enquiries")
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            setEnquiries(data.data);
          }
        })
        .catch(() => {});
    };

    fetchEnquiries();
    const interval = setInterval(fetchEnquiries, 3500);

    const handleFocus = () => fetchEnquiries();
    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleFocus);
    };
  }, []);

  const templates = [
    {
      title: "Initial Inquiry Discovery Follow-up",
      body: "Hello {name}, this is Caleb from Instaweb Solutions Ltd regarding your software inquiry. We reviewed your initial requirements and would like to arrange a brief 15-minute discovery call to outline the technical architecture and budget. When would be a convenient time for you?",
    },
    {
      title: "Formal Scope & Architectural Estimate",
      body: "Dear {name}, following up on your project inquiry with Instaweb Solutions. We have prepared an initial scope specification and milestone breakdown for your review. Let us know if you would like us to walk through the implementation schedule together.",
    },
    {
      title: "Milestone Testing & Demonstration",
      body: "Hello {name}, your development milestone is ready on our staging server for your review and acceptance testing. Please take a look and let us know your feedback so we can proceed to final deployment.",
    },
  ];

  const handleApplyTemplate = (tpl: string) => {
    const formatted = tpl.replace("{name}", clientName || "there");
    setCustomMessage(formatted);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTemplate(id);
    setTimeout(() => setCopiedTemplate(null), 2000);
  };

  const handleSelectClient = (enquiry: Enquiry) => {
    setClientName(enquiry.fullName);
    const raw = enquiry.phone.replace(/[^0-9]/g, "");
    const formatted = raw.startsWith("0")
      ? `254${raw.slice(1)}`
      : raw.startsWith("254")
      ? raw
      : `254${raw}`;
    setRecipientPhone(formatted);
    setCustomMessage(
      `Hello ${enquiry.fullName}, this is Caleb from Instaweb Solutions regarding your inquiry (${enquiry.reference}) for ${enquiry.service}. How can we assist you with your project?`
    );
  };

  const rawPhone = recipientPhone.replace(/[^0-9]/g, "");
  const formattedPhone = rawPhone.startsWith("0")
    ? `254${rawPhone.slice(1)}`
    : rawPhone.startsWith("254")
    ? rawPhone
    : `254${rawPhone}`;

  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(
    customMessage
  )}`;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#090E17]">
      <AdminHeader
        title="Direct Communications & WhatsApp Console"
        subtitle="Direct WhatsApp deep-linking, verified email dispatch status, and client response templates"
      />

      <div className="p-4 sm:p-6 lg:p-8 space-y-8 flex-1 max-w-7xl w-full mx-auto">
        {/* Verification Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-[#101B2B] border border-[#1D2D40] flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#087F5B]/20 text-[#087F5B] border border-[#087F5B]/30 flex-shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-sm text-white">
                  WhatsApp Direct Gateway
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#087F5B]/20 text-[#087F5B] font-mono text-[10px] font-bold">
                  OPERATIONAL
                </span>
              </div>
              <p className="text-xs text-[#AAB5C2] mt-1">
                WhatsApp Business deep-linking linked to your registered line:{" "}
                <span className="text-[#19B6A4] font-mono font-bold">+254 798 159 503</span>
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#101B2B] border border-[#1D2D40] flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#19B6A4]/20 text-[#19B6A4] border border-[#19B6A4]/30 flex-shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-sm text-white">
                  Email Forwarding Engine
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#19B6A4]/20 text-[#19B6A4] font-mono text-[10px] font-bold">
                  VERIFIED
                </span>
              </div>
              <p className="text-xs text-[#AAB5C2] mt-1">
                Inquiries sent to <span className="text-white font-mono">{siteConfig.email}</span> are
                forwarded to:{" "}
                <span className="text-[#C8A96B] font-mono font-bold">{siteConfig.recipientEmail}</span>
              </p>
            </div>
          </div>
        </div>

        {/* WhatsApp Quick Dispatcher & Template Generator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Dispatcher Form */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-[#101B2B] border border-[#1D2D40] space-y-5">
            <div>
              <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                <Send className="w-4 h-4 text-[#19B6A4]" />
                <span>Launch Direct Client WhatsApp Chat</span>
              </h3>
              <p className="text-xs text-[#AAB5C2]">
                Dispatch structured messages directly to any phone number or active client inquiry.
              </p>
            </div>

            {/* Quick Picker from Active Inquiries */}
            {enquiries.length > 0 && (
              <div>
                <label className="block text-xs font-mono text-[#AAB5C2] mb-1.5">
                  Pre-fill from Recent Client Inquiry:
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-2 bg-[#0A101D] border border-[#1D2D40] rounded-xl">
                  {enquiries.slice(0, 6).map((enq) => (
                    <button
                      key={enq.id}
                      type="button"
                      onClick={() => handleSelectClient(enq)}
                      className="px-2.5 py-1 rounded-lg bg-[#1D2D40] hover:bg-[#19B6A4] hover:text-[#101B2B] text-xs font-mono text-[#F7F6F2] transition-colors"
                    >
                      {enq.fullName} ({enq.reference})
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-[#AAB5C2] mb-1">
                  Client Full Name
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full px-3 py-2 bg-[#0A101D] border border-[#34465A] rounded-lg text-xs text-white focus:outline-none focus:border-[#19B6A4]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#AAB5C2] mb-1">
                  Recipient Phone Number
                </label>
                <input
                  type="text"
                  value={recipientPhone}
                  onChange={(e) => setRecipientPhone(e.target.value)}
                  placeholder="+254 7XX XXX XXX"
                  className="w-full px-3 py-2 bg-[#0A101D] border border-[#34465A] rounded-lg text-xs text-white focus:outline-none focus:border-[#19B6A4]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#AAB5C2] mb-1">
                WhatsApp Message Body
              </label>
              <textarea
                rows={5}
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Type your client follow-up message or select one of the engineering templates on the right..."
                className="w-full p-3 bg-[#0A101D] border border-[#34465A] rounded-xl text-xs text-white placeholder-[#526273] focus:outline-none focus:border-[#19B6A4] resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#AAB5C2]">
                Target: {formattedPhone ? `+${formattedPhone}` : "Enter number above"}
              </span>

              <a
                href={formattedPhone ? whatsappUrl : "#"}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!formattedPhone}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-heading font-bold text-xs transition-all ${
                  formattedPhone
                    ? "bg-[#087F5B] hover:bg-[#06684A] text-white shadow-glow cursor-pointer"
                    : "bg-[#1D2D40] text-[#526273] cursor-not-allowed"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open WhatsApp Chat</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Reusable Response Templates */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-[#101B2B] border border-[#1D2D40] space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C8A96B]" />
                <h3 className="font-heading font-bold text-sm text-white">
                  Engineering Response Templates
                </h3>
              </div>
              <p className="text-xs text-[#AAB5C2]">
                Click "Apply" to insert a template directly into the dispatcher.
              </p>

              <div className="space-y-3">
                {templates.map((tpl, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-[#0A101D] border border-[#1D2D40] space-y-2 hover:border-[#19B6A4]/40 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-heading font-bold text-[#F7F6F2]">
                        {tpl.title}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(tpl.body, `tpl-${i}`)}
                        className="text-[10px] font-mono text-[#AAB5C2] hover:text-white flex items-center gap-1"
                      >
                        {copiedTemplate === `tpl-${i}` ? (
                          <Check className="w-3 h-3 text-[#19B6A4]" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                        <span>{copiedTemplate === `tpl-${i}` ? "Copied" : "Copy"}</span>
                      </button>
                    </div>

                    <p className="text-[11px] text-[#AAB5C2] line-clamp-3 leading-relaxed font-sans">
                      {tpl.body}
                    </p>

                    <button
                      type="button"
                      onClick={() => handleApplyTemplate(tpl.body)}
                      className="text-xs font-mono font-semibold text-[#19B6A4] hover:underline"
                    >
                      Use Template →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
