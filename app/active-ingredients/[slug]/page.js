import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { absoluteUrl } from "@/lib/seo";
import { getActiveIngredientBySlug, getAllActiveIngredients } from "@/lib/ingredients";

function hasAnyRenderableField(block) {
  return (
    block?.description ||
    (Array.isArray(block?.sections) && block.sections.length > 0) ||
    (Array.isArray(block?.points) && block.points.length > 0) ||
    (Array.isArray(block?.instructions) && block.instructions.length > 0) ||
    (Array.isArray(block?.details) && block.details.length > 0)
  );
}

function getTopInfo(productInformation = []) {
  const labels = [
    "Product Name",
    "Category",
    "Therapeutic Role",
    "Therapeutic Class",
    "CAS Number",
    "Molecular Weight",
  ];

  return productInformation.filter((item) => labels.includes(item.label));
}

export async function generateStaticParams() {
  return getAllActiveIngredients().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const ingredient = getActiveIngredientBySlug(slug);

  if (!ingredient) return { title: "Ingredient Not Found" };

  return {
    title: ingredient.metaTitle,
    description: ingredient.metaDescription,
    alternates: {
      canonical: `/active-ingredients/${ingredient.slug}`,
    },
    openGraph: {
      title: `${ingredient.name} | Active Ingredients`,
      description: ingredient.metaDescription,
      url: absoluteUrl(`/active-ingredients/${ingredient.slug}`),
      type: "article",
    },
  };
}

export default async function ActiveIngredientDetailPage({ params }) {
  const { slug } = await params;
  const ingredient = getActiveIngredientBySlug(slug);

  if (!ingredient) notFound();

  const contentBlocks = Object.values(ingredient.raw?.content || {}).filter(hasAnyRenderableField);
  const faqs = Array.isArray(ingredient.raw?.faqs) ? ingredient.raw.faqs : [];
  const topInfo = getTopInfo(ingredient.productInformation);

  return (
    <div className="bg-[#fff9f6] pb-12">
      <section className="border-b border-[#efd8cb] bg-gradient-to-r from-[#fff4ec] via-[#fff9f6] to-[#edf6ff]">
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <nav className="mb-5 flex items-center gap-2 text-sm text-[#7d5a47]">
            <Link href="/" className="hover:text-[#ec671f]">Home</Link>
            <span>/</span>
            <Link href="/active-ingredients" className="hover:text-[#ec671f]">Active Ingredients</Link>
            <span>/</span>
            <span className="font-semibold text-[#ec671f]">{ingredient.name}</span>
          </nav>

          <div className="grid items-center gap-8 lg:grid-cols-[280px_1fr]">
            <div className="mx-auto w-full max-w-[260px] rounded-2xl border border-[#f0d8ca] bg-white p-4 shadow-sm">
              <Image
                src="/product.png"
                alt={ingredient.name}
                width={500}
                height={500}
                className="h-auto w-full rounded-xl object-cover"
              />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0f3558]">Active Ingredient</p>
              <h1 className="mt-2 text-3xl font-bold text-[#1e1f22] sm:text-4xl">{ingredient.name}</h1>
              <p className="mt-4 max-w-4xl text-sm leading-relaxed text-[#4f433c] sm:text-base">
                {ingredient.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  href="/contact"
                  className="rounded-full bg-[#ec671f] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#d95f1d]"
                >
                  Inquire Now
                </Link>
                <Link
                  href="/active-ingredients"
                  className="rounded-full border border-[#d7c0b0] bg-white px-5 py-2 text-sm font-semibold text-[#2f2b29] transition-colors hover:border-[#ec671f] hover:text-[#ec671f]"
                >
                  Back to List
                </Link>
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
              {topInfo.map((item, idx) => (
                <div key={`${item.label}-${idx}`} className="px-5 py-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#0f3558]">{item.label}</p>
                  <p className="mt-1 text-sm text-[#2f2b29]">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {ingredient.productInformation.length > 0 ? (
          <div className="mt-5 overflow-hidden rounded-2xl border border-[#c9d9e6] bg-white shadow-sm">
            <div className="bg-[#0f3558] px-5 py-3 text-sm font-semibold text-white">Technical Information</div>
            <table className="min-w-full divide-y divide-[#d2dee9]">
              <tbody className="divide-y divide-[#d2dee9]">
                {ingredient.productInformation.map((item, idx) => (
                  <tr key={`${item.label}-${idx}`} className="bg-[#fbfdff]">
                    <td className="w-56 px-5 py-3 text-sm font-semibold text-[#0f3558]">{item.label}</td>
                    <td className="px-5 py-3 text-sm text-[#2e2e2e]">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        <div className="mt-5 space-y-4">
          {contentBlocks.map((block, blockIndex) => (
            <section
              key={`${block.title || "content"}-${blockIndex}`}
              className="rounded-2xl border border-[#ecd7ca] bg-white p-5 shadow-sm"
            >
              {block.title ? <h3 className="text-lg font-bold text-[#1e1e1e]">{block.title}</h3> : null}

              {block.description ? (
                <p className="mt-3 text-sm leading-relaxed text-[#4f433c]">{block.description}</p>
              ) : null}

              {Array.isArray(block.details) && block.details.length > 0 ? (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {block.details.map((item, itemIndex) => (
                    <div
                      key={`${block.title || blockIndex}-detail-${itemIndex}`}
                      className="rounded-xl border border-[#edf0f2] bg-[#fcfefe] p-3"
                    >
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#0f3558]">{item.label}</p>
                      <p className="mt-1 text-sm text-[#2f2b29]">{item.value}</p>
                    </div>
                  ))}
                </div>
              ) : null}

              {Array.isArray(block.sections) && block.sections.length > 0 ? (
                <div className="mt-3 space-y-2 text-sm leading-relaxed text-[#4f433c]">
                  {block.sections.map((line, index) => (
                    <p key={`${block.title || blockIndex}-section-${index}`}>{line}</p>
                  ))}
                </div>
              ) : null}

              {Array.isArray(block.points) && block.points.length > 0 ? (
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-[#4f433c] marker:text-[#ec671f]">
                  {block.points.map((point, index) => (
                    <li key={`${block.title || blockIndex}-point-${index}`}>{point}</li>
                  ))}
                </ul>
              ) : null}

              {Array.isArray(block.instructions) && block.instructions.length > 0 ? (
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-[#4f433c] marker:text-[#ec671f]">
                  {block.instructions.map((line, index) => (
                    <li key={`${block.title || blockIndex}-instruction-${index}`}>{line}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        {faqs.length > 0 ? (
          <section className="mt-5 rounded-2xl border border-[#ecd7ca] bg-white p-5 shadow-sm">
            <h3 className="text-lg font-bold text-[#1e1e1e]">Frequently Asked Questions</h3>
            <div className="mt-4 space-y-3">
              {faqs.map((faq, index) => (
                <details
                  key={`faq-${index}`}
                  className="group rounded-xl border border-[#e7d5c8] bg-[#fffaf6] p-4 transition-all hover:border-[#ec671f]/30"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-[#3b2f28]">
                    <span className="pr-3">{faq.question}</span>
                    <svg
                      className="h-4 w-4 text-[#ec671f] transition-transform group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-3 border-t border-[#eddccf] pt-3 text-sm leading-relaxed text-[#5a4a3e]">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        ) : null}
      </section>
    </div>
  );
}
