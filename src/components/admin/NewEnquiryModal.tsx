"use client";

import React, { useState } from "react";
import { Enquiry } from "@/lib/enquiries-store";
import { X, Plus, Loader2, AlertCircle } from "lucide-react";

interface NewEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (newEnquiry: Enquiry) => void;
}

export function NewEnquiryModal({
  isOpen,
  onClose,
  onCreated,
}: NewEnquiryModalProps) {
  const [formData, setFormData] = useState<{
    fullName: string;
    email: string;
    phone: string;
    organization: string;
    service: string;
    description: string;
    budget: string;
    preferredContact: "WhatsApp" | "Email" | "Phone Call";
    priority: "low" | "medium" | "high" | "urgent";
  }>({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    service: "Custom Web Applications",
    description: "",
    budget: "KES 80,000 – KES 200,000",
    preferredContact: "WhatsApp",
    priority: "medium",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.description.trim()) {
      setError("Please fill in Client Name, Email, and Project Description.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        onCreated(data.data);
        onClose();
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          organization: "",
          service: "Custom Web Applications",
          description: "",
          budget: "KES 80,000 – KES 200,000",
          preferredContact: "WhatsApp",
          priority: "medium",
        });
      } else {
        setError(data.error || "Failed to create inquiry");
      }
    } catch (err) {
      console.error("Create enquiry error:", err);
      setError("Network error while creating inquiry");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#101B2B] border border-[#34465A] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="p-5 border-b border-[#1D2D40] bg-[#0A101D] flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-heading font-bold text-white">
              Log Direct Client Inquiry
            </h2>
            <p className="text-xs text-[#AAB5C2]">
              Record inquiries received via direct phone call, WhatsApp, or in-person consultation.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#1D2D40] text-[#AAB5C2] hover:text-white border border-[#34465A] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-950/40 border border-red-800/60 rounded-lg text-xs text-red-300">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-[#AAB5C2] mb-1">
                Client Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Samuel Mutua"
                className="w-full px-3 py-2 bg-[#0A101D] border border-[#34465A] rounded-lg text-xs text-white placeholder-[#526273] focus:outline-none focus:border-[#19B6A4]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#AAB5C2] mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="client@company.com"
                className="w-full px-3 py-2 bg-[#0A101D] border border-[#34465A] rounded-lg text-xs text-white placeholder-[#526273] focus:outline-none focus:border-[#19B6A4]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#AAB5C2] mb-1">
                Phone Number (WhatsApp)
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+254 7XX XXX XXX"
                className="w-full px-3 py-2 bg-[#0A101D] border border-[#34465A] rounded-lg text-xs text-white placeholder-[#526273] focus:outline-none focus:border-[#19B6A4]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#AAB5C2] mb-1">
                Organization / Company Name
              </label>
              <input
                type="text"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                placeholder="e.g. Nairobi Agro Ltd"
                className="w-full px-3 py-2 bg-[#0A101D] border border-[#34465A] rounded-lg text-xs text-white placeholder-[#526273] focus:outline-none focus:border-[#19B6A4]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#AAB5C2] mb-1">
                Service Category
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-3 py-2 bg-[#0A101D] border border-[#34465A] rounded-lg text-xs text-white focus:outline-none focus:border-[#19B6A4]"
              >
                <option value="Website Design & Development">Website Design & Development</option>
                <option value="Custom Web Applications">Custom Web Applications</option>
                <option value="E-Commerce Development">E-Commerce Development</option>
                <option value="Business Management Systems">Business Management Systems</option>
                <option value="API & Systems Integration">API & Systems Integration</option>
                <option value="Website Maintenance & Support">Website Maintenance & Support</option>
                <option value="Other / Consultative Architecture">Other / Consultative Architecture</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#AAB5C2] mb-1">
                Estimated Budget Range
              </label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-3 py-2 bg-[#0A101D] border border-[#34465A] rounded-lg text-xs text-white focus:outline-none focus:border-[#19B6A4]"
              >
                <option value="Flexible / To Be Estimated">Flexible / To Be Estimated</option>
                <option value="KES 30,000 – KES 80,000">KES 30,000 – KES 80,000</option>
                <option value="KES 80,000 – KES 200,000">KES 80,000 – KES 200,000</option>
                <option value="KES 200,000 – KES 500,000">KES 200,000 – KES 500,000</option>
                <option value="KES 500,000+">KES 500,000+</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#AAB5C2] mb-1">
                Preferred Channel
              </label>
              <select
                value={formData.preferredContact}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    preferredContact: e.target.value as "WhatsApp" | "Email" | "Phone Call",
                  })
                }
                className="w-full px-3 py-2 bg-[#0A101D] border border-[#34465A] rounded-lg text-xs text-white focus:outline-none focus:border-[#19B6A4]"
              >
                <option value="WhatsApp">WhatsApp</option>
                <option value="Email">Email</option>
                <option value="Phone Call">Phone Call</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#AAB5C2] mb-1">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    priority: e.target.value as "low" | "medium" | "high" | "urgent",
                  })
                }
                className="w-full px-3 py-2 bg-[#0A101D] border border-[#34465A] rounded-lg text-xs text-white focus:outline-none focus:border-[#19B6A4]"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-[#AAB5C2] mb-1">
              Project Description & Requirements *
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide system requirements, deliverables, or notes from client phone call..."
              className="w-full p-3 bg-[#0A101D] border border-[#34465A] rounded-xl text-xs text-white placeholder-[#526273] focus:outline-none focus:border-[#19B6A4] resize-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3 border-t border-[#1D2D40]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[#1D2D40] hover:bg-[#25364A] text-[#AAB5C2] hover:text-white text-xs font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-lg bg-[#19B6A4] hover:bg-[#15A392] disabled:opacity-50 text-[#101B2B] font-heading font-bold text-xs flex items-center gap-1.5 shadow-glow transition-all"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Logging...</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create Inquiry Record</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
