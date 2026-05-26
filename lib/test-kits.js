import { TEST_KITS } from "@/data/Testkit/testKits";

function cleanText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function normalizeCutOff(value) {
  const cleaned = cleanText(value);
  if (!cleaned || cleaned.toLowerCase() === "none") return "-";
  return cleaned;
}

export function getAllTestKits() {
  return (TEST_KITS || [])
    .flat(Infinity)
    .filter((item) => item && typeof item === "object")
    .map((item) => ({
      id: item.id,
      slug: cleanText(item.slug),
      product: cleanText(item.product) || "--",
      description: cleanText(item.description) || "--",
      category: cleanText(item.category) || "--",
      method: cleanText(item.method) || "--",
      specimen: cleanText(item.specimen) || "--",
      cutOff: normalizeCutOff(item.cut_off),
      certificate: cleanText(item.certificate) || "--",
      raw: item,
    }))
    .filter(
      (item) =>
        item.product !== "--" ||
        item.description !== "--" ||
        item.category !== "--" ||
        item.method !== "--" ||
        item.specimen !== "--" ||
        item.cutOff !== "-" ||
        item.certificate !== "--",
    )
    .sort((a, b) => a.product.localeCompare(b.product));
}
