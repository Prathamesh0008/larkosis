import Image from "next/image";
import Link from "next/link";
import { absoluteUrl } from "@/lib/seo";

export const metadata = {
  title: "Private Label Manufacturing / OEM",
  description:
    "Build and scale your pharmaceutical brand with structured OEM execution, quality governance, and dependable supply continuity.",
  alternates: {
    canonical: "/private-label-manufacturing-oem",
  },
  openGraph: {
    title: "Private Label Manufacturing / OEM | Larksois Pharma",
    description:
      "End-to-end private label and OEM manufacturing support from concept to dispatch continuity.",
    url: absoluteUrl("/private-label-manufacturing-oem"),
    type: "website",
  },
};

const topHighlights = [
  "WHO-GMP aligned production standards",
  "Flexible batch planning for market launches",
  "End-to-end OEM support from concept to delivery",
];

const models = [
  {
    title: "Market Entry Model",
    text1: "For partners entering a new territory who need focused SKU selection and launch-ready support.",
    text2: "Best for first-market launches and category pilots.",
  },
  {
    title: "Portfolio Expansion Model",
    text1: "For established brands adding new product lines under existing distribution networks.",
    text2: "Best for expanding category depth and shelf coverage.",
  },
  {
    title: "Continuity Supply Model",
    text1: "For long-term buyers prioritizing stable planning, repeat scheduling, and quality consistency.",
    text2: "Best for high-repeat procurement and scale programs.",
  },
];

const capabilities = [
  {
    title: "Formulation Development",
    text: "Support from concept selection to market-ready formula across defined dosage platforms.",
  },
  {
    title: "Custom Branding",
    text: "Private-label pack setup, artwork coordination, and format alignment for your target market.",
  },
  {
    title: "Regulatory Documentation",
    text: "Technical dossiers, CoAs, and quality file support aligned with buyer requirements.",
  },
  {
    title: "Scalable Manufacturing",
    text: "Pilot, launch, and scale-up support with controlled manufacturing and traceability.",
  },
];

const dosageForms = ["Tablets", "Capsules", "Syrups", "Suspensions", "Topicals", "Sachets"];
const docs = [
  "Product specification sheets",
  "Certificate of Analysis format",
  "Stability and storage guidance",
  "Batch and release documentation",
  "Pack and label compliance checklist",
  "Shipping and handling documentation",
];

const executionSteps = [
  "Requirement discovery and product-market alignment",
  "Formula/pack finalization and documentation planning",
  "Commercial manufacturing with in-process quality controls",
  "Final release, dispatch coordination, and continuity planning",
];

const qualityItems = [
  {
    title: "Raw Material Qualification",
    desc: "Supplier verification, identity checks, and incoming material acceptance criteria.",
    out: "Approved material status before production start.",
  },
  {
    title: "In-Process Quality Monitoring",
    desc: "Critical process checkpoints at blending, compression/filling, and packing stages.",
    out: "Controlled process consistency across the batch lifecycle.",
  },
  {
    title: "Finished Product Testing",
    desc: "Defined release testing based on product profile and applicable quality requirements.",
    out: "Batch disposition report and quality release readiness.",
  },
  {
    title: "Release and Dispatch Control",
    desc: "Final documentation verification and dispatch condition checks before shipment.",
    out: "Market-ready release package with traceable records.",
  },
];

const faqs = [
  {
    q: "Can you support low-volume market entry batches?",
    a: "Yes. We can begin with pilot/launch volumes and then scale after demand validation.",
  },
  {
    q: "Do you provide private label packaging options?",
    a: "Yes. We support branded packaging formats with artwork coordination and compliance checks.",
  },
  {
    q: "Can documentation be aligned for different country requirements?",
    a: "Yes, documentation support can be structured based on market-specific submission expectations.",
  },
  {
    q: "What information is needed to start an OEM discussion?",
    a: "At minimum: category, dosage form, target country, expected volume, and preferred launch timeline.",
  },
  {
    q: "Do you support repeat supply planning after launch?",
    a: "Yes. We can set continuity planning based on forecast cycles and replenishment requirements.",
  },
  {
    q: "Can Larksois support both single-SKU and multi-SKU programs?",
    a: "Yes. Engagement can start from a focused SKU and expand to a broader portfolio as needed.",
  },
];

