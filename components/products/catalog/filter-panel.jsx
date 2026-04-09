import { companyProfile } from "@/data/companyProfile";

export default function CatalogFilters({
  isFilterOpen,
  setIsFilterOpen,
  draftFilters,
  updateDraft,
  categories,
  dosageFormOptions,
  strengthOptions,
  pageSize,
  setPageSize,
  setPage,
  applyFilters,
  clearFilters,
  filteredProducts,
  pageStart,
  pageEnd,
  appliedFilters,
  clearSingleFilter,
}) {
  return (
    <>
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="mb-4 flex w-full items-center justify-between rounded-lg border border-[#f2d6c4] bg-white p-4 md:hidden"
      >
        <span className="font-semibold text-[#1f1a16]">Filters & Search</span>
        <svg
          className={`h-5 w-5 transform transition-transform ${isFilterOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className={`rounded-2xl border border-[#f2d6c4] bg-[#fff7f2] p-4 sm:p-6 ${!isFilterOpen ? "hidden md:block" : ""}`}
      >
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <h2 className="text-center text-3xl font-bold text-[#1f1a16] sm:text-left">Product Finder</h2>
            <p className="mt-2 text-center text-sm text-[#5f4536] sm:text-left">
              Search and filter our pharmaceutical formulations
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 rounded-xl border border-[#efcfba] bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold text-[#513729]">Larkosis Pharmaceutical Product List</p>
          <a
            href={companyProfile.documents.productListPdf}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center rounded-full bg-[linear-gradient(95deg,#ec671f,#e33c6f)] px-5 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90 sm:w-auto"
          >
            Download PDF Catalog
          </a>
        </div>

        <div className="mt-5 rounded-xl border border-[#efcfba] bg-white p-3">
          <div className="grid gap-3 md:grid-cols-[2fr,1fr]">
            <div className="relative">
              <input
                type="search"
                name="query"
                value={draftFilters.query}
                onChange={updateDraft}
                placeholder="Search by Product Name / Category / Details"
                className="w-full rounded-full border border-[#ebc8b0] bg-[#fffaf6] px-4 py-3 pl-10 text-sm text-[#4a3427] outline-none ring-[#ec671f] focus:ring-2"
              />
              <svg
                className="absolute left-3 top-3.5 h-4 w-4 text-[#b18b75]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <select
              name="category"
              value={draftFilters.category}
              onChange={updateDraft}
              className="w-full rounded-full border border-[#ebc8b0] bg-[#fffaf6] px-4 py-3 text-sm text-[#4a3427] outline-none ring-[#ec671f] focus:ring-2"
            >
              <option value="All">All Categories</option>
              {categories.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name} ({item.count})
                </option>
              ))}
            </select>
          </div>

          <div className="mt-3 grid gap-3 md:grid-cols-[1fr,1fr,1fr,auto]">
            <select
              name="dosageForm"
              value={draftFilters.dosageForm}
              onChange={updateDraft}
              className="w-full rounded-full border border-[#ebc8b0] bg-[#fffaf6] px-4 py-3 text-sm text-[#4a3427] outline-none ring-[#ec671f] focus:ring-2"
            >
              <option value="All">All Forms</option>
              {dosageFormOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              name="strength"
              value={draftFilters.strength}
              onChange={updateDraft}
              className="w-full rounded-full border border-[#ebc8b0] bg-[#fffaf6] px-4 py-3 text-sm text-[#4a3427] outline-none ring-[#ec671f] focus:ring-2"
            >
              <option value="All">All Strengths</option>
              {strengthOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={pageSize}
              onChange={(event) => {
                setPageSize(Number(event.target.value));
                setPage(1);
              }}
              className="w-full rounded-full border border-[#ebc8b0] bg-[#fffaf6] px-4 py-3 text-sm text-[#4a3427] outline-none ring-[#ec671f] focus:ring-2"
            >
              <option value={12}>12 per page</option>
              <option value={24}>24 per page</option>
              <option value={36}>36 per page</option>
              <option value={48}>48 per page</option>
              <option value={96}>96 per page</option>
            </select>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={applyFilters}
                className="flex-1 rounded-full bg-[#ec671f] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#d95f1d] md:flex-none"
              >
                Apply Filters
              </button>

              <button
                type="button"
                onClick={clearFilters}
                className="flex-1 rounded-full bg-[#0d2f4d] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0a233a] md:flex-none"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-medium text-[#604435]">
            Showing <span className="font-bold text-[#ec671f]">{filteredProducts.length === 0 ? 0 : pageStart + 1}</span>
            {" - "}
            <span className="font-bold text-[#ec671f]">{Math.min(pageEnd, filteredProducts.length)}</span>
            {" of "}
            <span className="font-bold text-[#ec671f]">{filteredProducts.length}</span> products
          </p>

          <div className="flex flex-wrap gap-2">
            {appliedFilters.category !== "All" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#ec671f]/10 px-3 py-1 text-xs font-medium text-[#ec671f]">
                {appliedFilters.category}
                <button onClick={() => clearSingleFilter("category")} className="hover:text-[#d95f1d]">
                  x
                </button>
              </span>
            )}
            {appliedFilters.dosageForm !== "All" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#ec671f]/10 px-3 py-1 text-xs font-medium text-[#ec671f]">
                {appliedFilters.dosageForm}
                <button onClick={() => clearSingleFilter("dosageForm")} className="hover:text-[#d95f1d]">
                  x
                </button>
              </span>
            )}
            {appliedFilters.strength !== "All" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#ec671f]/10 px-3 py-1 text-xs font-medium text-[#ec671f]">
                {appliedFilters.strength}
                <button onClick={() => clearSingleFilter("strength")} className="hover:text-[#d95f1d]">
                  x
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
