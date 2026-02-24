import ContactForm from "./contact-form";
import { companyProfile } from "@/data/companyProfile";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Contact | Larkosis Pharma",
  description:
    "Contact Larkosis Pharma for product availability, documentation, and quotations. Get expert pharmaceutical support and business inquiries answered within 24 hours.",
  openGraph: {
    title: "Contact Larkosis Pharma | Global Pharmaceutical Supplier",
    description: "Reach out for product inquiries, quotations, and technical documentation.",
    type: "website",
  },
};

export default function ContactPage() {
  // Business hours calculation
  const currentHour = new Date().getHours();
  const isBusinessHours = currentHour >= 9 && currentHour <= 18;

  return (
    <div className="pb-12">
      {/* Hero Section with Enhanced Visuals */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fff6ef] via-[#fbe4d5] to-[#fff9f3]">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-10 -top-10 h-64 w-64 rounded-full bg-[#f4b083]/20 blur-3xl animate-float-slow" />
          <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-[#00923f]/10 blur-3xl animate-float-delayed" />
          <div className="absolute bottom-0 left-1/4 h-48 w-48 rounded-full bg-[#ec671f]/10 blur-3xl animate-pulse-slow" />
          
          {/* Grid Pattern */}
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
            <span className="font-semibold text-[#e36c0a]">Contact</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/60 backdrop-blur-sm px-4 py-1.5 border border-[#efc9af]">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isBusinessHours ? 'bg-green-500' : 'bg-yellow-500'} opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isBusinessHours ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#9f582f]">
                {isBusinessHours ? 'Online - Response within 24h' : 'Away - Will respond next business day'}
              </span>
            </div>

            <h1 className="mt-4 text-4xl font-bold text-[#251b14] sm:text-5xl lg:text-6xl">
              Let&apos;s Discuss Your
              <span className="block text-[#ec671f]">Pharmaceutical Requirements</span>
            </h1>
            
            <p className="mt-4 text-lg leading-relaxed text-[#5f4536] max-w-2xl">
              Share your product list and quantity requirements. Our team will
              respond with quotation-oriented guidance, documentation support, and
              next steps.
            </p>

            {/* Quick Stats */}
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-[#ec671f]/10 p-2">
                  <svg className="h-4 w-4 text-[#ec671f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-sm text-[#5f4536]">24h Response Time</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-[#ec671f]/10 p-2">
                  <svg className="h-4 w-4 text-[#ec671f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-sm text-[#5f4536]">Direct Phone Support</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-[#ec671f]/10 p-2">
                  <svg className="h-4 w-4 text-[#ec671f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-sm text-[#5f4536]">Technical Docs Available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto mt-8 grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
        {/* Left Column - Contact Form (spans 2 columns) */}
        <div className="lg:col-span-2">
          <ContactForm />
        </div>

        {/* Right Column - Contact Info */}
        <div className="space-y-5">
          {/* Corporate Office Card */}
          <article className="group rounded-2xl border border-[#f2d8c7] bg-white p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-start justify-between">
              <div className="rounded-xl bg-[#ec671f]/10 p-3">
                <svg className="h-6 w-6 text-[#ec671f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="rounded-full bg-[#ec671f]/10 px-3 py-1 text-xs font-semibold text-[#ec671f]">
                Headquarters
              </span>
            </div>
            
            <h2 className="mt-4 text-xl font-bold text-[#271b13]">{companyProfile.legalName}</h2>
            
            <div className="mt-4 space-y-3">
              <div className="flex gap-3">
                <svg className="h-5 w-5 flex-shrink-0 text-[#b18b75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-sm text-[#5d4436]">{companyProfile.officeAddress}</p>
              </div>
              
              <div className="flex gap-3">
                <svg className="h-5 w-5 flex-shrink-0 text-[#b18b75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-[#271b13]">Phone</p>
                  <a href={`tel:${companyProfile.phone}`} className="text-sm text-[#ec671f] hover:underline">
                    {companyProfile.phone}
                  </a>
                </div>
              </div>
              
              <div className="flex gap-3">
                <svg className="h-5 w-5 flex-shrink-0 text-[#b18b75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-[#271b13]">Email</p>
                  <a href={`mailto:${companyProfile.email}`} className="text-sm text-[#ec671f] hover:underline">
                    {companyProfile.email}
                  </a>
                </div>
              </div>
            </div>
          </article>

          {/* Documents Card */}
          <article className="rounded-2xl border border-[#f2d8c7] bg-white p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-[#0f3558]/10 p-3">
                <svg className="h-5 w-5 text-[#0f3558]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-[#271b13]">Documents & Resources</h2>
            </div>
            
            <div className="mt-4 space-y-2">
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

          {/* Response Window Card */}
          <article className="rounded-2xl border border-[#f2d8c7] bg-gradient-to-br from-[#fff8f3] to-white p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-[#00923f]/10 p-3">
                <svg className="h-5 w-5 text-[#00923f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-[#271b13]">Response Timeline</h2>
            </div>
            
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00923f]/10 text-xs font-bold text-[#00923f]">
                  1
                </div>
                <p className="text-sm text-[#5d4436]">
                  <span className="font-semibold text-[#271b13]">24 hours:</span> Initial acknowledgement
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ec671f]/10 text-xs font-bold text-[#ec671f]">
                  2
                </div>
                <p className="text-sm text-[#5d4436]">
                  <span className="font-semibold text-[#271b13]">1-3 days:</span> Quotation scope review
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0f3558]/10 text-xs font-bold text-[#0f3558]">
                  3
                </div>
                <p className="text-sm text-[#5d4436]">
                  <span className="font-semibold text-[#271b13]">As needed:</span> Documentation & compliance
                </p>
              </div>
            </div>

            {/* Business Hours */}
            <div className="mt-4 border-t border-[#f2d8c7] pt-4">
              <p className="text-xs font-semibold text-[#7b4f37]">BUSINESS HOURS</p>
              <p className="mt-1 text-sm text-[#5d4436]">Monday - Friday, 9:00 AM - 6:00 PM (Your Local Time)</p>
            </div>
          </article>

          {/* Emergency Contact */}
          <article className="rounded-2xl border-2 border-[#ec671f]/20 bg-[#ec671f]/5 p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-[#ec671f] p-2">
                <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-[#271b13]">Need Urgent Assistance?</h3>
                <p className="mt-1 text-sm text-[#5d4436]">
                  For urgent matters outside business hours, please send an email with &quot;URGENT&quot; in the subject line.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Map or Additional Section */}
      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative h-64 overflow-hidden rounded-2xl bg-gradient-to-r from-[#0f3558] to-[#1a4a73]">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#ec671f] blur-3xl" />
          </div>
          
          <div className="relative flex h-full items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-2xl font-bold">Global Pharmaceutical Partner</h2>
              <p className="mt-2">Serving healthcare providers worldwide with quality products</p>
              <Link 
                href="/products"
                className="mt-4 inline-block rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#0f3558] hover:bg-[#ec671f] hover:text-white transition-colors"
              >
                Browse Our Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
