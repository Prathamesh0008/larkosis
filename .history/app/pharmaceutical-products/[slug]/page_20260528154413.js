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

  if (Array.isArray(value)) {
    return value.some((item) => isRenderable(item));
  }

  if (typeof value === "object") {
    return Object.values(value).some((item) => isRenderable(item));
  }

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
            className="rounded-2xl border border-[#e9d8cc] bg-[#fffdfb] p-4 shadow-[0_8px_24px_rgba(15,53,88,0.04)]"
          >
            {item && typeof item === "object" ? (
              <div className="space-y-2">
                {Object.entries(item)
                  .filter(([, objValue]) => isRenderable(objValue))
                  .map(([objKey, objValue]) => (
                    <div key={`${prefix}-${idx}-${objKey}`}>
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#ec671f]">
                        {toHeading(objKey)}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-[#334155]">
                        {formatInlineValue(objValue)}
                      </p>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-sm leading-relaxed text-[#334155]">
                {String(item)}
              </p>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (value && typeof value === "object") {
    if ("label" in value && isProductNameLabel(value.label)) {
      return null;
    }

    return (
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {Object.entries(value)
          .filter(([, subValue]) => isRenderable(subValue))
          .map(([subKey, subValue]) => (
            <div
              key={`${prefix}-${subKey}`}
              className="rounded-2xl border border-[#e5edf5] bg-gradient-to-br from-white to-[#f7fbff] p-4 shadow-[0_10px_26px_rgba(15,53,88,0.05)]"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0f3558]">
                {toHeading(subKey)}
              </p>
              <div className="mt-2">{renderValue(subValue, `${prefix}-${subKey}`)}</div>
            </div>
          ))}
      </div>
    );
  }

  return (
    <p className="mt-3 text-sm leading-relaxed text-[#475569] sm:text-[15px]">
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

  const contentSections = contentEntries.map(([key], index) => ({
    key,
    title: toHeading(key),
    id: `section-${key.replace(/[^a-zA-Z0-9_-]/g, "-")}`,
    number: String(index + 1).padStart(2, "0"),
  }));

  return (
    <div className="bg-[#fff8f4] pb-16">
      <section className="relative overflow-hidden border-b border-[#f1d7c8] bg-gradient-to-br from-[#fff7f1] via-[#fffdfb] to-[#eef7ff]">
        <div className="absolute inset-0">
          <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-[#ec671f]/15 blur-3xl" />
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#0f3558]/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-64 w-64 rounded-full bg-[#00923f]/10 blur-3xl" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-[#6c7b8d]">
            <Link href="/" className="font-medium hover:text-[#ec671f]">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/pharmaceutical-products"
              className="font-medium hover:text-[#ec671f]"
            >
              Pharmaceutical Products
            </Link>
            <span>/</span>
            <span className="max-w-[260px] truncate font-bold text-[#0f3558]">
              {name}
            </span>
          </nav>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#efc9af] bg-white/75 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#9f582f] shadow-sm backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-[#ec671f]" />
                Pharmaceutical Product
              </div>

              <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight text-[#0b2945] sm:text-5xl lg:text-6xl">
                {heroTitle}
              </h1>

              {heroDescriptionText ? (
                <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#526171] sm:text-lg">
                  {heroDescriptionText}
                </p>
              ) : null}

              {topInfo.length > 0 ? (
                <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {topInfo.map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-[#efd6c6] bg-white/80 p-4 shadow-[0_12px_32px_rgba(15,53,88,0.06)] backdrop-blur"
                    >
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#ec671f]">
                        {label}
                      </p>
                      <p className="mt-2 break-words text-sm font-bold text-[#0f3558]">
                        {formatInlineValue(value)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-[#ec671f] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#ec671f]/20 hover:bg-[#d85f1d]"
                >
                  Request Quote
                </Link>

                <Link
                  href="/pharmaceutical-products"
                  className="inline-flex items-center justify-center rounded-xl border border-[#0f3558]/20 bg-white px-6 py-3 text-sm font-bold text-[#0f3558] hover:border-[#ec671f] hover:text-[#ec671f]"
                >
                  Back to Products
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[#ec671f]/20 via-white to-[#0f3558]/15 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-[#e6d6ce] bg-white p-6 shadow-[0_24px_70px_rgba(15,53,88,0.14)]">
                <div className="rounded-[1.5rem] bg-gradient-to-br from-[#f8fbff] via-white to-[#fff3eb] p-6">
                  <Image
                    src="/product.png"
                    alt={name}
                    width={720}
                    height={560}
                    priority
                    className="mx-auto h-auto w-full max-w-[520px] object-contain"
                  />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-[#0f3558] p-4 text-white">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/65">
                      Product
                    </p>
                    <p className="mt-1 text-sm font-bold">Verified Details</p>
                  </div>
                  <div className="rounded-2xl bg-[#fff4ec] p-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#ec671f]">
                      Support
                    </p>
                    <p className="mt-1 text-sm font-bold text-[#0f3558]">
                      Global Inquiry
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
        <aside className="hidden h-fit rounded-3xl border border-[#ead8cf] bg-white p-5 shadow-[0_16px_42px_rgba(15,53,88,0.08)] lg:sticky lg:top-28 lg:block">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#ec671f]">
            Page Sections
          </p>

          <div className="mt-4 space-y-2">
            {contentSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="group flex items-center gap-3 rounded-2xl border border-transparent px-3 py-3 text-sm font-semibold text-[#334155] hover:border-[#efd6c6] hover:bg-[#fff8f3] hover:text-[#ec671f]"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f1f6fb] text-xs font-bold text-[#0f3558] group-hover:bg-[#ec671f] group-hover:text-white">
                  {section.number}
                </span>
                <span className="line-clamp-2">{section.title}</span>
              </a>
            ))}

            {faqs.length > 0 ? (
              <a
                href="#faqs"
                className="group flex items-center gap-3 rounded-2xl border border-transparent px-3 py-3 text-sm font-semibold text-[#334155] hover:border-[#efd6c6] hover:bg-[#fff8f3] hover:text-[#ec671f]"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f1f6fb] text-xs font-bold text-[#0f3558] group-hover:bg-[#ec671f] group-hover:text-white">
                  FAQ
                </span>
                FAQs
              </a>
            ) : null}
          </div>

          <div className="mt-5 rounded-2xl bg-gradient-to-br from-[#0f3558] to-[#173f65] p-4 text-white">
            <p className="text-sm font-bold">Need bulk supply?</p>
            <p className="mt-2 text-xs leading-relaxed text-white/80">
              Send your requirement and our team will connect with quotation details.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-[#0f3558] hover:bg-[#ec671f] hover:text-white"
            >
              Contact Team
            </Link>
          </div>
        </aside>

        <main>
          <div className="rounded-3xl border border-[#ead8cf] bg-white p-4 shadow-[0_16px_42px_rgba(15,53,88,0.06)] lg:hidden">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#ec671f]">
              Quick Navigation
            </p>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {contentSections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="shrink-0 rounded-full border border-[#dbe6f4] bg-[#f8fbff] px-4 py-2 text-xs font-bold text-[#0f3558]"
                >
                  {section.title}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-5 space-y-5 lg:mt-0">
            {contentEntries.length > 0 ? (
              contentEntries.map(([key, value], index) => {
                const sectionId = `section-${key.replace(/[^a-zA-Z0-9_-]/g, "-")}`;

                return (
                  <section
                    id={sectionId}
                    key={key}
                    className="scroll-mt-28 overflow-hidden rounded-3xl border border-[#ead8cf] bg-white shadow-[0_16px_44px_rgba(15,53,88,0.06)]"
                  >
                    <div className="border-b border-[#eef1f5] bg-gradient-to-r from-[#fff8f3] via-white to-[#f5faff] px-5 py-5 sm:px-7">
                      <div className="flex items-start gap-4">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#0f3558] text-sm font-bold text-white">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#ec671f]">
                            Product Information
                          </p>
                          <h2 className="mt-1 text-2xl font-bold text-[#0f2f57]">
                            {toHeading(key)}
                          </h2>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 sm:p-7">{renderValue(value, key)}</div>
                  </section>
                );
              })
            ) : (
              <section className="rounded-3xl border border-[#ead8cf] bg-white p-7 text-center shadow-sm">
                <h2 className="text-xl font-bold text-[#0f3558]">
                  Product information unavailable
                </h2>
                <p className="mt-2 text-sm text-[#64748b]">
                  Please contact the team for technical documentation.
                </p>
              </section>
            )}
          </div>

          {faqs.length > 0 ? (
            <section
              id="faqs"
              className="mt-6 scroll-mt-28 rounded-3xl border border-[#ead8cf] bg-white p-5 shadow-[0_16px_44px_rgba(15,53,88,0.06)] sm:p-7"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#ec671f]">
                    Support
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-[#0f2f57]">
                    Frequently Asked Questions
                  </h2>
                  <p className="mt-2 text-sm text-[#64748b]">
                    Common product, documentation, and supply questions.
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {faqs.map((faq, index) => (
                  <details
                    key={`faq-${index}`}
                    className="group rounded-2xl border border-[#e5edf5] bg-gradient-to-r from-[#f8fbff] to-white p-4 open:border-[#ec671f]/35 open:bg-[#fff8f3]"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-[#0f172a]">
                      <span>{faq.question}</span>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0f3558] text-lg leading-none text-white group-open:bg-[#ec671f]">
                        <span className="group-open:hidden">+</span>
                        <span className="hidden group-open:inline">−</span>
                      </span>
                    </summary>

                    <div className="grid grid-rows-[0fr] transition-all duration-300 ease-in-out group-open:grid-rows-[1fr]">
                      <div className="overflow-hidden">
                        <p className="mt-4 border-t border-[#dbe2ea] pt-4 text-sm leading-relaxed text-[#475569]">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ) : null}
        </main>
      </section>
    </div>
  );
}