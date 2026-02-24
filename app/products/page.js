import CatalogClient from "./catalog-client";
import { getAllProducts, getCategoryCounts } from "@/lib/catalog";
import { companyProfile } from "@/data/companyProfile";
import Link from "next/link";
import { Suspense } from "react";

export const metadata = {
  title: "Products | Larkosis Pharma",
  description:
    "Browse the Larkosis Pharma product catalog and submit quote requests.",
};

function CatalogFallback() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-[#f2d6c4] bg-white p-8 text-center text-sm font-medium text-[#6c4630]">
        Loading product catalog...
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const products = getAllProducts();
  const categories = getCategoryCounts();

  // Calculate additional stats
  const totalStrengths = new Set(products.map(p => p.strength).filter(Boolean)).size;
  const totalDosageForms = new Set(products.map(p => p.dosageForm).filter(Boolean)).size;

  // Get top categories by product count
  const topCategories = categories
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <div className="pb-10">
      {/* Hero Section with Enhanced Visuals */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fff7f1] via-[#fbe4d5] to-[#fffaf6]">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-10 top-8 h-72 w-72 rounded-full bg-[#f4b083]/20 blur-3xl animate-float-slow" />
          <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-[#00923f]/10 blur-3xl animate-float-delayed" />
          <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[#ec671f]/10 blur-3xl animate-pulse-slow" />
          
          {/* Grid Pattern Overlay */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #99522b 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
          />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm">
            <Link href="/" className="text-[#99522b] hover:text-[#ec671f] transition-colors">
              Home
            </Link>
            <span className="text-[#b18b75]">/</span>
            <span className="font-semibold text-[#5f4434]">Products</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-[1.5fr,1fr] lg:gap-16">
            {/* Left Column - Text Content */}
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-1.5 backdrop-blur-sm border border-[#efc9af]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ec671f] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ec671f]"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#99522b]">
                  Product Catalog
                </span>
              </div>
              
              <h1 className="mt-4 text-4xl font-bold text-[#251b14] sm:text-5xl lg:text-6xl">
                Pharmaceutical
                <span className="block text-[#ec671f]">Product Portfolio</span>
              </h1>
              
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#5f4434] sm:text-lg">
                All listed items from the provided product PDF are available in this
                searchable portal. Use filters, open product details, and request a
                quotation directly from each product page.
              </p>

              {/* Quick Stats */}
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-xl bg-white/70 backdrop-blur-sm border border-[#efc9af] p-4">
                  <p className="text-2xl font-bold text-[#ec671f]">{products.length}</p>
                  <p className="text-xs uppercase tracking-wider text-[#7f4b2f]">Total Products</p>
                </div>
                <div className="rounded-xl bg-white/70 backdrop-blur-sm border border-[#efc9af] p-4">
                  <p className="text-2xl font-bold text-[#ec671f]">{categories.length}</p>
                  <p className="text-xs uppercase tracking-wider text-[#7f4b2f]">Categories</p>
                </div>
                <div className="rounded-xl bg-white/70 backdrop-blur-sm border border-[#efc9af] p-4">
                  <p className="text-2xl font-bold text-[#ec671f]">{totalDosageForms}</p>
                  <p className="text-xs uppercase tracking-wider text-[#7f4b2f]">Dosage Forms</p>
                </div>
                <div className="rounded-xl bg-white/70 backdrop-blur-sm border border-[#efc9af] p-4">
                  <p className="text-2xl font-bold text-[#ec671f]">{totalStrengths}</p>
                  <p className="text-xs uppercase tracking-wider text-[#7f4b2f]">Strengths</p>
                </div>
              </div>

              {/* Download Buttons */}
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={companyProfile.documents.productListPdf}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-[#ec671f] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#d95f1d] hover:shadow-lg"
                >
                  <span className="relative z-10">Download Product List PDF</span>
                  <svg className="relative z-10 h-4 w-4 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <div className="absolute inset-0 -z-0 bg-gradient-to-r from-[#ec671f] to-[#e33c6f] opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
                
                <a
                  href={companyProfile.documents.companyProfilePdf}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-[#e1b99f] bg-white/70 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-[#6c3f27] transition-all hover:bg-white hover:shadow-md"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  </svg>
                  Company Profile PDF
                </a>
              </div>
            </div>

            {/* Right Column - Visual Elements */}
            <div className="relative hidden lg:block animate-fade-up-delayed">
              <div className="sticky top-24 rounded-2xl bg-white/60 backdrop-blur-sm border border-[#efc9af] p-6 shadow-xl">
                <h3 className="text-lg font-bold text-[#251b14]">Top Categories</h3>
                <div className="mt-4 space-y-3">
                  {topCategories.map((cat, index) => (
                    <div key={cat.name} className="group flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ec671f]/10 text-xs font-bold text-[#ec671f]">
                          {index + 1}
                        </span>
                        <span className="text-sm font-medium text-[#5f4434] group-hover:text-[#ec671f] transition-colors">
                          {cat.name}
                        </span>
                      </div>
                      <span className="rounded-full bg-[#f4b083]/20 px-2 py-0.5 text-xs font-semibold text-[#99522b]">
                        {cat.count}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 border-t border-[#efc9af] pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#7f4b2f]">Quick Actions</span>
                    <Link 
                      href="#catalog"
                      className="font-semibold text-[#ec671f] hover:underline"
                    >
                      Browse All -&gt;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Section with Anchor */}
      <div id="catalog">
        <Suspense fallback={<CatalogFallback />}>
          <CatalogClient products={products} categories={categories} />
        </Suspense>
      </div>

      {/* Optional: Add a CTA Section */}
      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0f3558] to-[#1a4a73] p-8 sm:p-12">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#ec671f] blur-3xl" />
          </div>
          
          <div className="relative grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Need a Custom Quote?
              </h2>
              <p className="mt-4 text-white/90">
                Contact our team for bulk orders, special requirements, or technical documentation.
              </p>
            </div>
            <div className="flex items-center justify-start lg:justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-bold text-[#0f3558] transition-all hover:bg-[#ec671f] hover:text-white hover:shadow-xl"
              >
                Request Quote
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

