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
    template: "%s | Larkosis Pharma",
  },
  description:
    "Production-ready pharmaceutical product inquiry website for Larkosis Pharma, including product catalog, details, FAQs, and quotation requests.",
  keywords: [
    "pharmaceutical",
    "medicines",
    "drug inquiry",
    "pharma products",
    "Larkosis",
  ],
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
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
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
  const phoneDigits = companyProfile.phone.replace(/\D/g, "");
  const socialLinks = [
    {
      name: "Website",
      href: companyProfile.website,
      external: true,
      icon: (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.6 9h16.8M3.6 15h16.8M12 3a16 16 0 010 18M12 3a16 16 0 000 18" />
        </svg>
      ),
    },
    {
      name: "Email",
      href: `mailto:${companyProfile.email}`,
      external: false,
      icon: (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      name: "Phone",
      href: `tel:${companyProfile.phone}`,
      external: false,
      icon: (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
    },
    {
      name: "WhatsApp",
      href: `https://wa.me/${phoneDigits}`,
      external: true,
      icon: (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 11.5A8.5 8.5 0 1111.5 3a8.5 8.5 0 018.5 8.5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.5 20.5L4 22l1.5-4.5" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.8 9.6c.3-.6.5-.6.7-.6h.6c.2 0 .5 0 .7.5.2.5.7 1.7.7 1.8 0 .2 0 .3-.1.5-.1.2-.2.3-.4.4-.1.1-.3.2-.4.3-.1.1-.2.3-.1.5.1.2.7 1.1 1.6 1.8 1 .8 1.8 1 2.1 1.1.3.1.5.1.7-.1.2-.2.8-.9 1-.9.2 0 .3 0 .5.1.2.1 1.4.7 1.6.8.2.1.4.2.4.3 0 .1 0 .7-.3 1.3-.3.6-1.7 1.2-2.3 1.2-.6 0-1.3.2-4.4-1-3.1-1.2-5.1-4.3-5.2-4.5-.1-.2-1.2-1.6-1.2-3.1 0-1.5.8-2.2 1.1-2.5z" />
        </svg>
      ),
    },
  ];

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${manrope.variable} ${spectral.variable} font-sans antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:p-4 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#ec671f]"
        >
          Skip to main content
        </a>

        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-40 border-b border-[#f1d9c9] bg-[#fff8f4]/95 backdrop-blur-md supports-[backdrop-filter]:bg-[#fff8f4]/80">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
              <Link
                href="/"
                className="group relative rounded-lg focus:outline-none"
                aria-label="Larkosis Pharma Home"
              >
                <Image
                  src="/larko.png"
                  alt="Larkosis Pharma Logo"
                  width={220}
                  height={182}
                  priority
                  className="h-15 w-auto origin-left scale-140 object-contain"
                />
              </Link>

              <nav
                className="hidden items-center gap-1 md:flex"
                aria-label="Main navigation"
              >
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

              <MobileMenu navLinks={navLinks} />
            </div>
          </header>

          <main id="main-content" className="flex-1">
            {children}
          </main>

         <footer className="relative mt-14 overflow-hidden border-t border-[#f0d8ca] bg-[linear-gradient(180deg,#fff8f2_0%,#fff0e4_45%,#fde8dc_100%)]">
  {/* Background decorative elements - hidden on mobile */}
  <div className="pointer-events-none absolute -left-12 top-10 h-44 w-44 rounded-full bg-[#ec671f]/15 blur-3xl max-lg:hidden" />
  <div className="pointer-events-none absolute -right-12 bottom-12 h-48 w-48 rounded-full bg-[#00923f]/10 blur-3xl max-lg:hidden" />

  <div className="relative mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
    {/* Main footer content - redesigned layout */}
    <div className="grid gap-8 lg:gap-12">
      
      {/* Top section - Brand and CTA - Full width on mobile, side by side on tablet */}
      <div className="grid gap-6 md:grid-cols-2 md:items-center md:gap-8">
        {/* Brand section */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center rounded-2xl border border-[#efcfba] bg-white/80 p-2 backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ec671f] focus-visible:ring-offset-2"
            aria-label="Larkosis Pharma Home"
          >
            <Image
              src="/larko.png"
              alt="Larkosis Pharma Logo"
              width={220}
              height={85}
              className="h-16 w-auto object-contain md:h-20"
              priority={false}
            />
          </Link>
          
          <p className="max-w-xl text-sm leading-relaxed text-[#5f4332] md:text-base">
            {companyProfile.overview}
          </p>
          
          {/* Quick contact buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={`mailto:${companyProfile.email}`}
              className="inline-flex items-center gap-2 rounded-xl bg-[#ec671f] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#ec671f]/20 transition-all hover:-translate-y-0.5 hover:bg-[#d95f1d] hover:shadow-xl"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Get Quote
            </a>
            <a
              href={`tel:${companyProfile.phone}`}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-[#e4bca2] bg-white/80 px-5 py-2.5 text-sm font-semibold text-[#6d3f27] backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-[#ec671f] hover:bg-white hover:text-[#ec671f]"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Team
            </a>
          </div>
        </div>

        {/* Quick stats or featured badge - optional */}
        <div className="flex flex-wrap gap-4 md:justify-end">
          <div className="rounded-2xl bg-white/60 px-6 py-4 backdrop-blur-sm">
            <p className="text-2xl font-bold text-[#ec671f]">50+</p>
            <p className="text-xs text-[#6b5140]">Products</p>
          </div>
          <div className="rounded-2xl bg-white/60 px-6 py-4 backdrop-blur-sm">
            <p className="text-2xl font-bold text-[#00923f]">1000+</p>
            <p className="text-xs text-[#6b5140]">Happy Clients</p>
          </div>
        </div>
      </div>

      {/* Middle section - 4-column layout on desktop, 2-column on tablet, 1-column on mobile */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Column 1: Explore Links */}
        <div className="rounded-2xl bg-white/70 p-5 backdrop-blur-sm">
          <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#7a4a2f]">
            <span className="h-1 w-5 rounded-full bg-[#ec671f]"></span>
            Explore
          </h3>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group flex items-center gap-2 text-sm text-[#513828] transition-all hover:translate-x-1 hover:text-[#ec671f]"
                >
                  <span className="h-1 w-1 rounded-full bg-[#e4bca2] group-hover:bg-[#ec671f]"></span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2: Downloads & Resources */}
        <div className="rounded-2xl bg-white/70 p-5 backdrop-blur-sm">
          <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#7a4a2f]">
            <span className="h-1 w-5 rounded-full bg-[#00923f]"></span>
            Resources
          </h3>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                href={companyProfile.documents.companyProfilePdf}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 rounded-lg border border-[#f1d5c3] bg-white/50 p-3 transition-all hover:border-[#00923f] hover:bg-white"
              >
                <svg className="h-5 w-5 text-[#00923f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="font-medium text-[#513828]">Company Profile</p>
                  <p className="text-xs text-[#8b6f5c]">PDF, 2.4 MB</p>
                </div>
              </a>
            </li>
            <li>
              <a
                href={companyProfile.documents.productListPdf}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 rounded-lg border border-[#f1d5c3] bg-white/50 p-3 transition-all hover:border-[#00923f] hover:bg-white"
              >
                <svg className="h-5 w-5 text-[#00923f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="font-medium text-[#513828]">Product List</p>
                  <p className="text-xs text-[#8b6f5c]">PDF, 1.8 MB</p>
                </div>
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Information */}
        <div className="rounded-2xl bg-white/70 p-5 backdrop-blur-sm">
          <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#7a4a2f]">
            <span className="h-1 w-5 rounded-full bg-[#ec671f]"></span>
            Contact
          </h3>
          <address className="mt-4 space-y-3 not-italic text-sm">
            <p className="font-semibold text-[#513828]">{companyProfile.legalName}</p>
            <p className="flex gap-2 text-[#513828]">
              <svg className="h-5 w-5 flex-shrink-0 text-[#ec671f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="leading-relaxed">{companyProfile.officeAddress}</span>
            </p>
            <p className="flex items-center gap-2">
              <svg className="h-5 w-5 text-[#ec671f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href={`tel:${companyProfile.phone}`} className="hover:text-[#ec671f]">
                {companyProfile.phone}
              </a>
            </p>
            <p className="flex items-center gap-2">
              <svg className="h-5 w-5 text-[#ec671f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href={`mailto:${companyProfile.email}`} className="break-all hover:text-[#ec671f]">
                {companyProfile.email}
              </a>
            </p>
          </address>
        </div>

        {/* Column 4: Social & Website */}
        <div className="rounded-2xl bg-white/70 p-5 backdrop-blur-sm">
          <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#7a4a2f]">
            <span className="h-1 w-5 rounded-full bg-[#00923f]"></span>
            Connect
          </h3>
          
          <div className="mt-4 space-y-4">
            <a
              href={companyProfile.website}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-xl bg-[#00923f]/10 px-4 py-3 text-[#00923f] transition-all hover:bg-[#00923f] hover:text-white"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h-2v-6h2v6zm-1-8c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm8 8h-2v-4c0-1.1-.9-2-2-2s-2 .9-2 2v4h-2v-6h2v1.1c.58-.66 1.6-1.1 2.5-1.1 1.93 0 3.5 1.57 3.5 3.5v2.5z"/>
              </svg>
              <span className="font-medium">Visit Website</span>
            </a>

            <div className="flex flex-wrap gap-2">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  aria-label={item.name}
                  className="flex items-center gap-2 rounded-full border border-[#e8c7b2] bg-white px-4 py-2 text-sm font-medium text-[#7a4a2f] transition-all hover:border-[#ec671f] hover:bg-[#ec671f] hover:text-white"
                >
                  <span className="h-4 w-4">{item.icon}</span>
                  <span className="hidden sm:inline">{item.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Categories section - full width with better visual */}
    

      {/* Bottom bar - copyright and legal */}
      <div className="border-t border-[#f1d9c9] pt-6">
        <div className="flex flex-col items-center justify-between gap-4 text-center lg:flex-row lg:text-left">
          <p className="text-xs text-[#6b5140]">
            &copy; {year} Larkosis Pharma. All rights reserved.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <Link href="/privacy" className="text-[#6b5140] transition-colors hover:text-[#ec671f]">
              Privacy Policy
            </Link>
            <span className="text-[#f1d9c9]">•</span>
            <Link href="/terms" className="text-[#6b5140] transition-colors hover:text-[#ec671f]">
              Terms of Use
            </Link>
            <span className="text-[#f1d9c9]">•</span>
            <Link href="/sitemap" className="text-[#6b5140] transition-colors hover:text-[#ec671f]">
              Sitemap
            </Link>
          </div>
          
          <p className="text-xs text-[#8b6f5c]">
            For business inquiries only
          </p>
        </div>
      </div>
    </div>
  </div>
</footer>
        </div>
      </body>
    </html>
  );
}
