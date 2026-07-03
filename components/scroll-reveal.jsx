"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollReveal({
  as: Tag = "div",
  children,
  className = "",
  delay = 0,
  distance = 28,
  duration = 700,
  variant = "up",
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const variants = {
    up: {
      hiddenTransform: `translate3d(0, ${distance}px, 0)`,
    },
    down: {
      hiddenTransform: `translate3d(0, -${distance}px, 0)`,
    },
    left: {
      hiddenTransform: `translate3d(${distance}px, 0, 0)`,
    },
    right: {
      hiddenTransform: `translate3d(-${distance}px, 0, 0)`,
    },
    zoom: {
      hiddenTransform: "scale(0.94)",
    },
    zoomUp: {
      hiddenTransform: `translate3d(0, ${distance / 2}px, 0) scale(0.96)`,
    },
    tilt: {
      hiddenTransform: `translate3d(0, ${distance}px, 0) rotate(1.8deg) scale(0.985)`,
    },
    soft: {
      hiddenTransform: `translate3d(0, ${Math.max(14, distance / 2)}px, 0) scale(0.985)`,
    },
  };

  const activeVariant = variants[variant] || variants.up;

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate3d(0, 0, 0) scale(1) rotate(0deg)" : activeVariant.hiddenTransform,
        transitionProperty: "opacity, transform",
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}
