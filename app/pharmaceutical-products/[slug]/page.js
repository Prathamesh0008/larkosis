import Image from "next/image";
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

function renderValue(value, prefix) {
  if (Array.isArray(value)) {
    return (
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#4f433c] marker:text-[#ec671f]">
        {value.map((item, idx) => (
          <li key={`${prefix}-${idx}`}>
            {item && typeof item === "object" ? (
              <div className="rounded-lg border border-[#f0e0d6] bg-[#fffdfb] p-3">
                {Object.entries(item).map(([objKey, objValue]) => (
                  <div key={`${prefix}-${idx}-${objKey}`} className="mb-1 last:mb-0">
                    <span className="font-semibold text-[#3b2f28]">{toHeading(objKey)}: </span>
                    <span>{formatInlineValue(objValue)}</span>
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
    return (
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {Object.entries(value).map(([subKey, subValue]) => (
          <div key={`${prefix}-${subKey}`} className="rounded-xl border border-[#edf0f2] bg-[#fcfefe] p-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#0f3558]">{toHeading(subKey)}</p>
            {renderValue(subValue, `${prefix}-${subKey}`)}
          </div>
        ))}
      </div>
    );
  }

  return <p className="mt-2 text-sm leading-relaxed text-[#4f433c]">{formatInlineValue(value)}</p>;
}

export async function generateStaticParams() {
  return getAllPharmaceuticalProductDetails().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getPharmaceuticalProductBySlug(slug);

  if (!product) return { title: "Product Not Found" };

  const name =
    product.details?.meta?.productName || product.catalog?.name || slug;
  const description =
    product.details?.seoDescription || product.catalog?.category || "Pharmaceutical product details";

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
    ["Product Name", name],
    ["Category", product.details?.meta?.category || product.catalog?.category || "None"],
    ["Form", product.details?.meta?.form || product.catalog?.form || "None"],
    ["Strength", product.details?.meta?.strength || product.catalog?.dosage || "None"],
    ["CAS-ID", product.details?.meta?.cas || product.catalog?.casId || "None"],
  ].filter(([, value]) => formatInlineValue(value).trim());
  const overview = topInfo.slice(0, 4);
  const contentEntries = Object.entries(content);
  const contentSections = contentEntries.map(([key]) => ({
    key,
    title: toHeading(key),
    id: `section-${key.replace(/[^a-zA-Z0-9_-]/g, "-")}`,
  }));

  return (
    <div className="bg-[#f5f7fb] pb-12 pt-8">
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[#d9dee7] bg-white p-5 sm:p-7">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr]">
            <div className="rounded-2xl border border-[#e5e9f0] bg-[#f8fafc] p-5">
              <Image src="/product.png" alt={name} width={700} height={520} className="h-auto w-full rounded-xl object-contain" />
            </div>

            <div>
              <h1 className="text-3xl font-bold uppercase tracking-tight text-[#13294b]">{heroTitle}</h1>
              <p className="mt-3 text-base leading-relaxed text-[#334155]">{heroDescriptionText}</p>

              {overview.length > 0 ? (
                <div className="mt-5 space-y-2">
                  {overview.map(([label, value]) => (
                    <p key={label} className="text-[15px] text-[#0f172a]">
                      <span className="font-bold">{label}: </span>
                      <span>{formatInlineValue(value)}</span>
                    </p>
                  ))}
                </div>
              ) : null}

            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-7 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-[#d9dee7] bg-white p-4">
          <div className="flex flex-wrap gap-2">
            {contentSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="rounded-md border border-[#dbe3ef] bg-[#f8fafc] px-3 py-1.5 text-xs font-semibold text-[#334155] hover:border-[#1d4f91] hover:text-[#1d4f91]"
              >
                {section.title}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-5 space-y-4">
          {contentEntries.map(([key, value]) => (
            <section id={`section-${key.replace(/[^a-zA-Z0-9_-]/g, "-")}`} key={key} className="scroll-mt-24 rounded-2xl border border-[#d9dee7] bg-white p-5">
              <h3 className="text-lg font-bold text-[#0f172a]">{toHeading(key)}</h3>
              {renderValue(value, key)}
            </section>
          ))}
        </div>

        {faqs.length > 0 ? (
          <section className="mt-5 rounded-2xl border border-[#d9dee7] bg-white p-5">
            <h3 className="text-lg font-bold text-[#0f172a]">Frequently Asked Questions</h3>
            <div className="mt-4 space-y-3">
              {faqs.map((faq, index) => (
                <details key={`faq-${index}`} className="group rounded-xl border border-[#e5e9f0] bg-[#f8fafc] p-4">
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
