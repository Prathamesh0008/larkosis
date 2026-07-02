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
    <footer className="relative mt-10 overflow-hidden bg-[#241a14] text-white">
      <div className="h-1 w-full bg-gradient-to-r from-[#ec671f] via-[#f4b083] to-[#ec671f]" />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 items-start gap-10 text-left md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="flex flex-col items-start space-y-4">
            <Image
              src="/larko.png"
              alt="Larkosis Pharma Logo"
              width={320}
              height={120}
              className="h-auto w-[170px] object-contain"
            />

            <p className="max-w-sm text-sm leading-relaxed text-[#eadbd2]">
              <span className="font-semibold text-white">{companyProfile.brand}</span>
              <br />
              {companyProfile.overview}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold uppercase text-[#ec671f]">
              Quick Links
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
              Contact
            </h3>

            <ul className="space-y-2 text-sm text-[#eadbd2]">
              <li>{companyProfile.officeAddress}</li>
              <li>
                <span className="font-semibold text-white">Email:</span>{" "}
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

          <div>
            <h3 className="mb-4 text-lg font-semibold uppercase text-[#ec671f]">
              Resources
            </h3>

            <div className="flex flex-col gap-3">
              <a
                href={companyProfile.documents.companyProfilePdf}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[#ec671f] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#d55e1f]"
              >
                Company Profile
              </a>
              <a
                href={companyProfile.documents.productListPdf}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Download Product List
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-[#1b140f] px-4 py-4 text-center text-sm text-[#d7c6bc]">
        &copy; {year} <span className="font-medium text-white">{companyProfile.brand}</span> | All Rights Reserved
      </div>
    </footer>
  );
}
