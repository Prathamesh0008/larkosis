"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function MicroscopeIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-[60px] w-[60px] text-[#ec671f]"
      fill="currentColor"
      viewBox="0 0 64 64"
    >
      <path d="M26 6a5 5 0 0 1 10 0v1h1a4 4 0 0 1 4 4v25a4 4 0 0 1-4 4h-1v1a5 5 0 0 1-10 0v-1h-1a4 4 0 0 1-4-4V11a4 4 0 0 1 4-4h1V6Z" />
      <path d="M39 20h3c12.15 0 22 9.85 22 22 0 6.08-2.47 11.58-6.45 15.56H61a4 4 0 0 1 0 8H8a4 4 0 0 1 0-8h34c7.73 0 14-6.27 14-14s-6.27-14-14-14h-3v-9Z" />
      <path d="M20 47h22a4 4 0 0 1 0 8H20a4 4 0 0 1 0-8Z" />
    </svg>
  );
}

function FactoryIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-[60px] w-[60px] text-[#ec671f]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 21h18" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 21V10l5 3v-3l5 3V6h4v15" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 17h2m3 0h2" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 6V3h4v3" />
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
                  ? "bg-gradient-to-r from-[#ec671f] to-[#f4b083] text-white"
                  : "text-gray-600 hover:text-[#241a14]"
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

          <h3 className="mb-4 text-3xl font-bold text-[#271b14] md:text-4xl">
            {active.title}
          </h3>

          <p className="mb-6 text-sm leading-relaxed text-gray-600 md:text-base">
            {active.desc}
          </p>

          <Link
            href="/about"
            className="inline-block rounded-md bg-gradient-to-r from-[#ec671f] to-[#f4b083] px-6 py-3 font-medium text-white transition hover:opacity-90"
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

    </section>
  );
}
