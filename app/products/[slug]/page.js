import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProductCard from "@/components/product-card";
import { companyProfile } from "@/data/companyProfile";
import {
  buildQuoteMailto,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/catalog";
import { buildProductFaqs } from "@/lib/product-faqs";

// Helper functions for product details
function extractPharmSpec(details) {
  const matches = details.match(/\b(BP\/USP|BP|USP|INH|IP|IH)\b/gi) ?? [];
  const unique = [...new Set(matches.map((item) => item.toUpperCase()))];
  return unique.length > 0 ? unique.join(", ") : null;
}

function extractPackSize(details) {
  const patterns = [
    /(\d+\s*[xX]\s*\d+(?:\s*[xX]\s*\d+)?(?:\s*'?s)?)/i,
    /(\d+\s*(?:ml|g|mg|mcg|tablet|cap|vial|ampoule|bottle|pouch|kit)s?)/i,
    /(vial(?:\s*of)?\s*[^,.;]+)/i,
    /(bottle(?:\s*of)?\s*[^,.;]+)/i,
    /(ampoule(?:\s*of)?\s*[^,.;]+)/i,
    /(pouch(?:\s*of)?\s*[^,.;]+)/i,
    /(kit)/i,
  ];

  for (const pattern of patterns) {
    const match = details.match(pattern);
    if (match?.[1]) {
      return match[1].trim();
    }
  }

  return null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | Larkosis Pharma",
    };
  }

  return {
    title: `${product.name} | Larkosis Pharma`,
    description: `Detailed product information, FAQ, and quotation request for ${product.name}. ${product.details.substring(0, 160)}`,
    openGraph: {
      title: `${product.name} | Larkosis Pharma`,
      description: product.details.substring(0, 200),
      type: 'article',
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product, 6);
  const faqs = buildProductFaqs(product);
  
  // Extract additional details
  const pharmSpec = extractPharmSpec(product.details);
  const packSize = extractPackSize(product.details);
  const casId = product.casId && product.casId !== "--" ? product.casId : null;

  return (
    <div className="pb-14">
      {/* Hero Section with Breadcrumb */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fff7f1] via-[#fbe4d5] to-[#fffbf8]">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-10 top-8 h-64 w-64 rounded-full bg-[#f4b083]/20 blur-3xl animate-float-slow" />
          <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-[#00923f]/10 blur-3xl animate-float-delayed" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Enhanced Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
            <Link href="/" className="text-[#6d4832] hover:text-[#e36c0a] transition-colors">
              Home
            </Link>
            <svg className="h-4 w-4 text-[#b18b75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/products" className="text-[#6d4832] hover:text-[#e36c0a] transition-colors">
              Products
            </Link>
            <svg className="h-4 w-4 text-[#b18b75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="font-semibold text-[#e36c0a] truncate max-w-[200px] sm:max-w-xs">
              {product.name}
            </span>
          </nav>

          <div className="mt-6 max-w-4xl">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-[#ec671f]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#ec671f]">
                {product.category}
              </span>
              {pharmSpec && (
                <span className="rounded-full bg-[#0f3558]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0f3558]">
                  {pharmSpec}
                </span>
              )}
              {casId && (
                <span className="rounded-full bg-[#00923f]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#00923f]">
                  CAS: {casId}
                </span>
              )}
            </div>
            <h1 className="mt-3 text-4xl font-bold text-[#251b14] sm:text-5xl lg:text-6xl">
              {product.name}
            </h1>
            <p className="mt-4 text-lg text-[#5e4435] max-w-3xl">
              {product.dosageForm} • {product.strength}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto mt-8 grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
        {/* Left Column - Main Product Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Product Summary Card */}
          <article className="rounded-2xl border border-[#f2d6c4] bg-white p-6 shadow-lg sm:p-8">
            <h2 className="text-2xl font-bold text-[#281c14]">Product Specifications</h2>
            
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-gradient-to-br from-[#fff7f2] to-[#fff] p-4 border border-[#efd6c6]">
                <dt className="text-xs font-semibold uppercase tracking-wider text-[#9b552d]">Category</dt>
                <dd className="mt-1 text-lg font-semibold text-[#37261c]">{product.category}</dd>
              </div>
              
              <div className="rounded-xl bg-gradient-to-br from-[#fff7f2] to-[#fff] p-4 border border-[#efd6c6]">
                <dt className="text-xs font-semibold uppercase tracking-wider text-[#9b552d]">Dosage Form</dt>
                <dd className="mt-1 text-lg font-semibold text-[#37261c]">{product.dosageForm}</dd>
              </div>
              
              <div className="rounded-xl bg-gradient-to-br from-[#fff7f2] to-[#fff] p-4 border border-[#efd6c6]">
                <dt className="text-xs font-semibold uppercase tracking-wider text-[#9b552d]">Strength</dt>
                <dd className="mt-1 text-lg font-semibold text-[#37261c]">{product.strength}</dd>
              </div>
              
              {packSize && (
                <div className="rounded-xl bg-gradient-to-br from-[#fff7f2] to-[#fff] p-4 border border-[#efd6c6]">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-[#9b552d]">Pack Size</dt>
                  <dd className="mt-1 text-lg font-semibold text-[#37261c]">{packSize}</dd>
                </div>
              )}
            </div>

            <div className="mt-6 rounded-xl border border-[#efd6c6] bg-gradient-to-br from-[#fffdfb] to-white p-5">
              <h3 className="flex items-center gap-2 text-lg font-bold text-[#2b1e16]">
                <svg className="h-5 w-5 text-[#ec671f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Detailed Description
              </h3>
              <p className="mt-3 text-base leading-relaxed text-[#5f4536]">
                {product.details}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={buildQuoteMailto(product.name)}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-[#00923f] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#007e35] hover:shadow-lg"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Request Quote for This Product
              </a>
              
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-[#e5bca3] bg-white px-6 py-3 text-sm font-bold text-[#7c4728] transition-all hover:bg-[#fff6f0] hover:shadow-md"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Contact Sales Team
              </Link>
            </div>
          </article>

          {/* Technical Specifications Table */}
          <article className="rounded-2xl border border-[#f2d6c4] bg-white p-6 shadow-lg sm:p-8">
            <h2 className="text-2xl font-bold text-[#281c14]">Technical Details</h2>
            
            <div className="mt-6 overflow-hidden rounded-xl border border-[#efd6c6]">
              <table className="min-w-full divide-y divide-[#efd6c6]">
                <tbody className="divide-y divide-[#efd6c6]">
                  <tr className="bg-[#fff9f5]">
                    <td className="px-4 py-3 text-sm font-semibold text-[#37261c]">Product Name</td>
                    <td className="px-4 py-3 text-sm text-[#5f4536]">{product.name}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-semibold text-[#37261c]">Category</td>
                    <td className="px-4 py-3 text-sm text-[#5f4536]">{product.category}</td>
                  </tr>
                  <tr className="bg-[#fff9f5]">
                    <td className="px-4 py-3 text-sm font-semibold text-[#37261c]">Dosage Form</td>
                    <td className="px-4 py-3 text-sm text-[#5f4536]">{product.dosageForm}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-semibold text-[#37261c]">Strength</td>
                    <td className="px-4 py-3 text-sm text-[#5f4536]">{product.strength}</td>
                  </tr>
                  {packSize && (
                    <tr className="bg-[#fff9f5]">
                      <td className="px-4 py-3 text-sm font-semibold text-[#37261c]">Pack Size</td>
                      <td className="px-4 py-3 text-sm text-[#5f4536]">{packSize}</td>
                    </tr>
                  )}
                  {pharmSpec && (
                    <tr>
                      <td className="px-4 py-3 text-sm font-semibold text-[#37261c]">Pharmacopoeia</td>
                      <td className="px-4 py-3 text-sm text-[#5f4536]">{pharmSpec}</td>
                    </tr>
                  )}
                  {casId && (
                    <tr className="bg-[#fff9f5]">
                      <td className="px-4 py-3 text-sm font-semibold text-[#37261c]">CAS ID</td>
                      <td className="px-4 py-3 text-sm text-[#5f4536]">{casId}</td>
                    </tr>
                  )}
                  <tr className="bg-[#fff9f5]">
                    <td className="px-4 py-3 text-sm font-semibold text-[#37261c]">Product ID</td>
                    <td className="px-4 py-3 text-sm text-[#5f4536]">{product.id}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>
        </div>

        {/* Right Column - FAQ and Quick Actions */}
        <div className="space-y-6">
          {/* FAQ Section */}
          <aside className="rounded-2xl border border-[#f2d6c4] bg-white p-6 shadow-lg">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-[#281c14]">
              <svg className="h-6 w-6 text-[#ec671f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Frequently Asked Questions
            </h2>
            
            <div className="mt-4 space-y-3">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group rounded-xl border border-[#efd6c6] bg-[#fff9f5] p-4 transition-all hover:border-[#ec671f]/30"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-[#3f2b1f]">
                    <span>{faq.question}</span>
                    <svg className="h-4 w-4 text-[#ec671f] transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[#5f4536] border-t border-[#efd6c6] pt-3">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>

            <div className="mt-4 text-center">
              <Link href="/contact" className="text-sm font-semibold text-[#ec671f] hover:underline">
                Still have questions? Contact us →
              </Link>
            </div>
          </aside>

          {/* Quick Actions Card */}
          <aside className="rounded-2xl border border-[#f2d6c4] bg-gradient-to-br from-[#0f3558] to-[#1a4a73] p-6 text-white shadow-lg">
            <h3 className="text-lg font-bold">Need Assistance?</h3>
            <p className="mt-2 text-sm text-white/90">
              Our pharmaceutical experts are here to help with technical specifications and bulk orders.
            </p>
            <div className="mt-4 space-y-2">
              <a
                href={`tel:${companyProfile.phone}`}
                className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call: {companyProfile.phone}
              </a>
              <a
                href={`mailto:${companyProfile.email}`}
                className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email: {companyProfile.email}
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="mx-auto mt-12 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-bold text-[#281c14] sm:text-3xl">
                Related Products
              </h2>
              <p className="mt-1 text-sm text-[#5f4536]">
                Other formulations in {product.category}
              </p>
            </div>
            <Link
              href="/products"
              className="group flex items-center gap-1 text-sm font-bold text-[#ec671f] hover:gap-2 transition-all"
            >
              View All Products
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
