import Link from "next/link";

const categories = [
  {
    slug: "news",
    title: "News",
    description:
      "Updates, announcements, and business developments from Larksois Pharma.",
  },
  {
    slug: "health",
    title: "Health",
    description:
      "Category insights and healthcare-focused content aligned with pharmaceutical markets.",
  },
];

export const metadata = {
  title: "Larksois Magazine",
  description:
    "Explore Larksois Magazine for company news, healthcare updates, and industry-focused content.",
};

export default function LarksoisMagPage() {
  return (
    <div className="bg-[#fffaf5] py-14">
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#ec671f]">
            Larksois Magazine
          </span>
          <h1 className="mt-4 text-4xl font-bold text-[#241913] sm:text-5xl">
            Insights, updates, and healthcare stories
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#5f4638]">
            Browse our latest content categories for company news and broader
            healthcare-focused commentary.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/larksois-mag/category/${category.slug}`}
              className="rounded-[28px] border border-[#f0dfd3] bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ec671f]">
                Category
              </span>
              <h2 className="mt-4 text-3xl font-bold text-[#241913]">
                {category.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#5f4638]">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
