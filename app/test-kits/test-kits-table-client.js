"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export default function TestKitsTableClient({ testKits }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [method, setMethod] = useState("All");
  const [specimen, setSpecimen] = useState("All");

  const categories = useMemo(
    () => ["All", ...new Set(testKits.map((item) => item.category).filter(Boolean))],
    [testKits],
  );
  const methods = useMemo(
    () => ["All", ...new Set(testKits.map((item) => item.method).filter(Boolean))],
    [testKits],
  );
  const specimens = useMemo(
    () => ["All", ...new Set(testKits.map((item) => item.specimen).filter(Boolean))],
    [testKits],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return testKits.filter((item) => {
      const queryMatch =
        !q ||
        item.product.toLowerCase().includes(q) ||
        (item.listProduct || "").toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.method.toLowerCase().includes(q) ||
        item.specimen.toLowerCase().includes(q);
      const categoryMatch = category === "All" || item.category === category;
      const methodMatch = method === "All" || item.method === method;
      const specimenMatch = specimen === "All" || item.specimen === specimen;
      return queryMatch && categoryMatch && methodMatch && specimenMatch;
    });
  }, [testKits, query, category, method, specimen]);

  return (
    <>
      <div className="mx-auto max-w-5xl">
        <div className="relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search test kits..."
            className="w-full rounded-full border border-[#0f3558] bg-white px-6 py-3 pr-14 text-sm text-[#0f3558] outline-none ring-[#ec671f] placeholder:text-[#7c8fa3] focus:ring-2"
          />
          <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[#0f3558]">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" />
            </svg>
          </span>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-full border border-[#b8c5d3] bg-white px-5 py-2.5 text-sm text-[#0f3558] outline-none ring-[#ec671f] focus:ring-2"
          >
            {categories.map((option) => (
              <option key={option} value={option}>
                {option === "All" ? "Category" : option}
              </option>
            ))}
          </select>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="rounded-full border border-[#b8c5d3] bg-white px-5 py-2.5 text-sm text-[#0f3558] outline-none ring-[#ec671f] focus:ring-2"
          >
            {methods.map((option) => (
              <option key={option} value={option}>
                {option === "All" ? "Method" : option}
              </option>
            ))}
          </select>
          <select
            value={specimen}
            onChange={(e) => setSpecimen(e.target.value)}
            className="rounded-full border border-[#b8c5d3] bg-white px-5 py-2.5 text-sm text-[#0f3558] outline-none ring-[#ec671f] focus:ring-2"
          >
            {specimens.map((option) => (
              <option key={option} value={option}>
                {option === "All" ? "Specimen" : option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-lg border border-[#e7d7cc]">
        <table className="min-w-full divide-y divide-[#e7d7cc] bg-white">
          <thead className="bg-[#0f3558] text-white">
            <tr>
              <th className="px-5 py-3 text-left text-sm font-semibold">Product</th>
              <th className="px-5 py-3 text-left text-sm font-semibold">Description</th>
              <th className="px-5 py-3 text-left text-sm font-semibold">Category</th>
              <th className="px-5 py-3 text-left text-sm font-semibold">Method</th>
              <th className="px-5 py-3 text-left text-sm font-semibold">Specimen</th>
              <th className="px-5 py-3 text-left text-sm font-semibold">Cut-Off</th>
              <th className="px-5 py-3 text-left text-sm font-semibold">Certificate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e7d7cc]">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-5 text-sm font-semibold text-[#0f3558]">
                  No results. Try different filters.
                </td>
              </tr>
            ) : (
              filtered.map((item, index) => (
                <tr
                  key={item.id}
                  className={`text-[#0f3558] transition-colors hover:bg-[#f7eee8] ${
                    index % 2 === 0 ? "bg-white" : "bg-[#f8f3ef]"
                  }`}
                >
                  <td className="px-5 py-4 text-sm font-semibold">
                    <Link href={`/test-kits/${item.slug}`} className="hover:underline">
                      {item.listProduct || item.product}
                    </Link>
                  </td>
                  <td className="px-5 py-4 text-sm">{item.description}</td>
                  <td className="px-5 py-4 text-sm">{item.category}</td>
                  <td className="px-5 py-4 text-sm">{item.method}</td>
                  <td className="px-5 py-4 text-sm">{item.specimen}</td>
                  <td className="px-5 py-4 text-sm">{item.cutOff}</td>
                  <td className="px-5 py-4 text-sm">{item.certificate}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
