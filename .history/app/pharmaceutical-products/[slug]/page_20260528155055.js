import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { absoluteUrl } from "@/lib/seo";
import {
  getAllPharmaceuticalProductDetails,
  getPharmaceuticalProductBySlug,
} from "@/lib/pharmaceutical-product-details";

function toHeading(key) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatInlineValue(value) {
  if (value == null) return "";

  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
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

function isRenderable(value) {
  if (value == null) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (typeof value === "number" || typeof value === "boolean") return true;
  if (Array.isArray(value)) return value.some((item) => isRenderable(item));
  if (typeof value === "object") return Object.values(value).some((item) => isRenderable(item));
  return false;
}

function renderValue(value, prefix) {
  if (!isRenderable(value)) return null;

  if (Array.isArray(value)) {
    const normalizedItems = value.filter((item) => {
      if (
        item &&
        typeof item === "object" &&
        !Array.isArray(item) &&
        "label" in item
      ) {
        return !isProductNameLabel(item.label);
      }

      if (typeof item === "string") {
        return !item.trim().toLowerCase().startsWith("product name:");
      }

      return isRenderable(item);
    });

    return (
      <div className="mt-4 space-y-3">
        {normalizedItems.map((item, idx) => (
          <div
            key={`${prefix}-${idx}`}
            className="rounded-xl border border-[#f1ded1] bg-[#fffdfb] p-4"
          >
            {item && typeof item === "object" ? (
              renderValue(item, `${prefix}-${idx}`)
            ) : (
              <p className="text-sm leading-relaxed text-[#475569]">
                {String(item)}
              </p>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (value && typeof value === "object") {
    if ("label" in value && "value" in value) {
      if (isProductNameLabel(value.label)) return null;

      return (
        <div className="mt-3 rounded-xl border border-[#f1ded1] bg-[#fffdfb] p-4">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#ec671f]">
            {value.label}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-[#475569]">
            {formatInlineValue(value.value)}
          </p>
        </div>
      );
    }

    return (
      <div className="mt-4 space-y-4">
        {Object.entries(value)
          .filter(([, subValue]) => isRenderable(subValue))
          .map(([subKey, subValue]) => (
            <div key={`${prefix}-${subKey}`}>
              <h4 className="text-sm font-bold text-[#0f3558]">
                {toHeading(subKey)}
              </h4>
              {renderValue(subValue, `${prefix}-${subKey}`)}
            </div>
          ))}
      </div>
    );
  }

  return (
    <p className="mt-3 text-sm leading-relaxed text-[#475569] sm:text-base">
      {formatInlineValue(value)}
    </p>
  );
}

export async function generateStaticParams() {
  return getAllPharmaceuticalProductDetails().map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getPharmaceuticalProductBySlug(slug);

  if (!product) return { title: "Product Not Found" };

  const name = product.details?.meta?.productName || product.catalog?.name || slug;
  const description =
    product.details?.seoDescription ||
    product.catalog?.category ||
    "Pharmaceutical product details";

  return {
    title: product.details?.seoTitle || `${name} | Pharmaceutical Products`,
    description,
    alternates: {
      canonical: `/pharmaceutical-products/${slug}`,
    },
    openGraph: {
      title: product.details?.seoTitle || `${name} | Pharmaceutical Products`,
      description,
      url: absoluteUrl(`/pharmaceutical-products/${slug}`),
      type: "article",
    },
  };
}

export default async function PharmaceuticalProductDetailPage({ params }) {
  const { slug } = await params;
  const product = getPharmaceuticalProductBySlug(slug);

  if (!product) notFound();

  const name = product.details?.meta?.productName || product.catalog?.name || slug;
  const heroTitle = product.details?.hero?.title || name;

  const heroDescription = product.details?.hero?.description || [];
  const heroDescriptionText = Array.isArray(heroDescription)
    ? heroDescription.map((line) => String(line).trim()).filter(Boolean).join(" ")
    : String(heroDescription || "");

  const content = product.details?.content || {};
  const faqs = product.details?.faqs || [];

  const topInfo = [
    ["Category", product.details?.meta?.category || product.catalog?.category || "None"],
    ["Form", product.details?.meta?.form || product.catalog?.form || "None"],
    ["Strength", product.details?.meta?.strength || product.catalog?.dosage || "None"],
    ["CAS-ID", product.details?.meta?.cas || product.catalog?.casId || "None"],
  ].filter(([, value]) => formatInlineValue(value).trim());

  const contentEntries = Object.entries(content).filter(([, value]) =>
    isRenderable(value),
  );

  const contentSections = contentEntries.map(([key]) => ({
    key,
    title: toHeading(key),
    id: `section-${key.replace(/[^a-zA-Z0-9_-]/g, "-")}`,
  }));

  return (
    <div className="bg-[#fff8f4] pb-14">
      <section className="border-b border-[#f0d9cb] bg-[#fffaf7]">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-[#7a665b]">
            <Link href="/" className="hover:text-[#ec671f]">
              Home
            </Link>
            <span>/</span>
            <Link href="/pharmaceutical-products" className="hover:text-[#ec671f]">
              Pharmaceutical Products
            </Link>
            <span>/</span>
            <span className="max-w-[260px] truncate font-semibold text-[#0f3558]">
              {name}
            </span>
          </nav>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-center">
            <div>
              <span className="inline-flex rounded-full bg-[#ec671f]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#ec671f]">
                Pharmaceutical Product
              </span>

              <h1 className="mt-4 text-4xl font-bold leading-tight text-[#0f3558] sm:text-5xl">
                {heroTitle}
              </h1>

              {heroDescriptionText ? (
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#5f6c78]">
                  {heroDescriptionText}
                </p>
              ) : null}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-[#ec671f] px-6 py-3 text-sm font-bold text-white hover:bg-[#d95f1d]"
                >
                  Request Quote
                </Link>

                <Link
                  href="/pharmaceutical-products"
                  className="inline-flex items-center justify-center rounded-full border border-[#0f3558]/20 bg-white px-6 py-3 text-sm font-bold text-[#0f3558] hover:border-[#ec671f] hover:text-[#ec671f]"
                >
                  Back to Products
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-[#f0d9cb] bg-white p-5 shadow-sm">
              <div className="rounded-2xl bg-[#f8fbff] p-5">
                <Image
                  src="/product.png"
                  alt={name}
                  width={480}
                  height={360}
                  priority
                  className="mx-auto h-auto w-full max-w-[300px] object-contain"
                />
              </div>

              {topInfo.length > 0 ? (
                <div className="mt-4 divide-y divide-[#edf1f5] rounded-2xl border border-[#edf1f5] bg-white">
                  {topInfo.map(([label, value]) => (
                    <div key={label} className="grid grid-cols-[110px_1fr] gap-3 px-4 py-3">
                      <p className="text-sm font-bold text-[#0f3558]">{label}</p>
                      <p className="break-words text-sm text-[#526171]">
                        {formatInlineValue(value)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {contentSections.length > 0 ? (
        <section className="border-b border-[#f0d9cb] bg-white">
          <div className="mx-auto flex w-full max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
            {contentSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="shrink-0 rounded-full bg-[#fff3eb] px-4 py-2 text-xs font-bold text-[#0f3558] hover:bg-[#ec671f] hover:text-white"
              >
                {section.title}
              </a>
            ))}
            {faqs.length > 0 ? (
              <a
                href="#faqs"
                className="shrink-0 rounded-full bg-[#fff3eb] px-4 py-2 text-xs font-bold text-[#0f3558] hover:bg-[#ec671f] hover:text-white"
              >
                FAQs
              </a>
            ) : null}
          </div>
        </section>
      ) : null}

      <main className="mx-auto mt-7 w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-5">
          {contentEntries.length > 0 ? (
            contentEntries.map(([key, value]) => {
              const sectionId = `section-${key.replace(/[^a-zA-Z0-9_-]/g, "-")}`;

              return (
                <section
                  id={sectionId}
                  key={key}
                  className="scroll-mt-28 rounded-3xl border border-[#f0d9cb] bg-white p-5 shadow-sm sm:p-7"
                >
                  <h2 className="text-2xl font-bold text-[#0f3558]">
                    {toHeading(key)}
                  </h2>
                  <div className="mt-2 h-[3px] w-14 rounded-full bg-[#ec671f]" />
                  {renderValue(value, key)}
                </section>
              );
            })
          ) : (
            <section className="rounded-3xl border border-[#f0d9cb] bg-white p-7 text-center shadow-sm">
              <h2 className="text-xl font-bold text-[#0f3558]">
                Product information unavailable
              </h2>
              <p className="mt-2 text-sm text-[#64748b]">
                Please contact the team for technical documentation.
              </p>
            </section>
          )}

          {faqs.length > 0 ? (
            <section
              id="faqs"
              className="scroll-mt-28 rounded-3xl border border-[#f0d9cb] bg-white p-5 shadow-sm sm:p-7"
            >
              <h2 className="text-2xl font-bold text-[#0f3558]">
                Frequently Asked Questions
              </h2>
              <div className="mt-2 h-[3px] w-14 rounded-full bg-[#ec671f]" />

              <div className="mt-5 space-y-3">
                {faqs.map((faq, index) => (
                  <details
                    key={`faq-${index}`}
                    className="group rounded-2xl border border-[#edf1f5] bg-[#fffdfb] p-4"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-[#0f3558]">
                      <span>{faq.question}</span>
                      <span className="text-xl text-[#ec671f] group-open:hidden">+</span>
                      <span className="hidden text-xl text-[#ec671f] group-open:inline">−</span>
                    </summary>

                    <div className="grid grid-rows-[0fr] transition-all duration-300 ease-in-out group-open:grid-rows-[1fr]">
                      <div className="overflow-hidden">
                        <p className="mt-4 border-t border-[#edf1f5] pt-4 text-sm leading-relaxed text-[#526171]">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </main>
    </div>
  );
}