import Link from "next/link";
import Image from "next/image";
import { Manrope, Spectral } from "next/font/google";
import "./globals.css";
import { companyProfile } from "@/data/companyProfile";
import { getCategoryCounts } from "@/lib/catalog";
import MobileMenu from "@/components/MobileMenu";
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const spectral = Spectral({
  variable: "--font-spectral",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Larkosis Pharma | Global Pharmaceutical Inquiry Portal",
    template: "%s | Larkosis Pharma"
  },
  description: "Production-ready pharmaceutical product inquiry website for Larkosis Pharma, including product catalog, details, FAQs, and quotation requests.",
  keywords: ["pharmaceutical", "medicines", "drug inquiry", "pharma products", "Larkosis"],
  authors: [{ name: "Larkosis Pharma" }],
  creator: "Larkosis Pharma",
  publisher: "Larkosis Pharma",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(companyProfile.website || "https://larkosis.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Larkosis Pharma | Global Pharmaceutical Inquiry Portal",
    description: "Browse our pharmaceutical product catalog and submit inquiries.",
    url: "https://larkosis.com",
    siteName: "Larkosis Pharma",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Larkosis Pharma | Global Pharmaceutical Inquiry Portal",
    description: "Browse our pharmaceutical product catalog and submit inquiries.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "About" },
];

const year = new Date().getFullYear();

export default function RootLayout({ children }) {
  const topCategories = getCategoryCounts().slice(0, 6);

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${manrope.variable} ${spectral.variable} antialiased font-sans`}>
        {/* Skip to main content link for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:p-4 focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#ec671f]"
        >
          Skip to main content
        </a>

        <div className="min-h-screen flex flex-col">
          {/* Top Banner */}
     

          {/* Header */}
          <header className="sticky top-0 z-40 border-b border-[#f1d9c9] bg-[#fff8f4]/95 backdrop-blur-md supports-[backdrop-filter]:bg-[#fff8f4]/80">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
              {/* Logo */}
              <Link 
                href="/" 
                className="group relative rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec671f] focus:ring-offset-2"
                aria-label="Larkosis Pharma Home"
              >
                <Image
                  src="/larko.png"
                  alt="Larkosis Pharma Logo"
                  width={52}
                  height={52}
                  priority
                  className="h-20 w-25 rounded-md object-cover"
                />
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-lg px-3 py-2 text-sm font-semibold text-[#2f2f2f] transition-colors hover:bg-[#fbe4d5] hover:text-[#ec671f] focus:outline-none focus:ring-2 focus:ring-[#ec671f] focus:ring-offset-2"
                  >
                    {link.label}
                  </Link>
                ))}
                <a
                  href={`mailto:${companyProfile.email}`}
                  className="ml-2 rounded-lg bg-[#00923f] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#007e35] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00923f] focus:ring-offset-2"
                >
                  Get Quote
                </a>
              </nav>

              {/* Mobile Menu Button - Using client component */}
              <MobileMenu navLinks={navLinks} />
            </div>
          </header>

          {/* Main Content */}
          <main id="main-content" className="flex-1">
            {children}
          </main>

          {/* Footer */}
          <footer className="mt-12 border-t border-[#f1d9c9] bg-[#fff3eb]">
            <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
              {/* Company Info */}
              <section>
                <h3 className="text-lg font-bold text-[#231911] font-[family-name:var(--font-spectral)]">
                  Larkosis Pharma
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5f4332]">
                  {companyProfile.overview}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <a
                    href={`mailto:${companyProfile.email}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#ec671f] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#d95f1d] hover:shadow-lg"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Send Inquiry
                  </a>
                </div>
              </section>

              {/* Quick Links */}
              <section>
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-[#6f3e23]">
                  Quick Links
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-[#513828]">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link 
                        href={link.href} 
                        className="group inline-flex items-center gap-1 hover:text-[#ec671f] transition-colors"
                      >
                        <svg className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <a
                      href={companyProfile.documents.companyProfilePdf}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-1 hover:text-[#ec671f] transition-colors"
                    >
                      <svg className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Company Profile PDF
                    </a>
                  </li>
                  <li>
                    <a
                      href={companyProfile.documents.productListPdf}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-1 hover:text-[#ec671f] transition-colors"
                    >
                      <svg className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Product List PDF
                    </a>
                  </li>
                </ul>
              </section>

              {/* Top Categories */}
              <section>
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-[#6f3e23]">
                  Top Categories
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-[#513828]">
                  {topCategories.map((item) => (
                    <li key={item.name} className="flex items-center justify-between gap-3 group">
                      <Link 
                        href={`/products?category=${encodeURIComponent(item.name)}`}
                        className="hover:text-[#ec671f] transition-colors"
                      >
                        {item.name}
                      </Link>
                      <span className="rounded-full bg-[#fbe4d5] px-2 py-0.5 text-xs font-semibold text-[#7a4a2f] group-hover:bg-[#ec671f] group-hover:text-white transition-colors">
                        {item.count}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Contact Info */}
              <section>
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-[#6f3e23]">
                  Contact
                </h3>
                <address className="mt-3 not-italic text-sm text-[#513828] space-y-2">
                  <p className="font-semibold">{companyProfile.legalName}</p>
                  <p className="leading-relaxed">{companyProfile.officeAddress}</p>
                  <p>
                    <span className="font-semibold">Phone:</span>{' '}
                    <a href={`tel:${companyProfile.phone}`} className="hover:text-[#ec671f] transition-colors">
                      {companyProfile.phone}
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span>{' '}
                    <a href={`mailto:${companyProfile.email}`} className="hover:text-[#ec671f] transition-colors">
                      {companyProfile.email}
                    </a>
                  </p>
                  <a
                    href={companyProfile.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-2 text-sm font-semibold text-[#007b34] hover:text-[#00923f] underline underline-offset-4 transition-colors"
                  >
                    {companyProfile.website.replace(/^https?:\/\//, '')}
                  </a>
                </address>
              </section>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-[#f1d9c9] px-4 py-4">
              <div className="mx-auto max-w-7xl flex flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left">
                <p className="text-xs text-[#6b5140]">
                  © {year} Larkosis Pharma. All rights reserved.
                </p>
                <p className="text-xs text-[#6b5140]">
                  Product information is for business inquiry and quotation purposes only.
                </p>
                <div className="flex gap-4">
                  <Link href="/privacy" className="text-xs text-[#6b5140] hover:text-[#ec671f] transition-colors">
                    Privacy Policy
                  </Link>
                  <Link href="/terms" className="text-xs text-[#6b5140] hover:text-[#ec671f] transition-colors">
                    Terms of Use
                  </Link>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
