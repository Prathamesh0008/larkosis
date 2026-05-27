import Image from "next/image";
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

function formatInlineValue(value) {
  if (value == null) return "";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    const text = String(value).trim();
    if (text === "-" || text === "--") return "None";
    return text;
  }
  if (Array.isArray(value)) {
    return value.map((item) => formatInlineValue(item)).filter(Boolean).join(", ");
  }
  if (typeof value === "object") {
    if ("label" in value && "value" in value) {
      return formatInlineValue(value.value);
    }
    return Object.entries(value)
      .map(([k, v]) => `${toHeading(k)}: ${formatInlineValue(v)}`)
      .filter((line) => line.trim() !== ":")
      .join(", ");
  }
  return "";
}

function isProductNameLabel(label) {
  return String(label || "").trim().toLowerCase() === "product name";
}

function renderPrimitive(value) {
  return <p className="mt-2 text-sm leading-relaxed text-[#4f433c]">{formatInlineValue(value)}</p>;
}

function renderValue(value, prefix) {
  if (Array.isArray(value)) {
    const normalizedItems = value.filter((item) => {
      if (item && typeof item === "object" && !Array.isArray(item) && "label" in item) {
        return !isProductNameLabel(item.label);
      }
      if (typeof item === "string") {
        return !item.trim().toLowerCase().startsWith("product name:");
      }
      return true;
    });

    return (
      <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-[#4f433c] marker:text-[#ec671f]">
        {normalizedItems.map((item, idx) => (
          <li key={`${prefix}-${idx}`}>
            {item && typeof item === "object" ? renderValue(item, `${prefix}-${idx}`) : String(item)}
          </li>
        ))}
      </ul>
    );
  }

  if (value && typeof value === "object") {
    if ("label" in value && "value" in value) {
      if (isProductNameLabel(value.label)) {
        return null;
      }
      return (
        <div className="mt-2 rounded-xl border border-[#edf0f2] bg-[#fcfefe] p-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#0f3558]">{String(value.label)}</p>
          <p className="mt-1 text-sm text-[#2f2b29]">{formatInlineValue(value.value)}</p>
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
    ["Description", item.catalog?.description],
    ["Category", item.catalog?.category],
    ["Method", item.catalog?.method],
    ["Specimen", item.catalog?.specimen],
    ["Cut-Off", item.catalog?.cutOff],
    ["Certificate", item.catalog?.certificate],
  ].filter(([, v]) => {
    const normalized = formatInlineValue(v).trim();
    return normalized && normalized !== "None";
  });
  const overview = topInfo.slice(0, 4);
  const extraInfo = topInfo.slice(4);
  const sectionEntries = Object.entries(content);

  return (
    <div className="bg-[radial-gradient(circle_at_top_left,#eff6ff_0%,#f8fafc_32%,#f5f7fb_100%)] pb-14 pt-8">
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-[#d7dfec] bg-white shadow-[0_18px_45px_rgba(20,40,80,0.08)]">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_1fr]">
            <div className="border-b border-[#e5e9f0] bg-gradient-to-br from-[#f8fbff] to-[#f2f6fc] p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <div className="mb-4 inline-flex items-center rounded-full border border-[#cfe0f5] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#1d4f91]">
                Test Kit
              </div>
              <Image src="/product.png" alt={item.title} width={700} height={520} className="h-auto w-full rounded-xl object-contain" />
            </div>

            <div className="p-6 sm:p-8">
              <h1 className="text-3xl font-bold uppercase tracking-tight text-[#13294b]">{item.title}</h1>
              <p className="mt-3 text-xl font-semibold text-[#0f172a]">{item.catalog?.product}</p>
              <p className="mt-4 text-sm leading-relaxed text-[#475569]">{item.description}</p>

              {overview.length > 0 ? (
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {overview.map(([label, value]) => (
                    <div key={label} className="rounded-xl border border-[#e4ebf6] bg-[#f8fbff] p-3">
                      <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#486387]">{label}</p>
                      <p className="mt-1 text-sm font-semibold text-[#0f172a]">{formatInlineValue(value)}</p>
                    </div>
                  ))}
                </div>
              ) : null}

            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-7 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {extraInfo.length > 0 ? (
          <div className="mb-4 rounded-2xl border border-[#d9dee7] bg-white p-4 shadow-sm">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {extraInfo.map(([label, value]) => (
                <div key={label} className="rounded-xl border border-[#e5e9f0] bg-[#f8fafc] p-3">
                  <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#53657f]">{label}</p>
                  <p className="mt-1 text-sm font-medium text-[#0f172a]">{formatInlineValue(value)}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="space-y-4">
          {sectionEntries
            .filter(
              ([key]) =>
                !key.toLowerCase().includes("indication") &&
                !key.toLowerCase().includes("presentation"),
            )
            .map(([key, value]) => (
            <section key={key} className="rounded-2xl border border-[#d9dee7] bg-white p-5 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f172a]">{toHeading(key)}</h3>
              <div className="mt-1 h-[2px] w-14 rounded-full bg-gradient-to-r from-[#1d4f91] to-[#7aa7df]" />
              {renderValue(value, key)}
            </section>
          ))}
        </div>

        {faqs.length > 0 ? (
          <section className="mt-5 rounded-2xl border border-[#d9dee7] bg-white p-5 shadow-sm">
            <h3 className="text-lg font-bold text-[#0f172a]">Frequently Asked Questions</h3>
            <p className="mt-1 text-sm text-[#64748b]">Click any question to expand the answer.</p>
            <div className="mt-4 space-y-3">
              {faqs.map((faq, index) => (
                <details key={`faq-${index}`} className="group rounded-xl border border-[#e2e8f2] bg-gradient-to-r from-[#f8fafc] to-[#f6f9ff] p-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-[#0f172a]">
                    <span className="pr-3">{faq.question}</span>
                    <span className="text-[#1d4f91] group-open:hidden">+</span>
                    <span className="hidden text-[#1d4f91] group-open:block">-</span>
                  </summary>
                  <div className="grid grid-rows-[0fr] transition-all duration-300 ease-in-out group-open:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <p className="mt-3 border-t border-[#dbe2ea] pt-3 text-sm leading-relaxed text-[#334155]">{faq.answer}</p>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </section>
        ) : null}
      </section>
    </div>
  );
}
