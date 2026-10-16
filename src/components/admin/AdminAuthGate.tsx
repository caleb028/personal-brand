"use client";

import React, { useState } from "react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { Shield, Lock, KeyRound, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export function AdminAuthGate({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, login } = useAdminAuth();
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#090E17] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-[#19B6A4] animate-spin" />
          <span className="text-xs font-mono text-[#AAB5C2]">Verifying administrator credentials...</span>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setError("Please enter administrator passcode");
      return;
    }

    setIsSubmitting(true);
    setError("");

    const result = await login(passcode.trim());
    setIsSubmitting(false);

    if (!result.success) {
      setError(result.error || "Incorrect passcode");
      setPasscode("");
    }
  };

  return (
    <div className="min-h-screen bg-[#090E17] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#19B6A4]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#C8A96B]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md bg-[#101B2B]/95 border border-[#34465A] rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
        {/* Brand & Security Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo variant="light" size="lg" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1D2D40] border border-[#34465A] text-xs font-mono text-[#19B6A4] mb-3">
            <Shield className="w-3.5 h-3.5 text-[#19B6A4]" />
            <span>OPERATIONS MANAGEMENT PORTAL</span>
          </div>
          <h1 className="text-xl font-heading font-bold text-white">
            Administrator Access Control
          </h1>
          <p className="text-xs text-[#AAB5C2] mt-1.5">
            Enter authorized master passcode to access enquiries, client communications, and system operations.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-medium text-[#AAB5C2] mb-1.5">
              Admin Master Passcode
            </label>
            <div className="relative">
              <input
                type="password"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  if (error) setError("");
                }}
                placeholder="Enter admin passcode"
                className="w-full pl-10 pr-4 py-3 bg-[#0A101D] border border-[#34465A] rounded-xl text-white placeholder-[#526273] text-sm font-mono focus:outline-none focus:border-[#19B6A4] focus:ring-1 focus:ring-[#19B6A4] transition-all"
                autoFocus
              />
              <Lock className="w-4 h-4 text-[#AAB5C2] absolute left-3.5 top-3.5 pointer-events-none" />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-950/40 border border-red-800/60 rounded-lg text-xs text-red-300">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-[#19B6A4] hover:bg-[#15A392] disabled:opacity-50 text-[#101B2B] font-heading font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-glow transition-all duration-200 mt-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <KeyRound className="w-4 h-4" />
                <span>Unlock Operations Console</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-[#1D2D40] flex items-center justify-between text-[11px] font-mono text-[#AAB5C2]">
          <span>Security Protocol: Encrypted Token</span>
          <span className="text-[#C8A96B] font-semibold">Demo: admin2026</span>
        </div>
      </div>
    </div>
  );
}
