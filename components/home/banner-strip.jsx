import Image from "next/image";

const bannerImages = [
  {
    src: "/manufacturing%20image.jpg",
    alt: "Pharmaceutical production and manufacturing setup",
    className: "object-center",
    label: "Manufacturing",
  },
  {
    src: "/product.png",
    alt: "Pharmaceutical product portfolio",
    className: "object-center",
    label: "Product Portfolio",
  },
  {
    src: "/quality%20system.jpg",
    alt: "Pharmaceutical quality systems and inspection",
    className: "object-center",
    label: "Quality Systems",
  },
];

export default function BannerStrip() {
  return (
    <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {bannerImages.map((image) => (
          <div key={image.alt} className="group relative h-64 overflow-hidden rounded-2xl">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className={`object-cover transition-transform duration-500 group-hover:scale-110 ${image.className}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/90">
                {image.label}
              </p>
              <h3 className="text-base font-bold sm:text-lg">{image.alt}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
