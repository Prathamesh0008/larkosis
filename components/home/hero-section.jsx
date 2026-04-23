import Image from "next/image";
import Link from "next/link";

const heroImage = {
  src: "/quality%20system.jpg",
  alt: "Pharmaceutical quality system and inspection workflow",
};

export default function HeroSection({ companyOverview, productCount, categoryCount, productListPdf }) {
  return (
    <section className="relative min-h-[700px] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1f1712]/90 via-[#1f1712]/70 to-[#1f1712]/30" />
      </div>

      <div className="absolute -left-14 top-24 h-52 w-52 rounded-full bg-[#f4b083]/30 blur-3xl animate-float-a" />
      <div className="absolute right-0 top-14 h-64 w-64 rounded-full bg-[#ec671f]/20 blur-3xl animate-float-b" />

      <div className="relative z-10 mx-auto flex min-h-[700px] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl animate-fade-up text-white">
          <p className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
            Larkosis Pharma
          </p>
          <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Trusted Global
            <span className="text-[#ff9f4b]"> Pharmaceutical Excellence</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
            {companyOverview}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="rounded-xl bg-[#ec671f] px-5 py-3 text-sm font-bold text-white transition-all hover:scale-105 hover:bg-[#d85f1d]"
            >
              Explore Products
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              Contact Team
            </Link>
            <a
              href={productListPdf}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/30 bg-white/5 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10"
            >
              Download Product PDF
            </a>
          </div>

          <div className="mt-7 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
            <article className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-sm">
              <p className="text-2xl font-bold text-white">{productCount}+</p>
              <p className="text-xs uppercase tracking-[0.12em] text-white/80">
                Product Entries
              </p>
            </article>
            <article className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-sm">
              <p className="text-2xl font-bold text-white">{categoryCount}</p>
              <p className="text-xs uppercase tracking-[0.12em] text-white/80">
                Categories
              </p>
            </article>
            <article className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-sm">
              <p className="text-2xl font-bold text-white">24x7</p>
              <p className="text-xs uppercase tracking-[0.12em] text-white/80">
                Quote Support
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
