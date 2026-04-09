export default function CatalogPagination({
  filteredCount,
  currentPage,
  totalPages,
  setPage,
  pageSize,
  setPageSize,
}) {
  if (filteredCount === 0) {
    return null;
  }

  const pagesToRender = [...Array(Math.min(5, totalPages))].map((_, i) => {
    if (totalPages <= 5) return i + 1;
    if (currentPage <= 3) return i + 1;
    if (currentPage >= totalPages - 2) return totalPages - 4 + i;
    return currentPage - 2 + i;
  });

  return (
    <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-xl border border-[#f0d4c2] bg-white px-4 py-3 sm:flex-row">
      <p className="text-sm font-semibold text-[#6c4630]">
        Page <span className="text-[#ec671f]">{currentPage}</span> of {totalPages}
      </p>

      <div className="flex w-full flex-wrap items-center justify-center gap-2 sm:w-auto sm:justify-end">
        <button
          type="button"
          onClick={() => setPage(1)}
          disabled={currentPage <= 1}
          className="hidden rounded-lg border border-[#e6b99d] px-3 py-2 text-sm font-semibold text-[#7b4428] hover:bg-[#fff0e8] disabled:cursor-not-allowed disabled:opacity-40 sm:inline-flex"
        >
          First
        </button>
        <button
          type="button"
          onClick={() => setPage((value) => Math.max(1, value - 1))}
          disabled={currentPage <= 1}
          className="rounded-lg border border-[#e6b99d] px-3 py-2 text-sm font-semibold text-[#7b4428] hover:bg-[#fff0e8] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        <div className="flex items-center gap-1">
          {pagesToRender.map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setPage(pageNum)}
              className={`h-8 w-8 rounded-lg text-sm font-semibold transition-colors ${
                currentPage === pageNum
                  ? "bg-[#ec671f] text-white"
                  : "border border-[#e6b99d] text-[#7b4428] hover:bg-[#fff0e8]"
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
          disabled={currentPage >= totalPages}
          className="rounded-lg border border-[#e6b99d] px-3 py-2 text-sm font-semibold text-[#7b4428] hover:bg-[#fff0e8] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
        <button
          type="button"
          onClick={() => setPage(totalPages)}
          disabled={currentPage >= totalPages}
          className="hidden rounded-lg border border-[#e6b99d] px-3 py-2 text-sm font-semibold text-[#7b4428] hover:bg-[#fff0e8] disabled:cursor-not-allowed disabled:opacity-40 sm:inline-flex"
        >
          Last
        </button>
      </div>

      <select
        value={pageSize}
        onChange={(event) => {
          setPageSize(Number(event.target.value));
          setPage(1);
        }}
        className="w-full rounded-lg border border-[#e6b99d] bg-white px-3 py-2 text-sm text-[#7b4428] outline-none focus:ring-2 focus:ring-[#ec671f] sm:w-auto"
      >
        <option value={12}>12 per page</option>
        <option value={24}>24 per page</option>
        <option value={36}>36 per page</option>
        <option value={48}>48 per page</option>
        <option value={96}>96 per page</option>
      </select>
    </div>
  );
}
