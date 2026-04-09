import Link from "next/link";

export default function CatalogMobileList({ paginatedProducts, clearFilters, extractPackSize, extractCasId }) {
  return (
    <div className="mt-8 space-y-3 md:hidden">
      {paginatedProducts.length === 0 && (
        <div className="rounded-2xl border border-[#f0d4c2] bg-white p-6 text-center text-[#684938] shadow-sm">
          <p className="text-lg font-semibold">No products found</p>
          <p className="mt-1 text-sm">Try adjusting your filters or search terms</p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-3 rounded-full bg-[#ec671f] px-4 py-2 text-sm font-bold text-white hover:bg-[#d95f1d]"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {paginatedProducts.map((product) => (
        <article key={product.id} className="rounded-2xl border border-[#f0d4c2] bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#8a5436]">{product.category}</p>
          <h3 className="mt-1 text-base font-bold text-[#2e2119]">
            <Link href={`/products/${product.slug}`} className="hover:text-[#ec671f]">
              {product.name}
            </Link>
          </h3>
          <dl className="mt-3 space-y-1 text-sm text-[#553d30]">
            <div>
              <dt className="inline font-semibold text-[#3f2a1e]">Form:</dt>{" "}
              <dd className="inline break-words">{product.dosageForm || "--"}</dd>
            </div>
            <div>
              <dt className="inline font-semibold text-[#3f2a1e]">Strength:</dt>{" "}
              <dd className="inline break-words">{product.strength || "--"}</dd>
            </div>
            <div>
              <dt className="inline font-semibold text-[#3f2a1e]">Pack:</dt>{" "}
              <dd className="inline break-words">{extractPackSize(product.details)}</dd>
            </div>
            <div>
              <dt className="inline font-semibold text-[#3f2a1e]">CAS ID:</dt>{" "}
              <dd className="inline break-words">{extractCasId(product)}</dd>
            </div>
          </dl>
          <Link
            href={`/products/${product.slug}`}
            className="mt-4 inline-flex rounded-full bg-[#ec671f] px-4 py-2 text-xs font-bold text-white hover:bg-[#d95f1d]"
          >
            View Details
          </Link>
        </article>
      ))}
    </div>
  );
}
