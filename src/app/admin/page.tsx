"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { EnquiryDetailModal } from "@/components/admin/EnquiryDetailModal";
import { NewEnquiryModal } from "@/components/admin/NewEnquiryModal";
import { Enquiry } from "@/lib/enquiries-store";
import { sanitizeCsvCell } from "@/lib/sanitize-csv";
import {
  Inbox,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  MessageSquare,
  Mail,
  ArrowRight,
  Layers,
  Shield,
  Download,
  PlusCircle,
  Filter,
  Eye,
  RefreshCw,
  Loader2,
  Calendar,
  Building,
  Sparkles,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<{
    total: number;
    newCount: number;
    inProgress: number;
    contacted: number;
    closed: number;
    unread: number;
    serviceBreakdown: Record<string, number>;
    recent: Enquiry[];
  } | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // Real-time live synchronization state
  const previousTotalRef = React.useRef<number | null>(null);
  const [newInquiryAlert, setNewInquiryAlert] = useState<Enquiry | null>(null);
  const [lastSyncTime, setLastSyncTime] = useState<Date>(new Date());

  const fetchStats = async (isBackground = false) => {
    if (!isBackground) setIsLoading(true);
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        const data = await res.json();
        const incomingStats = data.stats;

        // Detect new incoming customer inquiry in real-time
        if (
          previousTotalRef.current !== null &&
          incomingStats.total > previousTotalRef.current &&
          incomingStats.recent &&
          incomingStats.recent.length > 0
        ) {
          const newest = incomingStats.recent[0];
          setNewInquiryAlert(newest);

          // Subtle audio notification chime using Web Audio API
          try {
            const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(587.33, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
            gain.gain.setValueAtTime(0.15, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.3);
          } catch {
            // Audio policy fallback
          }
        }

        previousTotalRef.current = incomingStats.total;
        setStats(incomingStats);
        setLastSyncTime(new Date());
      }
    } catch (err) {
      console.error("Failed to load dashboard stats:", err);
    } finally {
      if (!isBackground) setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats(false);

    // Live continuous polling every 3.5 seconds
    const interval = setInterval(() => {
      fetchStats(true);
    }, 3500);

    // Immediate sync on window focus & document visibility
    const handleSync = () => fetchStats(true);
    window.addEventListener("focus", handleSync);
    document.addEventListener("visibilitychange", handleSync);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", handleSync);
      document.removeEventListener("visibilitychange", handleSync);
    };
  }, []);

  const handleEnquiryUpdated = (updated: Enquiry) => {
    setSelectedEnquiry(updated);
    fetchStats(true);
  };

  const handleEnquiryDeleted = () => {
    setSelectedEnquiry(null);
    fetchStats(true);
  };

  // CSV Exporter
  const handleExportCSV = async () => {
    try {
      const res = await fetch("/api/admin/enquiries");
      if (!res.ok) return;
      const data = await res.json();
      const enquiries: Enquiry[] = data.data || [];

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
        `instaweb-enquiries-export-${new Date().toISOString().slice(0, 10)}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Export error:", err);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#090E17]">
      <AdminHeader
        title="Operations Overview"
        subtitle="Live metrics, client inquiries pipeline, and active software initiatives"
        onOpenNewInquiry={() => setIsNewModalOpen(true)}
      />

      <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 flex-1 max-w-7xl w-full mx-auto">
        {/* Real-time Incoming Inquiry Notification Banner */}
        {newInquiryAlert && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#19B6A4]/20 via-[#101B2B] to-[#C8A96B]/20 border-2 border-[#19B6A4] shadow-glow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-pulse">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-[#19B6A4] text-[#101B2B] flex-shrink-0">
                <Sparkles className="w-5 h-5 animate-spin" />
              </span>
              <div>
                <div className="text-[11px] font-mono font-bold text-[#19B6A4] uppercase tracking-wider flex items-center gap-2">
                  <span>● Live Customer Inquiry Received Just Now!</span>
                  <span className="text-white">({newInquiryAlert.reference})</span>
                </div>
                <p className="text-sm font-heading font-bold text-white">
                  {newInquiryAlert.fullName} •{" "}
                  <span className="text-[#C8A96B] font-mono">{newInquiryAlert.service}</span>
                  {newInquiryAlert.organization ? ` (${newInquiryAlert.organization})` : ""}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => {
                  setSelectedEnquiry(newInquiryAlert);
                  setIsDetailOpen(true);
                  setNewInquiryAlert(null);
                }}
                className="px-4 py-2 rounded-xl bg-[#19B6A4] hover:bg-[#15A392] text-[#101B2B] font-heading font-bold text-xs shadow-glow transition-all"
              >
                Inspect Inquiry →
              </button>
              <button
                onClick={() => setNewInquiryAlert(null)}
                className="px-3 py-2 rounded-xl bg-[#1D2D40] hover:bg-[#25364A] text-[#AAB5C2] text-xs font-mono"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Top Operational Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#101B2B] border border-[#1D2D40] shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#19B6A4]/15 border border-[#19B6A4]/30 flex items-center justify-center text-[#19B6A4]">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-heading font-bold text-white flex items-center gap-2">
                <span>Operations Dashboard</span>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[#19B6A4] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#19B6A4] animate-ping" />
                  <span>LIVE AUTO-SYNC</span>
                </span>
              </div>
              <p className="text-xs text-[#AAB5C2]">
                Inquiries securely routed to{" "}
                <span className="text-[#F7F6F2] font-mono">calebngiciri075@gmail.com</span>
                <span className="mx-1.5 text-[#526273]">•</span>
                <span className="font-mono text-[11px] text-[#19B6A4]">
                  Synced {lastSyncTime.toLocaleTimeString()}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => fetchStats(false)}
              title="Refresh Data"
              className="p-2 rounded-lg bg-[#1D2D40] hover:bg-[#25364A] text-[#AAB5C2] hover:text-white border border-[#34465A] text-xs transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#1D2D40] hover:bg-[#25364A] text-[#F7F6F2] border border-[#34465A] text-xs font-mono transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#19B6A4]" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => setIsNewModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#19B6A4] hover:bg-[#15A392] text-[#101B2B] font-heading font-bold text-xs shadow-glow transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Log Inquiry</span>
            </button>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Inquiries */}
          <div className="p-5 rounded-2xl bg-[#101B2B] border border-[#1D2D40] hover:border-[#19B6A4]/50 transition-all duration-200">
            <div className="flex items-center justify-between text-xs text-[#AAB5C2] font-mono mb-2">
              <span>TOTAL INQUIRIES</span>
              <Inbox className="w-4 h-4 text-[#19B6A4]" />
            </div>
            <div className="text-3xl font-heading font-extrabold text-white">
              {isLoading ? "..." : stats?.total ?? 0}
            </div>
            <div className="mt-2 text-[11px] font-mono text-[#AAB5C2] flex items-center gap-1">
              <span className="text-[#19B6A4] font-bold">
                {stats && stats.total > 0 ? "100%" : "0%"}
              </span>
              <span>
                {stats && stats.total > 0 ? "Delivered to Target Email" : "Waiting for website submissions"}
              </span>
            </div>
          </div>

          {/* New / Action Required */}
          <div className="p-5 rounded-2xl bg-[#101B2B] border border-[#1D2D40] hover:border-[#FF2A4D]/50 transition-all duration-200">
            <div className="flex items-center justify-between text-xs text-[#AAB5C2] font-mono mb-2">
              <span>UNATTENDED (NEW)</span>
              <AlertCircle className="w-4 h-4 text-[#FF2A4D]" />
            </div>
            <div className="text-3xl font-heading font-extrabold text-[#FF2A4D]">
              {isLoading ? "..." : stats?.newCount ?? 0}
            </div>
            <div className="mt-2 text-[11px] font-mono text-[#AAB5C2]">
              {stats?.unread ?? 0} unread records requiring attention
            </div>
          </div>

          {/* In Progress */}
          <div className="p-5 rounded-2xl bg-[#101B2B] border border-[#1D2D40] hover:border-[#FFB300]/50 transition-all duration-200">
            <div className="flex items-center justify-between text-xs text-[#AAB5C2] font-mono mb-2">
              <span>ACTIVE DISCUSSIONS</span>
              <Clock className="w-4 h-4 text-[#FFB300]" />
            </div>
            <div className="text-3xl font-heading font-extrabold text-[#FFB300]">
              {isLoading ? "..." : (stats?.inProgress ?? 0) + (stats?.contacted ?? 0)}
            </div>
            <div className="mt-2 text-[11px] font-mono text-[#AAB5C2]">
              {stats?.inProgress ?? 0} In Progress • {stats?.contacted ?? 0} Contacted
            </div>
          </div>

          {/* Closed / Converted */}
          <div className="p-5 rounded-2xl bg-[#101B2B] border border-[#1D2D40] hover:border-[#19B6A4]/50 transition-all duration-200">
            <div className="flex items-center justify-between text-xs text-[#AAB5C2] font-mono mb-2">
              <span>CLOSED / COMPLETED</span>
              <CheckCircle2 className="w-4 h-4 text-[#19B6A4]" />
            </div>
            <div className="text-3xl font-heading font-extrabold text-[#19B6A4]">
              {isLoading ? "..." : stats?.closed ?? 0}
            </div>
            <div className="mt-2 text-[11px] font-mono text-[#AAB5C2]">
              {stats && stats.total > 0
                ? `${Math.round(((stats.closed || 0) / stats.total) * 100)}% conversion rate`
                : "0 completed conversions"}
            </div>
          </div>
        </div>

        {/* Middle Row: Service Demand Breakdown + Quick Communication Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Service Demand Breakdown */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-[#101B2B] border border-[#1D2D40] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-base text-white">
                  Client Service Demand
                </h3>
                <p className="text-xs text-[#AAB5C2]">
                  Distribution of client inquiries by requested technical capability
                </p>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#1D2D40] border border-[#34465A] text-[#19B6A4]">
                Live Breakdown
              </span>
            </div>

            <div className="space-y-3 pt-2">
              {stats?.serviceBreakdown && Object.keys(stats.serviceBreakdown).length > 0 ? (
                Object.entries(stats.serviceBreakdown).map(([service, count]) => {
                  const percentage = Math.round((count / (stats.total || 1)) * 100);
                  return (
                    <div key={service} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-[#F7F6F2]">{service}</span>
                        <span className="font-mono text-[#AAB5C2]">
                          {count} ({percentage}%)
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#1D2D40] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#19B6A4] to-[#C8A96B]"
                          style={{ width: `${Math.max(percentage, 8)}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-8 px-4 text-center border border-dashed border-[#1D2D40] rounded-xl">
                  <p className="text-xs text-[#AAB5C2] leading-relaxed">
                    No client inquiries recorded yet. Technical capability demand percentages will automatically calculate and display here in real time as prospective clients submit requests.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Fast Communication Dispatch Card */}
          <div className="p-6 rounded-2xl bg-[#101B2B] border border-[#1D2D40] flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="p-2 rounded-lg bg-[#19B6A4]/15 text-[#19B6A4]">
                  <Shield className="w-4 h-4" />
                </span>
                <h3 className="font-heading font-bold text-base text-white">
                  Direct Response Hub
                </h3>
              </div>
              <p className="text-xs text-[#AAB5C2] leading-relaxed">
                Connect directly with prospective clients via their requested channel. Respond within 1 business day for maximum conversion.
              </p>
            </div>

            <div className="space-y-2.5">
              <Link
                href="/admin/enquiries?status=new"
                className="w-full py-2.5 px-4 rounded-xl bg-[#FF2A4D]/15 hover:bg-[#FF2A4D]/25 border border-[#FF2A4D]/40 text-[#FF2A4D] font-mono text-xs font-bold flex items-center justify-between transition-colors"
              >
                <span>Review {stats?.newCount ?? 0} New Inquiries</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/admin/comms"
                className="w-full py-2.5 px-4 rounded-xl bg-[#1D2D40] hover:bg-[#25364A] border border-[#34465A] text-white font-mono text-xs font-semibold flex items-center justify-between transition-colors"
              >
                <span>WhatsApp Business Launcher</span>
                <MessageSquare className="w-4 h-4 text-[#19B6A4]" />
              </Link>
            </div>

            <div className="pt-3 border-t border-[#1D2D40] text-[11px] font-mono text-[#AAB5C2]">
              Verified WhatsApp: <span className="text-[#19B6A4] font-bold">+254 798 159 503</span>
            </div>
          </div>
        </div>

        {/* Recent Inquiries Table */}
        <div className="rounded-2xl bg-[#101B2B] border border-[#1D2D40] overflow-hidden shadow-xl">
          <div className="p-5 border-b border-[#1D2D40] flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold text-base text-white">
                Recent Client Inquiries
              </h3>
              <p className="text-xs text-[#AAB5C2]">
                Latest submissions across all digital platforms
              </p>
            </div>

            <Link
              href="/admin/enquiries"
              className="text-xs font-mono font-semibold text-[#19B6A4] hover:text-[#15A392] flex items-center gap-1.5 transition-colors"
            >
              <span>View All Enquiries</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0A101D] text-[#AAB5C2] font-mono uppercase text-[10px] border-b border-[#1D2D40]">
                <tr>
                  <th className="py-3 px-4">Ref / Client</th>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Budget</th>
                  <th className="py-3 px-4">Channel</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Received</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1D2D40] font-sans">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-[#AAB5C2]">
                      <Loader2 className="w-5 h-5 text-[#19B6A4] animate-spin mx-auto mb-2" />
                      <span>Loading inquiries...</span>
                    </td>
                  </tr>
                ) : stats?.recent && stats.recent.length > 0 ? (
                  stats.recent.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-[#1D2D40]/40 transition-colors group"
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          {!item.isRead && (
                            <span
                              className="w-2 h-2 rounded-full bg-[#19B6A4] animate-pulse flex-shrink-0"
                              title="Unread"
                            />
                          )}
                          <div>
                            <div className="font-bold text-white group-hover:text-[#19B6A4] transition-colors">
                              {item.fullName}
                            </div>
                            <div className="text-[11px] font-mono text-[#AAB5C2]">
                              {item.reference} {item.organization ? `• ${item.organization}` : ""}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-medium text-[#F7F6F2]">
                        {item.service}
                      </td>

                      <td className="py-3.5 px-4 font-mono text-[#C8A96B] font-semibold">
                        {item.budget || "To be estimated"}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#1D2D40] border border-[#34465A] text-[#AAB5C2]">
                          {item.preferredContact}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                            item.status === "new"
                              ? "bg-red-950/60 text-[#FF2A4D] border border-red-800/60"
                              : item.status === "in_progress"
                              ? "bg-amber-950/60 text-[#FFB300] border border-amber-800/60"
                              : item.status === "contacted"
                              ? "bg-blue-950/60 text-[#00C2FF] border border-blue-800/60"
                              : "bg-emerald-950/60 text-[#19B6A4] border border-emerald-800/60"
                          }`}
                        >
                          {item.status.replace("_", " ")}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-[#AAB5C2] font-mono text-[11px]">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => {
                            setSelectedEnquiry(item);
                            setIsDetailOpen(true);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#1D2D40] hover:bg-[#19B6A4] hover:text-[#101B2B] text-white text-xs font-mono font-medium transition-colors"
                        >
                          Inspect →
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-[#AAB5C2]">
                      <div className="flex flex-col items-center justify-center space-y-3 max-w-md mx-auto">
                        <div className="w-10 h-10 rounded-2xl bg-[#19B6A4]/10 border border-[#19B6A4]/30 flex items-center justify-center text-[#19B6A4]">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#19B6A4] animate-ping" />
                        </div>
                        <div className="text-sm font-heading font-bold text-white">
                          Real-Time Listener Active
                        </div>
                        <p className="text-xs text-[#AAB5C2] leading-relaxed">
                          Awaiting customer inquiries. When a visitor submits the contact form on your website, it will stream here immediately in real time.
                        </p>
                        <div className="pt-2 flex items-center gap-3">
                          <Link
                            href="/contact"
                            target="_blank"
                            className="px-3.5 py-1.5 rounded-lg bg-[#19B6A4]/15 hover:bg-[#19B6A4]/25 border border-[#19B6A4]/40 text-[#19B6A4] font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors"
                          >
                            <span>Open Public Contact Page</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => setIsNewModalOpen(true)}
                            className="px-3.5 py-1.5 rounded-lg bg-[#1D2D40] hover:bg-[#25364A] border border-[#34465A] text-white font-mono text-xs transition-colors"
                          >
                            Log Inquiry Manually
                          </button>
                        </div>
                      </div>
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
        onCreated={() => fetchStats()}
      />
    </div>
  );
}
