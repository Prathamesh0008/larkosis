import Image from "next/image";
import Link from "next/link";
import { absoluteUrl } from "@/lib/seo";

export const metadata = {
  title: "Over-the-Counter (OTC)",
  description:
    "Explore our Over-the-Counter (OTC) portfolio focused on safe, effective, and accessible healthcare solutions.",
  alternates: {
    canonical: "/over-the-counter",
  },
  openGraph: {
    title: "Over-the-Counter (OTC) | Larksois Pharma",
    description:
      "Our OTC portfolio focuses on quality, compliance, and everyday healthcare accessibility.",
    url: absoluteUrl("/over-the-counter"),
    type: "website",
  },
};

const otcCategoryCards = [
  {
    title: "Pain Relief",
    description: "Fast-acting OTC solutions for pain management.",
  },
  {
    title: "Allergy Care",
    description: "Reliable relief for seasonal and chronic allergies.",
  },
  {
    title: "Digestive Health",
    description: "Effective support for digestive health.",
  },
  {
    title: "Cold & Flu",
    description: "Complete solutions for symptom relief.",
  },
];

export default function OverTheCounterPage() {
  return (
    <div className="bg-[#f5f7fb] pb-12">
      <section className="relative h-[320px] overflow-hidden sm:h-[400px]">
        <Image
          src="/manufacturing image.jpg"
          alt="Over-the-Counter product portfolio"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0f3558]/45" />
        <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center justify-center px-4 text-center sm:px-6 lg:px-8">
          <div>
            <h1 className="text-4xl font-bold text-white sm:text-5xl">Over The Counter (OTC)</h1>
            <p className="mt-3 text-sm font-medium text-white/90 sm:text-base">
              Safe, effective and accessible healthcare solutions.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_260px] lg:px-8">
        <div>
          <p className="text-sm leading-relaxed text-[#334155]">
            Our OTC portfolio focuses on safety, quality, and accessibility.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#334155]">
            We develop consumer healthcare products trusted globally.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <article className="rounded-xl border border-[#23496f] bg-white p-5">
              <h3 className="text-lg font-bold text-[#0f3558]">Scientific Formulation</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#475569]">
                Evidence-based OTC development.
              </p>
            </article>
            <article className="rounded-xl border border-[#23496f] bg-white p-5">
              <h3 className="text-lg font-bold text-[#0f3558]">Quality Standards</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#475569]">
                Manufactured under strict regulatory compliance.
              </p>
            </article>
            <article className="rounded-xl border border-[#23496f] bg-white p-5">
              <h3 className="text-lg font-bold text-[#0f3558]">Wellness Focus</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#475569]">
                Designed for everyday healthcare needs.
              </p>
            </article>
          </div>

          <h2 className="mt-10 text-center text-4xl font-bold text-[#0f3558]">OTC Categories</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {otcCategoryCards.map((card) => (
              <article
                key={card.title}
                className="relative overflow-hidden rounded-xl border border-[#d6dfeb] shadow-sm"
              >
                <Image
                  src="/product.png"
                  alt={card.title}
                  width={640}
                  height={340}
                  className="h-[170px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#062b4f]/85 via-[#062b4f]/35 to-transparent" />
                <div className="absolute bottom-0 p-4">
                  <h3 className="text-2xl font-bold text-white">{card.title}</h3>
                  <p className="mt-1 text-xs text-white/90">{card.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside>
          <h3 className="text-lg font-bold text-[#0f3558]">Explore</h3>
          <div className="mt-3 space-y-2">
            <Link href="/products" className="block rounded bg-[#1294b0] px-3 py-2 text-sm font-semibold text-white">
              Products
            </Link>
            <Link href="/about" className="block rounded bg-[#1294b0] px-3 py-2 text-sm font-semibold text-white">
              Overview
            </Link>
            <Link href="/active-ingredients" className="block rounded bg-[#1294b0] px-3 py-2 text-sm font-semibold text-white">
              API
            </Link>
            <Link href="/over-the-counter" className="block rounded bg-[#1294b0] px-3 py-2 text-sm font-semibold text-white">
              OTC
            </Link>
            <Link href="/contact" className="block rounded bg-[#1294b0] px-3 py-2 text-sm font-semibold text-white">
              Private Label / OEM
            </Link>
          </div>
        </aside>
      </section>
    </div>
  );
}

