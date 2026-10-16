"use client";

import React, { useState } from "react";
import { Enquiry } from "@/lib/enquiries-store";
import {
  X,
  Mail,
  Phone,
  Building,
  Calendar,
  Clock,
  ArrowUpRight,
  MessageSquare,
  Send,
  Trash2,
  CheckCircle,
  AlertCircle,
  FileText,
  User,
  Shield,
  Layers,
  DollarSign,
  Plus,
  Loader2,
} from "lucide-react";

interface EnquiryDetailModalProps {
  enquiry: Enquiry | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updated: Enquiry) => void;
  onDelete: (id: string) => void;
}

export function EnquiryDetailModal({
  enquiry,
  isOpen,
  onClose,
  onUpdate,
  onDelete,
}: EnquiryDetailModalProps) {
  const [newNote, setNewNote] = useState("");
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen || !enquiry) return null;

  const handleStatusChange = async (newStatus: Enquiry["status"]) => {
    setIsUpdatingStatus(true);
    try {
      const res = await fetch(`/api/admin/enquiries/${enquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          isRead: true,
          auditAction: `Status changed to ${newStatus.replace("_", " ").toUpperCase()}`,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        onUpdate(data.data);
      }
    } catch (err) {
      console.error("Status update error:", err);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handlePriorityChange = async (newPriority: Enquiry["priority"]) => {
    try {
      const res = await fetch(`/api/admin/enquiries/${enquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priority: newPriority,
          auditAction: `Priority updated to ${newPriority.toUpperCase()}`,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        onUpdate(data.data);
      }
    } catch (err) {
      console.error("Priority update error:", err);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    setIsSubmittingNote(true);
    try {
      const res = await fetch(`/api/admin/enquiries/${enquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newNote: newNote.trim(),
          auditAction: "Added internal note",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        onUpdate(data.data);
        setNewNote("");
      }
    } catch (err) {
      console.error("Add note error:", err);
    } finally {
      setIsSubmittingNote(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete inquiry ${enquiry.reference} from ${enquiry.fullName}?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/enquiries/${enquiry.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        onDelete(enquiry.id);
        onClose();
      }
    } catch (err) {
      console.error("Delete inquiry error:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  // Clean raw phone for WhatsApp deep-link
  const rawPhone = enquiry.phone.replace(/[^0-9]/g, "");
  const formattedWhatsAppNumber = rawPhone.startsWith("0")
    ? `254${rawPhone.slice(1)}`
    : rawPhone.startsWith("254")
    ? rawPhone
    : `254${rawPhone}`;

  const whatsappMessage = encodeURIComponent(
    `Hello ${enquiry.fullName}, this is Caleb from Instaweb Solutions regarding your inquiry (${enquiry.reference}) for ${enquiry.service}. How can we assist you with your project?`
  );

  const emailSubject = encodeURIComponent(
    `Follow-up: Project Inquiry [${enquiry.reference}] - ${enquiry.service}`
  );
  const emailBody = encodeURIComponent(
    `Dear ${enquiry.fullName},\n\nThank you for reaching out to Instaweb Solutions Ltd regarding your inquiry for ${enquiry.service}.\n\nWe have reviewed your requirements:\n"${enquiry.description}"\n\nWe would be glad to arrange a technical discovery discussion to outline the architecture, deliverables, and timeline.\n\nBest regards,\nCaleb Ngiciri\nInstaweb Solutions Ltd\nPhone/WhatsApp: +254 798 159 503\nhttps://instawebsolutions.com`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#101B2B] border border-[#34465A] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="p-5 border-b border-[#1D2D40] bg-[#0A101D] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#1D2D40] border border-[#34465A] text-[#19B6A4] font-bold">
              {enquiry.reference}
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-heading font-bold text-white">
                {enquiry.fullName}
              </h2>
              {enquiry.organization && (
                <p className="text-xs text-[#AAB5C2] flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-[#C8A96B]" />
                  <span>{enquiry.organization}</span>
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              title="Delete Enquiry"
              className="p-2 rounded-lg bg-[#1D2D40] hover:bg-red-950/40 text-[#AAB5C2] hover:text-red-400 border border-[#34465A] transition-colors"
            >
              {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#1D2D40] text-[#AAB5C2] hover:text-white border border-[#34465A] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body Scrollable */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Status & Priority Control Ribbon */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-[#0A101D] border border-[#1D2D40]">
            <div>
              <label className="block text-[11px] font-mono uppercase text-[#AAB5C2] mb-1.5">
                Inquiry Status
              </label>
              <select
                value={enquiry.status}
                disabled={isUpdatingStatus}
                onChange={(e) => handleStatusChange(e.target.value as Enquiry["status"])}
                className="w-full px-3 py-2 bg-[#101B2B] border border-[#34465A] rounded-lg text-xs font-mono font-semibold text-white focus:outline-none focus:border-[#19B6A4]"
              >
                <option value="new">● NEW (Unattended)</option>
                <option value="in_progress">● IN PROGRESS (Evaluating)</option>
                <option value="contacted">● CONTACTED (Discussing)</option>
                <option value="closed">● CLOSED (Converted/Completed)</option>
                <option value="archived">● ARCHIVED</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-[#AAB5C2] mb-1.5">
                Priority Level
              </label>
              <select
                value={enquiry.priority}
                onChange={(e) => handlePriorityChange(e.target.value as Enquiry["priority"])}
                className="w-full px-3 py-2 bg-[#101B2B] border border-[#34465A] rounded-lg text-xs font-mono font-semibold text-white focus:outline-none focus:border-[#19B6A4]"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="urgent">🔥 Urgent Priority</option>
              </select>
            </div>
          </div>

          {/* Quick Communication Actions Bar */}
          <div className="flex flex-wrap items-center gap-3">
            {enquiry.phone && (
              <a
                href={`https://wa.me/${formattedWhatsAppNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[140px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#087F5B] hover:bg-[#06684A] text-white font-heading font-semibold text-xs shadow-md transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
              </a>
            )}

            <a
              href={`mailto:${enquiry.email}?subject=${emailSubject}&body=${emailBody}`}
              className="flex-1 min-w-[140px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#1D2D40] hover:bg-[#25364A] text-white font-heading font-semibold text-xs border border-[#34465A] transition-colors"
            >
              <Mail className="w-4 h-4 text-[#19B6A4]" />
              <span>Compose Email</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
            </a>

            {enquiry.phone && (
              <a
                href={`tel:${enquiry.phone}`}
                className="flex items-center gap-2 py-2.5 px-4 rounded-xl bg-[#1D2D40] hover:bg-[#25364A] text-[#F7F6F2] font-heading font-semibold text-xs border border-[#34465A] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C8A96B]" />
                <span>Direct Call</span>
              </a>
            )}
          </div>

          {/* Contact & Project Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Client Profile Card */}
            <div className="p-4 rounded-xl bg-[#0A101D] border border-[#1D2D40] space-y-3">
              <h3 className="text-xs font-mono font-bold text-[#19B6A4] uppercase tracking-wider flex items-center gap-2">
                <User className="w-3.5 h-3.5" />
                <span>Client Coordinates</span>
              </h3>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[#AAB5C2] block text-[10px] font-mono">Email Address:</span>
                  <a
                    href={`mailto:${enquiry.email}`}
                    className="text-[#F7F6F2] hover:text-[#19B6A4] font-medium break-all"
                  >
                    {enquiry.email}
                  </a>
                </div>

                <div>
                  <span className="text-[#AAB5C2] block text-[10px] font-mono">Direct Phone:</span>
                  <span className="text-[#F7F6F2] font-mono font-medium">
                    {enquiry.phone || "Not provided"}
                  </span>
                </div>

                <div>
                  <span className="text-[#AAB5C2] block text-[10px] font-mono">Preferred Channel:</span>
                  <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-[#1D2D40] border border-[#34465A] text-[#C8A96B] font-mono text-[11px]">
                    {enquiry.preferredContact}
                  </span>
                </div>
              </div>
            </div>

            {/* Scope & Budget Card */}
            <div className="p-4 rounded-xl bg-[#0A101D] border border-[#1D2D40] space-y-3">
              <h3 className="text-xs font-mono font-bold text-[#C8A96B] uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-3.5 h-3.5" />
                <span>Project Parameters</span>
              </h3>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[#AAB5C2] block text-[10px] font-mono">Service Required:</span>
                  <span className="text-[#F7F6F2] font-semibold">
                    {enquiry.service}
                  </span>
                </div>

                <div>
                  <span className="text-[#AAB5C2] block text-[10px] font-mono">Allocated Budget:</span>
                  <span className="text-[#19B6A4] font-mono font-bold">
                    {enquiry.budget || "To be estimated"}
                  </span>
                </div>

                <div>
                  <span className="text-[#AAB5C2] block text-[10px] font-mono">Submitted At:</span>
                  <span className="text-[#AAB5C2] font-mono">
                    {new Date(enquiry.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="p-4 rounded-xl bg-[#0A101D] border border-[#1D2D40] space-y-2">
            <h3 className="text-xs font-mono font-bold text-[#AAB5C2] uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-[#19B6A4]" />
              <span>Project Requirements & Scope Description</span>
            </h3>
            <p className="text-sm text-[#F7F6F2] leading-relaxed whitespace-pre-wrap font-sans bg-[#101B2B] p-3.5 rounded-lg border border-[#34465A]">
              {enquiry.description}
            </p>
          </div>

          {/* Internal Notes Section */}
          <div className="p-4 rounded-xl bg-[#0A101D] border border-[#1D2D40] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold text-[#19B6A4] uppercase tracking-wider flex items-center gap-2">
                <Shield className="w-3.5 h-3.5" />
                <span>Internal Developer & Admin Notes ({enquiry.notes.length})</span>
              </h3>
            </div>

            {/* Note Input */}
            <form onSubmit={handleAddNote} className="space-y-2">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Log internal note, quote sent, meeting summary, or next action step..."
                rows={2}
                className="w-full p-3 bg-[#101B2B] border border-[#34465A] rounded-xl text-xs text-white placeholder-[#526273] focus:outline-none focus:border-[#19B6A4] transition-all resize-none"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmittingNote || !newNote.trim()}
                  className="px-3 py-1.5 rounded-lg bg-[#19B6A4] hover:bg-[#15A392] disabled:opacity-40 text-[#101B2B] font-heading font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  {isSubmittingNote ? <Loader2 className="w-3 h-3 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                  <span>Save Note</span>
                </button>
              </div>
            </form>

            {/* Notes List */}
            {enquiry.notes.length > 0 ? (
              <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                {enquiry.notes.map((note) => (
                  <div
                    key={note.id}
                    className="p-3 rounded-lg bg-[#101B2B] border border-[#34465A] text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#AAB5C2]">
                      <span className="font-bold text-[#19B6A4]">{note.author}</span>
                      <span>{new Date(note.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="text-[#F7F6F2] font-sans leading-relaxed">{note.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#526273] font-mono italic">
                No internal notes recorded yet. Add updates above.
              </p>
            )}
          </div>

          {/* Audit History Timeline */}
          {enquiry.history && enquiry.history.length > 0 && (
            <div className="p-4 rounded-xl bg-[#0A101D] border border-[#1D2D40] space-y-2">
              <h4 className="text-[11px] font-mono font-bold text-[#AAB5C2] uppercase">
                Activity Audit Log
              </h4>
              <div className="space-y-1.5 text-[11px] font-mono text-[#AAB5C2]">
                {enquiry.history.map((h) => (
                  <div key={h.id} className="flex items-center justify-between border-b border-[#1D2D40] pb-1">
                    <span className="text-[#F7F6F2]">{h.action}</span>
                    <span className="text-[#526273]">{new Date(h.timestamp).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
