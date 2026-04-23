import Image from "next/image";
import Link from "next/link";

export default function SiteFooter({ companyProfile, year }) {
  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <footer className="relative mt-14 overflow-hidden border-t border-[#f1d8c8] bg-[#fffaf6]">
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float-a absolute -left-16 top-8 h-44 w-44 rounded-full bg-[#f4b083]/35 blur-2xl" />
        <div className="animate-float-b absolute right-6 top-10 h-36 w-36 rounded-full bg-[#00923f]/10 blur-2xl" />
        <div className="animate-pulse-soft absolute bottom-0 left-1/3 h-28 w-28 rounded-full bg-[#ec671f]/20 blur-xl" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Top section with logo and CTA */}
        <div className="mb-10 flex flex-col items-center justify-between gap-6 border-b border-[#e8d7cb] pb-8 text-center lg:flex-row lg:text-left">
          <Link href="/" aria-label="Larkosis Pharma Home" className="inline-flex items-center">
            <Image
              src="/larko.png"
              alt="Larkosis Pharma Logo"
              width={260}
              height={95}
              className="h-20 w-auto object-contain"
            />
          </Link>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${companyProfile.email}`}
              className="inline-flex items-center rounded-full bg-[#ec671f] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#d55e1f]"
            >
              Request Quote
            </a>
            <a
              href={companyProfile.documents.productListPdf}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-[#dfc7b7] bg-white px-6 py-2.5 text-sm font-medium text-[#3f2d24] transition-all hover:-translate-y-0.5 hover:border-[#ec671f] hover:text-[#ec671f]"
            >
              Download Product List
            </a>
          </div>
        </div>

        {/* Main footer navigation - 3 columns */}
        <div className="grid gap-8 py-6 md:grid-cols-3">
          {/* About column */}
          <div>
            <p className="mb-3 font-serif text-xl leading-tight text-[#2f221b]">
              Trusted pharmaceutical formulations for global markets.
            </p>
            <p className="text-sm leading-relaxed text-[#614c40]">{companyProfile.overview}</p>
          </div>

          {/* Links column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#8a6a56]">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#3f2d24] transition-colors hover:text-[#ec671f]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/sitemap.xml"
                  className="text-sm text-[#3f2d24] transition-colors hover:text-[#ec671f]"
                >
                  XML Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#8a6a56]">Contact Us</h3>
            <address className="not-italic text-sm text-[#3f2d24]">
              <p className="font-semibold">{companyProfile.legalName}</p>
              <p className="mt-2 text-[#5c473b]">{companyProfile.officeAddress}</p>
              <a href={`mailto:${companyProfile.email}`} className="mt-3 block transition-colors hover:text-[#ec671f]">
                {companyProfile.email}
              </a>
              {companyProfile.phone ? (
                <a href={`tel:${companyProfile.phone}`} className="mt-1 block transition-colors hover:text-[#ec671f]">
                  {companyProfile.phone}
                </a>
              ) : null}
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-[#e8d7cb] pt-6 text-center text-xs text-[#7d6658]">
          <p>&copy; {year} Larkosis Pharma. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}