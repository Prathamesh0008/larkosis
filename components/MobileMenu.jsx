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
        className="rounded-lg p-2 text-gray-700 transition-colors hover:bg-[#f3f8fb] focus:outline-none focus:ring-2 focus:ring-[#ec671f] lg:hidden"
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
        <div className="absolute inset-x-0 top-full z-50 border-t border-gray-100 bg-white/95 px-4 py-4 shadow-2xl backdrop-blur-md animate-[mobileMenuSlide_0.28s_ease-out] lg:hidden">
          <nav className="max-h-[calc(100vh-72px)] overflow-y-auto">
            <div className="space-y-2 text-sm font-medium text-gray-800">
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
                    <div key={link.href} className="rounded-xl bg-gray-50 p-2">
                      <button
                        type="button"
                        onClick={() => setIsProductsOpen((prev) => !prev)}
                        aria-expanded={isProductsOpen}
                        className="flex w-full items-center justify-between px-2 py-2 text-[#0d2d47]"
                      >
                        <span
                          className={`rounded-full px-3 py-1 transition-all ${
                            isProductsActive ? "bg-[#e8f6fb] font-semibold text-[#ff7a00] shadow-[0_2px_8px_rgba(15,23,42,0.08)]" : ""
                          }`}
                        >
                          {link.label}
                        </span>
                        <svg
                          className={`h-4 w-4 transition-transform ${isProductsOpen ? "rotate-180" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {isProductsOpen && (
                        <div className="mt-2 flex flex-col gap-1 pl-2">
                          {productMenuItems.map((item) => {
                            const isItemActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={closeMenu}
                                className={`block rounded-lg px-3 py-2 transition-all duration-200 ${
                                  isItemActive
                                    ? "bg-[#e8f6fb] font-semibold text-[#0d2d47]"
                                    : "hover:bg-white hover:text-[#0d2d47]"
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
                    className={`block rounded-full px-4 py-2.5 transition-all duration-300 ${
                      isActive
                        ? "bg-[#e8f6fb] font-semibold text-[#ff7a00] shadow-[0_2px_8px_rgba(15,23,42,0.08)]"
                        : "hover:bg-[#f3f8fb] hover:text-[#0d2d47]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="mt-5 flex items-center gap-5 border-t border-gray-100 px-2 pt-4 text-sm text-[#475569]">
              <button type="button" aria-label="Search" className="inline-flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="m21 21-4.35-4.35m1.6-5.15a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" />
                </svg>
                <span>Search</span>
              </button>

              <div className="inline-flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#eef2ff] text-[10px] font-semibold text-[#334155]">
                  EN
                </span>
                <span>English</span>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
