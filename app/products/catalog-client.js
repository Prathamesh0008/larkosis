"use client";

import { debounce } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import CatalogFilters from "@/components/products/catalog/filter-panel";
import CatalogMobileList from "@/components/products/catalog/mobile-list";
import CatalogPagination from "@/components/products/catalog/pagination";
import CatalogTable from "@/components/products/catalog/product-table";
import {
  extractCasId,
  extractFormulationType,
  extractPackSize,
  extractPharmSpec,
  filterAndSortProducts,
  INITIAL_FILTERS,
} from "@/lib/catalog-helpers";

export default function CatalogClient({ products, categories }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [draftFilters, setDraftFilters] = useState(() => ({
    query: searchParams.get("q") || "",
    category: searchParams.get("category") || "All",
    dosageForm: searchParams.get("form") || "All",
    strength: searchParams.get("strength") || "All",
  }));

  const [appliedFilters, setAppliedFilters] = useState(draftFilters);
  const [pageSize, setPageSize] = useState(() => Number(searchParams.get("limit")) || 12);
  const [page, setPage] = useState(() => Number(searchParams.get("page")) || 1);
  const [sortBy, setSortBy] = useState(() => searchParams.get("sort") || "name");
  const [sortOrder, setSortOrder] = useState(() => searchParams.get("order") || "asc");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams();
    if (appliedFilters.query) params.set("q", appliedFilters.query);
    if (appliedFilters.category !== "All") params.set("category", appliedFilters.category);
    if (appliedFilters.dosageForm !== "All") params.set("form", appliedFilters.dosageForm);
    if (appliedFilters.strength !== "All") params.set("strength", appliedFilters.strength);
    if (pageSize !== 12) params.set("limit", pageSize.toString());
    if (page !== 1) params.set("page", page.toString());
    if (sortBy !== "name") params.set("sort", sortBy);
    if (sortOrder !== "asc") params.set("order", sortOrder);

    router.push(`?${params.toString()}`, { scroll: false });
  }, [appliedFilters, pageSize, page, sortBy, sortOrder, router]);

  const dosageFormOptions = useMemo(
    () => [...new Set(products.map((product) => product.dosageForm).filter(Boolean))].sort(),
    [products]
  );

  const strengthOptions = useMemo(
    () => [...new Set(products.map((product) => product.strength).filter(Boolean))].sort(),
    [products]
  );

  const debouncedApplyFilters = useMemo(
    () =>
      debounce((nextFilters) => {
        setAppliedFilters(nextFilters);
        setPage(1);
      }, 500),
    []
  );

  useEffect(() => {
    if (draftFilters.query !== appliedFilters.query) {
      debouncedApplyFilters(draftFilters);
    }

    return () => debouncedApplyFilters.cancel();
  }, [draftFilters, debouncedApplyFilters, appliedFilters.query]);

  const filteredProducts = useMemo(
    () => filterAndSortProducts(products, appliedFilters, sortBy, sortOrder),
    [products, appliedFilters, sortBy, sortOrder]
  );

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * pageSize;
  const pageEnd = pageStart + pageSize;
  const paginatedProducts = filteredProducts.slice(pageStart, pageEnd);

  function updateDraft(event) {
    const { name, value } = event.target;
    setDraftFilters((prev) => ({ ...prev, [name]: value }));
  }

  function applyFilters() {
    setAppliedFilters(draftFilters);
    setPage(1);
  }

  function clearFilters() {
    setDraftFilters(INITIAL_FILTERS);
    setAppliedFilters(INITIAL_FILTERS);
    setPage(1);
    setSortBy("name");
    setSortOrder("asc");
  }

  function clearSingleFilter(key) {
    const nextFilters = { ...draftFilters, [key]: "All" };
    setDraftFilters(nextFilters);
    setAppliedFilters(nextFilters);
    setPage(1);
  }

  function toggleSort(column) {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      return;
    }

    setSortBy(column);
    setSortOrder("asc");
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <CatalogFilters
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        draftFilters={draftFilters}
        updateDraft={updateDraft}
        categories={categories}
        dosageFormOptions={dosageFormOptions}
        strengthOptions={strengthOptions}
        pageSize={pageSize}
        setPageSize={setPageSize}
        setPage={setPage}
        applyFilters={applyFilters}
        clearFilters={clearFilters}
        filteredProducts={filteredProducts}
        pageStart={pageStart}
        pageEnd={pageEnd}
        appliedFilters={appliedFilters}
        clearSingleFilter={clearSingleFilter}
      />

      <CatalogMobileList
        paginatedProducts={paginatedProducts}
        clearFilters={clearFilters}
        extractPackSize={extractPackSize}
        extractCasId={extractCasId}
      />

      <CatalogTable
        paginatedProducts={paginatedProducts}
        sortBy={sortBy}
        sortOrder={sortOrder}
        toggleSort={toggleSort}
        clearFilters={clearFilters}
        extractPackSize={extractPackSize}
        extractFormulationType={extractFormulationType}
        extractCasId={extractCasId}
        extractPharmSpec={extractPharmSpec}
      />

      <CatalogPagination
        filteredCount={filteredProducts.length}
        currentPage={currentPage}
        totalPages={totalPages}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </section>
  );
}
