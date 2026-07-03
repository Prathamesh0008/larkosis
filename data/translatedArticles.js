"use client";

import { useLanguage } from "@/contexts/LanguageContext";

const BASE_ARTICLES = [
  {
    slug: "gene-therapy-emerging-science",
    date: "May 13, 2024",
    image: "/images/article/gene-therapy.jpg",
    tag: "health",
  },
  {
    slug: "power-of-ai-medical-industry",
    date: "May 11, 2024",
    image: "/images/article/ai-medicine.jpg",
    tag: "health",
  },
  {
    slug: "what-is-obesity-how-to-overcome-it",
    date: "March 9, 2024",
    image: "/images/article/obesity.jpg",
    tag: "health",
  },
  {
    slug: "personalized-medicine-basics",
    date: "March 3, 2024",
    image: "/images/article/personalized-medicine.jpg",
    tag: "health",
  },
  {
    slug: "international-womens-day-healthcare",
    date: "February 21, 2024",
    image: "/images/article/womens-day.jpg",
    tag: "news",
  },
  {
    slug: "diabetes-kidney-disease-6",
    date: "December 4, 2023",
    image: "/images/article/diabetes-kidney-1.jpg",
    tag: "health",
  },
];

export function useTranslatedArticles() {
  const { translations } = useLanguage();
  const magazine = translations?.magazine || {};

  return BASE_ARTICLES.map((baseArticle) => {
    const translatedData = magazine.articles?.[baseArticle.slug] || {};
    const category = magazine.categories?.[baseArticle.tag] || baseArticle.tag;

    return {
      ...baseArticle,
      title: translatedData.title || "",
      excerpt: translatedData.excerpt || "",
      readTime: translatedData.readTime || "",
      category,
      tag: baseArticle.tag,
    };
  });
}

export function useTranslatedArticleDetails(slug) {
  const { translations } = useLanguage();
  const magazine = translations?.magazine || {};
  const translatedData = magazine.articles?.[slug] || {};
  const baseArticle = BASE_ARTICLES.find((article) => article.slug === slug);

  if (!baseArticle) {
    return null;
  }

  return {
    ...baseArticle,
    title: translatedData.title || "",
    category: magazine.categories?.[baseArticle.tag] || baseArticle.tag,
    readTime: translatedData.readTime || "",
    heroCaption: translatedData.heroCaption || "",
    sections: translatedData.sections || [],
    excerpt: translatedData.excerpt || "",
  };
}

export function getAllArticleSlugs() {
  return BASE_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}
