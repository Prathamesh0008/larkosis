import Link from "next/link";
import { notFound } from "next/navigation";

const articlesByCategory = {
  news: {
    title: "News",
    intro:
      "Recent announcements and company-focused updates from Larksois Pharma.",
    articles: [
      {
        title: "Expanding Pharmaceutical Reach Across International Markets",
        excerpt:
          "How Larksois Pharma approaches export growth with quality-led positioning and commercial alignment.",
      },
      {
        title: "Supporting Partners With Documentation-Ready Business Processes",
        excerpt:
          "A closer look at how responsive documentation and structured coordination strengthen early-stage partnerships.",
      },
      {
        title: "Formulation-Focused Growth Through Market Awareness",
        excerpt:
          "Why category planning, dosage-form diversity, and consistent supply matter in global pharma business.",
      },
    ],
  },
  health: {
    title: "Health",
    intro:
      "Healthcare-oriented insights connected to formulation demand and pharmaceutical access.",
    articles: [
      {
        title: "Why Quality Systems Matter In Everyday Healthcare Supply",
        excerpt:
          "Quality controls and process discipline play a key role in making formulations dependable across markets.",
      },
      {
        title: "Therapeutic Demand Trends Across Growing Markets",
        excerpt:
          "Looking at how healthcare needs shape generic product development and commercial planning.",
      },
      {
        title: "From Formulation Development To Patient Access",
        excerpt:
          "The connection between product design, compliance, and broader healthcare availability.",
      },
    ],
  },
};

export function generateMetadata({ params }) {
  const category = articlesByCategory[params.category];

  if (!category) {
    return {
      title: "Magazine",
    };
  }

  return {
    title: `${category.title} | Larksois Magazine`,
    description: category.intro,
  };
}

export default function MagazineCategoryPage({ params }) {
  const category = articlesByCategory[params.category];

  if (!category) {
    notFound();
  }

  return (
    <div className="bg-[#fffaf5] py-14">
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#ec671f]">
            Larksois Magazine
          </span>
          <h1 className="mt-4 text-4xl font-bold text-[#241913] sm:text-5xl">
            {category.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#5f4638]">
            {category.intro}
          </p>
          <Link
            href="/larksois-mag"
            className="mt-6 inline-flex rounded-full border border-[#ddb49a] px-5 py-2.5 text-sm font-semibold text-[#7a4d34] transition hover:border-[#ec671f] hover:text-[#ec671f]"
          >
            View All Categories
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {category.articles.map((article) => (
            <article
              key={article.title}
              className="rounded-[28px] border border-[#f0dfd3] bg-white p-8 shadow-sm"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ec671f]">
                {category.title}
              </span>
              <h2 className="mt-4 text-2xl font-bold leading-tight text-[#241913]">
                {article.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#5f4638]">
                {article.excerpt}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
