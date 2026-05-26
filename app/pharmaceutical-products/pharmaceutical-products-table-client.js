"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export default function PharmaceuticalProductsTableClient({ products }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [form, setForm] = useState("All");
  const [dosage, setDosage] = useState("All");

  const categories = useMemo(
    () => ["All", ...new Set(products.map((item) => item.category).filter(Boolean))],
    [products],
  );
  const forms = useMemo(
    () => ["All", ...new Set(products.map((item) => item.form).filter(Boolean))],
    [products],
  );
  const dosages = useMemo(
    () => ["All", ...new Set(products.map((item) => item.dosage).filter(Boolean))],
    [products],
  );

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((item) => {
      const queryMatch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.form.toLowerCase().includes(q) ||
        item.dosage.toLowerCase().includes(q) ||
        item.casId.toLowerCase().includes(q);

      const categoryMatch = category === "All" || item.category === category;
      const formMatch = form === "All" || item.form === form;
      const dosageMatch = dosage === "All" || item.dosage === dosage;

      return queryMatch && categoryMatch && formMatch && dosageMatch;
    });
  }, [products, query, category, form, dosage]);

  return (
    <>
      <div className="mx-auto max-w-5xl">
        <div className="relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search product..."
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
            value={form}
            onChange={(e) => setForm(e.target.value)}
            className="rounded-full border border-[#b8c5d3] bg-white px-5 py-2.5 text-sm text-[#0f3558] outline-none ring-[#ec671f] focus:ring-2"
          >
            {forms.map((option) => (
              <option key={option} value={option}>
                {option === "All" ? "Form" : option}
              </option>
            ))}
          </select>
          <select
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            className="rounded-full border border-[#b8c5d3] bg-white px-5 py-2.5 text-sm text-[#0f3558] outline-none ring-[#ec671f] focus:ring-2"
          >
            {dosages.map((option) => (
              <option key={option} value={option}>
                {option === "All" ? "Dosage" : option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-lg border border-[#0f3558]/90">
        <table className="min-w-full divide-y divide-[#0f3558]/70 bg-white">
          <thead className="bg-[#0f3558] text-white">
            <tr>
              <th className="px-5 py-3 text-left text-sm font-semibold">Name</th>
              <th className="px-5 py-3 text-left text-sm font-semibold">Form</th>
              <th className="px-5 py-3 text-left text-sm font-semibold">Category</th>
              <th className="px-5 py-3 text-left text-sm font-semibold">Dosage</th>
              <th className="px-5 py-3 text-left text-sm font-semibold">CAS-ID</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#d2dee8]">
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-5 text-sm font-semibold text-[#0f3558]">
                  No results. Try different filters.
                </td>
              </tr>
            ) : (
              filteredProducts.map((item) => (
                <tr key={item.id} className="bg-[#fbfcfe] text-[#0f3558] hover:bg-[#f1f6fb]">
                  <td className="px-5 py-4 text-sm font-semibold">
                    <Link href={`/pharmaceutical-products/${item.slug}`} className="hover:underline">
                      {item.name}
                    </Link>
                  </td>
                  <td className="px-5 py-4 text-sm">{item.form}</td>
                  <td className="px-5 py-4 text-sm">{item.category}</td>
                  <td className="px-5 py-4 text-sm">{item.dosage}</td>
                  <td className="px-5 py-4 text-sm">{item.casId}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
