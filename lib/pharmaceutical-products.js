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

function normalizeCasValue(value) {
  if (!value) return "None";

  if (typeof value === "string" || typeof value === "number") {
    const text = cleanText(value);
    if (/^n\/a$/i.test(text)) return "Combination";
    return text || "None";
  }

  if (Array.isArray(value)) {
    const combined = value.map((item) => normalizeCasValue(item)).filter((item) => item !== "None");
    return combined.length > 0 ? combined.join(", ") : "None";
  }

  if (typeof value === "object") {
    const combined = Object.values(value)
      .map((item) => normalizeCasValue(item))
      .filter((item) => item !== "None");
    return combined.length > 0 ? combined.join(", ") : "None";
  }

  return "None";
}

function normalizeCasId(item) {
  if (item["CAS-ID"]) return normalizeCasValue(item["CAS-ID"]);
  if (item.CAS_ID) return normalizeCasValue(item.CAS_ID);
  if (item["API-CAS"]) return normalizeCasValue(item["API-CAS"]);
  return "None";
}

function normalizeForm(item) {
  const direct = cleanText(item.form);
  const col5 = cleanText(item.Column5);

  if (valueLooksLikeForm(direct)) return direct;
  if (valueLooksLikeForm(col5)) return col5;
  return direct || col5 || "None";
}

function normalizeDosage(item) {
  return cleanText(item.dosage) || "None";
}

export function getAllPharmaceuticalProducts() {
  const normalized = (FINISHED_PRODUCTS || [])
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
    }));

  // Remove accidental exact duplicates while preserving first occurrence.
  const seenSignatures = new Set();
  const deduped = normalized.filter((item) => {
    const signature = [
      item.slug,
      item.name.toLowerCase(),
      item.category.toLowerCase(),
      item.form.toLowerCase(),
      item.dosage.toLowerCase(),
      item.casId.toLowerCase(),
    ].join("|");
    if (seenSignatures.has(signature)) return false;
    seenSignatures.add(signature);
    return true;
  });

  // Add a display label when same base name has multiple variants.
  const nameCounts = deduped.reduce((acc, item) => {
    const key = item.name.toLowerCase();
    acc.set(key, (acc.get(key) || 0) + 1);
    return acc;
  }, new Map());

  return deduped
    .map((item) => ({
      ...item,
      listName:
        (nameCounts.get(item.name.toLowerCase()) || 0) > 1
          ? `${item.name} (${item.dosage} • ${item.form})`
          : item.name,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
