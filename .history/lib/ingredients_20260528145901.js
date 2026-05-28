import { en } from "@/data/ingediants";

function cleanText(value = "") {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function getProductInformation(details = []) {
  if (!Array.isArray(details)) return [];

  return details
    .filter((item) => item?.label && item?.value)
    .map((item) => ({
      label: cleanText(item.label),
      value: cleanText(item.value),
    }));
}

const THERAPEUTIC_AREA_BY_SLUG = {
  "amiodarone-hydrochloride": "Cardiology",
  "amlodipine-besylate": "Cardiology",
  amoxicillin: "Anti-Infective",
  "atorvastatin-calcium": "Cardiology",
  azithromycin: "Anti-Infective",
  clarithromycin: "Anti-Infective",
  "codeine-sulfate": "Analgesic / Pain Management",
  "diclofenac-sodium": "Analgesic / Anti-Inflammatory",
  "metformin-hydrochloride": "Endocrinology / Diabetes",
  "montelukast-sodium": "Respiratory",
  omeprazole: "Gastroenterology",
};

function getTherapeuticArea(productInformation = [], slug = "", item = {}) {
  const preferredLabels = [
    "Therapeutic Area",
    "Therapeutic Role",
    "Therapeutic Class",
    "Pharmacological Class",
    "Drug Class",
    "Category",
  ];

  for (const label of preferredLabels) {
    const found = productInformation.find(
      (info) => info.label?.toLowerCase() === label.toLowerCase(),
    );

    if (found?.value) return found.value;
  }

  if (THERAPEUTIC_AREA_BY_SLUG[slug]) {
    return THERAPEUTIC_AREA_BY_SLUG[slug];
  }

  const text = [
    item?.hero?.title,
    item?.hero?.description,
    item?.meta?.title,
    item?.meta?.description,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (
    text.includes("cardio") ||
    text.includes("heart") ||
    text.includes("hypertension") ||
    text.includes("blood pressure") ||
    text.includes("angina") ||
    text.includes("arrhythmia")
  ) {
    return "Cardiology";
  }

  if (
    text.includes("antibiotic") ||
    text.includes("anti-infective") ||
    text.includes("bacterial") ||
    text.includes("infection")
  ) {
    return "Anti-Infective";
  }

  if (
    text.includes("pain") ||
    text.includes("analgesic") ||
    text.includes("inflammatory") ||
    text.includes("inflammation")
  ) {
    return "Analgesic / Pain Management";
  }

  if (
    text.includes("diabetes") ||
    text.includes("metformin") ||
    text.includes("blood sugar")
  ) {
    return "Endocrinology / Diabetes";
  }

  if (
    text.includes("respiratory") ||
    text.includes("asthma") ||
    text.includes("allergy") ||
    text.includes("montelukast")
  ) {
    return "Respiratory";
  }

  if (
    text.includes("gastro") ||
    text.includes("acid") ||
    text.includes("reflux") ||
    text.includes("omeprazole")
  ) {
    return "Gastroenterology";
  }

  return "General";
}

export function getAllActiveIngredients() {
  const source = en?.ingredients ?? {};

  return Object.entries(source)
    .map(([slug, item]) => {
      const productInformation = getProductInformation(
        item?.content?.productInformation?.details,
      );

      return {
        slug,
        name: item?.hero?.title || slug,
        description: item?.hero?.description || item?.meta?.description || "",
        metaTitle: item?.meta?.title || item?.hero?.title || slug,
        metaDescription: item?.meta?.description || item?.hero?.description || "",
        therapeuticArea: getTherapeuticArea(productInformation, slug, item),
        productInformation,
        raw: item,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getActiveIngredientBySlug(slug) {
  return getAllActiveIngredients().find((item) => item.slug === slug) || null;
}