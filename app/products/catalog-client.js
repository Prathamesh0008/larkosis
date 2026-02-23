"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { companyProfile } from "@/data/companyProfile";
import { useSearchParams, useRouter } from "next/navigation";
import { debounce } from "lodash"; // Install lodash if not already: npm install lodash

const CAS_LOOKUP_RULES = [
  { pattern: /\bcarboplatin\b/i, cas: "41575-94-4" },
  { pattern: /\bcisplatin\b/i, cas: "15663-27-1" },
  { pattern: /\bcyclophosphamide\b/i, cas: "6055-19-2" },
  { pattern: /\bdoxorubicin hydrochloride\b/i, cas: "25316-40-9" },
  { pattern: /\bepirubicin hydrochloride\b/i, cas: "56390-09-1" },
  { pattern: /\betoposide\b/i, cas: "33419-42-0" },
  { pattern: /\bfluorouracil\b/i, cas: "51-21-8" },
  { pattern: /\bifosfamide\b/i, cas: "3778-73-2" },
  { pattern: /\birinotecan hydrochloride\b/i, cas: "136572-09-3" },
  { pattern: /\bletrozole\b/i, cas: "112809-51-5" },
  { pattern: /\bmethotrexate\b/i, cas: "59-05-2" },
  { pattern: /\bpaclitaxel\b/i, cas: "33069-62-4" },
  { pattern: /\bvinblastine sulphate\b/i, cas: "143-67-9" },
  { pattern: /\bvincristine sulphate\b/i, cas: "2068-78-2" },
];

function normalizeSpec(spec) {
  return spec.toUpperCase().replace(/\s+/g, "");
}

function extractPharmSpec(details) {
  const matches = details.match(/\b(BP\/USP|BP|USP|INH|IP|IH)\b/gi) ?? [];
  const unique = [...new Set(matches.map((item) => normalizeSpec(item)))];
  return unique.length > 0 ? unique.join(", ") : "--";
}

