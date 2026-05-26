import { absoluteUrl } from "@/lib/seo";
import { getAllPharmaceuticalProducts } from "@/lib/pharmaceutical-products";
import PharmaceuticalProductsTableClient from "./pharmaceutical-products-table-client";

export const metadata = {
  title: "Pharmaceutical Products",
  description: "Explore our pharmaceutical product range with category, form, dosage and CAS-ID filters.",
  alternates: {
    canonical: "/pharmaceutical-products",
  },
  openGraph: {
    title: "Pharmaceutical Products | Larksois Pharma",
    description: "Explore our pharmaceutical product range with category, form, dosage and CAS-ID filters.",
    url: absoluteUrl("/pharmaceutical-products"),
    type: "website",
  },
};

export default function PharmaceuticalProductsPage() {
  const products = getAllPharmaceuticalProducts();

  return (
    <div className="bg-[#f8f3f1] pb-12 pt-14">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#0f3558]">Our Products</h1>
          <p className="mt-2 text-[#334c63]">Explore our pharmaceutical product range.</p>
        </div>

        <div className="mt-8">
          <PharmaceuticalProductsTableClient products={products} />
        </div>
      </div>
    </div>
  );
}
