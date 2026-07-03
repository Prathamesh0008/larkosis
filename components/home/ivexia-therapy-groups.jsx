"use client";

import { useLanguage } from "@/contexts/LanguageContext";

const therapies = [
  { icon: "💓", key: "cardiology" },
  { icon: "🧬", key: "oncology" },
  { icon: "🧠", key: "neurology" },
  { icon: "🩺", key: "endocrinology" },
  { icon: "🧴", key: "dermatology" },
];

export default function IvexiaTherapyGroups() {
  const { translations } = useLanguage();
  const therapy = translations?.therapy || {};

  return (
    <section className="relative bg-[#fff8f4] py-20 md:py-24">
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#ec671f] to-[#f08d3d]" />

      <div className="mb-14 px-4 text-center">
        <h2 className="mb-3 text-3xl font-bold text-[#222] md:text-4xl">
          {therapy.title || "Therapy Groups"}
        </h2>

        <p className="mx-auto max-w-3xl text-sm leading-relaxed text-gray-600 md:text-base">
          <span className="font-semibold text-[#ec671f]">
            {therapy.highlight || "Quality, Innovation & Health -"}
          </span>{" "}
          {therapy.subtitle ||
            "At Ivexia, we advance precision-based therapies across multiple domains to redefine global healthcare."}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 px-6 md:gap-6 md:px-20 lg:flex lg:flex-wrap lg:items-stretch lg:justify-center lg:gap-8">
        {therapies.map((item) => (
          <div
            key={item.key}
            className="group relative w-full rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-md transition-all duration-500 hover:-translate-y-2 hover:border-transparent hover:shadow-xl lg:w-[300px] lg:p-8 xl:w-[360px]"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#ec671f]/10 to-[#f08d3d]/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative z-10 flex h-full flex-col items-center justify-between">
              <div className="mb-3 text-4xl transition-transform duration-500 group-hover:scale-110 lg:mb-4 lg:text-6xl">
                {item.icon}
              </div>

              <h3 className="mb-2 text-base font-semibold text-[#222] transition-colors duration-300 group-hover:text-[#ec671f] lg:text-lg">
                {therapy?.[item.key]?.title || item.key}
              </h3>

              <p className="text-xs leading-relaxed text-gray-600 lg:text-sm">
                {therapy?.[item.key]?.desc || ""}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
