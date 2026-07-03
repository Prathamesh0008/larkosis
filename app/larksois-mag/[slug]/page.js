import { notFound } from "next/navigation";
import MagazineArticleView from "@/components/magazine/magazine-article-view";
import {
  getMagazineArticleBySlug,
  MAGAZINE_ARTICLES,
} from "@/data/magazine";

export function generateStaticParams() {
  return MAGAZINE_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getMagazineArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found | Larksois Magazine",
    };
  }

  return {
    title: `${article.title} | Larksois Magazine`,
    description: article.excerpt,
  };
}

export default async function LarksoisMagazineArticlePage({ params }) {
  const { slug } = await params;
  const article = getMagazineArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return <MagazineArticleView article={article} />;
}
