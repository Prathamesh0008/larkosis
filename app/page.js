import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/product-card";
import { companyProfile } from "@/data/companyProfile";
import { getAllProducts, getCategoryCounts } from "@/lib/catalog";

export default function Home() {
  const products = getAllProducts();
  const categoryCounts = getCategoryCounts();
  const featuredProducts = products.slice(0, 6);

  // ✅ Working banner images from Pexels (free to use)
  const bannerImages = [
    {
      src: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Pharmaceutical laboratory with scientists",
      className: "object-center"
    },
    {
      src: "https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Medical research and development",
      className: "object-top"
    },
    {
      src: "https://images.pexels.com/photos/139398/thermometer-headache-pain-pills-139398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Pharmaceutical products",
      className: "object-center"
    }
  ];

  // ✅ Working video backgrounds from Coverr (free to use)
  const videoBackgrounds = [
    {
      src: "https://coverr.co/s3/mp4/Medical-Team-Working.mp4",
      type: "video/mp4",
      fallback: "Medical team working in hospital"
    },
    {
      src: "https://coverr.co/s3/mp4/Scientist-in-Laboratory.mp4", 
      type: "video/mp4",
      fallback: "Scientist working in laboratory"
    }
  ];

  // ✅ Hero video from Pexels
  const heroVideo = "https://videos.pexels.com/video-files/3195909/3195909-uhd_2560_1440_24fps.mp4";

  return (
    <div className="pb-14">
      {/* Hero Section with Video Background */}
      <section className="relative min-h-[700px] overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute h-full w-full object-cover"
            poster="https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          >
            <source src={heroVideo} type="video/mp4" />
            {/* Fallback text if video doesn't load */}
            Your browser does not support the video tag.
          </video>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1f1712]/90 via-[#1f1712]/70 to-[#1f1712]/30" />
        </div>

        {/* Animated Elements */}
        <div className="absolute -left-14 top-24 h-52 w-52 rounded-full bg-[#f4b083]/30 blur-3xl animate-float-a" />
        <div className="absolute right-0 top-14 h-64 w-64 rounded-full bg-[#ec671f]/20 blur-3xl animate-float-b" />
        
        {/* Content */}
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
              {companyProfile.overview}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="rounded-xl bg-[#ec671f] px-5 py-3 text-sm font-bold text-white hover:bg-[#d85f1d] transition-all hover:scale-105"
              >
                Explore Products
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm hover:bg-white/20 transition-all"
              >
                Contact Team
              </Link>
              <a
                href={companyProfile.documents.productListPdf}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/30 bg-white/5 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm hover:bg-white/10 transition-all"
              >
                Download Product PDF
              </a>
            </div>

            <div className="mt-7 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
              <article className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-sm">
                <p className="text-2xl font-bold text-white">{products.length}+</p>
                <p className="text-xs uppercase tracking-[0.12em] text-white/80">
                  Product Entries
                </p>
              </article>
              <article className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-sm">
                <p className="text-2xl font-bold text-white">{categoryCounts.length}</p>
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

      {/* Banner Images Grid Section */}
      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bannerImages.map((image, index) => (
            <div key={index} className="group relative h-64 overflow-hidden rounded-2xl">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className={`object-cover transition-transform duration-500 group-hover:scale-110 ${image.className}`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h3 className="text-lg font-bold">{image.alt}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Video Showcase Section */}
      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-[#241a14] sm:text-3xl">
            Our Facilities
          </h2>
          <p className="mt-2 text-[#5d4435]">
            Take a virtual tour of our state-of-the-art pharmaceutical facilities
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {videoBackgrounds.map((video, index) => (
            <div key={index} className="relative aspect-video overflow-hidden rounded-2xl">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
                poster="https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              >
                <source src={video.src} type={video.type} />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <p className="text-sm font-bold">{video.fallback}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rest of your sections remain the same */}
      {/* Therapeutic Coverage Section */}
      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#efd1bb] bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-[#271b14] sm:text-3xl">
            Therapeutic Coverage
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#5d4435]">
            We support broad pharmaceutical segments from anti-infectives and
            oncology to ophthalmic and cardio-vascular portfolios.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {categoryCounts.slice(0, 12).map((item) => (
              <span
                key={item.name}
                className="rounded-full border border-[#f1d5c3] bg-[#fff7f1] px-3 py-1 text-xs font-semibold text-[#7d4f33]"
              >
                {item.name} ({item.count})
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end sm:gap-4">
          <h2 className="text-2xl font-bold text-[#241a14] sm:text-3xl">
            Featured Products
          </h2>
          <Link
            href="/products"
            className="text-sm font-bold text-[#d85f1d] underline underline-offset-4"
          >
            View Full Catalog
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}