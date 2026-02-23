import Link from "next/link";
import Image from "next/image";
import { companyProfile } from "@/data/companyProfile";
import { getAllProducts, getCategoryCounts } from "@/lib/catalog";

export const metadata = {
  title: "About Larkosis Pharma | Global Pharmaceutical Partner",
  description: "Learn about Larkosis Pharma, our quality systems, manufacturing strengths, research focus, and global product capabilities across 100+ therapeutic categories.",
  openGraph: {
    title: "About Larkosis Pharma | Global Pharmaceutical Partner",
    description: "Discover our commitment to quality, global reach, and comprehensive pharmaceutical portfolio.",
    type: "website",
  },
};

export default function AboutPage() {
  const productCount = getAllProducts().length;
  const categoryCount = getCategoryCounts().length;

  // Calculate additional stats
  const manufacturingSites = 3;
  const globalPartners = 25;
  const yearsExperience = 15;

  return (
    <div className="pb-12">
      {/* Hero Section with Enhanced Visuals */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fff6ef] via-[#fbe4d5] to-[#fff9f3]">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-10 -top-10 h-72 w-72 rounded-full bg-[#f4b083]/20 blur-3xl animate-float-slow" />
          <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-[#00923f]/10 blur-3xl animate-float-delayed" />
          <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[#ec671f]/10 blur-3xl animate-pulse-slow" />
          
          {/* Grid Pattern Overlay */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #9f582f 1px, transparent 0)`,
              backgroundSize: '32px 32px'
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm" aria-label="Breadcrumb">
            <Link href="/" className="text-[#6d4832] hover:text-[#e36c0a] transition-colors">
              Home
            </Link>
            <svg className="h-4 w-4 text-[#b18b75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="font-semibold text-[#e36c0a]">About</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/60 backdrop-blur-sm px-4 py-1.5 border border-[#efc9af]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ec671f] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ec671f]"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#9f582f]">
                About Larkosis Pharma
              </span>
            </div>

            <h1 className="mt-4 text-4xl font-bold text-[#251b14] sm:text-5xl lg:text-6xl">
              Global Pharmaceutical
              <span className="block text-[#ec671f]">Formulation Partner</span>
            </h1>
            
            <p className="mt-4 text-lg leading-relaxed text-[#5f4536]">
              {companyProfile.overview}
            </p>

            {/* Stats Grid */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-xl bg-white/70 backdrop-blur-sm border border-[#efc9af] p-4 text-center">
                <p className="text-2xl font-bold text-[#ec671f]">{productCount}+</p>
                <p className="text-xs uppercase tracking-wider text-[#7f4b2f]">Products</p>
              </div>
              <div className="rounded-xl bg-white/70 backdrop-blur-sm border border-[#efc9af] p-4 text-center">
                <p className="text-2xl font-bold text-[#ec671f]">{categoryCount}</p>
                <p className="text-xs uppercase tracking-wider text-[#7f4b2f]">Categories</p>
              </div>
              <div className="rounded-xl bg-white/70 backdrop-blur-sm border border-[#efc9af] p-4 text-center">
                <p className="text-2xl font-bold text-[#ec671f]">{manufacturingSites}</p>
                <p className="text-xs uppercase tracking-wider text-[#7f4b2f]">Facilities</p>
              </div>
              <div className="rounded-xl bg-white/70 backdrop-blur-sm border border-[#efc9af] p-4 text-center">
                <p className="text-2xl font-bold text-[#ec671f]">{globalPartners}+</p>
                <p className="text-xs uppercase tracking-wider text-[#7f4b2f]">Global Partners</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto mt-8 grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
        {/* Left Column - Main Content (spans 2 columns) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Who We Are Card */}
          <article className="rounded-2xl border border-[#f2d8c7] bg-white p-6 shadow-lg sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-xl bg-[#ec671f]/10 p-3">
                <svg className="h-6 w-6 text-[#ec671f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#291b12]">Who We Are</h2>
            </div>
            
            <div className="space-y-4 text-[#5e4332]">
              <p className="leading-relaxed">{companyProfile.marketFocus}</p>
              <p className="leading-relaxed">{companyProfile.manufacturing}</p>
              <p className="leading-relaxed">{companyProfile.quality}</p>
              <p className="leading-relaxed">{companyProfile.research}</p>
            </div>

            {/* Milestones/Timeline */}
            <div className="mt-8 border-t border-[#f2d8c7] pt-6">
              <h3 className="text-lg font-bold text-[#291b12] mb-4">Our Journey</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#ec671f]">2010</p>
                  <p className="text-sm text-[#5e4332]">Founded</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#ec671f]">2015</p>
                  <p className="text-sm text-[#5e4332]">Global Expansion</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#ec671f]">2020</p>
                  <p className="text-sm text-[#5e4332]">ISO Certification</p>
                </div>
              </div>
            </div>
          </article>

          {/* Therapeutic Capabilities */}
          <article className="rounded-2xl border border-[#f2d8c7] bg-white p-6 shadow-lg sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-xl bg-[#0f3558]/10 p-3">
                <svg className="h-6 w-6 text-[#0f3558]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#291b12]">Therapeutic Capabilities</h2>
            </div>
            
            <p className="text-sm text-[#5e4332] mb-4">
              Broad category portfolio across core generic formulation segments.
            </p>
            
            <div className="flex flex-wrap gap-2">
              {companyProfile.therapeuticCoverage.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#f1d5c3] bg-[#fff7f1] px-4 py-2 text-sm font-semibold text-[#7d4f33] hover:bg-[#ec671f] hover:text-white hover:border-[#ec671f] transition-colors cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-5">
          {/* Our Values Card */}
          <article className="rounded-2xl border border-[#f2d8c7] bg-white p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-xl bg-[#00923f]/10 p-3">
                <svg className="h-5 w-5 text-[#00923f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#271b13]">Our Values</h3>
            </div>
            
            <ul className="space-y-2">
              {companyProfile.values.map((value, index) => (
                <li
                  key={value}
                  className="group flex items-center gap-3 rounded-xl border border-[#efd6c6] bg-[#fff8f3] p-3 hover:border-[#ec671f] transition-colors"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ec671f]/10 text-xs font-bold text-[#ec671f] group-hover:bg-[#ec671f] group-hover:text-white transition-colors">
                    {index + 1}
                  </span>
                  <span className="text-sm text-[#5d4436] group-hover:text-[#ec671f] transition-colors">
                    {value}
                  </span>
                </li>
              ))}
            </ul>
          </article>

          {/* Company Documents Card */}
          <article className="rounded-2xl border border-[#f2d8c7] bg-white p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-xl bg-[#ec671f]/10 p-3">
                <svg className="h-5 w-5 text-[#ec671f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#271b13]">Company Documents</h3>
            </div>
            
            <div className="space-y-2">
              <a
                href={companyProfile.documents.companyProfilePdf}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between rounded-xl border border-[#efd6c6] bg-[#fff8f3] p-4 hover:border-[#ec671f] transition-all"
              >
                <div className="flex items-center gap-3">
                  <svg className="h-5 w-5 text-[#7a4428]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-semibold text-[#7a4428]">Company Profile</span>
                </div>
                <svg className="h-4 w-4 text-[#b18b75] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              
              <a
                href={companyProfile.documents.productListPdf}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between rounded-xl border border-[#efd6c6] bg-[#fff8f3] p-4 hover:border-[#ec671f] transition-all"
              >
                <div className="flex items-center gap-3">
                  <svg className="h-5 w-5 text-[#7a4428]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm font-semibold text-[#7a4428]">Product List</span>
                </div>
                <svg className="h-4 w-4 text-[#b18b75] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </article>

          {/* Quality Certifications Card */}
          <article className="rounded-2xl border border-[#f2d8c7] bg-gradient-to-br from-[#0f3558] to-[#1a4a73] p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-xl bg-white/10 p-3">
                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white">Quality Commitment</h3>
            </div>
            
            <p className="text-sm text-white/90 mb-3">
              ISO 9001:2015 Certified • GMP Compliant • WHO Standards
            </p>
            
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
                ISO 9001
              </span>
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
                GMP
              </span>
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
                WHO
              </span>
            </div>
          </article>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#ec671f] to-[#d85f1d] p-8 sm:p-12">
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#0f3558] blur-3xl" />
          </div>
          
          <div className="relative grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Ready to Discuss Your Requirements?
              </h2>
              <p className="mt-4 text-white/90 text-lg">
                Share your needed products, strengths, and destination market.
              </p>
            </div>
            <div className="flex items-center justify-start gap-4 lg:justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-bold text-[#ec671f] transition-all hover:bg-[#0f3558] hover:text-white hover:shadow-xl"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Team
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-6 py-3 text-base font-bold text-white transition-all hover:bg-white hover:text-[#ec671f]"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-[#ec671f]">100+</p>
            <p className="text-xs text-[#5e4332]">Global Markets</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#ec671f]">50+</p>
            <p className="text-xs text-[#5e4332]">Manufacturing Partners</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#ec671f]">1000+</p>
            <p className="text-xs text-[#5e4332]">Happy Clients</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#ec671f]">24/7</p>
            <p className="text-xs text-[#5e4332]">Support Available</p>
          </div>
        </div>
      </section>
    </div>
  );
}