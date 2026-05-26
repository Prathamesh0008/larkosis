import FINISHED_PRODUCTS from "@/data/PharmaceuticalProducts/finishedProducts";

const KNOWN_FORMS = [
  "tablet",
  "tablets",
  "capsule",
  "capsules",
  "injection",
  "suspension",
  "oral suspension",
  "syrup",
  "vial",
  "ampoule",
  "kit",
  "pouch",
  "powder",
  "drops",
];

function cleanText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

const MAX_SLUG_LENGTH = 110;

export function normalizePharmaceuticalSlug(value, fallbackId) {
  const base = cleanText(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const idSuffix = fallbackId ? `-${String(fallbackId).toLowerCase()}` : "";
  const safeBase = base || "product";
  const roomForSuffix = Math.max(1, MAX_SLUG_LENGTH - idSuffix.length);
  const clippedBase = safeBase.slice(0, roomForSuffix).replace(/-+$/g, "") || "product";
  return `${clippedBase}${idSuffix}`;
}

function valueLooksLikeForm(value) {
  const lower = cleanText(value).toLowerCase();
  return KNOWN_FORMS.some((form) => lower.includes(form));
}

function normalizeCasId(item) {
  if (item["CAS-ID"]) return cleanText(item["CAS-ID"]);
  if (item.CAS_ID) return cleanText(item.CAS_ID);
  if (item["API-CAS"] && typeof item["API-CAS"] === "object") {
    return "N/A (combination)";
  }
  return "--";
}

function normalizeForm(item) {
  const direct = cleanText(item.form);
  const col5 = cleanText(item.Column5);

  if (valueLooksLikeForm(direct)) return direct;
  if (valueLooksLikeForm(col5)) return col5;
  return direct || col5 || "--";
}

function normalizeDosage(item) {
  return cleanText(item.dosage) || "--";
}

export function getAllPharmaceuticalProducts() {
  return (FINISHED_PRODUCTS || [])
    .map((item) => ({
      id: item.id,
      slug: normalizePharmaceuticalSlug(item.slug, item.id),
      originalSlug: cleanText(item.slug),
      name: cleanText(item.name) || "Unnamed Product",
      category: cleanText(item.category) || "General",
      form: normalizeForm(item),
      dosage: normalizeDosage(item),
      casId: normalizeCasId(item),
      raw: item,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
