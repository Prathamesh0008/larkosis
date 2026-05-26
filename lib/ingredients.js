import { en } from "@/data/ingediants";

function cleanText(value = "") {
  return value.replace(/\s+/g, " ").trim();
}

function getProductInformation(details = []) {
  if (!Array.isArray(details)) return [];
  return details
    .filter((item) => item?.label && item?.value)
    .map((item) => ({
      label: cleanText(String(item.label)),
      value: cleanText(String(item.value)),
    }));
}

function getTherapeuticArea(productInformation = []) {
  const preferredLabels = [
    "Therapeutic Role",
    "Therapeutic Class",
    "Category",
  ];

  for (const label of preferredLabels) {
    const found = productInformation.find((item) => item.label === label);
    if (found?.value) return found.value;
  }

  return "General";
}

export function getAllActiveIngredients() {
  const source = en?.ingredients ?? {};
  return Object.entries(source)
    .map(([slug, item]) => {
      const productInformation = getProductInformation(item?.content?.productInformation?.details);
      return {
        slug,
        name: item?.hero?.title || slug,
        description: item?.hero?.description || item?.meta?.description || "",
        metaTitle: item?.meta?.title || item?.hero?.title || slug,
        metaDescription: item?.meta?.description || item?.hero?.description || "",
        therapeuticArea: getTherapeuticArea(productInformation),
        productInformation,
        raw: item,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getActiveIngredientBySlug(slug) {
  return getAllActiveIngredients().find((item) => item.slug === slug) || null;
}
