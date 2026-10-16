"use client";

import React, { createContext, useContext, useState } from "react";

interface AdminUIContextType {
  mobileMenuOpen: boolean;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;
}

const AdminUIContext = createContext<AdminUIContextType>({
  mobileMenuOpen: false,
  openMobileMenu: () => {},
  closeMobileMenu: () => {},
  toggleMobileMenu: () => {},
});

export function AdminUIProvider({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <AdminUIContext.Provider
      value={{
        mobileMenuOpen,
        openMobileMenu: () => setMobileMenuOpen(true),
        closeMobileMenu: () => setMobileMenuOpen(false),
        toggleMobileMenu: () => setMobileMenuOpen((prev) => !prev),
      }}
    >
      {children}
    </AdminUIContext.Provider>
  );
}

export function useAdminUI() {
  return useContext(AdminUIContext);
}
