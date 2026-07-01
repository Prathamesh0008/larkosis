"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function MicroscopeIcon() {
  return (
    <svg className="h-[60px] w-[60px] text-[#19a6b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 21h10M9 17h6M10 3l2 5m0 0 2.5-1.5M12 8l-3 1.8m3-1.8L15 15m-6 6a5 5 0 0 1 5-5h4a3 3 0 0 1 0 6H9Z" />
    </svg>
  );
}

function FactoryIcon() {
  return (
    <svg className="h-[60px] w-[60px] text-[#19a6b5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 21h18M5 21V9l5 3V9l5 3V5l4 2v14M9 21v-4m4 4v-3m4 3v-5" />
    </svg>
  );
}

export default function IvexiaResearchManufacturing({ companyProfile }) {
  const [activeTab, setActiveTab] = useState("research");

  const tabs = [
    { key: "research", label: "Research" },
    { key: "manufacturing", label: "Manufacturing" },
  ];

  const content = {
    research: {
      title: "Research & Development",
      desc: companyProfile.research,
      icon: <MicroscopeIcon />,
      img: "/analaytiacal laboratory.png",
    },
    manufacturing: {
      title: "Manufacturing Excellence",
      desc: companyProfile.manufacturing,
      icon: <FactoryIcon />,
      img: "/manufacturing image.jpg",
    },
  };

  const active = content[activeTab];

  return (
    <section className="relative overflow-hidden bg-white px-6 py-20 md:px-16">
      <div className="mb-10 flex justify-center">
        <div className="flex overflow-hidden rounded-full bg-gray-100 shadow-inner">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`flex cursor-pointer items-center gap-2 px-5 py-3 text-sm font-medium transition-all duration-300 md:px-8 md:text-base ${
                activeTab === tab.key
                  ? "bg-gradient-to-r from-[#FF7A00] to-[#E2004F] text-white"
                  : "text-gray-600 hover:text-[#0d2d47]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div>
          <div className="mb-6">{active.icon}</div>

          <h3 className="mb-4 text-3xl font-bold text-[#0d2d47] md:text-4xl">
            {active.title}
          </h3>

          <p className="mb-6 text-sm leading-relaxed text-gray-600 md:text-base">
            {active.desc}
          </p>

          <Link
            href="/about"
            className="inline-block rounded-md bg-gradient-to-r from-[#FF7A00] to-[#E2004F] px-6 py-3 font-medium text-white transition hover:opacity-90"
          >
            Explore
          </Link>
        </div>

        <div className="relative overflow-hidden rounded-2xl shadow-lg">
          <Image
            src={active.img}
            alt={active.title}
            width={1200}
            height={900}
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-30" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#FF7A00] via-[#E2004F] to-[#19a6b5]" />
    </section>
  );
}
