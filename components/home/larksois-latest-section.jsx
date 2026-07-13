import Link from "next/link";

function CalendarIcon() {
  return (
    <svg className="h-[14px] w-[14px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 2v4m8-4v4M3 10h18M5 6h14a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg className="h-[14px] w-[14px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-5-5 5 5-5 5" />
    </svg>
  );
}

export default function LarksoisLatestSection({ featuredProducts, companyProfile }) {
  const cards = [
    {
      slug: featuredProducts[0]?.slug || "",
      image: "/product.png",
      category: "Portfolio",
      title: featuredProducts[0]?.name || "Finished Product Range",
      excerpt:
        "Explore export-ready formulations across key therapeutic categories with practical market coverage.",
      href: featuredProducts[0] ? `/products/${featuredProducts[0].slug}` : "/products",
      cta: "Read More",
      date: "Product Focus",
    },
    {
      slug: "company-profile",
      image: "/quality system.jpg",
      category: "Company",
      title: "Company Profile",
      excerpt:
        "Review the Larksois profile, operating model, quality systems, and international market focus.",
      href: companyProfile.documents.companyProfilePdf,
      cta: "Open PDF",
      date: "Corporate Profile",
    },
    {
      slug: "quote-support",
      image: "/analaytiacal laboratory.png",
      category: "Support",
      title: "Quotation & Product List",
      excerpt:
        "Access the product list and connect with the commercial team for pricing, documentation, and supply planning.",
      href: "/contact",
      cta: "Contact Team",
      date: "Partner Support",
    },
  ];

  return (
    <section className="bg-white px-6 py-20 md:px-16">
      <div className="mb-14 text-center">
        <h2 className="mb-3 text-3xl font-bold text-[#271b14] md:text-4xl">
          Latest From Larksois
        </h2>

        <p className="mx-auto max-w-2xl text-sm text-gray-600 md:text-base">
          Updates from our portfolio, quality systems, and international supply
          support.
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <article
            key={`${card.slug}-${index}`}
            className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md transition-all hover:-translate-y-2 hover:shadow-2xl"
          >
            <div
              className="h-64 w-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
              style={{ backgroundImage: `url('${card.image}')` }}
            />

            <div className="p-6">
              <p className="mb-2 text-xs font-medium uppercase text-[#ec671f]">
                {card.category}
              </p>

              <h3 className="mb-3 text-lg font-semibold text-[#271b14]">
                {card.title}
              </h3>

              <p className="mb-5 text-sm text-gray-600">{card.excerpt}</p>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <CalendarIcon />
                  <span>{card.date}</span>
                </div>

                <Link
                  href={card.href}
                  target={card.href.endsWith(".pdf") ? "_blank" : undefined}
                  rel={card.href.endsWith(".pdf") ? "noreferrer" : undefined}
                  className="flex items-center gap-1 font-medium text-[#ec671f] transition hover:gap-2"
                >
                  {card.cta} <ArrowRightIcon />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
