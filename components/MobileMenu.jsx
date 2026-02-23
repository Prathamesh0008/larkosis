// components/MobileMenu.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { companyProfile } from "@/data/companyProfile";

export default function MobileMenu({ navLinks }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden rounded-lg p-2 hover:bg-[#fbe4d5] focus:outline-none focus:ring-2 focus:ring-[#ec671f]"
        onClick={() => setIsOpen(!isOpen)}
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
        <div className="absolute left-0 right-0 top-full border-t border-[#f1d9c9] bg-white shadow-lg z-50">
          <nav className="flex flex-col p-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-[#2f2f2f] hover:bg-[#fbe4d5] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`mailto:${companyProfile.email}`}
              className="rounded-lg bg-[#00923f] px-3 py-2 text-sm font-semibold text-white text-center hover:bg-[#007e35] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Get Quote
            </a>
          </nav>
        </div>
      )}
    </>
  );
}