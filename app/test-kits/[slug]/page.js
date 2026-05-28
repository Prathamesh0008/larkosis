import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { absoluteUrl } from "@/lib/seo";
import GoToTopButton from "@/components/go-to-top-button";
import ActiveIngredientSectionNav from "@/components/active-ingredient-section-nav";
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

function isTitleLabel(label) {
  return String(label || "").trim().toLowerCase() === "title";
}

function isRedundantSubheading(key) {
  const normalized = String(key || "").trim().toLowerCase();
  return normalized === "sections" || normalized === "content" || normalized === "description";
}

function renderPrimitive(value) {
  return <p className="mt-2 text-sm leading-relaxed text-[#4f433c]">{formatInlineValue(value)}</p>;
}

function renderValue(value, prefix) {
  if (Array.isArray(value)) {
    const normalizedItems = value.filter((item) => {
      if (item && typeof item === "object" && !Array.isArray(item) && "label" in item) {
        return !isProductNameLabel(item.label) && !isTitleLabel(item.label);
      }
      if (typeof item === "string") {
        const normalized = item.trim().toLowerCase();
        return !normalized.startsWith("product name:") && !normalized.startsWith("title:");
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
      if (isProductNameLabel(value.label) || isTitleLabel(value.label)) {
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
        {Object.entries(value)
          .filter(([k]) => k.trim().toLowerCase() !== "title")
          .map(([k, v]) => (
          <div key={`${prefix}-${k}`}>
            {!isRedundantSubheading(k) ? (
              <p className="text-xs font-semibold uppercase tracking-wider text-[#0f3558]">{toHeading(k)}</p>
            ) : null}
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
  const sectionEntries = Object.entries(content).filter(
    ([key]) =>
      !key.toLowerCase().includes("indication") &&
      !key.toLowerCase().includes("presentation") &&
      !key.toLowerCase().includes("productoverview"),
  );
  const sectionNav = sectionEntries.map(([key]) => ({
    key,
    id: `section-${key.replace(/[^a-zA-Z0-9_-]/g, "-")}`,
    title: toHeading(key),
  }));

  return (
    <div id="page-top" className="bg-[#f3f6fb] pb-12 pt-8">
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#dbe4f0] sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
            <div className="flex min-h-[320px] items-center justify-center rounded-xl bg-[#f7faff] p-4 ring-1 ring-[#e2eaf5]">
              <Image src="/product.png" alt={item.title} width={700} height={520} className="h-auto w-full rounded-lg object-contain" />
            </div>
            <div>
              <nav className="flex items-center gap-2 text-sm text-[#6c7b8d]">
                <Link href="/" className="hover:text-[#ec671f]">Home</Link>
                <span>/</span>
                <Link href="/test-kits" className="hover:text-[#ec671f]">Test Kits</Link>
                <span>/</span>
                <span className="truncate font-semibold text-[#1d4f91]">{item.title}</span>
              </nav>
              <h1 className="mt-3 text-3xl font-bold text-[#102a4c] sm:text-4xl">{item.title}</h1>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#44566c]">{item.description}</p>
              {overview.length > 0 ? (
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {overview.map(([label, value]) => (
                    <div key={label} className="rounded-lg bg-[#f7faff] p-3 ring-1 ring-[#dfe8f4]">
                      <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#5c7390]">{label}</p>
                      <p className="mt-1 text-xs font-semibold text-[#0f172a]">{formatInlineValue(value)}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-6 grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[220px_1fr] lg:px-8">
        <aside className="h-fit rounded-xl bg-white p-4 shadow-sm ring-1 ring-[#dbe4f0] lg:sticky lg:top-24">
          <ActiveIngredientSectionNav sections={sectionNav} includeFaq={faqs.length > 0} />
          {extraInfo.length > 0 ? (
            <div className="mt-4 border-t border-[#e6edf6] pt-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.08em] text-[#5d7390]">Additional</h3>
              <div className="mt-2 space-y-2">
                {extraInfo.map(([label, value]) => (
                  <div key={label} className="rounded-md bg-[#f7faff] p-2 ring-1 ring-[#e2eaf5]">
                    <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#607792]">{label}</p>
                    <p className="mt-0.5 text-xs font-medium text-[#102a4c]">{formatInlineValue(value)}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </aside>

        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-[#dbe4f0] sm:p-6">
          <div className="space-y-0">
            {sectionEntries.map(([key, value], idx) => (
              <section
                id={`section-${key.replace(/[^a-zA-Z0-9_-]/g, "-")}`}
                key={key}
                className={`scroll-mt-24 ${idx > 0 ? "mt-6 border-t border-[#e3ebf5] pt-6" : ""}`}
              >
                <h3 className="text-xl font-bold text-[#0f2f57]">{toHeading(key)}</h3>
                {renderValue(value, key)}
              </section>
            ))}

            {faqs.length > 0 ? (
              <section id="faq" className={`${sectionEntries.length > 0 ? "mt-6 border-t border-[#e3ebf5] pt-6" : ""}`}>
                <h3 className="text-xl font-bold text-[#0f2f57]">Frequently Asked Questions</h3>
                <div className="mt-4 space-y-3">
                  {faqs.map((faq, index) => (
                    <details key={`faq-${index}`} className="group rounded-lg bg-[#f7faff] p-4 ring-1 ring-[#dde6f3]">
                      <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-[#0f172a]">
                        <span className="pr-3">{faq.question}</span>
                        <span className="text-[#1d4f91] group-open:hidden">+</span>
                        <span className="hidden text-[#1d4f91] group-open:block">-</span>
                      </summary>
                      <div className="grid grid-rows-[0fr] transition-all duration-300 ease-in-out group-open:grid-rows-[1fr]">
                        <div className="overflow-hidden">
                          <p className="mt-3 border-t border-[#dbe4f0] pt-3 text-sm leading-relaxed text-[#334155]">{faq.answer}</p>
                        </div>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </section>

      <GoToTopButton />
    </div>
  );
}
