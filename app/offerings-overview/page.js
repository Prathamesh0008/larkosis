import Image from "next/image";
import Link from "next/link";

import { absoluteUrl } from "@/lib/seo";

export const metadata = {
  title: "Offerings Overview",
  description:
    "Explore the Larksois offerings mix across finished formulations, APIs, OTC, test kits, and private label manufacturing.",
  alternates: {
    canonical: "/offerings-overview",
  },
  openGraph: {
    title: "Offerings Overview | Larksois Pharma",
    description:
      "A structured overview of Larksois pharmaceutical offerings for distributors, importers, and private label partners.",
    url: absoluteUrl("/offerings-overview"),
    type: "website",
  },
};

const offerings = [
  {
    id: "01",
    title: "Active Pharmaceutical Ingredients (API)",
    subtitle: "Raw-Material Portfolio",
    desc: "API solutions built for B2B sourcing, formulation support, and category expansion across regulated and semi-regulated markets.",
    image: "/analaytiacal laboratory.png",
    link: "/active-ingredients",
    cta: "Explore API",
    useCases: ["Distributors", "Formulation manufacturers", "B2B sourcing teams"],
  },
  {
    id: "02",
    title: "Finished Pharmaceutical Products",
    subtitle: "Ready-to-Market Formulations",
    desc: "A broad finished dosage portfolio structured for importer demand, hospital procurement, and repeat commercial supply.",
    image: "/product.png",
    link: "/products",
    cta: "View Products",
    useCases: ["Importers", "Hospital procurement", "National tenders"],
  },
  {
    id: "03",
    title: "OTC & Consumer Healthcare",
    subtitle: "Retail Healthcare Segment",
    desc: "Accessible OTC products designed for retail chains, pharmacy networks, and consumer healthcare channels.",
    image: "/manufacturing image.jpg",
    link: "/over-the-counter",
    cta: "Explore OTC",
    useCases: ["Retail chains", "Pharmacy networks", "Health stores"],
  },
  {
    id: "04",
    title: "Private Label Manufacturing / OEM",
    subtitle: "Brand-Building Partnerships",
    desc: "End-to-end OEM support across product selection, packaging coordination, technical documentation, and supply continuity.",
    image: "/quality system.jpg",
    link: "/private-label-manufacturing-oem",
    cta: "Explore OEM",
    useCases: ["Brand owners", "Market entrants", "Regional healthcare businesses"],
  },
  {
    id: "05",
    title: "Test Kits",
    subtitle: "Diagnostic Support Range",
    desc: "Practical testing solutions for healthcare programs, diagnostics distribution, and screening support use cases.",
    image: "/gg.png",
    link: "/test-kits",
    cta: "Explore Test Kits",
    useCases: ["Diagnostics distributors", "Healthcare institutions", "Public screening programs"],
  },
];

const partnerTracks = [
  {
    title: "For Distributors & Importers",
    points: [
      "Portfolio alignment by market demand and regulatory path",
      "Documentation support for product evaluation",
      "Repeat-order planning and continuity coordination",
    ],
  },
  {
    title: "For Private Label Brands",
    points: [
      "OEM pathway from concept to launch",
      "Packaging and compliance coordination",
      "Scale-up planning for growth markets",
    ],
  },
  {
    title: "For Strategic Partners",
    points: [
      "Multi-category healthcare alignment",
      "Long-term category development support",
      "Collaborative expansion model",
    ],
  },
];

const executionModel = [
  {
    step: "Portfolio Scoping",
    detail: "Define category fit, dosage form priority, target market, and commercial direction.",
  },
  {
    step: "Technical & Regulatory Setup",
    detail: "Prepare product files, quality documentation, and an execution path aligned with market needs.",
  },
  {
    step: "Manufacturing & Release",
    detail: "Execute validated production with in-process controls and release discipline.",
  },
  {
    step: "Supply & Market Continuity",
    detail: "Coordinate dispatch planning, documentation flow, and repeat-order consistency.",
  },
];

