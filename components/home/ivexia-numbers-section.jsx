"use client";

import { useEffect, useState } from "react";

function Counter({ target, label, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= target) {
        clearInterval(timer);
        start = target;
      }

      setCount(Math.floor(start));
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="flex flex-col items-center text-center">
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
  const stats = [
    { target: 500, label: "Global Employees", suffix: "+" },
    { target: productCount, label: "Finished Products", suffix: "+" },
    { target: 15, label: "Countries Served", suffix: "+" },
    { target: categoryCount, label: "Product Categories" },
    { target: therapeuticCount, label: "Therapy Segments" },
  ];

  return (
    <section className="bg-[#fff8f4] py-16 md:py-20">
      <h2 className="mb-10 text-center text-3xl font-bold text-[#333] md:text-4xl">
        Larksois in Numbers
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
