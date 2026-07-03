"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

function Counter({ target, label, suffix = "" }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    let frameId = null;
    const duration = 1600;
    const startTime = performance.now();

    const animate = (timestamp) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextValue = progress >= 1 ? target : Math.floor(eased * target);
      setCount(nextValue);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      setCount(target);
    };
  }, [started, target]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <h2 className="bg-gradient-to-r from-[#ec671f] to-[#f4b083] bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
        {count}
        {suffix}
      </h2>
      <p className="mt-2 font-medium text-gray-700">{label}</p>
    </div>
  );
}

export default function IvexiaNumbersSection({
  productCount,
  categoryCount,
  therapeuticCount,
}) {
  const { translations } = useLanguage();

  const stats = [
    {
      target: 500,
      label: translations?.ivexia_numbers?.employees || "Global Employees",
      suffix: "+",
    },
    {
      target: productCount,
      label: translations?.ivexia_numbers?.products || "Finished Products",
      suffix: "+",
    },
    {
      target: 15,
      label: translations?.ivexia_numbers?.countries || "Countries Served",
      suffix: "+",
    },
    {
      target: categoryCount,
      label: translations?.ivexia_numbers?.facilities || "Product Categories",
    },
    {
      target: therapeuticCount,
      label: translations?.ivexia_numbers?.rnd || "Therapy Segments",
    },
  ];

  return (
    <section className="bg-[#fff8f4] py-16 md:py-20">
      <h2 className="mb-10 text-center text-3xl font-bold text-[#333] md:text-4xl">
        {translations?.ivexia_numbers?.title || "Larksois in Numbers"}
      </h2>

      <div className="grid grid-cols-2 gap-8 px-8 md:grid-cols-5 md:px-20">
        {stats.map((item) => (
          <Counter
            key={item.label}
            target={item.target}
            label={item.label}
            suffix={item.suffix}
          />
        ))}
      </div>
    </section>
  );
}
