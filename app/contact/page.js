import Image from "next/image";
import ScrollReveal from "@/components/scroll-reveal";
import ContactForm from "./contact-form";
import { companyProfile } from "@/data/companyProfile";
import { SITE_URL, absoluteUrl } from "@/lib/seo";

export const metadata = {
  title: "Contact",
  description:
    "Contact Larksois Pharma for product availability, documentation, and bulk quotation requests. Get business support within 24 hours.",
  keywords: [
    "contact Larksois Pharma",
    "pharmaceutical quote request",
    "bulk medicine inquiry",
    "pharma export contact",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Larksois Pharma | Global Pharmaceutical Supplier",
    description:
      "Reach out for product inquiries, quotations, and technical documentation.",
    url: absoluteUrl("/contact"),
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Larksois Pharma",
    url: absoluteUrl("/contact"),
    description: metadata.description,
    mainEntity: {
      "@type": "Organization",
      name: companyProfile.brand,
      url: SITE_URL,
      email: companyProfile.email,
      telephone: companyProfile.phone,
    },
  };

  return (
    <div className="min-h-screen bg-[#fff8f5] pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />

      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-16">
        <ScrollReveal className="mb-12">
          <h1 className="text-3xl font-bold text-[#241913] md:text-4xl">
            Contact Larksois Pharma
          </h1>
          <p className="mt-2 max-w-2xl text-[#5f4638]">
            Reach out to us for product inquiries, export discussions,
            documentation support, and quotation-based pharmaceutical
            requirements.
          </p>
        </ScrollReveal>

        <div className="grid items-stretch gap-10 lg:grid-cols-[1.2fr_1fr]">
          <ScrollReveal className="min-w-0" delay={100}>
            <ContactForm />
          </ScrollReveal>

          <ScrollReveal
            className="relative h-[500px] overflow-hidden rounded-xl border border-[#f0dfd3] shadow-sm lg:h-auto"
            delay={180}
          >
            <Image
              src="/about/factory1.png"
              alt="Larksois Pharma facility"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#2b1d16]/90 via-[#2b1d16]/15 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h2 className="text-lg font-semibold">Visit Or Write To Us</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-white/90">
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center text-[#f4b083]">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </span>
                  <span>{companyProfile.officeAddress}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center text-[#f4b083]">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                  <a href={`mailto:${companyProfile.email}`} className="hover:text-[#f4b083]">
                    {companyProfile.email}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center text-[#f4b083]">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                  <span>Business response window: within 24 hours</span>
                </div>
                </div>
              </div>
          </ScrollReveal>
        </div>

        
      </section>
    </div>
  );
}
