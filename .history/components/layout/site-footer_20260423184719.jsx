import Image from "next/image";
import Link from "next/link";

export default function SiteFooter({ companyProfile, year }) {
  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const socialLinks = [
    { href: "https://linkedin.com/company/larkosis-pharma", label: "LinkedIn", icon: "🔗" },
    { href: "https://twitter.com/larkosis", label: "Twitter", icon: "🐦" },
  ];

  return (
    <footer className="relative mt-14 overflow-hidden border-t border-[#f1d8c8] bg-[#fffaf6]">
      {/* Animated background elements - keep as is */}
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float-a absolute -left-16 top-8 h-44 w-44 rounded-full bg-[#f4b083]/35 blur-2xl" />
        <div className="animate-float-b absolute right-6 top-10 h-36 w-36 rounded-full bg-[#00923f]/10 blur-2xl" />
        <div className="animate-pulse-soft absolute bottom-0 left-1/3 h-28 w-28 rounded-full bg-[#ec671f]/20 blur-xl" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.8fr_1fr]">
          {/* Company Info Section */}
          <div className="rounded-2xl border border-[#edd7c8] bg-white/80 p-6 shadow-[0_16px_42px_-30px_rgba(63,45,36,0.8)] backdrop-blur-sm transition-all hover:shadow-[0_20px_48px_-32px_rgba(63,45,36,0.12)]">
            <Link href="/" aria-label="Larkosis Pharma Home" className="inline-flex items-center">
              <Image
                src="/larko.png"
                alt="Larkosis Pharma Logo"
                width={260}
                height={95}
                className="h-20 w-auto object-contain"
                priority={false}
              />
            </Link>
            <p className="mt-4 font-serif text-2xl leading-tight text-[#2f221b]">
              Trusted pharmaceutical formulations for global markets.
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#614c40]">{companyProfile.overview}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${companyProfile.email}?subject=Product%20Quote%20Request`}
                className="inline-flex items-center rounded-full bg-[#ec671f] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#d55e1f] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#ec671f] focus:ring-offset-2"
              >
                Request Quote
              </a>
              <a
                href={companyProfile.documents.productListPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-[#dfc7b7] bg-white px-5 py-2.5 text-sm font-medium text-[#3f2d24] transition-all hover:-translate-y-0.5 hover:border-[#ec671f] hover:text-[#ec671f] focus:outline-none focus:ring-2 focus:ring-[#ec671f] focus:ring-offset-2"
              >
                Download Product List
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="rounded-2xl border border-[#edd7c8] bg-white/75 p-6 backdrop-blur-sm transition-all hover:border-[#e8cdbb]">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8a6a56]">Quick Links</h3>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex text-sm font-medium text-[#3f2d24] transition-all hover:translate-x-1 hover:text-[#ec671f] focus:outline-none focus:text-[#ec671f]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/sitemap.xml"
              className="mt-5 inline-flex text-xs font-semibold uppercase tracking-[0.1em] text-[#7d6658] underline decoration-[#d8bba8] underline-offset-4 transition-all hover:text-[#ec671f] hover:decoration-[#ec671f] focus:outline-none focus:text-[#ec671f]"
            >
              XML Sitemap
            </Link>
          </div>

          {/* Contact Section */}
          <div className="rounded-2xl border border-[#edd7c8] bg-white/75 p-6 backdrop-blur-sm transition-all hover:border-[#e8cdbb]">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8a6a56]">Contact</h3>
            <address className="mt-4 space-y-3 not-italic text-sm text-[#3f2d24]">
              <p className="font-semibold">{companyProfile.legalName}</p>
              <p className="leading-relaxed text-[#5c473b]">{companyProfile.officeAddress}</p>
              <a 
                href={`mailto:${companyProfile.email}`} 
                className="block break-all transition-colors hover:text-[#ec671f] focus:outline-none focus:text-[#ec671f]"
              >
                {companyProfile.email}
              </a>
              {companyProfile.phone && (
                <a 
                  href={`tel:${companyProfile.phone}`} 
                  className="block transition-colors hover:text-[#ec671f] focus:outline-none focus:text-[#ec671f]"
                >
                  {companyProfile.phone}
                </a>
              )}
            </address>
          </div>
        </div>

        {/* Bottom Bar with Social Links */}
        <div className="mt-8 border-t border-[#e8d7cb] pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-xs text-[#7d6658] md:flex-row">
            <p>&copy; {year} {companyProfile.legalName || "Larkosis Pharma"}. All rights reserved.</p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 transition-colors hover:text-[#ec671f] focus:outline-none focus:text-[#ec671f]"
                  aria-label={`Follow us on ${social.label}`}
                >
                  <span className="text-sm">{social.icon}</span>
                  <span className="hidden sm:inline">{social.label}</span>
                </a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex gap-3">
              <Link href="/privacy-policy" className="transition-colors hover:text-[#ec671f]">
                Privacy Policy
              </Link>
              <Link href="/terms-of-use" className="transition-colors hover:text-[#ec671f]">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}