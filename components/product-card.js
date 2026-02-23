import Link from "next/link";
import { buildQuoteMailto } from "@/lib/catalog";

export default function ProductCard({ product }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-[#f0d2bf] bg-white p-5 shadow-[0_10px_22px_rgba(165,76,31,0.08)] transition hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(165,76,31,0.14)]">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8e4b27]">
        {product.category}
      </p>
      <h3 className="mt-2 line-clamp-2 text-lg font-semibold text-[#2a1c15]">
        <Link href={`/products/${product.slug}`}>{product.name}</Link>
      </h3>
      <dl className="mt-3 space-y-1 text-sm text-[#614534]">
        <div>
          <dt className="inline font-semibold text-[#3a271c]">Strength:</dt>{" "}
          <dd className="inline">{product.strength}</dd>
        </div>
        <div>
          <dt className="inline font-semibold text-[#3a271c]">Form:</dt>{" "}
          <dd className="inline">{product.dosageForm}</dd>
        </div>
      </dl>
      <p className="mt-3 line-clamp-3 text-sm text-[#735240]">
        {product.details}
      </p>
      <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
        <Link
          href={`/products/${product.slug}`}
          className="rounded-xl border border-[#e8c8b2] px-3 py-2 text-center text-sm font-semibold text-[#844a2b] transition hover:bg-[#fff5ee]"
        >
          View Details
        </Link>
        <a
          href={buildQuoteMailto(product.name)}
          className="rounded-xl bg-[#00923f] px-3 py-2 text-center text-sm font-semibold text-white transition hover:bg-[#007e35]"
        >
          Get Quote
        </a>
      </div>
    </article>
  );
}
