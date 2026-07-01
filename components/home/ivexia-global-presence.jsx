"use client";

import { useState } from "react";

const regions = [
  {
    id: "asia",
    label: "Asia",
    paragraphs: [
      "Positive regulatory trends are helping many Asian countries integrate into global markets and accelerating demand for advanced healthcare solutions.",
      "Across East Asia, ASEAN and South Asian markets, Larksois continues expanding access with affordable and export-ready formulations.",
    ],
  },
  {
    id: "africa",
    label: "Africa",
    paragraphs: [
      "A focused regional strategy and dedicated execution continue to strengthen market adaptation across the African region.",
      "With expanding distribution across East, West, North and Southern Africa, growth remains consistent in both large and emerging markets.",
    ],
  },
  {
    id: "latin-america",
    label: "Latin America",
    paragraphs: [
      "Latin America presents a strong mix of established and fast-rising markets where localized strategy drives long-term growth.",
      "Country-specific adaptation helps us deliver quality, cost-effective healthcare solutions with reliability and speed.",
    ],
  },
  {
    id: "middle-east",
    label: "Middle East",
    paragraphs: [
      "The Middle East remains strategically important due to improving regulatory ecosystems and healthcare modernization.",
      "By aligning with regional procurement models and distributor networks, we are expanding reliable access to essential therapies.",
    ],
  },
  {
    id: "europe",
    label: "Europe",
    paragraphs: [
      "Europe continues to offer stable, compliance-driven markets with strong demand for quality pharmaceutical products.",
      "Our focus is on long-term partnerships, supply reliability, and differentiated portfolio positioning across mature channels.",
    ],
  },
];

const regionDotPositions = {
  asia: "left-[72%] top-[34%]",
  africa: "left-[54%] top-[55%]",
  "latin-america": "left-[30%] top-[62%]",
  "middle-east": "left-[60%] top-[42%]",
  europe: "left-[52%] top-[30%]",
};

export default function IvexiaGlobalPresence() {
  const [activeId, setActiveId] = useState("asia");
  const activeRegion = regions.find((item) => item.id === activeId) || regions[0];

  return (
    <section className="bg-white px-4 py-16 md:px-6 lg:px-8">
      <div className="mx-auto max-w-[980px]">
        <h2 className="mb-8 text-3xl font-bold text-[#0d2d47] md:text-4xl">
          Global Presence
        </h2>

        <div className="grid items-center gap-6 rounded-[8px] bg-[#FFF8F5] px-[18px] py-6 md:grid-cols-[190px_1fr_300px]">
          <nav className="border-[#0d2d4726] md:border-r md:py-5" aria-label="Region selector">
            {regions.map((region) => {
              const selected = activeId === region.id;

              return (
                <button
                  key={region.id}
                  type="button"
                  onClick={() => setActiveId(region.id)}
                  className={`block w-full border-b border-[#0d2d4726] px-3 py-2.5 text-left text-[#0d2d47] transition ${
                    selected
                      ? "border-2 border-[#ff7a00] bg-gradient-to-r from-[rgba(255,122,0,0.15)] to-[rgba(226,0,79,0.1)]"
                      : "hover:bg-[rgba(255,122,0,0.1)]"
                  } ${region === regions[0] ? "border-t" : ""}`}
                >
                  {region.label}
                </button>
              );
            })}
          </nav>

          <article className="max-w-[520px]">
            {activeRegion.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="mb-[14px] text-lg font-normal leading-[1.55] text-[#0d2d47]"
              >
                {paragraph}
              </p>
            ))}
          </article>

          <div className="flex justify-center md:justify-end">
            <div className="relative h-[280px] w-[280px] overflow-hidden rounded-full bg-[radial-gradient(circle,_#f3f7fb,_#e6eef7)] shadow-[0_20px_30px_rgba(13,45,71,0.15)] md:h-[350px] md:w-[350px]">
              <div className="absolute inset-[12%] rounded-full border border-[#b3bac4]/45" />
              <div className="absolute inset-[24%] rounded-full border border-[#b3bac4]/35" />
              <div className="absolute inset-[36%] rounded-full border border-[#b3bac4]/25" />

              <div className="absolute inset-0 opacity-70">
                <div className="absolute left-[20%] top-[28%] h-[22%] w-[26%] rounded-[45%] bg-[#b5bac1]" />
                <div className="absolute left-[45%] top-[22%] h-[18%] w-[18%] rounded-[45%] bg-[#b5bac1]" />
                <div className="absolute left-[52%] top-[38%] h-[28%] w-[22%] rounded-[45%] bg-[#b5bac1]" />
                <div className="absolute left-[28%] top-[54%] h-[18%] w-[18%] rounded-[45%] bg-[#b5bac1]" />
                <div className="absolute left-[62%] top-[66%] h-[10%] w-[10%] rounded-full bg-[#b5bac1]" />
              </div>

              {regions.map((region) => {
                const active = region.id === activeId;

                return (
                  <button
                    key={region.id}
                    type="button"
                    aria-label={region.label}
                    onClick={() => setActiveId(region.id)}
                    className={`absolute ${regionDotPositions[region.id]} h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition ${
                      active
                        ? "border-[#EC5135] bg-[#ff9913] shadow-[0_0_0_6px_rgba(255,122,0,0.18)]"
                        : "border-white bg-[#0d2d47]"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
