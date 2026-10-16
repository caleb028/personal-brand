"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { siteConfig } from "@/content/siteConfig";
import { servicesData } from "@/content/services";
import {
  Layers,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Inbox,
  Code2,
  TrendingUp,
} from "lucide-react";

export default function AdminServicesPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchStats = () => {
      fetch("/api/admin/stats")
        .then((res) => res.json())
        .then((data) => {
          if (data.stats) setStats(data.stats);
        })
        .catch(() => {});
    };

    fetchStats();
    const interval = setInterval(fetchStats, 3500);

    const handleFocus = () => fetchStats();
    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleFocus);
    };
  }, []);

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#090E17]">
      <AdminHeader
        title="Services & Capabilities Overview"
        subtitle="Manage service specifications, demand distribution, and pricing guidelines"
      />

      <div className="p-4 sm:p-6 lg:p-8 space-y-6 flex-1 max-w-7xl w-full mx-auto">
        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service) => {
            const inquiriesCount = stats?.serviceBreakdown?.[service.title] || 0;

            return (
              <div
                key={service.id}
                className="p-6 rounded-2xl bg-[#101B2B] border border-[#1D2D40] flex flex-col justify-between hover:border-[#19B6A4]/60 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-[#19B6A4] px-2 py-0.5 rounded bg-[#19B6A4]/10 border border-[#19B6A4]/25">
                      {service.id}
                    </span>
                    <span className="text-[11px] font-mono text-[#AAB5C2] flex items-center gap-1">
                      <Inbox className="w-3.5 h-3.5 text-[#19B6A4]" />
                      <span>{inquiriesCount} Inquiries</span>
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-white mb-2">
                    {service.title}
                  </h3>

                  <p className="text-xs text-[#AAB5C2] leading-relaxed mb-4">
                    {service.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {service.technologiesUsed.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0A101D] text-[#F7F6F2] border border-[#1D2D40]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#1D2D40] flex items-center justify-between">
                  <Link
                    href={`/admin/enquiries?service=${encodeURIComponent(service.title)}`}
                    className="text-xs font-mono font-semibold text-[#19B6A4] hover:underline"
                  >
                    View Inquiries →
                  </Link>

                  <Link
                    href={`/services#${service.slug}`}
                    target="_blank"
                    className="text-xs font-mono text-[#AAB5C2] hover:text-white flex items-center gap-1"
                  >
                    <span>Public View</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
