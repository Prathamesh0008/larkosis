"use client";

import { useEffect, useRef, useState } from "react";

function AnimatedNumber({ value, suffix = "", duration = 1600 }) {
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
      { threshold: 0.45 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    let startTime = null;
    let frameId = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [duration, started, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function AboutStats({ productCount, categoryCount }) {
  const stats = [
    { value: 15, suffix: "+", label: "Years Of Focus" },
    { value: 25, suffix: "+", label: "Business Partners" },
    { value: productCount, suffix: "+", label: "Products" },
    { value: categoryCount, suffix: "", label: "Core Categories" },
  ];

  return (
    <div className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="px-4 text-center">
        
          <div className="text-4xl font-bold tracking-tight text-[#241913] sm:text-5xl md:text-6xl">
            <AnimatedNumber value={stat.value} suffix={stat.suffix} />
          </div>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#8c6e5c]">
            {stat.label}
          </p>
          <div className="mx-auto mt-4 h-[2px] w-10 bg-[#ec671f]" />
        </div>
      ))}
    </div>
  );
}
