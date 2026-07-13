"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SiteFooter({ companyProfile, year }) {
  const { translations } = useLanguage();
  const quickLinks = [
    { href: "/", label: translations?.footer?.links?.home || "Home" },
    { href: "/products", label: translations?.footer?.links?.products || "Products" },
    { href: "/about", label: translations?.footer?.links?.about || "About" },
    { href: "/contact", label: translations?.footer?.links?.contact || "Contact" },
  ];

  return (
    <footer className="relative mt-10 overflow-hidden bg-[#241a14] text-white">
      <div className="h-1 w-full bg-gradient-to-r from-[#ec671f] via-[#f4b083] to-[#ec671f]" />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 items-start gap-10 text-left md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="flex flex-col items-start space-y-4">
            <Image
              src="/logo.png"
              alt="Larkosis Pharma Logo"
              width={320}
              height={120}
              className="h-auto w-[170px] object-contain"
            />

            <p className="max-w-sm text-sm leading-relaxed text-[#eadbd2] mt-">
              {translations?.footer?.description || companyProfile.overview}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold uppercase text-[#ec671f]">
              {translations?.footer?.quickLinks || "Quick Links"}
            </h3>

            <ul className="space-y-2 text-sm text-[#eadbd2]">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/offerings-overview" className="transition hover:text-white">
                  Offerings Overview
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold uppercase text-[#f4b083]">
              {translations?.footer?.contact || "Contact"}
            </h3>

            <ul className="space-y-2 text-sm text-[#eadbd2]">
              <li>{companyProfile.officeAddress}</li>
              <li>
                <span className="font-semibold text-white">
                  {translations?.footer?.emailLabel || "Email"}:
                </span>{" "}
                <a href={`mailto:${companyProfile.email}`} className="transition hover:text-white">
                  {companyProfile.email}
                </a>
              </li>
              {companyProfile.phone ? (
                <li>
                  <span className="font-semibold text-white">Phone:</span>{" "}
                  <a href={`tel:${companyProfile.phone}`} className="transition hover:text-white">
                    {companyProfile.phone}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>

          
        </div>
      </div>

      <div className="border-t border-white/10 bg-[#1b140f] px-4 py-4 text-center text-sm text-[#d7c6bc]">
        &copy; {year} <span className="font-medium text-white">{companyProfile.brand}</span> | {translations?.footer?.rights || "All Rights Reserved"}
      </div>
    </footer>
  );
}