function extractPackSize(details) {
  const patterns = [
    /(\d+\s*[xX]\s*\d+(?:\s*[xX]\s*\d+)?(?:\s*'?s)?)/i,
    /(\d+\s*(?:ml|g|mg|mcg|tablet|cap|vial|ampoule|bottle|pouch|kit)s?)/i,
    /(vial(?:\s*of)?\s*[^,.;]+)/i,
    /(bottle(?:\s*of)?\s*[^,.;]+)/i,
    /(ampoule(?:\s*of)?\s*[^,.;]+)/i,
    /(pouch(?:\s*of)?\s*[^,.;]+)/i,
    /(kit)/i,
  ];

  for (const pattern of patterns) {
    const match = details.match(pattern);
    if (match?.[1]) {
      return match[1].trim();
    }
  }

  return "--";
}

function extractFormulationType(details, dosageForm) {
  const text = details.toLowerCase();

  if (text.includes("dry powder for injection")) return "Dry Powder For Injection";
  if (text.includes("liquid injection")) return "Liquid Injection";
  if (text.includes("film coated")) return "Film Coated";
  if (text.includes("hard gelatin")) return "Hard Gelatin";
  if (text.includes("soft gelatin")) return "Soft Gelatin";
  if (text.includes("oral liquid")) return "Oral Liquid";
  if (text.includes("extended release") || text.includes("er ")) return "Extended Release";
  if (text.includes("sustained release") || text.includes("sr ")) return "Sustained Release";
  if (text.includes("immediate release") || text.includes("ir ")) return "Immediate Release";
  if (text.includes("effervescent")) return "Effervescent";
  if (text.includes("chewable")) return "Chewable";
  if (text.includes("orally disintegrating") || text.includes("odt")) return "Orally Disintegrating";

  return dosageForm || "--";
}

function extractCasId(product) {
  if (product.casId && product.casId !== "--") {
    return product.casId;
  }

  const source = `${product.name} ${product.details}`;

  const directMatches = source.match(/\b\d{2,7}-\d{2}-\d\b/g) ?? [];
  if (directMatches.length > 0) {
    return [...new Set(directMatches)].join(", ");
  }

  for (const rule of CAS_LOOKUP_RULES) {
    if (rule.pattern.test(source)) {
      return rule.cas;
    }
  }

  return "--";
}

const initialFilters = {
  query: "",
  category: "All",
  dosageForm: "All",
  strength: "All",
};

export default function CatalogClient({ products, categories }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Initialize filters from URL params
  const [draftFilters, setDraftFilters] = useState(() => ({
    query: searchParams.get('q') || "",
    category: searchParams.get('category') || "All",
    dosageForm: searchParams.get('form') || "All",
    strength: searchParams.get('strength') || "All",
  }));
  
  const [appliedFilters, setAppliedFilters] = useState(draftFilters);
  const [pageSize, setPageSize] = useState(() => 
    Number(searchParams.get('limit')) || 12
  );
  const [page, setPage] = useState(() => 
    Number(searchParams.get('page')) || 1
  );
  const [sortBy, setSortBy] = useState(() => 
    searchParams.get('sort') || 'name'
  );
  const [sortOrder, setSortOrder] = useState(() => 
    searchParams.get('order') || 'asc'
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (appliedFilters.query) params.set('q', appliedFilters.query);
    if (appliedFilters.category !== 'All') params.set('category', appliedFilters.category);
    if (appliedFilters.dosageForm !== 'All') params.set('form', appliedFilters.dosageForm);
    if (appliedFilters.strength !== 'All') params.set('strength', appliedFilters.strength);
    if (pageSize !== 12) params.set('limit', pageSize.toString());
    if (page !== 1) params.set('page', page.toString());
    if (sortBy !== 'name') params.set('sort', sortBy);
    if (sortOrder !== 'asc') params.set('order', sortOrder);
    
    router.push(`?${params.toString()}`, { scroll: false });
  }, [appliedFilters, pageSize, page, sortBy, sortOrder, router]);

  const dosageFormOptions = useMemo(() => {
    return [...new Set(products.map((product) => product.dosageForm).filter(Boolean))].sort();
  }, [products]);

  const strengthOptions = useMemo(() => {
    const values = [...new Set(products.map((product) => product.strength).filter(Boolean))].sort();
    return values;
  }, [products]);

  // Debounced search
  const debouncedApplyFilters = useMemo(
    () =>
      debounce((nextFilters) => {
        setAppliedFilters(nextFilters);
        setPage(1);
      }, 500),
    []
  );

  // Apply filters on draft change for search query
  useEffect(() => {
    if (draftFilters.query !== appliedFilters.query) {
      debouncedApplyFilters(draftFilters);
    }
    return () => debouncedApplyFilters.cancel();
  }, [draftFilters, debouncedApplyFilters, appliedFilters.query]);

  const filteredProducts = useMemo(() => {
    const q = appliedFilters.query.trim().toLowerCase();

    let filtered = products.filter((product) => {
      const inCategory =
        appliedFilters.category === "All" || product.category === appliedFilters.category;
      const inForm =
        appliedFilters.dosageForm === "All" || product.dosageForm === appliedFilters.dosageForm;
      const inStrength =
        appliedFilters.strength === "All" || product.strength === appliedFilters.strength;

      const matchesQuery =
        q.length === 0 ||
        product.name.toLowerCase().includes(q) ||
        product.details.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.dosageForm.toLowerCase().includes(q) ||
        (product.strength && product.strength.toLowerCase().includes(q));

      return inCategory && inForm && inStrength && matchesQuery;
    });

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
        case 'dosageForm':
          comparison = (a.dosageForm || '').localeCompare(b.dosageForm || '');
          break;
        case 'strength':
          comparison = (a.strength || '').localeCompare(b.strength || '');
          break;
        default:
          comparison = 0;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [products, appliedFilters, sortBy, sortOrder]);

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
    setDraftFilters(initialFilters);
    setAppliedFilters(initialFilters);
    setPage(1);
    setSortBy('name');
    setSortOrder('asc');
  }

  function toggleSort(column) {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  }

  function exportToCSV() {
    const headers = ['Name', 'Form', 'Category', 'Strength', 'Pack Size', 'Formulation Type', 'CAS ID', 'Pharm Spec'];
    const csvData = filteredProducts.map(p => [
      p.name,
      p.dosageForm || '--',
      p.category,
      p.strength || '--',
      extractPackSize(p.details),
      extractFormulationType(p.details, p.dosageForm),
      extractCasId(p),
      extractPharmSpec(p.details)
    ]);
    
    const csv = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pharmaceutical-products.csv';
    a.click();
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="mb-4 flex w-full items-center justify-between rounded-lg border border-[#f2d6c4] bg-white p-4 md:hidden"
      >
        <span className="font-semibold text-[#1f1a16]">Filters & Search</span>
        <svg
          className={`h-5 w-5 transform transition-transform ${isFilterOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div className={`rounded-2xl border border-[#f2d6c4] bg-[#fff7f2] p-4 sm:p-6 ${!isFilterOpen ? 'hidden md:block' : ''}`}>
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <h2 className="text-center text-3xl font-bold text-[#1f1a16] sm:text-left">Product Finder</h2>
            <p className="mt-2 text-center text-sm text-[#5f4536] sm:text-left">
              Search and filter our pharmaceutical formulations
            </p>
          </div>
          
          {/* Export Button */}
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 rounded-full border border-[#ec671f] bg-white px-4 py-2 text-sm font-semibold text-[#ec671f] hover:bg-[#ec671f] hover:text-white transition-colors"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export CSV
          </button>
        </div>

        <div className="mt-5 flex flex-col gap-3 rounded-xl border border-[#efcfba] bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold text-[#513729]">
            Larkosis Pharmaceutical Product List
          </p>
          <a
            href={companyProfile.documents.productListPdf}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center rounded-full bg-[linear-gradient(95deg,#ec671f,#e33c6f)] px-5 py-2 text-sm font-bold text-white hover:opacity-90 transition-opacity sm:w-auto"
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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

            <div className="flex gap-2">
              <button
                type="button"
                onClick={applyFilters}
                className="flex-1 rounded-full bg-[#ec671f] px-6 py-3 text-sm font-bold text-white hover:bg-[#d95f1d] transition-colors md:flex-none"
              >
                Apply Filters
              </button>

              <button
                type="button"
                onClick={clearFilters}
                className="flex-1 rounded-full bg-[#0d2f4d] px-6 py-3 text-sm font-bold text-white hover:bg-[#0a233a] transition-colors md:flex-none"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-medium text-[#604435]">
            Showing <span className="font-bold text-[#ec671f]">{filteredProducts.length === 0 ? 0 : pageStart + 1}</span>
            {' - '}
            <span className="font-bold text-[#ec671f]">{Math.min(pageEnd, filteredProducts.length)}</span>
            {' of '}
            <span className="font-bold text-[#ec671f]">{filteredProducts.length}</span> products
          </p>
          
          {/* Active Filters */}
          <div className="flex flex-wrap gap-2">
            {appliedFilters.category !== 'All' && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#ec671f]/10 px-3 py-1 text-xs font-medium text-[#ec671f]">
                {appliedFilters.category}
                <button onClick={() => {
                  setDraftFilters(prev => ({ ...prev, category: 'All' }));
                  applyFilters();
                }} className="hover:text-[#d95f1d]">×</button>
              </span>
            )}
            {appliedFilters.dosageForm !== 'All' && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#ec671f]/10 px-3 py-1 text-xs font-medium text-[#ec671f]">
                {appliedFilters.dosageForm}
                <button onClick={() => {
                  setDraftFilters(prev => ({ ...prev, dosageForm: 'All' }));
                  applyFilters();
                }} className="hover:text-[#d95f1d]">×</button>
              </span>
            )}
            {appliedFilters.strength !== 'All' && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#ec671f]/10 px-3 py-1 text-xs font-medium text-[#ec671f]">
                {appliedFilters.strength}
                <button onClick={() => {
                  setDraftFilters(prev => ({ ...prev, strength: 'All' }));
                  applyFilters();
                }} className="hover:text-[#d95f1d]">×</button>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-[#f0d4c2] bg-white shadow-sm">
        <table className="min-w-[1200px] w-full border-collapse text-left">
          <thead className="bg-[#0f3558] text-xs uppercase tracking-[0.08em] text-white">
            <tr>
              <th 
                className="border-r border-[#325b7d] px-4 py-4 cursor-pointer hover:bg-[#1a4a73] transition-colors"
                onClick={() => toggleSort('name')}
              >
                <div className="flex items-center gap-1">
                  Name
                  {sortBy === 'name' && (
                    <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th 
                className="border-r border-[#325b7d] px-4 py-4 cursor-pointer hover:bg-[#1a4a73] transition-colors"
                onClick={() => toggleSort('dosageForm')}
              >
                <div className="flex items-center gap-1">
                  Form
                  {sortBy === 'dosageForm' && (
                    <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th 
                className="border-r border-[#325b7d] px-4 py-4 cursor-pointer hover:bg-[#1a4a73] transition-colors"
                onClick={() => toggleSort('category')}
              >
                <div className="flex items-center gap-1">
                  Category
                  {sortBy === 'category' && (
                    <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th 
                className="border-r border-[#325b7d] px-4 py-4 cursor-pointer hover:bg-[#1a4a73] transition-colors"
                onClick={() => toggleSort('strength')}
              >
                <div className="flex items-center gap-1">
                  Strength
                  {sortBy === 'strength' && (
                    <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                className={`${index % 2 === 0 ? "bg-[#fffefd]" : "bg-[#fff8f3]"} border-t border-[#eed4c3] hover:bg-[#fff0e8] transition-colors`}
              >
                <td className="px-4 py-4 text-sm font-semibold text-[#2e2119]">
                  <Link href={`/products/${product.slug}`} className="hover:text-[#ec671f] hover:underline">
                    {product.name}
                  </Link>
                </td>
                <td className="px-4 py-4 text-sm text-[#553d30]">{product.dosageForm || "--"}</td>
                <td className="px-4 py-4 text-sm text-[#553d30]">{product.category}</td>
                <td className="px-4 py-4 text-sm text-[#553d30]">{product.strength || "--"}</td>
                <td className="px-4 py-4 text-sm text-[#553d30]">{extractPackSize(product.details)}</td>
                <td className="px-4 py-4 text-sm text-[#553d30]">
                  {extractFormulationType(product.details, product.dosageForm)}
                </td>
                <td className="px-4 py-4 text-sm text-[#553d30]">{extractCasId(product)}</td>
                <td className="px-4 py-4 text-sm text-[#553d30]">{extractPharmSpec(product.details)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredProducts.length > 0 && (
        <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-xl border border-[#f0d4c2] bg-white px-4 py-3 sm:flex-row">
          <p className="text-sm font-semibold text-[#6c4630]">
            Page <span className="text-[#ec671f]">{currentPage}</span> of {totalPages}
          </p>
          
          {/* Pagination */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage(1)}
              disabled={currentPage <= 1}
              className="rounded-lg border border-[#e6b99d] px-3 py-2 text-sm font-semibold text-[#7b4428] disabled:cursor-not-allowed disabled:opacity-40 hover:bg-[#fff0e8]"
            >
              First
            </button>
            <button
              type="button"
              onClick={() => setPage((value) => Math.max(1, value - 1))}
              disabled={currentPage <= 1}
              className="rounded-lg border border-[#e6b99d] px-4 py-2 text-sm font-semibold text-[#7b4428] disabled:cursor-not-allowed disabled:opacity-40 hover:bg-[#fff0e8]"
            >
              Previous
            </button>
            
            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                let pageNum = currentPage;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={i}
                    onClick={() => setPage(pageNum)}
                    className={`h-8 w-8 rounded-lg text-sm font-semibold transition-colors ${
                      currentPage === pageNum
                        ? 'bg-[#ec671f] text-white'
                        : 'border border-[#e6b99d] text-[#7b4428] hover:bg-[#fff0e8]'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button
              type="button"
              onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
              disabled={currentPage >= totalPages}
              className="rounded-lg border border-[#e6b99d] px-4 py-2 text-sm font-semibold text-[#7b4428] disabled:cursor-not-allowed disabled:opacity-40 hover:bg-[#fff0e8]"
            >
              Next
            </button>
            <button
              type="button"
              onClick={() => setPage(totalPages)}
              disabled={currentPage >= totalPages}
              className="rounded-lg border border-[#e6b99d] px-3 py-2 text-sm font-semibold text-[#7b4428] disabled:cursor-not-allowed disabled:opacity-40 hover:bg-[#fff0e8]"
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
            className="rounded-lg border border-[#e6b99d] bg-white px-3 py-2 text-sm text-[#7b4428] outline-none focus:ring-2 focus:ring-[#ec671f]"
          >
            <option value={12}>12 per page</option>
            <option value={24}>24 per page</option>
            <option value={36}>36 per page</option>
            <option value={48}>48 per page</option>
            <option value={96}>96 per page</option>
          </select>
        </div>
      )}
    </section>
  );
}
