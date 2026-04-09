import Image from "next/image";
import Link from "next/link";

export default function SiteFooter({ companyProfile, year }) {
  return (
    <footer className="relative mt-14 overflow-hidden border-t border-[#f0d8ca] bg-[linear-gradient(180deg,#fff8f2_0%,#fff0e4_45%,#fde8dc_100%)]">
      <div className="pointer-events-none absolute -left-12 top-10 hidden h-44 w-44 rounded-full bg-[#ec671f]/15 blur-3xl lg:block" />
      <div className="pointer-events-none absolute -right-12 bottom-12 hidden h-48 w-48 rounded-full bg-[#00923f]/10 blur-3xl lg:block" />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-9">
        <div className="grid gap-8 py-8 lg:gap-12">
          <div className="grid gap-6 md:grid-cols-2 md:items-center md:gap-8">
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
                />
              </Link>

              <p className="max-w-xl text-sm leading-relaxed text-[#5f4332] md:text-base">
                {companyProfile.overview}
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={`mailto:${companyProfile.email}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#ec671f] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#ec671f]/20 transition-all hover:-translate-y-0.5 hover:bg-[#d95f1d] hover:shadow-xl"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Get Quote
                </a>
              </div>
            </div>

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

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl bg-white/70 p-5 backdrop-blur-sm">
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#7a4a2f]">
                <span className="h-1 w-5 rounded-full bg-[#00923f]" />
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
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                    <div>
                      <p className="font-medium text-[#513828]">Product List</p>
                      <p className="text-xs text-[#8b6f5c]">PDF, 1.8 MB</p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-white/70 p-5 backdrop-blur-sm">
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#7a4a2f]">
                <span className="h-1 w-5 rounded-full bg-[#ec671f]" />
                Contact
              </h3>
              <address className="mt-4 space-y-3 not-italic text-sm">
                <p className="font-semibold text-[#513828]">{companyProfile.legalName}</p>
                <p className="flex gap-2 text-[#513828]">
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-[#ec671f]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="leading-relaxed">{companyProfile.officeAddress}</span>
                </p>
                <p className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-[#ec671f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <a href={`mailto:${companyProfile.email}`} className="break-all hover:text-[#ec671f]">
                    {companyProfile.email}
                  </a>
                </p>
              </address>
            </div>
          </div>

          <div className="border-t border-[#f1d9c9] pt-6">
            <div className="flex flex-col items-center justify-between gap-4 text-center lg:flex-row lg:text-left">
              <p className="text-xs text-[#6b5140]">&copy; {year} Larkosis Pharma. All rights reserved.</p>

              <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
                <Link href="/privacy" className="text-[#6b5140] transition-colors hover:text-[#ec671f]">
                  Privacy Policy
                </Link>
                <span className="text-[#f1d9c9]">&bull;</span>
                <Link href="/terms" className="text-[#6b5140] transition-colors hover:text-[#ec671f]">
                  Terms of Use
                </Link>
                <span className="text-[#f1d9c9]">&bull;</span>
                <Link href="/sitemap.xml" className="text-[#6b5140] transition-colors hover:text-[#ec671f]">
                  Sitemap
                </Link>
              </div>

              <p className="text-xs text-[#8b6f5c]">For business inquiries only</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
