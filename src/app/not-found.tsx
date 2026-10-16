import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-transparent">
      <div className="max-w-md w-full text-center p-8 bg-[#1D2D40]/85 backdrop-blur-md rounded-2xl border border-[#34465A] shadow-xl">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#101B2B] border border-[#34465A] text-[#19B6A4] mb-4 font-mono font-extrabold text-lg">
          404
        </div>
        <h1 className="font-heading font-extrabold text-2xl text-[#F7F6F2] mb-2">
          Page Not Found
        </h1>
        <p className="text-sm text-[#AAB5C2] leading-relaxed mb-6 font-sans">
          The page or resource you are looking for does not exist, has been moved, or the link may be outdated.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            href="/"
            variant="primary"
            size="md"
            icon={<Home className="w-4 h-4" />}
            iconPosition="left"
          >
            Return Home
          </Button>
          <Button
            href="/projects"
            variant="dark-outline"
            size="md"
          >
            Browse Projects
          </Button>
        </div>
      </div>
    </div>
  );
}