export default function PrivateLabelManufacturingOemPage() {
  const brandGradient = "bg-gradient-to-r from-[#ec671f] to-[#f4b083]";
  const brandTextGradient =
    "bg-gradient-to-r from-[#ec671f] to-[#f4b083] bg-clip-text text-transparent";

  return (
    <div className="min-h-screen bg-[#fffdfb]">
      <section className="relative h-[42vh] overflow-hidden md:h-[66vh]">
        <Image src="/manufacturing image.jpg" alt="Private Label Manufacturing OEM" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-[#241a14]/55" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto max-w-7xl px-6 text-white md:px-16">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ffe1cf]">
              Larksois Offerings
            </p>
            <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight text-[#ec671f] md:text-5xl">
              Private Label Manufacturing / OEM
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-white md:text-lg">
              Build and scale your pharmaceutical brand with structured OEM execution, quality governance, and dependable supply continuity.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-white px-6 py-3 font-semibold text-[#ec671f] transition-colors hover:bg-[#fff3ef]"
              >
                Contact Us
              </Link>
              <Link
                href="/offerings-overview"
                className="rounded-full border border-white/70 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                Explore All Offerings
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 md:px-16 md:py-20">
        <div className="grid gap-4 sm:grid-cols-3">
          {topHighlights.map((item) => (
            <div key={item} className="rounded-xl border border-[#ec671f]/15 bg-[#fff8f4] p-5 font-medium text-[#271b14]">
              {item}
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {models.map((m) => (
            <article key={m.title} className="rounded-2xl border border-[#ec671f]/15 bg-white p-6 shadow-sm">
              <h3 className={`text-xl font-semibold ${brandTextGradient}`}>{m.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#5c473b]">{m.text1}</p>
              <p className="mt-4 text-sm font-medium text-[#271b14]">{m.text2}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#fff7f2] py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6 text-center md:px-16">
          <h2 className="text-2xl font-bold text-[#271b14] md:text-4xl">OEM Capability Stack</h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm text-[#5c473b]">
            A full private-label workflow designed for distributors, importers, and healthcare brands operating in varied market conditions.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((item) => (
              <article key={item.title} className="rounded-2xl border border-[#ec671f]/15 bg-white p-6 text-left shadow-sm">
                <h3 className="text-lg font-semibold text-[#271b14]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5c473b]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-14 md:px-16 md:py-20 lg:grid-cols-2">
          <article>
            <h3 className="text-2xl font-bold text-[#271b14] md:text-4xl">Dosage Forms We Manufacture</h3>
            <p className="mt-3 text-sm text-[#5c473b]">
              Our setup supports multiple dosage platforms with consistency in process control and batch documentation.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {dosageForms.map((item) => (
                <div key={item} className="rounded-lg border border-[#ec671f]/15 bg-white px-4 py-3 text-sm font-medium text-[#271b14]">
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-[#ec671f]/15 bg-white p-7 shadow-sm">
            <h3 className={`text-xl font-semibold ${brandTextGradient}`}>Documentation and Technical Deliverables</h3>
            <p className="mt-2 text-sm text-[#5c473b]">
              As required by product and market scope, projects can include the following documentation package elements.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {docs.map((item) => (
                <div key={item} className="rounded-lg border border-[#ec671f]/15 bg-[#fff8f4] px-4 py-3 text-sm text-[#271b14]">
                  {item}
                </div>
              ))}
            </div>
          </article>
      </section>

      <section className={`py-14 md:py-20 text-white ${brandGradient}`}>
        <div className="mx-auto max-w-7xl px-6 md:px-16">
          <h2 className="text-center text-2xl font-bold md:text-4xl">Project Execution Flow</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {executionSteps.map((item, index) => (
              <article key={item} className="rounded-2xl bg-white/15 p-6 backdrop-blur-sm">
                <p className="text-sm font-semibold text-white">Step {index + 1}</p>
                <p className="mt-2 text-sm leading-relaxed">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 text-center md:px-16 md:py-20">
          <h2 className="text-2xl font-bold text-[#271b14] md:text-4xl">Quality Governance Framework</h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm text-[#5c473b]">
            Quality is embedded at each stage from raw material qualification to release and dispatch control.
          </p>
          <div className="mt-10 grid gap-5 text-left md:grid-cols-2">
            {qualityItems.map((item) => (
              <article key={item.title} className="rounded-2xl border border-[#ec671f]/15 bg-white p-6 shadow-sm">
                <h3 className={`text-lg font-semibold ${brandTextGradient}`}>{item.title}</h3>
                <p className="mt-3 text-sm text-[#5c473b]">{item.desc}</p>
                <p className="mt-3 text-sm text-[#271b14]">
                  <span className="font-semibold">Output: </span>
                  {item.out}
                </p>
              </article>
            ))}
          </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-6 md:px-16 md:py-10">
        <h2 className="text-center text-2xl font-bold text-[#271b14] md:text-4xl">Frequently Asked Questions</h2>
        <div className="mt-6 space-y-3">
          {faqs.map((faq, idx) => (
            <details key={faq.q} open={idx === 0} className="group rounded-xl border border-[#ec671f]/15 bg-white px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-[#271b14]">
                <span>{faq.q}</span>
                <span className="text-[#ec671f] group-open:hidden">+</span>
                <span className="hidden text-[#ec671f] group-open:block">-</span>
              </summary>
              <div className="grid grid-rows-[0fr] transition-all duration-300 ease-in-out group-open:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <p className="mt-3 text-sm leading-relaxed text-[#5c473b]">{faq.a}</p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
