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
  const sidebarItems = [
    { label: "Products", link: "/products" },
    { label: "Overview", link: "/offerings-overview" },
    { label: "API", link: "/active-ingredients" },
    { label: "OTC", link: "/over-the-counter" },
    { label: "Private Label / OEM", link: "/private-label-manufacturing-oem" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-[32vh] overflow-hidden md:h-[60vh]">
        <Image
          src="/quality system.jpg"
          alt="Over-the-Counter product portfolio"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 flex items-center justify-center px-4 text-center text-white">
          <div>
            <h1 className="text-3xl font-bold md:text-5xl">Over The Counter (OTC)</h1>
            <p className="mx-auto mt-4 max-w-3xl text-base opacity-90 md:text-lg">
              Safe, effective and accessible healthcare solutions.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 py-16 lg:grid-cols-[1fr_300px] lg:px-16">
        <div>
          <p className="mb-6 text-gray-700">
            Our OTC portfolio focuses on safety, quality, and accessibility.
          </p>
          <p className="mb-10 text-gray-700">
            We develop consumer healthcare products trusted globally.
          </p>

          <div className="mb-14 grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border bg-white p-8 shadow-sm">
              <h3 className="mb-3 text-xl font-semibold text-[#271b14]">Scientific Formulation</h3>
              <p className="text-sm text-gray-600">Evidence-based OTC development.</p>
            </div>
            <div className="rounded-lg border bg-white p-8 shadow-sm">
              <h3 className="mb-3 text-xl font-semibold text-[#271b14]">Quality Standards</h3>
              <p className="text-sm text-gray-600">Manufactured under strict compliance.</p>
            </div>
            <div className="rounded-lg border bg-white p-8 shadow-sm">
              <h3 className="mb-3 text-xl font-semibold text-[#271b14]">Wellness Focus</h3>
              <p className="text-sm text-gray-600">Designed for everyday healthcare needs.</p>
            </div>
          </div>

          <h2 className="mb-10 text-center text-3xl font-semibold text-[#271b14] md:text-4xl">
            OTC Categories
          </h2>

          <div className="grid gap-10 sm:grid-cols-2">
            {otcCategoryCards.map((card) => (
              <div key={card.title} className="relative h-64 overflow-hidden rounded-2xl shadow-md">
                <div
                  className="absolute inset-0 bg-cover bg-center brightness-75"
                  style={{ backgroundImage: "url(/product.png)" }}
                />
                <div className="absolute bottom-0 p-6 text-white">
                  <h3 className="text-xl font-semibold">{card.title}</h3>
                  <p className="mt-1 text-sm opacity-95">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="relative">
          <div className="sticky top-24">
            <h3 className="mb-3 text-xl font-semibold text-[#271b14]">Explore</h3>
            <div className="flex flex-col gap-3">
              {sidebarItems.map((item) => (
                <Link
                  key={item.link}
                  href={item.link}
                  className="w-full rounded-md bg-[#ec671f] px-4 py-3 text-left text-white transition hover:bg-[#241a14]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
