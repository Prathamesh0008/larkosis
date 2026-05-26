import { getAllProducts } from "@/lib/catalog";
import { getAllActiveIngredients } from "@/lib/ingredients";
import { getAllPharmaceuticalProducts } from "@/lib/pharmaceutical-products";
import { getAllTestKits } from "@/lib/test-kits";
import { getAllTestKitDetails } from "@/lib/test-kit-details";
import { SITE_URL, absoluteUrl } from "@/lib/seo";

export default function sitemap() {
  const now = new Date();

  const staticPages = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/products"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/active-ingredients"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/pharmaceutical-products"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/test-kits"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const productPages = getAllProducts().map((product) => ({
    url: absoluteUrl(`/products/${product.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const ingredientPages = getAllActiveIngredients().map((ingredient) => ({
    url: absoluteUrl(`/active-ingredients/${ingredient.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const pharmaProductPages = getAllPharmaceuticalProducts().map((product) => ({
    url: absoluteUrl(`/pharmaceutical-products/${product.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const testKitPages = getAllTestKits().map((kit) => ({
    url: absoluteUrl(`/test-kits#${kit.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const testKitDetailPages = getAllTestKitDetails().map((kit) => ({
    url: absoluteUrl(`/test-kits/${kit.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...productPages, ...ingredientPages, ...pharmaProductPages, ...testKitPages, ...testKitDetailPages];
}

