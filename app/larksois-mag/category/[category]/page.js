import { notFound } from "next/navigation";
import MagazineIndexClient from "@/components/magazine/magazine-index-client";
import { MAGAZINE_CONTENT } from "@/data/magazine";

const allowedCategories = ["news", "health"];

export async function generateMetadata({ params }) {
  const { category } = await params;

  if (!allowedCategories.includes(category)) {
    return {
      title: "Larksois Magazine",
    };
  }

  return {
    title: `${MAGAZINE_CONTENT.categories[category]} | Larksois Magazine`,
    description: `${MAGAZINE_CONTENT.categories[category]} articles from Larksois Magazine.`,
  };
}

export default async function LarksoisMagCategoryPage({ params }) {
  const { category } = await params;

  if (!allowedCategories.includes(category)) {
    notFound();
  }

  return <MagazineIndexClient categoryFilter={category} />;
}
