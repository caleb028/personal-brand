"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { EnquiryDetailModal } from "@/components/admin/EnquiryDetailModal";
import { NewEnquiryModal } from "@/components/admin/NewEnquiryModal";
import { Enquiry } from "@/lib/enquiries-store";
import { sanitizeCsvCell } from "@/lib/sanitize-csv";
import {
  Inbox,
  Search,
  Filter,
  Download,
  PlusCircle,
  MessageSquare,
  Mail,
  Phone,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  Building,
  RefreshCw,
  Loader2,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react";

function EnquiriesManagerContent() {
  const searchParams = useSearchParams();
  const initialStatus = searchParams.get("status") || "all";

  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [globalStats, setGlobalStats] = useState<{
    total: number;
    newCount: number;
    inProgress: number;
    contacted: number;
    closed: number;
    unread: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeStatus, setActiveStatus] = useState<string>(initialStatus);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");

  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  const fetchEnquiries = async (isBackground = false) => {
    if (!isBackground) setIsLoading(true);
    try {
      const url = new URL("/api/admin/enquiries", window.location.origin);
      if (activeStatus !== "all") url.searchParams.set("status", activeStatus);
      if (selectedService !== "all") url.searchParams.set("service", selectedService);
      if (searchQuery.trim()) url.searchParams.set("search", searchQuery.trim());

      const [enquiriesRes, statsRes] = await Promise.all([
        fetch(url.toString()),
        fetch("/api/admin/stats"),
      ]);

      if (enquiriesRes.ok) {
        const data = await enquiriesRes.json();
        setEnquiries(data.data || []);
      }
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setGlobalStats(statsData.stats);
      }
    } catch (err) {
      console.error("Failed to load enquiries:", err);
    } finally {
      if (!isBackground) setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries(false);

    // Live continuous polling every 3.5 seconds
    const interval = setInterval(() => {
      fetchEnquiries(true);
    }, 3500);

    const handleSync = () => fetchEnquiries(true);
    window.addEventListener("focus", handleSync);
    document.addEventListener("visibilitychange", handleSync);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", handleSync);
      document.removeEventListener("visibilitychange", handleSync);
    };
  }, [activeStatus, selectedService]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchEnquiries(false);
  };

  const handleInlineStatusChange = async (
    id: string,
    newStatus: Enquiry["status"],
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          auditAction: `Status moved to ${newStatus.toUpperCase()}`,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setEnquiries((prev) =>
          prev.map((item) => (item.id === id ? data.data : item))
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleEnquiryUpdated = (updated: Enquiry) => {
    setEnquiries((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
    setSelectedEnquiry(updated);
  };

  const handleEnquiryDeleted = (id: string) => {
    setEnquiries((prev) => prev.filter((item) => item.id !== id));
    setSelectedEnquiry(null);
  };

  // Status Filter Counts (accurate across all records)
  const statusCounts = {
    all: globalStats?.total ?? enquiries.length,
    new: globalStats?.newCount ?? enquiries.filter((e) => e.status === "new").length,
    in_progress: globalStats?.inProgress ?? enquiries.filter((e) => e.status === "in_progress").length,
    contacted: globalStats?.contacted ?? enquiries.filter((e) => e.status === "contacted").length,
    closed: globalStats?.closed ?? enquiries.filter((e) => e.status === "closed").length,
  };

  // CSV Exporter
  const handleExportCSV = () => {
    const headers = [
      "Reference",
      "Full Name",
      "Email",
      "Phone",
      "Organization",
      "Service",
      "Budget",
      "Preferred Contact",
      "Status",
      "Priority",
      "Date Submitted",
    ];

    const rows = enquiries.map((e) => [
      sanitizeCsvCell(e.reference),
      sanitizeCsvCell(e.fullName),
      sanitizeCsvCell(e.email),
      sanitizeCsvCell(e.phone),
      sanitizeCsvCell(e.organization || ""),
      sanitizeCsvCell(e.service),
      sanitizeCsvCell(e.budget),
      sanitizeCsvCell(e.preferredContact),
      sanitizeCsvCell(e.status),
      sanitizeCsvCell(e.priority),
      sanitizeCsvCell(new Date(e.createdAt).toLocaleString()),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `instaweb-enquiries-${activeStatus}-${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#090E17]">
      <AdminHeader
        title="Enquiries Management Console"
        subtitle="Review, respond, track milestones and convert inbound client requirements"
        onOpenNewInquiry={() => setIsNewModalOpen(true)}
      />

      <div className="p-4 sm:p-6 lg:p-8 space-y-6 flex-1 max-w-7xl w-full mx-auto">
        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1D2D40] pb-3">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {[
              { id: "all", label: "All Inquiries", count: statusCounts.all },
              { id: "new", label: "New (Unattended)", count: statusCounts.new },
              { id: "in_progress", label: "In Progress", count: statusCounts.in_progress },
              { id: "contacted", label: "Contacted", count: statusCounts.contacted },
              { id: "closed", label: "Closed / Won", count: statusCounts.closed },
            ].map((tab) => {
              const isActive = activeStatus === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveStatus(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                    isActive
                      ? "bg-[#19B6A4] text-[#101B2B] font-bold shadow-glow"
                      : "bg-[#101B2B] text-[#AAB5C2] hover:text-white border border-[#1D2D40]"
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span
                      className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                        isActive
                          ? "bg-[#101B2B] text-[#19B6A4]"
                          : tab.id === "new" && tab.count > 0
                          ? "bg-[#FF2A4D] text-white"
                          : "bg-[#1D2D40] text-[#AAB5C2]"
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-[10px] font-mono text-[#19B6A4] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#19B6A4] animate-ping" />
              <span>LIVE AUTO-SYNC</span>
            </span>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#101B2B] hover:bg-[#1D2D40] text-[#F7F6F2] border border-[#1D2D40] text-xs font-mono transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#19B6A4]" />
              <span>Export</span>
            </button>
            <button
              onClick={() => fetchEnquiries(false)}
              className="p-1.5 rounded-lg bg-[#101B2B] hover:bg-[#1D2D40] text-[#AAB5C2] hover:text-white border border-[#1D2D40] text-xs transition-colors"
              title="Refresh Inquiries"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex-1 max-w-md"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by client name, email, phone, org or reference..."
              className="w-full pl-9 pr-4 py-2 bg-[#101B2B] border border-[#1D2D40] rounded-xl text-xs text-white placeholder-[#526273] focus:outline-none focus:border-[#19B6A4]"
            />
            <Search className="w-4 h-4 text-[#AAB5C2] absolute left-3 top-2.5 pointer-events-none" />
          </form>

          <div className="flex flex-wrap items-center gap-2.5">
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="px-3 py-2 bg-[#101B2B] border border-[#1D2D40] rounded-xl text-xs font-mono text-white focus:outline-none focus:border-[#19B6A4]"
            >
              <option value="all">All Services</option>
              <option value="Website Design & Development">Website Design</option>
              <option value="Custom Web Applications">Custom Web Applications</option>
              <option value="E-Commerce Development">E-Commerce Development</option>
              <option value="Business Management Systems">Business Systems</option>
              <option value="API & Systems Integration">API & Systems Integration</option>
            </select>
          </div>
        </div>

        {/* Enquiries List Table */}
        <div className="rounded-2xl bg-[#101B2B] border border-[#1D2D40] overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0A101D] text-[#AAB5C2] font-mono uppercase text-[10px] border-b border-[#1D2D40]">
                <tr>
                  <th className="py-3 px-4">Inquiry Ref & Client</th>
                  <th className="py-3 px-4">Contact Info</th>
                  <th className="py-3 px-4">Service Required</th>
                  <th className="py-3 px-4">Budget Range</th>
                  <th className="py-3 px-4">Status Transition</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Direct Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1D2D40] font-sans">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-[#AAB5C2]">
                      <Loader2 className="w-6 h-6 text-[#19B6A4] animate-spin mx-auto mb-2" />
                      <span>Retrieving inquiries from database...</span>
                    </td>
                  </tr>
                ) : enquiries.length > 0 ? (
                  enquiries.map((enquiry) => {
                    const rawPhone = enquiry.phone.replace(/[^0-9]/g, "");
                    const formattedPhone = rawPhone.startsWith("0")
                      ? `254${rawPhone.slice(1)}`
                      : rawPhone.startsWith("254")
                      ? rawPhone
                      : `254${rawPhone}`;

                    return (
                      <tr
                        key={enquiry.id}
                        onClick={() => {
                          setSelectedEnquiry(enquiry);
                          setIsDetailOpen(true);
                        }}
                        className="hover:bg-[#1D2D40]/50 transition-colors cursor-pointer group"
                      >
                        {/* Reference & Client Name */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-start gap-2.5">
                            {!enquiry.isRead && (
                              <span
                                className="w-2 h-2 rounded-full bg-[#19B6A4] animate-pulse mt-1 flex-shrink-0"
                                title="Unread Inquiry"
                              />
                            )}
                            <div>
                              <div className="font-bold text-white group-hover:text-[#19B6A4] transition-colors flex items-center gap-1.5">
                                <span>{enquiry.fullName}</span>
                                {enquiry.priority === "urgent" && (
                                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-950 text-red-400 font-mono font-bold">
                                    URGENT
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] font-mono text-[#AAB5C2]">
                                {enquiry.reference}
                              </div>
                              {enquiry.organization && (
                                <div className="text-[11px] text-[#AAB5C2] flex items-center gap-1 mt-0.5">
                                  <Building className="w-3 h-3 text-[#C8A96B]" />
                                  <span>{enquiry.organization}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Unmasked Contact Info with Quick Direct Actions */}
                        <td className="py-3.5 px-4">
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="space-y-1"
                          >
                            <a
                              href={`mailto:${enquiry.email}`}
                              className="text-white hover:text-[#19B6A4] font-medium flex items-center gap-1.5"
                            >
                              <Mail className="w-3.5 h-3.5 text-[#19B6A4]" />
                              <span>{enquiry.email}</span>
                            </a>
                            {enquiry.phone && (
                              <a
                                href={`https://wa.me/${formattedPhone}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#AAB5C2] hover:text-[#19B6A4] font-mono text-[11px] flex items-center gap-1.5"
                              >
                                <Phone className="w-3.5 h-3.5 text-[#087F5B]" />
                                <span>{enquiry.phone}</span>
                              </a>
                            )}
                          </div>
                        </td>

                        {/* Service */}
                        <td className="py-3.5 px-4 font-medium text-[#F7F6F2]">
                          <div>{enquiry.service}</div>
                          <div className="text-[11px] text-[#AAB5C2] line-clamp-1 max-w-[200px]">
                            {enquiry.description}
                          </div>
                        </td>

                        {/* Budget */}
                        <td className="py-3.5 px-4 font-mono font-semibold text-[#C8A96B]">
                          {enquiry.budget || "To be estimated"}
                        </td>

                        {/* Inline Status Dropdown */}
                        <td
                          className="py-3.5 px-4"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <select
                            value={enquiry.status}
                            onChange={(e) =>
                              handleInlineStatusChange(
                                enquiry.id,
                                e.target.value as Enquiry["status"],
                                e as any
                              )
                            }
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold uppercase border focus:outline-none ${
                              enquiry.status === "new"
                                ? "bg-red-950/60 text-[#FF2A4D] border-red-800/60"
                                : enquiry.status === "in_progress"
                                ? "bg-amber-950/60 text-[#FFB300] border-amber-800/60"
                                : enquiry.status === "contacted"
                                ? "bg-blue-950/60 text-[#00C2FF] border-blue-800/60"
                                : "bg-emerald-950/60 text-[#19B6A4] border-emerald-800/60"
                            }`}
                          >
                            <option value="new">NEW</option>
                            <option value="in_progress">IN PROGRESS</option>
                            <option value="contacted">CONTACTED</option>
                            <option value="closed">CLOSED</option>
                            <option value="archived">ARCHIVED</option>
                          </select>
                        </td>

                        {/* Submission Date */}
                        <td className="py-3.5 px-4 font-mono text-[#AAB5C2] text-[11px]">
                          {new Date(enquiry.createdAt).toLocaleDateString()}
                        </td>

                        {/* Actions */}
                        <td
                          className="py-3.5 px-4 text-right"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center justify-end gap-1.5">
                            {enquiry.phone && (
                              <a
                                href={`https://wa.me/${formattedPhone}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Chat on WhatsApp"
                                className="p-1.5 rounded-lg bg-[#087F5B]/20 hover:bg-[#087F5B] text-[#087F5B] hover:text-white transition-colors"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                              </a>
                            )}
                            <button
                              onClick={() => {
                                setSelectedEnquiry(enquiry);
                                setIsDetailOpen(true);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-[#1D2D40] hover:bg-[#19B6A4] hover:text-[#101B2B] text-white font-mono text-[11px] transition-colors"
                            >
                              Inspect
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-[#AAB5C2]">
                      {searchQuery || activeStatus !== "all" || selectedService !== "all" ? (
                        <div>
                          <Inbox className="w-8 h-8 text-[#34465A] mx-auto mb-2" />
                          <p className="text-sm font-medium text-[#F7F6F2]">
                            No inquiries found matching current filters
                          </p>
                          <button
                            onClick={() => {
                              setActiveStatus("all");
                              setSelectedService("all");
                              setSearchQuery("");
                            }}
                            className="mt-2 text-xs font-mono text-[#19B6A4] hover:underline"
                          >
                            Reset Filters
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center space-y-3 max-w-md mx-auto">
                          <div className="w-10 h-10 rounded-2xl bg-[#19B6A4]/10 border border-[#19B6A4]/30 flex items-center justify-center text-[#19B6A4]">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#19B6A4] animate-ping" />
                          </div>
                          <div className="text-sm font-heading font-bold text-white">
                            Real-Time Listener Active
                          </div>
                          <p className="text-xs text-[#AAB5C2] leading-relaxed">
                            Awaiting customer inquiries. When a visitor submits an inquiry on the public website, it will stream into this console automatically.
                          </p>
                          <div className="pt-2 flex items-center gap-3">
                            <a
                              href="/contact"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3.5 py-1.5 rounded-lg bg-[#19B6A4]/15 hover:bg-[#19B6A4]/25 border border-[#19B6A4]/40 text-[#19B6A4] font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors"
                            >
                              <span>Open Public Contact Page</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                            <button
                              onClick={() => setIsNewModalOpen(true)}
                              className="px-3.5 py-1.5 rounded-lg bg-[#1D2D40] hover:bg-[#25364A] border border-[#34465A] text-white font-mono text-xs transition-colors"
                            >
                              Log Inquiry Manually
                            </button>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      <EnquiryDetailModal
        enquiry={selectedEnquiry}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onUpdate={handleEnquiryUpdated}
        onDelete={handleEnquiryDeleted}
      />

      {/* New Inquiry Modal */}
      <NewEnquiryModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onCreated={() => fetchEnquiries()}
      />
    </div>
  );
}

export default function EnquiriesManagerPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#090E17] flex items-center justify-center text-white">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 text-[#19B6A4] animate-spin" />
            <span className="text-xs font-mono text-[#AAB5C2]">
              Loading inquiries console...
            </span>
          </div>
        </div>
      }
    >
      <EnquiriesManagerContent />
    </Suspense>
  );
}
