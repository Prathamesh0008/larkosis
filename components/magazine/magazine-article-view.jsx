"use client";

import Image from "next/image";
import { useTranslatedArticleDetails } from "@/data/translatedArticles";

export default function MagazineArticleView({ article }) {
  const translatedArticle = useTranslatedArticleDetails(article.slug);
  const activeArticle = translatedArticle || article;

  return (
    <main className="min-h-screen bg-[#f8fafc] py-20">
      <article className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#ec671f]">
            {activeArticle.category}
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-[#102d47] md:text-5xl">
            {activeArticle.title}
          </h1>
          <p className="mt-4 text-sm font-medium text-[#6a7d90]">
            {activeArticle.date} • {activeArticle.readTime}
          </p>
        </div>

        <div className="relative mt-10 h-[280px] overflow-hidden rounded-[30px] sm:h-[420px]">
          <Image
            src={activeArticle.image}
            alt={activeArticle.title}
            fill
            className="object-cover"
          />
        </div>

        <p className="mx-auto mt-5 max-w-3xl text-center text-base leading-8 text-[#5d7082]">
          {activeArticle.heroCaption}
        </p>

        <div className="mt-12 space-y-12">
          {activeArticle.sections.map((section, index) => (
            <section
              key={`${section.heading || section.subheading}-${index}`}
              className="border-b border-[#e3ebf2] pb-10 last:border-b-0 last:pb-0"
            >
              {section.heading ? (
                <h2 className="text-2xl font-bold text-[#102d47]">
                  {section.heading}
                </h2>
              ) : null}

              {section.subheading ? (
                <h3 className="text-xl font-semibold text-[#102d47]">
                  {section.subheading}
                </h3>
              ) : null}

              <div className="mt-4 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-base leading-8 text-[#5d7082]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
