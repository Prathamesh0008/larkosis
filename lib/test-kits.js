import { TEST_KITS } from "@/data/Testkit/testKits";

function cleanText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function normalizeCutOff(value) {
  const cleaned = cleanText(value);
  if (!cleaned || cleaned.toLowerCase() === "none") return "None";
  return cleaned;
}

export function getAllTestKits() {
  const normalized = (TEST_KITS || [])
    .flat(Infinity)
    .filter((item) => item && typeof item === "object")
    .map((item) => ({
      id: item.id,
      slug: cleanText(item.slug),
      product: cleanText(item.product) || "None",
      description: cleanText(item.description) || "None",
      category: cleanText(item.category) || "None",
      method: cleanText(item.method) || "None",
      specimen: cleanText(item.specimen) || "None",
      cutOff: normalizeCutOff(item.cut_off),
      certificate: cleanText(item.certificate) || "None",
      raw: item,
    }))
    .filter(
      (item) =>
        item.product !== "None" ||
        item.description !== "None" ||
        item.category !== "None" ||
        item.method !== "None" ||
        item.specimen !== "None" ||
        item.cutOff !== "None" ||
        item.certificate !== "None",
    );

  // Remove accidental exact duplicates while preserving first occurrence.
  const seenSignatures = new Set();
  const deduped = normalized.filter((item) => {
    const signature = [
      item.product.toLowerCase(),
      item.description.toLowerCase(),
      item.category.toLowerCase(),
      item.method.toLowerCase(),
      item.specimen.toLowerCase(),
      item.cutOff.toLowerCase(),
    ].join("|");
    if (seenSignatures.has(signature)) return false;
    seenSignatures.add(signature);
    return true;
  });

  // Add a display label when same base product has multiple variants.
  const productCounts = deduped.reduce((acc, item) => {
    const key = item.product.toLowerCase();
    acc.set(key, (acc.get(key) || 0) + 1);
    return acc;
  }, new Map());

  return deduped
    .map((item) => ({
      ...item,
      listProduct:
        (productCounts.get(item.product.toLowerCase()) || 0) > 1
          ? `${item.product} (${item.category} • ${item.method} • ${item.specimen} • ${item.cutOff})`
          : item.product,
    }))
    .sort((a, b) => a.product.localeCompare(b.product));
}
