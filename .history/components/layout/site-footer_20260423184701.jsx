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
    <footer className="relative mt-14 overflow-hidden border-t border-[#e8d6c7] bg-[#fdf7f1]">
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-[#b57a33] via-[#ec671f] to-[#0d7e3a]" />
      <div className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-[#ec671f]/8 blur-3xl" />

      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.8fr_1fr] lg:gap-12">
          <div>
            <span className="inline-flex rounded-full border border-[#e7d2bf] bg-[#fff7f0] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#81593c]">
              Global Excellence
            </span>

            <Link href="/" aria-label="Larkosis Pharma Home" className="mt-4 inline-flex items-center">
              <Image
                src="/larko.png"
                alt="Larkosis Pharma Logo"
                width={300}
                height={108}
                className="h-20 w-auto object-contain sm:h-24"
              />
            </Link>

            <p className="mt-4 max-w-xl font-serif text-[34px] leading-[1.08] text-[#1f1712] sm:text-[40px]">
              Precision formulations with world-class supply confidence.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#5f4a3f]">{companyProfile.overview}</p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={`mailto:${companyProfile.email}`}
                className="inline-flex items-center rounded-md bg-[#1f1712] px-5 py-2.5 text-sm font-semibold text-[#fff9f3] transition-all hover:-translate-y-0.5 hover:bg-[#0f0b08]"
              >
                Start Enquiry
              </a>
              <a
                href={companyProfile.documents.productListPdf}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-md border border-[#cfb39c] bg-[#fff] px-5 py-2.5 text-sm font-semibold text-[#3f2d24] transition-all hover:-translate-y-0.5 hover:border-[#ec671f] hover:text-[#ec671f]"
              >
                View Product List
              </a>
            </div>
          </div>

          <div className="lg:pl-6">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#886a57]">Explore</h3>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center text-sm font-semibold text-[#291e18] transition-all hover:translate-x-1 hover:text-[#ec671f]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/sitemap.xml"
              className="mt-6 inline-flex text-xs font-semibold uppercase tracking-[0.1em] text-[#7d6658] underline decoration-[#d9beae] underline-offset-4 hover:text-[#ec671f]"
            >
              Sitemap
            </Link>
          </div>

          <div className="lg:pl-6">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#886a57]">Contact</h3>
            <address className="mt-4 space-y-3 not-italic text-sm text-[#3f2d24]">
              <p className="font-semibold text-[#231912]">{companyProfile.legalName}</p>
              <p className="leading-relaxed text-[#5f4a3f]">{companyProfile.officeAddress}</p>
              <a href={`mailto:${companyProfile.email}`} className="block break-all transition-colors hover:text-[#ec671f]">
                {companyProfile.email}
              </a>
              {companyProfile.phone ? (
                <a href={`tel:${companyProfile.phone}`} className="block transition-colors hover:text-[#ec671f]">
                  {companyProfile.phone}
                </a>
              ) : null}
            </address>
          </div>
        </div>

        <div className="mt-6 border-t border-[#ead7cb] pt-4">
          <div className="flex flex-col gap-2 text-center text-xs text-[#7d6658] md:flex-row md:items-center md:justify-between md:text-left">
            <p>&copy; {year} Larkosis Pharma. All rights reserved.</p>
            
          </div>
        </div>
      </div>
    </footer>
  );
}
