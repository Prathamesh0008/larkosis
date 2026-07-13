import { companyProfile } from "@/data/companyProfile";
import HeroSection from "@/components/home/hero-section";
import LarksoisAboutSection from "@/components/home/larksois-about-section";
import LarksoisGlobalPresence from "@/components/home/larksois-global-presence";
import LarksoisLatestSection from "@/components/home/larksois-latest-section";
import LarksoisLeadershipSection from "@/components/home/larksois-leadership-section";
import LarksoisNumbersSection from "@/components/home/larksois-numbers-section";
import LarksoisResearchManufacturing from "@/components/home/larksois-research-manufacturing";
import LarksoisTherapyGroups from "@/components/home/larksois-therapy-groups";
import ScrollReveal from "@/components/scroll-reveal";
import { getAllProducts, getCategoryCounts } from "@/lib/catalog";
import { SITE_URL, absoluteUrl } from "@/lib/seo";

export const metadata = {
  title: "Global Pharmaceutical Supplier",
  description:
    "Larksois Pharma provides high-quality pharmaceutical formulations for global markets. Explore products, therapeutic categories, and request quotations.",
  keywords: [
    "Larksois Pharma",
    "pharmaceutical company India",
    "pharma export supplier",
    "generic formulations",
    "pharmaceutical product catalog",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Larksois Pharma | Global Pharmaceutical Supplier",
    description:
      "Explore pharmaceutical products and request quotations from Larksois Pharma.",
    url: SITE_URL,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  const products = getAllProducts();
  const categoryCounts = getCategoryCounts();
  const featuredProducts = products.slice(0, 6);

  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Larksois Pharma | Global Pharmaceutical Supplier",
    description:
      "Larksois Pharma provides high-quality pharmaceutical formulations for global markets.",
    url: SITE_URL,
    inLanguage: "en",
  };
  const featuredItemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Featured Pharmaceutical Products",
    itemListElement: featuredProducts.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.name,
      url: absoluteUrl(`/products/${product.slug}`),
    })),
  };

  return (
    <div className="pb-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(featuredItemListSchema) }}
      />
      <HeroSection
        companyOverview={companyProfile.overview}
        productCount={products.length}
        categoryCount={categoryCounts.length}
        productListPdf={companyProfile.documents.productListPdf}
      />
      <ScrollReveal delay={80} variant="zoomUp">
        <LarksoisNumbersSection
          productCount={products.length}
          categoryCount={categoryCounts.length}
          therapeuticCount={companyProfile.therapeuticCoverage.length}
        />
      </ScrollReveal>
      <ScrollReveal delay={120} variant="left">
        <LarksoisAboutSection companyProfile={companyProfile} />
      </ScrollReveal>
      <ScrollReveal delay={160} variant="soft">
        <LarksoisTherapyGroups />
      </ScrollReveal>
      <ScrollReveal delay={180} variant="zoom">
        <LarksoisGlobalPresence />
      </ScrollReveal>
      <ScrollReveal delay={200} variant="right">
        <LarksoisLeadershipSection />
      </ScrollReveal>
      <ScrollReveal delay={240} variant="tilt">
        <LarksoisResearchManufacturing companyProfile={companyProfile} />
      </ScrollReveal>
      <ScrollReveal delay={280} variant="up">
        <LarksoisLatestSection
          featuredProducts={featuredProducts}
          companyProfile={companyProfile}
        />
      </ScrollReveal>
    </div>
  );
}
