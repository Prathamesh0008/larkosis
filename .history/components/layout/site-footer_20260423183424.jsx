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
    <footer className="mt-14 border-t border-[#ece4dd] bg-[#fffdfb]">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-4">
            <Link href="/" aria-label="Larkosis Pharma Home" className="inline-flex items-center">
              <Image
                src="/larko.png"
                alt="Larkosis Pharma Logo"
                width={240}
                height={88}
                className="h-20 w-auto object-contain"
              />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-[#5f4a3f]">
              {companyProfile.overview}
            </p>
            <a
              href={`mailto:${companyProfile.email}`}
              className="inline-flex rounded-md bg-[#ec671f] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#d55e1f]"
            >
              Request Quote
            </a>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8a6a56]">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-[#3f2d24] transition-colors hover:text-[#ec671f]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href={companyProfile.documents.productListPdf}
              target="_blank"
              rel="noreferrer"
              className="inline-flex text-sm font-medium text-[#3f2d24] underline decoration-[#ddc9bb] underline-offset-4 transition-colors hover:text-[#ec671f]"
            >
              Product List PDF
            </a>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8a6a56]">
              Contact
            </h3>
            <address className="space-y-2 not-italic text-sm text-[#3f2d24]">
              <p className="font-semibold">{companyProfile.legalName}</p>
              <p className="leading-relaxed">{companyProfile.officeAddress}</p>
              <a href={`mailto:${companyProfile.email}`} className="break-all transition-colors hover:text-[#ec671f]">
                {companyProfile.email}
              </a>
            </address>
          </div>
        </div>

        <div className="mt-8 border-t border-[#ece4dd] pt-4">
          <div className="flex flex-col gap-2 text-center text-xs text-[#7d6658] md:flex-row md:items-center md:justify-between md:text-left">
            <p>&copy; {year} Larkosis Pharma. All rights reserved.</p>
            <div className="flex items-center justify-center gap-3 md:justify-end">
              <Link href="/about" className="transition-colors hover:text-[#ec671f]">
                About
              </Link>
              <span className="text-[#ccb8aa]">&bull;</span>
              <Link href="/products" className="transition-colors hover:text-[#ec671f]">
                Products
              </Link>
              <span className="text-[#ccb8aa]">&bull;</span>
              <Link href="/sitemap.xml" className="transition-colors hover:text-[#ec671f]">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
