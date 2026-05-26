import { absoluteUrl } from "@/lib/seo";
import { getAllActiveIngredients } from "@/lib/ingredients";
import ActiveIngredientsTableClient from "./active-ingredients-table-client";

export const metadata = {
  title: "Active Ingredients",
  description:
    "Browse active ingredients and pharmaceutical compositions available in the Larksois portfolio.",
  alternates: {
    canonical: "/active-ingredients",
  },
  openGraph: {
    title: "Active Ingredients | Larksois Pharma",
    description:
      "Browse active ingredients and pharmaceutical compositions available in the Larksois portfolio.",
    url: absoluteUrl("/active-ingredients"),
    type: "website",
  },
};

export default function ActiveIngredientsPage() {
  const ingredients = getAllActiveIngredients();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#251b14] sm:text-4xl">Active Ingredients</h1>
        <p className="mt-2 text-[#5f4434]">
          Select an ingredient to view detailed product information.
        </p>
      </div>

      <ActiveIngredientsTableClient ingredients={ingredients} />
    </div>
  );
}
