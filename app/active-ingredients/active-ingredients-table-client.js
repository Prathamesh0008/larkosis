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

      <div className="overflow-hidden rounded-xl border border-[#0f3558]/90">
        <table className="min-w-full divide-y divide-[#0f3558]/80 bg-white">
          <thead className="bg-[#0f3558] text-white">
            <tr>
              <th className="px-5 py-4 text-left text-sm font-semibold sm:text-xl">Name</th>
              <th className="px-5 py-4 text-left text-sm font-semibold sm:text-xl">Therapeutic Area</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#0f3558]/80">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={2} className="px-5 py-5 text-sm font-semibold text-[#0f3558]">
                  No results. Try different filters.
                </td>
              </tr>
            ) : (
              filtered.map((ingredient) => (
                <tr key={ingredient.slug} className="bg-[#f9fbfd] hover:bg-[#eef4f8]">
                  <td className="px-5 py-4 text-sm font-semibold text-[#0f3558]">
                    <Link href={`/active-ingredients/${ingredient.slug}`} className="hover:underline">
                      {ingredient.name}
                    </Link>
                  </td>
                  <td className="px-5 py-4 text-sm text-[#0f3558]">{ingredient.therapeuticArea}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
