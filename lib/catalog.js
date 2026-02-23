import products from "@/data/products.json";

export function getAllProducts() {
  return products;
}

export function getCategoryCounts() {
  const counts = new Map();

  for (const product of products) {
    counts.set(product.category, (counts.get(product.category) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(product, limit = 6) {
  return products
    .filter(
      (item) =>
        item.slug !== product.slug && item.category === product.category,
    )
    .slice(0, limit);
}

export function buildQuoteMailto(productName = "Product Inquiry") {
  const subject = encodeURIComponent(`Quote Request - ${productName}`);
  const body = encodeURIComponent(
    [
      "Hello Larkosis Pharma Team,",
      "",
      `I would like a quotation for: ${productName}`,
      "",
      "Required quantity:",
      "Target market / destination country:",
      "Company name:",
      "Contact person:",
      "Phone / WhatsApp:",
      "",
      "Thank you.",
    ].join("\n"),
  );

  return `mailto:larksoispharma@gmail.com?subject=${subject}&body=${body}`;
}
