"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AdminAuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (passcode: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  login: async () => ({ success: false }),
  logout: () => {},
});

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Validate saved session in localStorage
    const savedToken = localStorage.getItem("instaweb_admin_session");
    if (savedToken) {
      try {
        const parts = savedToken.split(".");
        if (parts.length === 2) {
          // Decode base64url payload
          const base64 = parts[0].replace(/-/g, "+").replace(/_/g, "/");
          const decoded = JSON.parse(atob(base64));
          if (decoded.sessionExpires && decoded.sessionExpires > Date.now()) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem("instaweb_admin_session");
          }
        } else {
          localStorage.removeItem("instaweb_admin_session");
        }
      } catch {
        localStorage.removeItem("instaweb_admin_session");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (passcode: string) => {
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.token) {
        localStorage.setItem("instaweb_admin_session", data.token);
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, error: data.error || "Authentication failed" };
    } catch (err) {
      console.error("Login error:", err);
      return { success: false, error: "Network error during authentication" };
    }
  };

  const logout = async () => {
    localStorage.removeItem("instaweb_admin_session");
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {
      // silent fallback
    }
    setIsAuthenticated(false);
  };

  return (
    <AdminAuthContext.Provider
      value={{ isAuthenticated, isLoading, login, logout }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
