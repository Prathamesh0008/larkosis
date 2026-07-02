import Image from "next/image";
import Link from "next/link";
import AboutLabsCarousel from "@/components/about/about-labs-carousel";
import AboutStats from "@/components/about/about-stats";
import { companyProfile } from "@/data/companyProfile";
import { getAllProducts, getCategoryCounts } from "@/lib/catalog";
import { SITE_URL, absoluteUrl } from "@/lib/seo";

export const metadata = {
  title: "About",
  description:
    "Learn about Larksois Pharma, our quality systems, manufacturing strengths, research focus, and global pharmaceutical capabilities.",
  keywords: [
    "about Larksois Pharma",
    "pharmaceutical manufacturer India",
    "GMP pharmaceutical company",
    "global pharma exporter",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Larksois Pharma | Global Pharmaceutical Partner",
    description:
      "Discover Larksois Pharma's quality commitment, global reach, and comprehensive pharmaceutical portfolio.",
    url: absoluteUrl("/about"),
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const extraInfoCards = [
  {
    badge: "Who We Are",
    title: "An emerging pharmaceutical company with a global outlook",
    desc: companyProfile.overview,
    points: [
      "Focused on quality and affordable generic and branded formulations",
      "Business approach shaped around long-term trust and consistency",
    ],
  },
  {
    badge: "Quality Systems",
    title: "Compliance-backed operations for dependable supply",
    desc: companyProfile.quality,
    points: [
      "Structured QA and QC discipline",
      "SOP-led checks and controlled batch review",
    ],
  },
  {
    badge: "Export Strength",
    title: "Commercial readiness for multi-market requirements",
    desc: companyProfile.marketFocus,
    points: [
      "Support for regulated and unregulated destinations",
      "Responsive documentation and coordination for export markets",
    ],
  },
];

const detailedSections = [
  {
    title: "Formulation Development",
    desc: "Product development aligned with therapeutic demand, manufacturability, and market competitiveness.",
  },
  {
    title: "Manufacturing Partnerships",
    desc: "Production backed by facilities benchmarked to international standards across multiple dosage forms.",
  },
  {
    title: "Documentation Preparedness",
    desc: "Business-facing document support to help accelerate evaluation and onboarding discussions.",
  },
  {
    title: "Quality Governance",
    desc: "Continuous focus on compliance monitoring, process discipline, and controlled operating systems.",
  },
  {
    title: "Market-Oriented Planning",
    desc: "Portfolio thinking shaped by regional needs, therapeutic relevance, and commercial practicality.",
  },
  {
    title: "Partner Responsiveness",
    desc: "A collaborative commercial approach for inquiries, quotations, and long-term supply discussions.",
  },
];

const valuePoints = [
  "Sustained performance across products and partnerships",
  "Integrity in communication and commitments",
  "Entrepreneurial thinking that drives growth",
  "Customer focus in every business interaction",
  "Working together across functions and markets",
  "Respect for people, process, and partnership",
];

const globalLocations = [
  {
    loc: "Asia",
    desc: "Strong engagement with developing pharmaceutical markets and distribution-led demand.",
  },
  {
    loc: "Africa",
    desc: "Support for access-driven healthcare markets with broad generic formulation opportunities.",
  },
  {
    loc: "South America",
    desc: "Commercial focus on scalable category demand and expanding export relationships.",
  },
  {
    loc: "Middle East",
    desc: "Selective market support through quality-led positioning and responsive business communication.",
  },
  {
    loc: "CIS & Neighboring Regions",
    desc: "Opportunity mapping for documentation-ready and commercially viable product segments.",
  },
  {
    loc: "Global Partnerships",
    desc: "Flexible partner engagement built around quality, supply confidence, and aligned execution.",
  },
];

const expertiseList = [
  {
    title: "Manufacturing Excellence",
    desc: "Multi-dosage-form manufacturing support for tablets, capsules, injections, ointments, and powders.",
    img: "/manufacturing image.jpg",
  },
  {
    title: "Quality Management",
    desc: "Compliance-oriented systems with robust QA/QC review and disciplined process control.",
    img: "/quality system.jpg",
  },
  {
    title: "Analytical Capability",
    desc: "Research-backed evaluation and product development support for quality-focused execution.",
    img: "/analaytiacal laboratory.png",
  },
];

const leadershipList = [
  {
    name: "Strategic Leadership",
    title: "Business Direction",
    desc: "Commercial and operational decision-making focused on sustainable growth and trusted partnerships.",
    img: "/about/leader1.jpg",
  },
  {
    name: "Quality Leadership",
    title: "Compliance & Systems",
    desc: "A quality-first approach guiding process discipline, documentation readiness, and consistency.",
    img: "/about/leader2.jpg",
  },
  {
    name: "Market Leadership",
    title: "Global Expansion",
    desc: "Cross-market planning with attention to category relevance, partner support, and export readiness.",
    img: "/about/leader3.jpg",
  },
];

const certifications = [
  { name: "EU-GMP", img: "/about/EU-GMP.jpg" },
  { name: "WHO-GMP", img: "/about/WHO-GMP.jpg" },
  { name: "ISO 9001", img: "/about/ISO9001.jpg" },
  { name: "ISO 14001", img: "/about/ISO14001.jpg" },
  { name: "HACCP", img: "/about/HACCP.png" },
  { name: "PIC/S", img: "/about/PICS.jpg" },
];

const sustainabilityPoints = [
  "Responsible operating practices that support long-term business continuity",
  "Continuous attention to process discipline and efficient resource use",
  "A quality culture that values stable systems and dependable execution",
];

const labImages = [
  "/about/lab1.jpg",
  "/about/lab2.jpg",
  "/about/lab3.jpg",
  "/about/lab4.jpg",
  "/about/lab5.jpg",
];

const faqs = [
  {
    question: "What does Larksois Pharma specialize in?",
    answer:
      "Larksois Pharma focuses on research, manufacturing, and marketing of quality generic and branded pharmaceutical formulations.",
  },
  {
    question: "Which markets does Larksois Pharma serve?",
    answer:
      "The company is oriented toward regulated and unregulated markets across Asia, Africa, and South America, with exports forming a meaningful part of business.",
  },
  {
    question: "What dosage forms are supported?",
    answer:
      "Larksois Pharma supports tablets, capsules, injections, ointments, and powders through internationally benchmarked manufacturing capabilities.",
  },
  {
    question: "How does Larksois Pharma approach quality?",
    answer:
      "The company follows cGMP-aligned quality systems with QA and QC controls, SOP-led checks, and continuous compliance monitoring.",
  },
];

export default function AboutPage() {
  const productCount = getAllProducts().length;
  const categoryCount = getCategoryCounts().length;

  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Larksois Pharma",
    url: absoluteUrl("/about"),
    description: metadata.description,
    mainEntity: {
      "@type": "Organization",
      name: companyProfile.brand,
      url: SITE_URL,
      numberOfEmployees: "50+",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: absoluteUrl("/about"),
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="overflow-hidden bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="relative min-h-[600px] overflow-hidden sm:h-screen sm:max-h-[900px]">
        <div className="absolute inset-0">
          <Image
            src="/about/abouthero.jpg"
            alt="Larksois Pharma about hero"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(43,29,22,0.92),rgba(43,29,22,0.78),rgba(236,103,31,0.38))]" />

        <div className="absolute bottom-1/4 left-1/2 w-full max-w-7xl -translate-x-1/2 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm font-semibold tracking-[0.2em] text-white backdrop-blur-md">
              LARKSOIS PHARMA
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Building trusted global pharmaceutical partnerships
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/85 sm:text-lg md:text-xl">
              Quality-focused research, manufacturing, and market-ready support
              for generic and branded formulations across growing international
              healthcare markets.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      <section className="relative z-10 bg-white py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AboutStats
            productCount={productCount}
            categoryCount={categoryCount}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 md:px-10 md:py-16">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div className="relative order-2 md:order-1">
            <div className="absolute -left-6 -top-6 h-32 w-32 rounded-full bg-[#f4b083]/25 blur-2xl" />
            <div className="absolute -bottom-6 -right-6 h-40 w-40 rounded-full bg-[#ec671f]/15 blur-2xl" />
            <Image
              src="/about/factory.jpg"
              width={700}
              height={600}
              alt="Larksois Pharma manufacturing"
              className="relative z-10 h-auto w-full rounded-3xl object-cover shadow-2xl"
            />
          </div>

          <div className="order-1 md:order-2">
            <span className="inline-block rounded-full bg-[#fff1e5] px-3 py-1 text-sm font-semibold uppercase tracking-[0.18em] text-[#ec671f]">
              Brand Story
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-[#241913] sm:text-4xl md:text-5xl">
              Larksois Pharma is built around quality, reliability, and global growth
            </h2>
            <p className="mt-6 text-base leading-8 text-[#5f4638] sm:text-lg">
              {companyProfile.overview}
            </p>
            <p className="mt-6 text-sm leading-8 text-[#5f4638] sm:text-base">
              {companyProfile.marketFocus}
            </p>
            <p className="mt-6 text-sm leading-8 text-[#5f4638] sm:text-base">
              {companyProfile.manufacturing}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#ec671f]" />
                <span className="text-sm text-[#7d5a47]">Quality First</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#f4b083]" />
                <span className="text-sm text-[#7d5a47]">Market Driven</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fbf7f3] py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            {extraInfoCards.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[#f0dfd3] bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl"
              >
                <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#ec671f]">
                  {item.badge}
                </span>
                <h3 className="mt-3 text-xl font-bold text-[#241913] sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#5f4638] sm:text-base">
                  {item.desc}
                </p>
                <ul className="mt-5 space-y-3">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm text-[#654c3f]">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#f4b083]" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 text-center sm:mb-10">
            <span className="block text-sm font-semibold uppercase tracking-[0.2em] text-[#ec671f]">
              Detailed Overview
            </span>
            <h2 className="mt-4 text-3xl font-bold text-[#241913] sm:text-4xl md:text-5xl">
              A broader look at how Larksois Pharma operates
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
            {detailedSections.map((item, index) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[#f0dfd3] bg-[#fcfaf8] p-6 transition-all duration-300 hover:shadow-xl"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#2b1d16] text-sm font-bold text-white">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="text-xl font-bold text-[#241913] sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#5f4638] sm:text-base">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#2b1d16] py-10 text-white sm:py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 text-center sm:mb-10">
            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
              Purpose, vision, and mission
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/75">
              Larksois Pharma is focused on building dependable pharmaceutical
              value through quality systems, practical innovation, and global
              commercial support.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-white/10 text-2xl font-bold text-[#f4b083]">
                V
              </div>
              <h3 className="mb-4 text-2xl font-bold text-[#f4b083] md:text-3xl">
                Vision
              </h3>
              <p className="text-base leading-8 text-white/80 md:text-lg">
                To become a trusted pharmaceutical partner recognized for
                quality, affordability, and meaningful global healthcare reach.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-white/10 text-2xl font-bold text-[#f4b083]">
                M
              </div>
              <h3 className="mb-4 text-2xl font-bold text-[#f4b083] md:text-3xl">
                Mission
              </h3>
              <p className="text-base leading-8 text-white/80 md:text-lg">
                To deliver market-relevant pharmaceutical formulations through
                compliant operations, research-led development, and responsive
                partner collaboration.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fbf7f3] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 text-center sm:mb-10">
            <span className="block text-sm font-semibold uppercase tracking-[0.2em] text-[#ec671f]">
              Values
            </span>
            <h2 className="mt-4 text-3xl font-bold text-[#241913] sm:text-4xl md:text-5xl">
              The principles behind every partnership
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {valuePoints.map((value) => (
              <div
                key={value}
                className="rounded-2xl border border-[#f0dfd3] bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#fff1e5] font-bold text-[#ec671f]">
                  +
                </div>
                <h3 className="text-xl font-bold text-[#241913]">{value}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fbf7f3] py-10 sm:py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 text-center sm:mb-10">
            <span className="block text-sm font-semibold uppercase tracking-[0.2em] text-[#ec671f]">
              Global Operations
            </span>
            <h2 className="mt-4 text-3xl font-bold text-[#241913] sm:text-4xl md:text-5xl">
              Commercial focus across multiple international regions
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[#5f4638]">
              Larksois Pharma supports opportunities in diverse healthcare
              markets through flexible business coordination and quality-led
              product positioning.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
            {globalLocations.map((item, index) => (
              <div
                key={item.loc}
                className="overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:shadow-2xl"
              >
                <div className="p-8">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#2b1d16_0%,#5f3a26_100%)] text-xl font-bold text-white">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-bold text-[#241913] md:text-2xl">
                      {item.loc}
                    </h3>
                  </div>
                  <p className="leading-7 text-[#5f4638]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 text-center sm:mb-10">
            <span className="block text-sm font-semibold uppercase tracking-[0.2em] text-[#ec671f]">
              Expertise
            </span>
            <h2 className="mt-4 text-3xl font-bold text-[#241913] sm:text-4xl md:text-5xl">
              Core strengths that support our business
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[#5f4638]">
              Our capabilities combine development thinking, manufacturing
              support, and quality discipline for scalable pharmaceutical supply.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
            {expertiseList.map((item) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 hover:shadow-2xl"
              >
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={item.img}
                    fill
                    alt={item.title}
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2b1d16] via-[#2b1d16]/45 to-transparent opacity-85" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="mb-2 text-xl font-bold md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/90">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fcfaf8] py-16 sm:py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 text-center sm:mb-16">
            <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#ec671f] sm:text-sm">
              Leadership
            </span>
            <h2 className="mt-3 text-3xl font-bold text-[#241913] sm:text-4xl md:text-5xl">
              Leadership that drives trust and execution
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-[#5f4638] sm:text-base">
              Larksois Pharma grows through leadership that balances quality,
              commercial awareness, and long-term business relationships.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
            {leadershipList.map((member) => (
              <div key={member.name} className="group">
                <div className="h-full overflow-hidden rounded-3xl border border-[#ead8cd] bg-white shadow-sm transition-all duration-500 hover:shadow-xl">
                  <div className="relative h-[300px] overflow-hidden bg-[#f8f2ec] sm:h-[340px]">
                    <Image
                      src={member.img}
                      fill
                      alt={member.name}
                      className="object-contain p-5 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white via-white/80 to-transparent" />
                  </div>

                  <div className="px-6 pb-7 pt-2 text-center">
                    <h4 className="mb-1 text-lg font-bold text-[#241913] sm:text-xl">
                      {member.name}
                    </h4>
                    <p className="mb-4 text-sm font-semibold text-[#ec671f]">
                      {member.title}
                    </p>
                    <div className="mx-auto mb-4 h-[2px] w-12 bg-[#f4b083]" />
                    <p className="text-sm leading-relaxed text-[#5f4638]">
                      {member.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fbf7f3] py-10 sm:py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 text-center sm:mb-10">
            <span className="block text-sm font-semibold uppercase tracking-[0.2em] text-[#ec671f]">
              Certifications
            </span>
            <h2 className="mt-4 text-3xl font-bold text-[#241913] sm:text-4xl md:text-5xl">
              Quality commitment reflected through recognized standards
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[#5f4638]">
              Our positioning is supported by a strong emphasis on quality
              systems, structured compliance, and internationally aligned
              operating practices.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="group rounded-2xl border border-[#f0dfd3] bg-white p-5 text-center shadow-md transition-all duration-300 hover:border-[#ec671f]/20 hover:shadow-xl"
              >
                <div className="relative mb-4 h-20 w-full sm:h-24">
                  <Image
                    src={cert.img}
                    fill
                    alt={cert.name}
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <p className="text-sm font-bold text-[#241913] sm:text-base">
                  {cert.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/about/abouthero.jpg"
            alt="Larksois Pharma statement background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#2b1d16]/80" />
        </div>

        <div className="relative px-4 py-24 text-center text-white sm:py-32 md:py-48">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Advancing healthcare with dependable pharmaceutical value
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-white/85 md:text-xl">
              Larksois Pharma combines market awareness, quality systems, and
              manufacturing support to create long-term business confidence.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-14 md:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2 md:gap-16">
          <div>
            <span className="inline-block rounded-full bg-[#fff1e5] px-3 py-1 text-sm font-semibold uppercase tracking-[0.18em] text-[#ec671f]">
              Sustainability
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-[#241913] sm:text-4xl md:text-5xl">
              Building stable operations with long-term responsibility
            </h2>
            <p className="mb-6 mt-6 text-base leading-8 text-[#5f4638] md:text-lg">
              Larksois Pharma believes sustainable progress comes from disciplined
              systems, responsible execution, and business practices that support
              durability over short-term gains.
            </p>

            <div className="space-y-4">
              {sustainabilityPoints.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl bg-[#fbf7f3] p-3"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fff1e5] text-sm font-bold text-[#ec671f]">
                    +
                  </div>
                  <p className="text-sm text-[#5f4638] md:text-base">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <Image
              src="/about/sustainability.jpg"
              width={600}
              height={400}
              alt="Larksois Pharma sustainability"
              className="relative z-10 h-auto w-full rounded-2xl object-cover shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#fbf7f3] py-10 sm:py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 text-center sm:mb-10">
            <span className="block text-sm font-semibold uppercase tracking-[0.2em] text-[#ec671f]">
              R&D Labs
            </span>
            <h2 className="mt-4 text-3xl font-bold text-[#241913] sm:text-4xl md:text-5xl">
              Research and analytical environments that support product quality
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[#5f4638]">
              Laboratory and development support play an important role in
              strengthening product consistency and technical confidence.
            </p>
          </div>
          <AboutLabsCarousel labImages={labImages} />
        </div>
      </section>

      <section className=" py-10 sm:py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 text-center sm:mb-10">
            <span className="block text-sm font-semibold uppercase tracking-[0.2em] text-[#ec671f]">
              Global Presence
            </span>
            <h2 className="mt-4 text-3xl font-bold text-[#241913] sm:text-4xl md:text-5xl">
              Expanding reach across international healthcare markets
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[#5f4638]">
              Our business outlook extends beyond domestic supply, with a growing
              focus on export partnerships and multi-market engagement.
            </p>
          </div>

          <div className="relative mx-auto  overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src="/about/worldmap.png"
              width={1200}
              height={600}
              alt="Larksois Pharma global presence map"
              className="h-[260px] w-full object-contain sm:h-[340px] lg:h-[420px]"
            />
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(90deg,#2b1d16_0%,#6f4124_100%)] py-10 sm:py-14 md:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Explore partnership opportunities with Larksois Pharma
          </h2>
          <p className="mb-8 mt-6 text-base text-white/80 md:text-lg">
            Connect with our team for product inquiries, documentation support,
            export opportunities, and business discussions.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-[#2b1d16] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#fff6ef] hover:shadow-2xl"
          >
            Contact Larksois Pharma
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </section>

      <section className="bg-[#fbf7f3] py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mb-8 text-center sm:mb-10">
            <span className="block text-sm font-semibold uppercase tracking-[0.2em] text-[#ec671f]">
              FAQ
            </span>
            <h2 className="mt-4 text-3xl font-bold text-[#241913] sm:text-4xl md:text-5xl">
              Frequently asked questions
            </h2>
          </div>

          <div className="space-y-5">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-[#f0dfd3] bg-white p-6 shadow-sm"
              >
                <h3 className="mb-3 text-lg font-bold text-[#241913] sm:text-xl">
                  {faq.question}
                </h3>
                <p className="text-sm leading-relaxed text-[#5f4638] sm:text-base">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
