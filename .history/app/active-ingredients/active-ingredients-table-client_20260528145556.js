"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export default function ActiveIngredientsTableClient({ ingredients }) {
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("All");

  const areaOptions = useMemo(
    () => [
      "All",
      ...new Set(
        ingredients.map((item) => item.therapeuticArea).filter(Boolean),
      ),
    ],
    [ingredients],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return ingredients.filter((item) => {
      const matchQuery =
        !q ||
        item.name?.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.therapeuticArea?.toLowerCase().includes(q);

      const matchArea = area === "All" || item.therapeuticArea === area;

      return matchQuery && matchArea;
    });
  }, [ingredients, query, area]);

  return (
    <>
      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search ingredient name..."
          className="h-12 rounded-xl border border-[#d6dde5] bg-white px-4 text-sm font-medium text-[#002b4f] outline-none transition focus:border-[#0b3454] focus:ring-2 focus:ring-[#0b3454]/15"
        />

        <select
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="h-12 rounded-xl border border-[#d6dde5] bg-white px-4 text-sm font-medium text-[#002b4f] outline-none transition focus:border-[#0b3454] focus:ring-2 focus:ring-[#0b3454]/15"
        >
          {areaOptions.map((option) => (
            <option key={option} value={option}>
              {option === "All" ? "All Therapeutic Areas" : option}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-medium text-[#36506b]">
          Showing{" "}
          <span className="font-bold text-[#0b3454]">{filtered.length}</span>{" "}
          ingredient{filtered.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border border-[#0b3454] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-[760px] w-full border-collapse">
            <thead>
              <tr className="bg-[#0b3454] text-white">
                <th className="w-1/2 border-r border-white/25 px-5 py-5 text-left text-sm font-bold sm:px-6 sm:text-base">
                  Name
                </th>
                <th className="w-1/2 px-5 py-5 text-left text-sm font-bold sm:px-6 sm:text-base">
                  Therapeutic Area
                </th>
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={2}
                    className="px-6 py-10 text-center text-sm font-semibold text-[#36506b]"
                  >
                    No results. Try different filters.
                  </td>
                </tr>
              ) : (
                filtered.map((ingredient, index) => (
                  <tr
                    key={ingredient.slug}
                    className={`border-t border-[#0b3454] transition-colors hover:bg-[#fff6ef] ${
                      index % 2 === 0 ? "bg-white" : "bg-[#f8fafc]"
                    }`}
                  >
                    <td className="border-r border-[#0b3454] px-5 py-5 text-sm font-bold text-[#002b4f] sm:px-6 sm:text-base">
                      <Link
                        href={`/active-ingredients/${ingredient.slug}`}
                        className="inline-flex rounded-sm transition hover:text-[#ec671f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ec671f] focus-visible:ring-offset-2"
                      >
                        {ingredient.name}
                      </Link>
                    </td>

                    <td className="px-5 py-5 text-sm font-medium text-[#002b4f] sm:px-6 sm:text-base">
                     {ingredient.therapeuticArea || "Missing therapeuticArea"}
                    </td>
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