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
      <ul className="mt-4 space-y-3">
        {normalizedItems.map((item, idx) => (
          <li
            key={`${prefix}-${idx}`}
            className="list-none rounded-xl border border-[#ead8cf] bg-[#fffdfb] p-4 text-sm leading-relaxed text-[#334155]"
          >
            {item && typeof item === "object" ? (
              <div className="space-y-3">
                {Object.entries(item)
                  .filter(([, objValue]) => isRenderable(objValue))
                  .map(([objKey, objValue]) => (
                    <div key={`${prefix}-${idx}-${objKey}`}>
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#ec671f]">
                        {toHeading(objKey)}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-[#334155]">
                        {formatInlineValue(objValue)}
                      </p>
                    </div>
                  ))}
              </div>
            ) : (
              String(item)
            )}
          </li>
        ))}
      </ul>
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
              className="rounded-xl border border-[#e7edf4] bg-white p-4"
            >
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0f3558]">
                {toHeading(subKey)}
              </p>
              <div className="mt-2">{renderValue(subValue, `${prefix}-${subKey}`)}</div>
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
    <div className="bg-[#fff8f4] pb-16">
      {/* HERO */}
      <section className="border-b border-[#efd9cc] bg-[#fff8f4]">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.25fr_0.75fr] lg:px-8 lg:py-14">
          <div>
            <nav className="flex flex-wrap items-center gap-2 text-sm text-[#7b6659]">
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
              <span className="max-w-[260px] truncate font-semibold text-[#0f3558]">
                {name}
              </span>
            </nav>

            <div className="mt-8 inline-flex rounded-full border border-[#f1c7ad] bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#ec671f]">
              Pharmaceutical Product
            </div>

            <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight text-[#0f3558] sm:text-5xl">
              {heroTitle}
            </h1>

            {heroDescriptionText ? (
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#526171] sm:text-lg">
                {heroDescriptionText}
              </p>
            ) : null}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#ec671f] px-7 py-3 text-sm font-bold text-white shadow-md hover:bg-[#d95f1d]"
              >
                Request Quote
              </Link>

              <Link
                href="/pharmaceutical-products"
                className="inline-flex items-center justify-center rounded-full border border-[#0f3558]/25 bg-white px-7 py-3 text-sm font-bold text-[#0f3558] hover:border-[#ec671f] hover:text-[#ec671f]"
              >
                Back to Products
              </Link>
            </div>
          </div>

          <aside className="rounded-3xl border border-[#ead8cf] bg-white p-5 shadow-[0_18px_45px_rgba(15,53,88,0.08)]">
            <div className="rounded-2xl bg-[#f8fbff] p-5">
              <Image
                src="/product.png"
                alt={name}
                width={520}
                height={420}
                priority
                className="mx-auto h-auto w-full max-w-[360px] object-contain"
              />
            </div>

            {topInfo.length > 0 ? (
              <div className="mt-5 overflow-hidden rounded-2xl border border-[#e5edf4]">
                {topInfo.map(([label, value], index) => (
                  <div
                    key={label}
                    className={`grid grid-cols-[120px_1fr] gap-3 px-4 py-3 text-sm ${
                      index % 2 === 0 ? "bg-white" : "bg-[#f8fbff]"
                    }`}
                  >
                    <p className="font-bold text-[#0f3558]">{label}</p>
                    <p className="break-words text-[#475569]">
                      {formatInlineValue(value)}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
          </aside>
        </div>
      </section>

      {/* QUICK NAV */}
      {contentSections.length > 0 ? (
        <section className="sticky top-[80px] z-20 border-b border-[#ead8cf] bg-white/90 backdrop-blur">
          <div className="mx-auto flex w-full max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
            {contentSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="shrink-0 rounded-full border border-[#dbe6f4] bg-[#f8fbff] px-4 py-2 text-xs font-bold text-[#0f3558] hover:border-[#ec671f] hover:bg-[#fff6ef] hover:text-[#ec671f]"
              >
                {section.title}
              </a>
            ))}

            {faqs.length > 0 ? (
              <a
                href="#faqs"
                className="shrink-0 rounded-full border border-[#dbe6f4] bg-[#f8fbff] px-4 py-2 text-xs font-bold text-[#0f3558] hover:border-[#ec671f] hover:bg-[#fff6ef] hover:text-[#ec671f]"
              >
                FAQs
              </a>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* CONTENT */}
      <main className="mx-auto mt-8 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5">
          {contentEntries.length > 0 ? (
            contentEntries.map(([key, value]) => {
              const sectionId = `section-${key.replace(/[^a-zA-Z0-9_-]/g, "-")}`;

              return (
                <section
                  id={sectionId}
                  key={key}
                  className="scroll-mt-36 rounded-3xl border border-[#ead8cf] bg-white p-5 shadow-sm sm:p-7"
                >
                  <div className="mb-4 border-b border-[#eef1f5] pb-4">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#ec671f]">
                      Product Information
                    </p>
                    <h2 className="mt-1 text-2xl font-bold text-[#0f3558]">
                      {toHeading(key)}
                    </h2>
                  </div>

                  {renderValue(value, key)}
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

        {/* FAQ */}
        {faqs.length > 0 ? (
          <section
            id="faqs"
            className="mt-6 scroll-mt-36 rounded-3xl border border-[#ead8cf] bg-white p-5 shadow-sm sm:p-7"
          >
            <div className="mb-5 border-b border-[#eef1f5] pb-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#ec671f]">
                Support
              </p>
              <h2 className="mt-1 text-2xl font-bold text-[#0f3558]">
                Frequently Asked Questions
              </h2>
              <p className="mt-2 text-sm text-[#64748b]">
                Common product, documentation, and supply questions.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <details
                  key={`faq-${index}`}
                  className="group rounded-2xl border border-[#e5edf5] bg-[#f8fbff] p-4 open:border-[#ec671f]/40 open:bg-[#fff8f3]"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-[#0f172a]">
                    <span>{faq.question}</span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0f3558] text-white group-open:bg-[#ec671f]">
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
    </div>
  );
}