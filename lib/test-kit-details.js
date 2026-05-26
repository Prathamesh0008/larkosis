import { en as testKitEn } from "@/data/Testkit/testkitdata";
import { getAllTestKits } from "@/lib/test-kits";

function cleanText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

export function getAllTestKitDetails() {
  const source = testKitEn?.testKits || {};
  return Object.entries(source).map(([slug, item]) => ({
    slug,
    meta: item?.meta || {},
    hero: item?.hero || {},
    content: item?.content || {},
    faqs: Array.isArray(item?.faqs) ? item.faqs : [],
    faqSchema: item?.faqSchema || null,
    raw: item,
  }));
}

export function getTestKitBySlug(slug) {
  const details = getAllTestKitDetails().find((item) => item.slug === slug) || null;
  const catalog = getAllTestKits().find((item) => item.slug === slug) || null;

  if (!details && !catalog) return null;

  return {
    slug,
    details,
    catalog,
    title: cleanText(details?.hero?.title || catalog?.product || slug),
    description: cleanText(details?.hero?.description || catalog?.description || ""),
    metaTitle: cleanText(details?.meta?.title || details?.hero?.title || catalog?.product || slug),
    metaDescription: cleanText(details?.meta?.description || details?.hero?.description || catalog?.description || ""),
  };
}
