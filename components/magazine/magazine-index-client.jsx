"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslatedArticles } from "@/data/translatedArticles";

const ARTICLES_PER_PAGE = 3;

export default function MagazineIndexClient({ categoryFilter = null }) {
  const [currentPage, setCurrentPage] = useState(1);
  const { translations } = useLanguage();
  const articles = useTranslatedArticles();
  const magazine = translations?.magazine || {};

  const filteredArticles = useMemo(() => {
    if (!categoryFilter) {
      return articles;
    }

    return articles.filter((article) => article.tag === categoryFilter);
  }, [articles, categoryFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE),
  );

  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * ARTICLES_PER_PAGE;
    return filteredArticles.slice(start, start + ARTICLES_PER_PAGE);
  }, [currentPage, filteredArticles]);

  const pageTitle = categoryFilter
    ? magazine.categories?.[categoryFilter]
    : magazine.title || "Larksois Magazine";

  return (
    <main className="min-h-screen bg-[#f8fafc] py-20">
      <section className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-[#102d47] md:text-5xl">
            {pageTitle}
          </h1>
        </div>

        <div className="grid gap-12 md:grid-cols-4">
          <aside className="md:col-span-1">
            <div className="rounded-3xl border border-[#e7edf3] bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold text-[#102d47]">
                {magazine.recentArticles || "Recent Articles"}
              </h2>

              <div className="space-y-4">
                {articles.length === 0 ? (
                  <p className="text-sm text-[#5d7082]">
                    {magazine.noRecentArticles || "No recent articles yet."}
                  </p>
                ) : (
                  articles.map((article) => (
                    <Link
                      key={article.slug}
                      href={`/larksois-mag/${article.slug}`}
                      className="flex items-start gap-3 rounded-2xl p-2 transition hover:bg-[#f3f7fb]"
                    >
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ec671f]">
                          {article.category}
                        </span>
                        <h3 className="mt-1 line-clamp-3 text-sm font-semibold leading-6 text-[#102d47]">
                          {article.title}
                        </h3>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </aside>

          <div className="space-y-10 md:col-span-3">
            {paginatedArticles.map((article) => (
              <article
                key={article.slug}
                className="overflow-hidden rounded-[30px] border border-[#e7edf3] bg-white shadow-sm"
              >
                <div className="relative h-[260px] w-full sm:h-[320px]">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-8 sm:p-10">
                  <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#ec671f]">
                    {article.category}
                  </span>
                  <h2 className="mt-3 text-3xl font-bold leading-tight text-[#102d47]">
                    {article.title}
                  </h2>
                  <p className="mt-2 text-sm font-medium text-[#6a7d90]">
                    {article.date} • {article.readTime}
                  </p>
                  <p className="mt-5 text-base leading-8 text-[#5d7082]">
                    {article.excerpt}
                  </p>

                  <Link
                    href={`/larksois-mag/${article.slug}`}
                    className="mt-6 inline-flex text-sm font-semibold text-[#ec671f] transition hover:text-[#c75519]"
                  >
                    {magazine.readMore || "Read More ->"}
                  </Link>
                </div>
              </article>
            ))}

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                className="rounded-full border border-[#d8e0e8] px-5 py-2.5 text-sm font-semibold text-[#102d47] transition hover:border-[#ec671f] hover:text-[#ec671f] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {magazine.previous || "Previous"}
              </button>

              <span className="text-sm font-medium text-[#5d7082]">
                {(magazine.page || "Page")} {currentPage} {(magazine.of || "of")}{" "}
                {totalPages}
              </span>

              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) => Math.min(totalPages, page + 1))
                }
                disabled={currentPage === totalPages}
                className="rounded-full border border-[#d8e0e8] px-5 py-2.5 text-sm font-semibold text-[#102d47] transition hover:border-[#ec671f] hover:text-[#ec671f] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {magazine.next || "Next"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
