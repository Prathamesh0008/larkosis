"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Navbar({ navLinks, companyProfile }) {
  const pathname = usePathname();
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const productsMenuRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (productsMenuRef.current && !productsMenuRef.current.contains(event.target)) {
        setIsProductsOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") setIsProductsOpen(false);
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <nav className="hidden items-center gap-1 md:flex">
      {navLinks.map((link) => {
        const isProductsLink = link.href === "/products";
        const isActive = isProductsLink
          ? pathname.startsWith("/products") ||
            pathname.startsWith("/active-ingredients") ||
            pathname.startsWith("/pharmaceutical-products") ||
            pathname.startsWith("/test-kits")
          : link.href === "/"
            ? pathname === "/"
            : pathname.startsWith(link.href);

        if (isProductsLink) {
          const productMenuItems = [
            { href: "/products", label: "All Product" },
            { href: "/pharmaceutical-products", label: "Pharmaceutical Products" },
            { href: "/test-kits", label: "Test Kits" },
            { href: "/active-ingredients", label: "Active Ingredients" },
          ];

          return (
            <div
              key={link.href}
              className="relative"
              ref={productsMenuRef}
              onMouseEnter={() => setIsProductsOpen(true)}
              onMouseLeave={() => setIsProductsOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsProductsOpen((prev) => !prev)}
                aria-expanded={isProductsOpen}
                aria-haspopup="menu"
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  isActive
                    ? "border border-[#ec671f] bg-[#fff8f3] text-[#ec671f]"
                    : "text-black hover:bg-[#fff7f1] hover:text-[#ec671f]"
                }`}
              >
                {link.label}
                <svg
                  className={`h-4 w-4 transition-transform ${isProductsOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                className={`absolute left-0 top-full z-50 mt-2 w-64 rounded-2xl border border-[#f2d6c4] bg-white p-2.5 shadow-[0_14px_34px_rgba(15,53,88,0.16)] transition-all ${
                  isProductsOpen ? "visible opacity-100" : "invisible opacity-0"
                }`}
              >
                {productMenuItems.map((item) => {
                  const isItemActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsProductsOpen(false)}
                      className={`block rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                        isItemActive
                          ? "bg-[#fff3eb] text-[#ec671f]"
                          : "text-[#3f2d24] hover:bg-[#fff7f1] hover:text-[#ec671f]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        }

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
              isActive
                ? "border border-[#ec671f] text-[#ec671f]"
                : "text-black hover:text-[#ec671f]"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
