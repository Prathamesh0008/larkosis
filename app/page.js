import { companyProfile } from "@/data/companyProfile";
import BannerStrip from "@/components/home/banner-strip";
import FacilitiesSection from "@/components/home/facilities-section";
import FeaturedProductsSection from "@/components/home/featured-products-section";
import HeroSection from "@/components/home/hero-section";
import TherapeuticCoverageSection from "@/components/home/therapeutic-coverage-section";
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
      <BannerStrip />
      <FacilitiesSection />
      <TherapeuticCoverageSection categoryCounts={categoryCounts} />
      <FeaturedProductsSection featuredProducts={featuredProducts} />
    </div>
  );
}