export default function OfferingsOverviewPage() {
  const brandGradient = "bg-gradient-to-r from-[#ec671f] to-[#f4b083]";
  const brandTextGradient =
    "bg-gradient-to-r from-[#ec671f] to-[#f4b083] bg-clip-text text-transparent";

  return (
    <div className="min-h-screen bg-[#fffdfb] text-[#271b14]">
      <section className="relative overflow-hidden border-b border-[#ecd8c9] bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-[1fr_460px] md:px-16 md:py-20">
          <div>
            <p className={`text-xs font-semibold uppercase tracking-[0.22em] md:text-sm ${brandTextGradient}`}>
              Larksois Offerings Overview
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">
              Practical Healthcare Offerings Structured for Real Market Execution
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#5c473b] md:text-lg">
              This portfolio is structured for importers, distributors, hospital channels, private label partners,
              and product-led healthcare businesses looking for clarity, quality, and continuity.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className={`inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white shadow-md transition-opacity hover:opacity-95 ${brandGradient}`}
              >
                Browse Portfolio
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-[#ec671f]/30 px-6 py-3 font-semibold text-[#ec671f] transition-colors hover:bg-[#fff4ef]"
              >
                Contact Team
              </Link>
            </div>
          </div>

          <div className="relative h-[300px] overflow-hidden rounded-3xl shadow-xl md:h-[420px]">
            <Image
              src="/manufacturing image.jpg"
              alt="Larksois offerings overview"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#ec671f]/65 via-[#ec671f]/20 to-transparent" />
            <div className="absolute bottom-0 p-6 text-white">
              <p className="text-xs uppercase tracking-[0.2em] text-[#ffe1cf]">Enterprise Focus</p>
              <p className="mt-2 text-lg font-semibold">Designed for operational clarity and supply continuity</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 md:px-16 md:py-18">
        <div className="grid gap-5 md:grid-cols-3">
          {partnerTracks.map((track) => (
            <article key={track.title} className="rounded-2xl border border-[#ec671f]/15 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold">{track.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {track.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-[#5c473b]">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#ec671f] flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 md:px-16">
        <div className="space-y-5">
          {offerings.map((item, index) => (
            <article key={item.title} className="rounded-3xl border border-[#ec671f]/15 bg-white p-5 shadow-sm md:p-7">
              <div className="grid items-start gap-6 md:grid-cols-[260px_1fr] md:gap-8">
                <div className="relative min-h-[190px] h-52 overflow-hidden rounded-2xl md:h-full">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-semibold uppercase tracking-[0.2em] ${brandTextGradient}`}>
                      {item.subtitle}
                    </span>
                    <span className="text-sm text-gray-400">/</span>
                    <span className="text-sm text-gray-500">Track {item.id}</span>
                  </div>

                  <h3 className="mt-2 text-2xl font-bold leading-tight md:text-3xl">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-[#5c473b]">{item.desc}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.useCases.map((useCase) => (
                      <span
                        key={useCase}
                        className="rounded-full border border-[#ec671f]/15 bg-[#fff3ec] px-3 py-1.5 text-xs text-[#9f582f]"
                      >
                        {useCase}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <Link href={item.link} className="text-sm font-semibold text-[#ec671f] transition-colors hover:text-[#d55e1f]">
                      {item.cta}
                    </Link>
                    <span className="text-xs text-gray-400">#{index + 1}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-[#ecd8c9] bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:px-16 md:py-20 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${brandTextGradient}`}>
              Operating Framework
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">How We Structure Execution</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-[#5c473b]">
              We follow a structured model that connects portfolio selection, documentation readiness, manufacturing
              execution, and repeat-order continuity.
            </p>
          </div>

          <div className="space-y-4">
            {executionModel.map((item, idx) => (
              <div key={item.step} className="rounded-2xl border border-[#ec671f]/15 bg-[#fff8f4] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ec671f]">Step {idx + 1}</p>
                <h3 className="mt-1 text-lg font-semibold">{item.step}</h3>
                <p className="mt-1.5 text-sm text-[#5c473b]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
