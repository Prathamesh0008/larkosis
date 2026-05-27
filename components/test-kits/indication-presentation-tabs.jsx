"use client";

import { useMemo, useState } from "react";

function toText(value) {
  if (value == null) return "None";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    const text = String(value).trim();
    return text || "None";
  }
  if (Array.isArray(value)) {
    return value.map((item) => toText(item)).filter(Boolean).join(", ");
  }
  if (typeof value === "object") {
    return Object.entries(value)
      .map(([k, v]) => `${k}: ${toText(v)}`)
      .join(", ");
  }
  return "None";
}

function renderBlock(value) {
  if (Array.isArray(value)) {
    return (
      <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[#334155]">
        {value.map((item, idx) => (
          <li key={idx}>{toText(item)}</li>
        ))}
      </ul>
    );
  }

  if (value && typeof value === "object") {
    return (
      <div className="space-y-2">
        {Object.entries(value).map(([key, val]) => (
          <p key={key} className="text-sm leading-relaxed text-[#334155]">
            <span className="font-semibold text-[#0f172a]">{key}: </span>
            <span>{toText(val)}</span>
          </p>
        ))}
      </div>
    );
  }

  return <p className="text-sm leading-relaxed text-[#334155]">{toText(value)}</p>;
}

export default function IndicationPresentationTabs({ indication, presentation }) {
  const tabs = useMemo(
    () => [
      { id: "indication", label: "Indication", value: indication },
      { id: "presentation", label: "Presentation", value: presentation },
    ],
    [indication, presentation],
  );
  const [activeTab, setActiveTab] = useState("indication");
  const active = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  return (
    <div className="mt-7">
      <div className="border-b border-[#d9dee7]">
        <div className="flex flex-wrap gap-6">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2 text-base font-semibold transition-colors ${
                  isActive
                    ? "border-b-2 border-[#1d4f91] text-[#1d4f91]"
                    : "text-[#64748b] hover:text-[#1d4f91]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-4 rounded-xl border border-[#e4ebf6] bg-[#f8fbff] p-4">
        {renderBlock(active?.value)}
      </div>
    </div>
  );
}

