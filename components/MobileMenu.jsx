// components/MobileMenu.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { companyProfile } from "@/data/companyProfile";

export default function MobileMenu({ navLinks }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const pathname = usePathname();

  const productMenuItems = [
    { href: "/products", label: "All Products" },
    { href: "/pharmaceutical-products", label: "Pharmaceutical Products" },
    { href: "/test-kits", label: "Test Kits" },
    { href: "/active-ingredients", label: "Active Pharmaceutical Ingredients" },
    { href: "/over-the-counter", label: "Over-the-Counter" },
    { href: "/private-label-manufacturing-oem", label: "Private Label Manufacturing / OEM" },
  ];

  function closeMenu() {
    setIsOpen(false);
    setIsProductsOpen(false);
  }

  return (
    <>
      <button
        className="md:hidden rounded-lg p-2 text-[#1f2937] transition-colors hover:bg-[#fbe4d5] focus:outline-none focus:ring-2 focus:ring-[#ec671f]"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label="Menu"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {isOpen && (
        <div className="absolute inset-x-0 top-full z-50 border-t border-[#f1d9c9] bg-[#fffaf7] shadow-[0_18px_40px_rgba(27,21,16,0.16)] md:hidden">
          <nav className="max-h-[calc(100vh-72px)] overflow-y-auto px-4 pb-5 pt-4">
            <p className="mb-3 px-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#b4744f]">Navigation</p>
            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

                if (link.href === "/products") {
                  const isProductsActive =
                    pathname.startsWith("/products") ||
                    pathname.startsWith("/pharmaceutical-products") ||
                    pathname.startsWith("/test-kits") ||
                    pathname.startsWith("/active-ingredients") ||
                    pathname.startsWith("/over-the-counter") ||
                    pathname.startsWith("/private-label-manufacturing-oem");

                  return (
                    <div key={link.href} className="rounded-xl border border-[#f1dfd2] bg-white">
                      <button
                        type="button"
                        onClick={() => setIsProductsOpen((prev) => !prev)}
                        aria-expanded={isProductsOpen}
                        className={`flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-sm font-semibold transition-colors ${
                          isProductsActive ? "text-[#ec671f]" : "text-[#2f2f2f]"
                        }`}
                      >
                        <span>{link.label}</span>
                        <svg
                          className={`h-4 w-4 text-[#7d5f4d] transition-transform ${isProductsOpen ? "rotate-180" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {isProductsOpen && (
                        <div className="border-t border-[#f4e8df] px-2 pb-2 pt-1.5">
                          {productMenuItems.map((item) => {
                            const isItemActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={closeMenu}
                                className={`mt-1 block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                                  isItemActive
                                    ? "bg-[#fff3eb] text-[#ec671f]"
                                    : "text-[#5a3b2b] hover:bg-[#fff1e7] hover:text-[#ec671f]"
                                }`}
                              >
                                {item.label}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className={`block rounded-xl border px-3.5 py-3 text-sm font-semibold transition-colors ${
                      isActive
                        ? "border-[#f3cab0] bg-[#fff3eb] text-[#ec671f]"
                        : "border-[#f1dfd2] bg-white text-[#2f2f2f] hover:bg-[#fbe4d5]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="mt-4 border-t border-[#f0ded1] pt-4">
              <a
                href={`mailto:${companyProfile.email}`}
                className="block rounded-xl bg-[#00923f] px-4 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-[#007e35]"
                onClick={closeMenu}
              >
                Get Quote
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
