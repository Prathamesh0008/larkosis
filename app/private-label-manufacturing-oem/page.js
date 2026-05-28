import Image from "next/image";
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
  return (
    <div className="bg-[#eef1f6] pb-12">
      <section className="relative h-[380px] overflow-hidden sm:h-[460px]">
        <Image src="/manufacturing image.jpg" alt="Private Label Manufacturing OEM" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-[#0f3558]/55" />
        <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center px-6 sm:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/85">Larksois Offerings</p>
            <h1 className="mt-3 text-4xl font-bold text-[#ff7a00] sm:text-5xl">Private Label Manufacturing / OEM</h1>
            <p className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base">
              Build and scale your pharmaceutical brand with structured OEM execution, quality governance, and dependable supply continuity.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {topHighlights.map((item) => (
            <div key={item} className="rounded-xl border border-[#f1c1cc] bg-white p-4 text-sm text-[#0f3558]">
              {item}
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {models.map((m) => (
            <article key={m.title} className="rounded-xl border border-[#f1c1cc] bg-white p-4">
              <h3 className="text-xl font-bold text-[#ff6b00]">{m.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#334155]">{m.text1}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#334155]">{m.text2}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 bg-[#fffdfb] py-10">
        <div className="mx-auto w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-[#0f3558]">OEM Capability Stack</h2>
          <p className="mx-auto mt-2 max-w-3xl text-sm text-[#475569]">
            A full private-label workflow designed for distributors, importers, and healthcare brands operating in varied market conditions.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((item) => (
              <article key={item.title} className="rounded-xl border border-[#f1c1cc] bg-white p-4 text-left">
                <h3 className="text-lg font-bold text-[#0f3558]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#334155]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#eef1f6] py-10">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <article>
            <h3 className="text-4xl font-bold text-[#0f3558]">Dosage Forms We Manufacture</h3>
            <p className="mt-3 text-sm text-[#334155]">
              Our setup supports multiple dosage platforms with consistency in process control and batch documentation.
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {dosageForms.map((item) => (
                <div key={item} className="rounded border border-[#f1c1cc] bg-white px-3 py-2 text-sm text-[#0f3558]">
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-[#f1c1cc] bg-white p-4">
            <h3 className="text-xl font-bold text-[#ff6b00]">Documentation and Technical Deliverables</h3>
            <p className="mt-2 text-sm text-[#334155]">
              As required by product and market scope, projects can include the following documentation package elements.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {docs.map((item) => (
                <div key={item} className="rounded border border-[#f1c1cc] bg-[#fffdfb] px-3 py-2 text-sm text-[#0f3558]">
                  {item}
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#ff7a00] to-[#eb005b] py-10">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-4xl font-bold text-white">Project Execution Flow</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {executionSteps.map((item, index) => (
              <article key={item} className="rounded-xl bg-white/20 p-4 text-white">
                <p className="text-xs font-bold uppercase">Step {index + 1}</p>
                <p className="mt-2 text-sm">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#eef1f6] py-10">
        <div className="mx-auto w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-[#0f3558]">Quality Governance Framework</h2>
          <p className="mx-auto mt-2 max-w-3xl text-sm text-[#475569]">
            Quality is embedded at each stage from raw material qualification to release and dispatch control.
          </p>
          <div className="mt-8 grid gap-4 text-left sm:grid-cols-2">
            {qualityItems.map((item) => (
              <article key={item.title} className="rounded-xl border border-[#f1c1cc] bg-white p-4">
                <h3 className="text-xl font-bold text-[#ff6b00]">{item.title}</h3>
                <p className="mt-2 text-sm text-[#334155]">{item.desc}</p>
                <p className="mt-2 text-sm text-[#334155]">
                  <span className="font-semibold">Output: </span>
                  {item.out}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-4xl font-bold text-[#0f3558]">Frequently Asked Questions</h2>
        <div className="mt-6 space-y-3">
          {faqs.map((faq, idx) => (
            <details key={faq.q} open={idx === 0} className="group rounded-xl border border-[#f1c1cc] bg-white p-4">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-[#0f3558]">
                <span>{faq.q}</span>
                <span className="text-[#eb005b] group-open:hidden">+</span>
                <span className="hidden text-[#eb005b] group-open:block">-</span>
              </summary>
              <div className="grid grid-rows-[0fr] transition-all duration-300 ease-in-out group-open:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <p className="mt-3 text-sm leading-relaxed text-[#334155]">{faq.a}</p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
