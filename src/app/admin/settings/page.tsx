"use client";

import React, { useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { siteConfig } from "@/content/siteConfig";
import {
  Settings,
  Lock,
  Mail,
  Phone,
  Shield,
  Download,
  CheckCircle2,
  AlertCircle,
  Database,
  Save,
  KeyRound,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [settingsMeta, setSettingsMeta] = useState<{ hasCustomPasscode: boolean; updatedAt: string } | null>(null);
  const [passMessage, setPassMessage] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  React.useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSettingsMeta(data.settings);
        }
      })
      .catch(() => {});
  }, []);

  const handleUpdatePasscode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass.length < 6) {
      setPassMessage({
        type: "error",
        text: "New passcode must be at least 6 characters.",
      });
      return;
    }

    setIsSaving(true);
    setPassMessage(null);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPasscode: currentPass,
          newPasscode: newPass,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setPassMessage({
          type: "success",
          text: data.message || "Master administrator passcode updated successfully on the server.",
        });
        setCurrentPass("");
        setNewPass("");
        setSettingsMeta((prev) => ({
          hasCustomPasscode: true,
          updatedAt: new Date().toISOString(),
        }));
      } else {
        setPassMessage({
          type: "error",
          text: data.error || "Failed to update passcode. Ensure current passcode is correct.",
        });
      }
    } catch {
      setPassMessage({
        type: "error",
        text: "Network or server error while updating passcode.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownloadFullJSON = async () => {
    try {
      const res = await fetch("/api/admin/enquiries");
      const data = await res.json();
      const blob = new Blob([JSON.stringify(data.data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `instaweb-enquiries-backup-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Backup download error:", err);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#090E17]">
      <AdminHeader
        title="Console Settings & Security Protocols"
        subtitle="Manage master access control, notification routing destinations, and data backup"
      />

      <div className="p-4 sm:p-6 lg:p-8 space-y-8 flex-1 max-w-5xl w-full mx-auto">
        {/* Security & Passcode Card */}
        <div className="p-6 rounded-2xl bg-[#101B2B] border border-[#1D2D40] space-y-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#19B6A4]/15 text-[#19B6A4]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-heading font-bold text-white">
                Master Administrator Passcode
              </h2>
              <p className="text-xs text-[#AAB5C2]">
                Controls authorization for `/admin` access. Default master passcode is{" "}
                <span className="font-mono text-[#C8A96B] font-bold">admin2026</span>.
              </p>
            </div>
          </div>

          <form onSubmit={handleUpdatePasscode} className="space-y-4 max-w-md pt-2">
            <div>
              <label className="block text-xs font-mono text-[#AAB5C2] mb-1">
                Current Passcode
              </label>
              <input
                type="password"
                required
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
                placeholder="Enter current passcode"
                className="w-full px-3 py-2 bg-[#0A101D] border border-[#34465A] rounded-xl text-xs text-white placeholder-[#526273] focus:outline-none focus:border-[#19B6A4]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#AAB5C2] mb-1">
                New Passcode (min 6 characters)
              </label>
              <input
                type="password"
                required
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="Enter new master passcode"
                className="w-full px-3 py-2 bg-[#0A101D] border border-[#34465A] rounded-xl text-xs text-white placeholder-[#526273] focus:outline-none focus:border-[#19B6A4]"
              />
            </div>

            {passMessage && (
              <div
                className={`flex items-center gap-2 p-3 rounded-lg text-xs ${
                  passMessage.type === "success"
                    ? "bg-emerald-950/40 border border-emerald-800/60 text-emerald-300"
                    : "bg-red-950/40 border border-red-800/60 text-red-300"
                }`}
              >
                {passMessage.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                )}
                <span>{passMessage.text}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#19B6A4] hover:bg-[#15A392] disabled:opacity-50 text-[#101B2B] font-heading font-bold text-xs shadow-glow transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? "Updating Server..." : "Update Passcode"}</span>
            </button>
          </form>
        </div>

        {/* Notification Routing Configuration */}
        <div className="p-6 rounded-2xl bg-[#101B2B] border border-[#1D2D40] space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#C8A96B]/15 text-[#C8A96B]">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-heading font-bold text-white">
                Inbound Inquiries Routing Matrix
              </h2>
              <p className="text-xs text-[#AAB5C2]">
                Active configuration for client notifications and website inquiries
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#0A101D] border border-[#1D2D40] space-y-1">
              <span className="text-[10px] font-mono uppercase text-[#AAB5C2]">
                Target Recipient Email:
              </span>
              <div className="text-sm font-mono font-bold text-[#19B6A4]">
                {siteConfig.recipientEmail}
              </div>
              <p className="text-[11px] text-[#AAB5C2]">
                All customer inquiries are received at this address.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0A101D] border border-[#1D2D40] space-y-1">
              <span className="text-[10px] font-mono uppercase text-[#AAB5C2]">
                Branded Public Display Email:
              </span>
              <div className="text-sm font-mono font-bold text-[#F7F6F2]">
                {siteConfig.email}
              </div>
              <p className="text-[11px] text-[#AAB5C2]">
                Visible sender & contact address on public website.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0A101D] border border-[#1D2D40] space-y-1">
              <span className="text-[10px] font-mono uppercase text-[#AAB5C2]">
                WhatsApp Integration Number:
              </span>
              <div className="text-sm font-mono font-bold text-[#087F5B]">
                +254 798 159 503
              </div>
              <p className="text-[11px] text-[#AAB5C2]">
                Protected from public text scraping; activated via WhatsApp link.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0A101D] border border-[#1D2D40] space-y-1">
              <span className="text-[10px] font-mono uppercase text-[#AAB5C2]">
                Honeypot Anti-Spam Shield:
              </span>
              <div className="text-sm font-mono font-bold text-emerald-400">
                ENABLED & ACTIVE
              </div>
              <p className="text-[11px] text-[#AAB5C2]">
                Automated bots are silently intercepted without cluttering inbox.
              </p>
            </div>
          </div>
        </div>

        {/* Database & Data Backup */}
        <div className="p-6 rounded-2xl bg-[#101B2B] border border-[#1D2D40] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#19B6A4]/15 text-[#19B6A4]">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-heading font-bold text-white">
                  Database & Enquiries Backup
                </h2>
                <p className="text-xs text-[#AAB5C2]">
                  Download a snapshot of all client records and internal audit histories
                </p>
              </div>
            </div>

            <button
              onClick={handleDownloadFullJSON}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1D2D40] hover:bg-[#25364A] text-white border border-[#34465A] text-xs font-mono transition-colors"
            >
              <Download className="w-4 h-4 text-[#19B6A4]" />
              <span>Download JSON Backup</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
