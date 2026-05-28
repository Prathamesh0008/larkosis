import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { absoluteUrl } from "@/lib/seo";
import GoToTopButton from "@/components/go-to-top-button";
import ActiveIngredientSectionNav from "@/components/active-ingredient-section-nav";
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
      title: `${ingredient.name} | Active Pharmaceutical Ingredients`,
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
  const blockNav = contentBlocks
    .map((block, index) => ({
      id: `block-${index + 1}`,
      title: block.title || `Section ${index + 1}`,
    }))
    .filter((item) => item.title);

  return (
    <div id="page-top" className="bg-[#f3f6fb] pb-12 pt-8">
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#dbe4f0] sm:p-8">
          <div className="border-b border-[#e6ecf4] px-6 py-4 sm:px-8">
            <nav className="flex items-center gap-2 text-sm text-[#6c7b8d]">
            <Link href="/" className="hover:text-[#ec671f]">Home</Link>
            <span>/</span>
              <Link href="/active-ingredients" className="hover:text-[#ec671f]">Active Pharmaceutical Ingredients</Link>
            <span>/</span>
              <span className="truncate font-semibold text-[#1d4f91]">{ingredient.name}</span>
          </nav>
          </div>

          <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
            <div className="flex min-h-[320px] items-center justify-center rounded-xl bg-[#f7faff] p-4 ring-1 ring-[#e2eaf5]">
              <Image
                src="/product.png"
                alt={ingredient.name}
                width={700}
                height={520}
                className="h-auto w-full rounded-lg object-contain"
              />
            </div>

            <div>
              <h1 className="mt-3 text-3xl font-bold leading-tight text-[#102a4c] sm:text-4xl">{ingredient.name}</h1>
              <p className="mt-4 max-w-4xl text-sm leading-relaxed text-[#475569] sm:text-base">
                {ingredient.description}
              </p>

              {topInfo.length > 0 ? (
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {topInfo.slice(0, 4).map((item, idx) => (
                    <div key={`${item.label}-${idx}`} className="rounded-lg bg-[#f7faff] p-3 ring-1 ring-[#dfe8f4]">
                      <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#5c7390]">{item.label}</p>
                      <p className="mt-1 text-sm font-semibold text-[#0f172a]">{item.value}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-6 grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[220px_1fr] lg:px-8">
        <aside className="hide-scrollbar h-fit rounded-xl bg-white p-4 shadow-sm ring-1 ring-[#dbe4f0] lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
          <ActiveIngredientSectionNav sections={blockNav} includeFaq={faqs.length > 0} />
        </aside>

        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-[#dbe4f0] sm:p-6">
          <div className="space-y-0">
            {topInfo.length > 0 ? (
              <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.1em] text-[#2c4f76]">Key Information</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {topInfo.map((item, idx) => (
                  <div key={`${item.label}-${idx}`} className="rounded-lg bg-[#f7faff] p-3 ring-1 ring-[#dfe8f4]">
                    <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#5c7390]">{item.label}</p>
                    <p className="mt-1 text-sm font-semibold text-[#102a4c]">{item.value}</p>
                  </div>
                ))}
              </div>
              </div>
            ) : null}

            {ingredient.productInformation.length > 0 ? (
              <div className="mt-6 overflow-hidden border-t border-[#e3ebf5] pt-6">
                <div className="border-b border-[#dfe8f4] bg-[#f7fbff] px-5 py-3 text-sm font-bold uppercase tracking-[0.1em] text-[#2f5379]">
                Technical Information
              </div>
              <table className="min-w-full divide-y divide-[#e3ebf5]">
                <tbody className="divide-y divide-[#e3ebf5]">
                  {ingredient.productInformation.map((item, idx) => (
                    <tr key={`${item.label}-${idx}`} className="bg-white odd:bg-[#fbfdff]">
                      <td className="w-56 px-5 py-3 text-sm font-semibold text-[#0f3558]">{item.label}</td>
                      <td className="px-5 py-3 text-sm text-[#2e3b4d]">{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            ) : null}

            <div className="mt-6 space-y-0 border-t border-[#e3ebf5] pt-6">
              {contentBlocks.map((block, blockIndex) => (
                <section
                  id={`block-${blockIndex + 1}`}
                  key={`${block.title || "content"}-${blockIndex}`}
                  className={`scroll-mt-24 ${blockIndex > 0 ? "mt-6 border-t border-[#e3ebf5] pt-6" : ""}`}
                >
                  {block.title ? (
                    <>
                      <h3 className="text-xl font-bold text-[#0f2f57]">{block.title}</h3>
                    </>
                  ) : null}

                  {block.description ? (
                    <p className="mt-3 text-sm leading-relaxed text-[#475569]">{block.description}</p>
                  ) : null}

                  {Array.isArray(block.details) && block.details.length > 0 ? (
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {block.details.map((item, itemIndex) => (
                        <div
                          key={`${block.title || blockIndex}-detail-${itemIndex}`}
                          className="rounded-lg bg-[#f7faff] p-3 ring-1 ring-[#dfe8f4]"
                        >
                          <p className="text-xs font-semibold uppercase tracking-wider text-[#325a84]">{item.label}</p>
                          <p className="mt-1 text-sm text-[#1f2d3b]">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {Array.isArray(block.sections) && block.sections.length > 0 ? (
                    <div className="mt-3 space-y-2 text-sm leading-relaxed text-[#475569]">
                      {block.sections.map((line, index) => (
                        <p key={`${block.title || blockIndex}-section-${index}`}>{line}</p>
                      ))}
                    </div>
                  ) : null}

                  {Array.isArray(block.points) && block.points.length > 0 ? (
                    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-[#475569] marker:text-[#ec671f]">
                      {block.points.map((point, index) => (
                        <li key={`${block.title || blockIndex}-point-${index}`}>{point}</li>
                      ))}
                    </ul>
                  ) : null}

                  {Array.isArray(block.instructions) && block.instructions.length > 0 ? (
                    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-[#475569] marker:text-[#ec671f]">
                      {block.instructions.map((line, index) => (
                        <li key={`${block.title || blockIndex}-instruction-${index}`}>{line}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>

            {faqs.length > 0 ? (
              <section id="faq" className="mt-6 border-t border-[#e3ebf5] pt-6">
                <h3 className="text-xl font-bold text-[#0f2f57]">Frequently Asked Questions</h3>
                <p className="mt-1 text-sm text-[#64748b]">Click any question to expand the answer.</p>
                <div className="mt-4 space-y-3">
                  {faqs.map((faq, index) => (
                    <details
                      key={`faq-${index}`}
                      className="group rounded-lg bg-[#f7faff] p-4 ring-1 ring-[#dde6f3]"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-[#0f172a]">
                        <span className="pr-3">{faq.question}</span>
                        <span className="text-[#1d4f91] group-open:hidden">+</span>
                        <span className="hidden text-[#1d4f91] group-open:block">-</span>
                      </summary>
                      <div className="grid grid-rows-[0fr] transition-all duration-300 ease-in-out group-open:grid-rows-[1fr]">
                        <div className="overflow-hidden">
                          <p className="mt-3 border-t border-[#dbe4f0] pt-3 text-sm leading-relaxed text-[#334155]">
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
        </div>
      </section>
      <GoToTopButton />
    </div>
  );
}
