"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export default function PharmaHeroTabs({ casValue, introText, indicationsText, maintenanceText }) {
  const tabs = useMemo(
    () => [
      { key: "introduction", label: "Introduction", text: introText },
      { key: "indications", label: "Indications", text: indicationsText },
      { key: "maintenance", label: "Maintenance", text: maintenanceText },
    ],
    [introText, indicationsText, maintenanceText],
  );
  const [active, setActive] = useState("introduction");
  const activeTab = tabs.find((item) => item.key === active) || tabs[0];

  const hasCas = String(casValue || "").trim().length > 0;

  return (
    <div className="mt-5">
      {hasCas ? (
        <div className="max-w-[220px] rounded-md border border-[#d7e3ef] bg-[#f9f6f4] px-3 py-2">
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#5a6f86]">CAS</p>
          <p className="mt-0.5 text-sm font-semibold leading-tight text-[#0f2f57]">{casValue}</p>
        </div>
      ) : null}

      <div className={`${hasCas ? "mt-4" : "mt-0"} border-b border-[#dfe7f0]`}>
        <div className="flex flex-wrap gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActive(tab.key)}
              className={`cursor-pointer border-b-2 pb-2 text-lg font-medium transition-colors ${
                active === tab.key
                  ? "border-[#14a6bf] text-[#14a6bf]"
                  : "border-transparent text-[#667389] hover:text-[#1d4f91]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-4 text-base leading-relaxed text-[#334155]">{activeTab?.text || introText}</p>

      <Link
        href="/contact"
        className="mt-5 inline-flex items-center rounded-lg bg-gradient-to-r from-[#ff7a00] to-[#ee006e] px-5 py-2.5 text-base font-semibold text-white transition-opacity hover:opacity-90"
      >
        Request Quote
      </Link>
    </div>
  );
}
