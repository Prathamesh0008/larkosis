import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { absoluteUrl } from "@/lib/seo";
import { getAllTestKitDetails, getTestKitBySlug } from "@/lib/test-kit-details";

function toHeading(key) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function renderPrimitive(value) {
  return <p className="mt-2 text-sm leading-relaxed text-[#4f433c]">{String(value)}</p>;
}

function renderValue(value, prefix) {
  if (Array.isArray(value)) {
    return (
      <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-[#4f433c] marker:text-[#ec671f]">
        {value.map((item, idx) => (
          <li key={`${prefix}-${idx}`}>{String(item)}</li>
        ))}
      </ul>
    );
  }

  if (value && typeof value === "object") {
    if ("label" in value && "value" in value) {
      return (
        <div className="mt-2 rounded-xl border border-[#edf0f2] bg-[#fcfefe] p-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#0f3558]">{String(value.label)}</p>
          <p className="mt-1 text-sm text-[#2f2b29]">{String(value.value)}</p>
        </div>
      );
    }

    return (
      <div className="mt-3 space-y-3">
        {Object.entries(value).map(([k, v]) => (
          <div key={`${prefix}-${k}`}>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#0f3558]">{toHeading(k)}</p>
            {renderValue(v, `${prefix}-${k}`)}
          </div>
        ))}
      </div>
    );
  }

  return renderPrimitive(value);
}

function renderContentSection(key, value) {
  if (!value) return null;

  if (value && typeof value === "object" && !Array.isArray(value) && "title" in value) {
    const rest = Object.entries(value).filter(([k]) => k !== "title");
    return (
      <section key={key} className="rounded-2xl border border-[#ecd7ca] bg-white p-5 shadow-sm">
        <h3 className="text-lg font-bold text-[#1e1e1e]">{String(value.title)}</h3>
        <div className="mt-2 space-y-2">
          {rest.map(([k, v]) => (
            <div key={`${key}-${k}`}>
              {k !== "title" ? (
                <p className="text-xs font-semibold uppercase tracking-wider text-[#0f3558]">{toHeading(k)}</p>
              ) : null}
              {renderValue(v, `${key}-${k}`)}
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section key={key} className="rounded-2xl border border-[#ecd7ca] bg-white p-5 shadow-sm">
      <h3 className="text-lg font-bold text-[#1e1e1e]">{toHeading(key)}</h3>
      {renderValue(value, key)}
    </section>
  );
}

export async function generateStaticParams() {
  return getAllTestKitDetails().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = getTestKitBySlug(slug);
  if (!item) return { title: "Test Kit Not Found" };

  return {
    title: item.metaTitle,
    description: item.metaDescription,
    alternates: {
      canonical: `/test-kits/${slug}`,
    },
    openGraph: {
      title: item.metaTitle,
      description: item.metaDescription,
      url: absoluteUrl(`/test-kits/${slug}`),
      type: "article",
    },
  };
}

export default async function TestKitDetailPage({ params }) {
  const { slug } = await params;
  const item = getTestKitBySlug(slug);
  if (!item) notFound();

  const content = item.details?.content || {};
  const faqs = item.details?.faqs || [];
  const topInfo = [
    ["Product", item.catalog?.product],
    ["Description", item.catalog?.description],
    ["Category", item.catalog?.category],
    ["Method", item.catalog?.method],
    ["Specimen", item.catalog?.specimen],
    ["Cut-Off", item.catalog?.cutOff],
    ["Certificate", item.catalog?.certificate],
  ].filter(([, v]) => v && String(v).trim() && String(v).trim() !== "--");

  return (
    <div className="bg-[#fff9f6] pb-12">
      <section className="border-b border-[#efd8cb] bg-gradient-to-r from-[#fff4ec] via-[#fff9f6] to-[#edf6ff]">
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <nav className="mb-5 flex items-center gap-2 text-sm text-[#7d5a47]">
            <Link href="/" className="hover:text-[#ec671f]">Home</Link>
            <span>/</span>
            <Link href="/test-kits" className="hover:text-[#ec671f]">Test Kits</Link>
            <span>/</span>
            <span className="font-semibold text-[#ec671f]">{item.title}</span>
          </nav>

          <div className="grid items-center gap-8 lg:grid-cols-[280px_1fr]">
            <div className="mx-auto w-full max-w-[260px] rounded-2xl border border-[#f0d8ca] bg-white p-4 shadow-sm">
              <Image src="/product.png" alt={item.title} width={500} height={500} className="h-auto w-full rounded-xl object-cover" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0f3558]">Test Kit</p>
              <h1 className="mt-2 text-3xl font-bold text-[#1e1f22] sm:text-4xl">{item.title}</h1>
              <p className="mt-4 text-sm leading-relaxed text-[#4f433c]">{item.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link href="/contact" className="rounded-full bg-[#ec671f] px-5 py-2 text-sm font-semibold text-white hover:bg-[#d95f1d]">Inquire Now</Link>
                <Link href="/test-kits" className="rounded-full border border-[#d7c0b0] bg-white px-5 py-2 text-sm font-semibold text-[#2f2b29] hover:border-[#ec671f] hover:text-[#ec671f]">Back to List</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-xl font-bold text-[#1f1f1f]">Complete Product Details</h2>

        {topInfo.length > 0 ? (
          <div className="mt-5 overflow-hidden rounded-2xl border border-[#d7e2ea] bg-white shadow-sm">
            <div className="grid grid-cols-1 divide-y divide-[#d7e2ea] sm:grid-cols-2 sm:divide-x sm:divide-y-0">
              {topInfo.map(([label, value]) => (
                <div key={label} className="px-5 py-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#0f3558]">{label}</p>
                  <p className="mt-1 text-sm text-[#2f2b29]">{String(value)}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-5 space-y-4">
          {Object.entries(content).map(([key, value]) => renderContentSection(key, value))}
        </div>

        {faqs.length > 0 ? (
          <section className="mt-5 rounded-2xl border border-[#ecd7ca] bg-white p-5 shadow-sm">
            <h3 className="text-lg font-bold text-[#1e1e1e]">Frequently Asked Questions</h3>
            <div className="mt-4 space-y-3">
              {faqs.map((faq, index) => (
                <details key={`faq-${index}`} className="group rounded-xl border border-[#e7d5c8] bg-[#fffaf6] p-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-[#3b2f28]">
                    <span className="pr-3">{faq.question}</span>
                    <span className="text-[#ec671f]">+</span>
                  </summary>
                  <p className="mt-3 border-t border-[#eddccf] pt-3 text-sm leading-relaxed text-[#5a4a3e]">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        ) : null}
      </section>
    </div>
  );
}
