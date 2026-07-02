"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function AboutLabsCarousel({ labImages }) {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || isHovered) return;

    const interval = window.setInterval(() => {
      const maxScrollLeft = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScrollLeft - 1) {
        container.scrollLeft = 0;
        return;
      }

      container.scrollLeft += 1;
    }, 15);

    return () => window.clearInterval(interval);
  }, [isHovered]);

  return (
    <div
      ref={scrollRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex gap-6 overflow-x-auto px-1 pb-4"
    >
      {labImages.map((img, index) => (
        <div
          key={img}
          className="min-w-[280px] overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl sm:min-w-[300px]"
        >
          <div className="relative h-[200px] overflow-hidden sm:h-[220px]">
            <Image
              src={img}
              fill
              alt={`Larksois lab ${index + 1}`}
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="p-4 sm:p-6">
            <h3 className="text-base font-semibold text-[#241913] sm:text-lg">
              Lab Facility {index + 1}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-[#5f4638] sm:text-sm">
              Research-oriented lab environments designed to support testing,
              evaluation, and quality confidence.
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
