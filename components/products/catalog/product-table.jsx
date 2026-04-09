import Link from "next/link";

function SortableHeader({ label, column, sortBy, sortOrder, onToggle }) {
  return (
    <th
      className="cursor-pointer border-r border-[#325b7d] px-4 py-4 transition-colors hover:bg-[#1a4a73]"
      onClick={() => onToggle(column)}
    >
      <div className="flex items-center gap-1">
        {label}
        {sortBy === column && <span>{sortOrder === "asc" ? "^" : "v"}</span>}
      </div>
    </th>
  );
}

export default function CatalogTable({
  paginatedProducts,
  sortBy,
  sortOrder,
  toggleSort,
  clearFilters,
  extractPackSize,
  extractFormulationType,
  extractCasId,
  extractPharmSpec,
}) {
  return (
    <div className="mt-8 hidden overflow-x-auto rounded-2xl border border-[#f0d4c2] bg-white shadow-sm md:block">
      <table className="w-full min-w-[980px] border-collapse text-left lg:min-w-[1200px]">
        <thead className="bg-[#0f3558] text-xs uppercase tracking-[0.08em] text-white">
          <tr>
            <SortableHeader label="Name" column="name" sortBy={sortBy} sortOrder={sortOrder} onToggle={toggleSort} />
            <SortableHeader label="Form" column="dosageForm" sortBy={sortBy} sortOrder={sortOrder} onToggle={toggleSort} />
            <SortableHeader label="Category" column="category" sortBy={sortBy} sortOrder={sortOrder} onToggle={toggleSort} />
            <SortableHeader label="Strength" column="strength" sortBy={sortBy} sortOrder={sortOrder} onToggle={toggleSort} />
            <th className="border-r border-[#325b7d] px-4 py-4">Pack Size</th>
            <th className="border-r border-[#325b7d] px-4 py-4">Formulation Type</th>
            <th className="border-r border-[#325b7d] px-4 py-4">CAS ID</th>
            <th className="px-4 py-4">Pharm Spec</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.length === 0 && (
            <tr>
              <td className="px-4 py-12 text-center text-[#684938]" colSpan={8}>
                <div className="flex flex-col items-center gap-2">
                  <svg className="h-12 w-12 text-[#b18b75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-lg font-semibold">No products found</p>
                  <p className="text-sm">Try adjusting your filters or search terms</p>
                  <button
                    onClick={clearFilters}
                    className="mt-2 rounded-full bg-[#ec671f] px-4 py-2 text-sm font-bold text-white hover:bg-[#d95f1d]"
                  >
                    Clear All Filters
                  </button>
                </div>
              </td>
            </tr>
          )}

          {paginatedProducts.map((product, index) => (
            <tr
              key={product.id}
              className={`${index % 2 === 0 ? "bg-[#fffefd]" : "bg-[#fff8f3]"} border-t border-[#eed4c3] transition-colors hover:bg-[#fff0e8]`}
            >
              <td className="max-w-[280px] break-words px-4 py-4 align-top text-sm font-semibold text-[#2e2119]">
                <Link href={`/products/${product.slug}`} className="hover:text-[#ec671f] hover:underline">
                  {product.name}
                </Link>
              </td>
              <td className="max-w-[180px] break-words px-4 py-4 align-top text-sm text-[#553d30]">{product.dosageForm || "--"}</td>
              <td className="max-w-[200px] break-words px-4 py-4 align-top text-sm text-[#553d30]">{product.category}</td>
              <td className="max-w-[220px] break-words px-4 py-4 align-top text-sm text-[#553d30]">{product.strength || "--"}</td>
              <td className="max-w-[220px] break-words px-4 py-4 align-top text-sm text-[#553d30]">{extractPackSize(product.details)}</td>
              <td className="max-w-[240px] break-words px-4 py-4 align-top text-sm text-[#553d30]">
                {extractFormulationType(product.details, product.dosageForm)}
              </td>
              <td className="max-w-[220px] break-words px-4 py-4 align-top text-sm text-[#553d30]">{extractCasId(product)}</td>
              <td className="max-w-[180px] break-words px-4 py-4 align-top text-sm text-[#553d30]">{extractPharmSpec(product.details)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
