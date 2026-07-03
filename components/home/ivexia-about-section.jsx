"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function IvexiaAboutSection({ companyProfile }) {
  const { translations } = useLanguage();
  const about = translations?.about?.video;

  return (
    <section className="relative h-[80vh] overflow-hidden md:h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/manufacturing image.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex h-full items-center px-6 text-white md:px-16">
        <div className="max-w-3xl">
          <h2 className="mb-4 text-4xl font-bold md:text-6xl">
            {about?.title || "About Larksois Pharma"}
          </h2>

          <p className="mb-6 text-lg text-gray-200 md:text-xl">
            {about?.subtitle ||
              "Global Vision. Scientific Excellence. Delivering reliable pharmaceutical solutions across international markets."}
          </p>

          <p className="mb-6 text-lg text-gray-300 md:text-xl">
            {about?.paragraph ||
              `${companyProfile.overview} ${companyProfile.marketFocus}`}
          </p>

          <Link
            href="/about"
            className="rounded-md bg-gradient-to-r from-[#ec671f] to-[#f4b083] px-6 py-3 font-semibold shadow-lg transition hover:opacity-90"
          >
            {about?.cta || "Explore More"}
          </Link>
        </div>
      </div>
    </section>
  );
}
