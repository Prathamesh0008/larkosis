import { en as pharmaEn } from "@/data/PharmaceuticalProducts/Pharmaceutical_Products";
import {
  getAllPharmaceuticalProducts,
  normalizePharmaceuticalSlug,
} from "@/lib/pharmaceutical-products";

function cleanText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

export function getAllPharmaceuticalProductDetails() {
  const source = pharmaEn?.products || {};
  const catalogByOriginalSlug = new Map(
    getAllPharmaceuticalProducts().map((item) => [item.originalSlug, item.slug]),
  );

  return Object.entries(source).map(([slug, item]) => ({
    slug: catalogByOriginalSlug.get(slug) || normalizePharmaceuticalSlug(slug),
    seoTitle: cleanText(item?.seo?.title || ""),
    seoDescription: cleanText(item?.seo?.description || ""),
    meta: item?.meta || {},
    hero: item?.hero || {},
    content: item?.content || {},
    faqs: Array.isArray(item?.faqs) ? item.faqs : [],
    faqSchema: item?.faqSchema || null,
    raw: item,
  }));
}

export function getPharmaceuticalProductBySlug(slug) {
  const details = getAllPharmaceuticalProductDetails().find((item) => item.slug === slug) || null;
  const catalog = getAllPharmaceuticalProducts().find((item) => item.slug === slug) || null;

  if (!details && !catalog) return null;
  return {
    slug,
    details,
    catalog,
  };
}
