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
                className="group relative rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec671f] focus:ring-offset-2"
                aria-label="Larkosis Pharma Home"
              >
                <Image
                  src="/larko.png"
                  alt="Larkosis Pharma Logo"
                  width={220}
                  height={182}
                  priority
                  className="h-14 w-auto object-contain"
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

          <footer className="mt-12 border-t border-[#f1d9c9] bg-[linear-gradient(180deg,#fff4ec_0%,#fff0e6_100%)]">
            <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <section className="rounded-2xl border border-[#efcfba] bg-white/80 p-5 backdrop-blur-sm md:col-span-2">
                  <Link
                    href="/"
                    className="inline-flex rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec671f] focus:ring-offset-2"
                    aria-label="Larkosis Pharma Home"
                  >
                    <Image
                      src="/larko.png"
                      alt="Larkosis Pharma Logo"
                      width={200}
                      height={78}
                      className="h-16 w-auto object-contain"
                    />
                  </Link>

                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#5f4332]">
                    {companyProfile.overview}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <a
                      href={`mailto:${companyProfile.email}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-[#ec671f] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#d95f1d]"
                    >
                      Email Us
                    </a>
                    <a
                      href={`tel:${companyProfile.phone}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-[#e4bca2] bg-white px-4 py-2 text-sm font-semibold text-[#6d3f27] transition-all hover:bg-[#fff7f2]"
                    >
                      Call Now
                    </a>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {socialLinks.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noreferrer" : undefined}
                        aria-label={item.name}
                        title={item.name}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#e8c7b2] bg-white text-[#7a4a2f] transition-colors hover:border-[#ec671f] hover:text-[#ec671f]"
                      >
                        {item.icon}
                      </a>
                    ))}
                  </div>
                </section>

                <section className="rounded-2xl border border-[#efcfba] bg-white/80 p-5 backdrop-blur-sm">
                  <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-[#6f3e23]">
                    Quick Links
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-[#513828]">
                    {navLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="inline-flex items-center gap-1 transition-colors hover:text-[#ec671f]"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <a
                        href={companyProfile.documents.companyProfilePdf}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 transition-colors hover:text-[#ec671f]"
                      >
                        Company Profile PDF
                      </a>
                    </li>
                    <li>
                      <a
                        href={companyProfile.documents.productListPdf}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 transition-colors hover:text-[#ec671f]"
                      >
                        Product List PDF
                      </a>
                    </li>
                  </ul>
                </section>

                <section className="rounded-2xl border border-[#efcfba] bg-white/80 p-5 backdrop-blur-sm">
                  <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-[#6f3e23]">
                    Contact
                  </h3>
                  <address className="mt-3 space-y-2 not-italic text-sm text-[#513828]">
                    <p className="font-semibold">{companyProfile.legalName}</p>
                    <p className="leading-relaxed">{companyProfile.officeAddress}</p>
                    <p>
                      <span className="font-semibold">Phone: </span>
                      <a
                        href={`tel:${companyProfile.phone}`}
                        className="transition-colors hover:text-[#ec671f]"
                      >
                        {companyProfile.phone}
                      </a>
                    </p>
                    <p className="break-all">
                      <span className="font-semibold">Email: </span>
                      <a
                        href={`mailto:${companyProfile.email}`}
                        className="transition-colors hover:text-[#ec671f]"
                      >
                        {companyProfile.email}
                      </a>
                    </p>
                    <a
                      href={companyProfile.website}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block text-sm font-semibold text-[#007b34] underline underline-offset-4 transition-colors hover:text-[#00923f]"
                    >
                      {companyProfile.website.replace(/^https?:\/\//, "")}
                    </a>
                  </address>
                </section>
              </div>

              <section className="mt-6 rounded-2xl border border-[#efcfba] bg-white/80 p-5 backdrop-blur-sm">
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-[#6f3e23]">
                  Top Categories
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {topCategories.map((item) => (
                    <Link
                      key={item.name}
                      href={`/products?category=${encodeURIComponent(item.name)}`}
                      className="rounded-full border border-[#f1d5c3] bg-[#fff7f1] px-3 py-1 text-xs font-semibold text-[#7d4f33] transition-colors hover:bg-[#ec671f] hover:text-white"
                    >
                      {item.name} ({item.count})
                    </Link>
                  ))}
                </div>
              </section>
            </div>

            <div className="border-t border-[#f1d9c9] px-4 py-4">
              <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
                <p className="text-xs text-[#6b5140]">
                  &copy; {year} Larkosis Pharma. All rights reserved.
                </p>
                <p className="text-xs text-[#6b5140]">
                  Product information is for business inquiry and quotation purposes only.
                </p>
                <div className="flex gap-4">
                  <Link
                    href="/privacy"
                    className="text-xs text-[#6b5140] transition-colors hover:text-[#ec671f]"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/terms"
                    className="text-xs text-[#6b5140] transition-colors hover:text-[#ec671f]"
                  >
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
