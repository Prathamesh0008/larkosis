"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const partners = [
  {
    name: "Biopeptide",
    logo: "/brandlogos/B.png",
    href: "https://www.bio-peptides.com/",
  },
  {
    name: "ED Pharma",
    logo: "/brandlogos/Ed_5.png",
    href: "https://edpharma.co/",
  },
  {
    name: "Larksois Pharma",
    logo: "/brandlogos/larkoo.png",
    href: "https://larksoispharma.com/",
  },
  {
    name: "Nova Techsciences",
    logo: "/brandlogos/Nova.png",
    href: "https://www.novatechsciences.com/",
  },
  {
    name: "Ajanta Pharma",
    logo: "/brandlogos/Ajanta-Pharma.png",
    href: null,
  },
];

export default function AboutPartnersStrip() {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const marqueePartners = [...partners, ...partners];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || isHovered) return;

    const interval = window.setInterval(() => {
      const halfway = container.scrollWidth / 2;

      if (container.scrollLeft >= halfway) {
        container.scrollLeft = 0;
        return;
      }

      container.scrollLeft += 1;
    }, 16);

    return () => window.clearInterval(interval);
  }, [isHovered]);

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#ec671f] md:text-sm">
            Global Network
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#241913] md:text-4xl">
            Brands We Partner With
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#5f4638] md:text-base">
            Larksois supports pharmaceutical companies and distributors with
            dependable manufacturing, documentation, and export partnership.
          </p>
        </div>

        <div className="mt-12 overflow-hidden">
          <div
            ref={scrollRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex gap-8 overflow-x-auto px-1 pb-4"
          >
            {marqueePartners.map((partner, index) => {
              const CardTag = partner.href ? "a" : "div";

              return (
                <CardTag
                  key={`${partner.name}-${index}`}
                  href={partner.href || undefined}
                  target={partner.href ? "_blank" : undefined}
                  rel={partner.href ? "noopener noreferrer" : undefined}
                  aria-label={partner.name}
                  className="group flex min-w-[340px] items-center justify-center rounded-[28px] border border-[#ec671f]/15 bg-[#fff8f4] px-6 py-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md md:min-w-[420px]"
                >
                  <div className="relative h-[78px] w-full md:h-[100px] lg:h-[84px]">
                    <Image
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      fill
                      className="object-contain object-center transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </CardTag>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
