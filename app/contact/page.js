import ContactPageClient from "./contact-page-client";
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <ContactPageClient />
    </>
  );
}
