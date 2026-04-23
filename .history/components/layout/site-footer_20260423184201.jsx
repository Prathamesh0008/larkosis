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
        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.8fr_1fr]">
          <div className="rounded-2xl border border-[#edd7c8] bg-white/80 p-6 shadow-[0_16px_42px_-30px_rgba(63,45,36,0.8)] backdrop-blur-sm">
            <Link href="/" aria-label="Larkosis Pharma Home" className="inline-flex items-center">
              <Image
                src="/larko.png"
                alt="Larkosis Pharma Logo"
                width={260}
                height={95}
                className="h-20 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 max-w-lg font-serif text-2xl leading-tight text-[#2f221b]">
              Trusted pharmaceutical formulations for global markets.
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#614c40]">{companyProfile.overview}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${companyProfile.email}`}
                className="inline-flex items-center rounded-full bg-[#ec671f] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#d55e1f]"
              >
                Request Quote
              </a>
              <a
                href={companyProfile.documents.productListPdf}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-[#dfc7b7] bg-white px-5 py-2.5 text-sm font-medium text-[#3f2d24] transition-all hover:-translate-y-0.5 hover:border-[#ec671f] hover:text-[#ec671f]"
              >
                Download Product List
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-[#edd7c8] bg-white/75 p-6 backdrop-blur-sm">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8a6a56]">Quick Links</h3>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex text-sm font-medium text-[#3f2d24] transition-all hover:translate-x-1 hover:text-[#ec671f]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/sitemap.xml"
              className="mt-5 inline-flex text-xs font-semibold uppercase tracking-[0.1em] text-[#7d6658] underline decoration-[#d8bba8] underline-offset-4 hover:text-[#ec671f]"
            >
              XML Sitemap
            </Link>
          </div>

          <div className="rounded-2xl border border-[#edd7c8] bg-white/75 p-6 backdrop-blur-sm">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8a6a56]">Contact</h3>
            <address className="mt-4 space-y-3 not-italic text-sm text-[#3f2d24]">
              <p className="font-semibold">{companyProfile.legalName}</p>
              <p className="leading-relaxed text-[#5c473b]">{companyProfile.officeAddress}</p>
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

        <div className="mt-8 border-t border-[#e8d7cb] pt-4">
          <div className="flex flelx-co gap-2 text-center text-xs text-[#7d6658] md:flex-row md:items-center  ">
            <p>&copy; {year} Larkosis Pharma. All rights reserved.</p>
           
          </div>
        </div>
      </div>
    </footer>
  );
}
