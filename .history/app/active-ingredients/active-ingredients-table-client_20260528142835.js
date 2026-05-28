"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export default function ActiveIngredientsTableClient({ ingredients }) {
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("All");

  const areaOptions = useMemo(
    () => ["All", ...new Set(ingredients.map((item) => item.therapeuticArea).filter(Boolean))],
    [ingredients],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ingredients.filter((item) => {
      const matchQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.therapeuticArea.toLowerCase().includes(q);
      const matchArea = area === "All" || item.therapeuticArea === area;
      return matchQuery && matchArea;
    });
  }, [ingredients, query, area]);

  return (
    <>
      <div className="mb-5 grid gap-3 sm:grid-cols-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search ingredient name..."
          className="rounded-xl border border-[#d3dde6] px-4 py-2.5 text-sm text-[#0f3558] outline-none ring-[#ec671f] focus:ring-2"
        />
        <select
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="rounded-xl border border-[#d3dde6] px-4 py-2.5 text-sm text-[#0f3558] outline-none ring-[#ec671f] focus:ring-2"
        >
          {areaOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-medium text-[#36506b]">
          Showing <span className="font-semibold text-[#0f3558]">{filtered.length}</span> ingredient{filtered.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#d7e3ef] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-[#123f69] text-white">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide sm:text-xl">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide sm:text-xl">Therapeutic Area</th>
            </tr>
          </thead>
            <tbody className="divide-y divide-[#e1eaf3]">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={2} className="px-6 py-8 text-center text-sm font-semibold text-[#36506b]">
                  No results. Try different filters.
                </td>
              </tr>
            ) : (
              filtered.map((ingredient, idx) => (
                <tr key={ingredient.slug} className={`${idx % 2 === 0 ? "bg-[#f9fbfd]" : "bg-white"} transition-colors hover:bg-[#edf4fb]`}>
                  <td className="px-6 py-4 text-sm font-semibold text-[#0f3558] sm:text-base">
                    <Link href={`/active-ingredients/${ingredient.slug}`} className="inline-flex rounded-sm hover:text-[#ec671f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ec671f] focus-visible:ring-offset-2">
                      {ingredient.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#244564] sm:text-base">{ingredient.therapeuticArea || "General"}</td>
                </tr>
              ))
            )}
          </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
