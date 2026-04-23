import Image from "next/image";

const facilityImages = [
  {
    src: "/analaytiacal%20laboratory.png",
    alt: "Analytical laboratory operations",
    title: "Analytical Laboratory",
    description: "Batch validation, stability checks, and specification testing.",
  },
  {
    src: "/gg.png",
    alt: "Production facility operations",
    title: "Production Facility",
    description: "Controlled environments for scalable formulation and packing.",
  },
];

export default function FacilitiesSection() {
  return (
    <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-[#241a14] sm:text-3xl">
          Our Facilities
        </h2>
        <p className="mt-2 text-[#5d4435]">
          Visual highlights from our quality and production ecosystem
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {facilityImages.map((image) => (
          <div
            key={image.title}
            className="group relative aspect-video overflow-hidden rounded-2xl"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <p className="text-sm font-bold sm:text-base">{image.title}</p>
              <p className="mt-1 text-xs text-white/90 sm:text-sm">
                {image.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
