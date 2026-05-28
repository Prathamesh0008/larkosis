"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export default function ActiveIngredientSectionNav({ sections, includeFaq = false }) {
  const navItems = useMemo(() => {
    const base = [...sections];
    if (includeFaq) {
      base.push({ id: "faq", title: "FAQs" });
    }
    return base;
  }, [sections, includeFaq]);

  const [activeId, setActiveId] = useState(navItems[0]?.id || "");
  const itemRefs = useRef(new Map());

  useEffect(() => {
    const ids = navItems.map((item) => item.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [navItems]);

  useEffect(() => {
    const el = itemRefs.current.get(activeId);
    if (el && typeof el.scrollIntoView === "function") {
      el.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [activeId]);

  return (
    <div className="space-y-2">
      {navItems.map((item) => {
        const isActive = item.id === activeId;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(event) => {
              event.preventDefault();
              const target = document.getElementById(item.id);
              if (!target) return;

              target.scrollIntoView({ behavior: "smooth", block: "start" });
              target.classList.remove("section-flash");
              void target.offsetWidth;
              target.classList.add("section-flash");
              window.history.replaceState(null, "", `#${item.id}`);
            }}
            ref={(el) => {
              if (el) itemRefs.current.set(item.id, el);
              else itemRefs.current.delete(item.id);
            }}
            className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-[#edf4ff] text-[#1d4f91]"
                : "text-[#2f465f] hover:bg-[#edf4ff] hover:text-[#1d4f91]"
            }`}
          >
            {item.title}
          </a>
        );
      })}
    </div>
  );
}
