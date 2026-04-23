import Link from "next/link";
import ProductCard from "@/components/product-card";

export default function FeaturedProductsSection({ featuredProducts }) {
  return (
    <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-5 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end sm:gap-4">
        <h2 className="text-2xl font-bold text-[#241a14] sm:text-3xl">
          Featured Products
        </h2>
        <Link
          href="/products"
          className="text-sm font-bold text-[#d85f1d] underline underline-offset-4"
        >
          View Full Catalog
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
