"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { AppButton, BrandMark } from "@/components/primitives";
import type { Tenant } from "@/lib/domain/types";

type NavItem = {
  href: string;
  label: string;
  icon: string;
  badge?: string;
};

export function AppShell({
  roleLabel,
  tenant,
  navItems,
  children,
  allowLogout = true,
}: {
  roleLabel: string;
  tenant?: Tenant | null;
  navItems: NavItem[];
  children: React.ReactNode;
  allowLogout?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/auth/logout", {
      method: "POST",
    });
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <BrandMark />
        <div className="header-search">검색 (Ctrl+K)</div>
        <div className="header-actions">
          {tenant ? <span className="badge info">{tenant.name}</span> : null}
          <span className="badge">{roleLabel}</span>
          {allowLogout ? (
            <AppButton tone="ghost" onClick={handleLogout} disabled={loggingOut}>
              {loggingOut ? "로그아웃 중..." : "로그아웃"}
            </AppButton>
          ) : null}
        </div>
      </header>

      <nav className="app-sidebar">
        <div className="nav-section">
          <div className="nav-section-label">Navigation</div>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={`nav-item${pathname === item.href ? " active" : ""}`}>
              <span className="nav-icon">{item.icon}</span>
              {item.label}
              {item.badge ? <span className="nav-badge">{item.badge}</span> : null}
            </Link>
          ))}
        </div>
      </nav>

      <main className="app-main">{children}</main>
    </div>
  );
}
