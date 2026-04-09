const CAS_LOOKUP_RULES = [
  { pattern: /\bcarboplatin\b/i, cas: "41575-94-4" },
  { pattern: /\bcisplatin\b/i, cas: "15663-27-1" },
  { pattern: /\bcyclophosphamide\b/i, cas: "6055-19-2" },
  { pattern: /\bdoxorubicin hydrochloride\b/i, cas: "25316-40-9" },
  { pattern: /\bepirubicin hydrochloride\b/i, cas: "56390-09-1" },
  { pattern: /\betoposide\b/i, cas: "33419-42-0" },
  { pattern: /\bfluorouracil\b/i, cas: "51-21-8" },
  { pattern: /\bifosfamide\b/i, cas: "3778-73-2" },
  { pattern: /\birinotecan hydrochloride\b/i, cas: "136572-09-3" },
  { pattern: /\bletrozole\b/i, cas: "112809-51-5" },
  { pattern: /\bmethotrexate\b/i, cas: "59-05-2" },
  { pattern: /\bpaclitaxel\b/i, cas: "33069-62-4" },
  { pattern: /\bvinblastine sulphate\b/i, cas: "143-67-9" },
  { pattern: /\bvincristine sulphate\b/i, cas: "2068-78-2" },
];

export const INITIAL_FILTERS = {
  query: "",
  category: "All",
  dosageForm: "All",
  strength: "All",
};

function normalizeSpec(spec) {
  return spec.toUpperCase().replace(/\s+/g, "");
}

export function extractPharmSpec(details) {
  const matches = details.match(/\b(BP\/USP|BP|USP|INH|IP|IH)\b/gi) ?? [];
  const unique = [...new Set(matches.map((item) => normalizeSpec(item)))];
  return unique.length > 0 ? unique.join(", ") : "--";
}

export function extractPackSize(details) {
  const patterns = [
    /(\d+\s*[xX]\s*\d+(?:\s*[xX]\s*\d+)?(?:\s*'?s)?)/i,
    /(\d+\s*(?:ml|g|mg|mcg|tablet|cap|vial|ampoule|bottle|pouch|kit)s?)/i,
    /(vial(?:\s*of)?\s*[^,.;]+)/i,
    /(bottle(?:\s*of)?\s*[^,.;]+)/i,
    /(ampoule(?:\s*of)?\s*[^,.;]+)/i,
    /(pouch(?:\s*of)?\s*[^,.;]+)/i,
    /(kit)/i,
  ];

  for (const pattern of patterns) {
    const match = details.match(pattern);
    if (match?.[1]) {
      return match[1].trim();
    }
  }

  return "--";
}

export function extractFormulationType(details, dosageForm) {
  const text = details.toLowerCase();

  if (text.includes("dry powder for injection")) return "Dry Powder For Injection";
  if (text.includes("liquid injection")) return "Liquid Injection";
  if (text.includes("film coated")) return "Film Coated";
  if (text.includes("hard gelatin")) return "Hard Gelatin";
  if (text.includes("soft gelatin")) return "Soft Gelatin";
  if (text.includes("oral liquid")) return "Oral Liquid";
  if (text.includes("extended release") || text.includes("er ")) return "Extended Release";
  if (text.includes("sustained release") || text.includes("sr ")) return "Sustained Release";
  if (text.includes("immediate release") || text.includes("ir ")) return "Immediate Release";
  if (text.includes("effervescent")) return "Effervescent";
  if (text.includes("chewable")) return "Chewable";
  if (text.includes("orally disintegrating") || text.includes("odt")) return "Orally Disintegrating";

  return dosageForm || "--";
}

export function extractCasId(product) {
  if (product.casId && product.casId !== "--") {
    return product.casId;
  }

  const source = `${product.name} ${product.details}`;
  const directMatches = source.match(/\b\d{2,7}-\d{2}-\d\b/g) ?? [];
  if (directMatches.length > 0) {
    return [...new Set(directMatches)].join(", ");
  }

  for (const rule of CAS_LOOKUP_RULES) {
    if (rule.pattern.test(source)) {
      return rule.cas;
    }
  }

  return "--";
}

export function filterAndSortProducts(products, filters, sortBy, sortOrder) {
  const query = filters.query.trim().toLowerCase();

  const filtered = products.filter((product) => {
    const inCategory = filters.category === "All" || product.category === filters.category;
    const inForm = filters.dosageForm === "All" || product.dosageForm === filters.dosageForm;
    const inStrength = filters.strength === "All" || product.strength === filters.strength;

    const matchesQuery =
      query.length === 0 ||
      product.name.toLowerCase().includes(query) ||
      product.details.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.dosageForm.toLowerCase().includes(query) ||
      (product.strength && product.strength.toLowerCase().includes(query));

    return inCategory && inForm && inStrength && matchesQuery;
  });

  filtered.sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
      case "category":
        comparison = a.category.localeCompare(b.category);
        break;
      case "dosageForm":
        comparison = (a.dosageForm || "").localeCompare(b.dosageForm || "");
        break;
      case "strength":
        comparison = (a.strength || "").localeCompare(b.strength || "");
        break;
      default:
        comparison = 0;
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });

  return filtered;
}
