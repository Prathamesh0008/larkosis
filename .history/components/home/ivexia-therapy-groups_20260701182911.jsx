const therapies = [
  {
    title: "Cardiology",
    desc: "Comprehensive cardiovascular solutions focused on improving heart health and long-term patient outcomes.",
  },
  {
    title: "Oncology",
    desc: "Advanced oncology formulations supporting modern cancer care and high-compliance export demand.",
  },
  {
    title: "Anti-Infectives",
    desc: "Broad-spectrum therapeutic options built for quality, availability, and dependable global supply.",
  },
  {
    title: "Endocrinology",
    desc: "Effective portfolio support for diabetes and metabolic health categories across growing markets.",
  },
  {
    title: "Ophthalmology",
    desc: "Specialized dosage forms designed for consistent care in sensitive and precision-driven treatments.",
  },
];

function TherapyIcon({ index }) {
  const icons = [
    "M12 21s-6.5-4.35-9-8.28C.35 9.56 2.15 5 6.4 5c2.34 0 4 1.28 5.1 3 1.1-1.72 2.76-3 5.1-3C20.85 5 22.65 9.56 21 12.72 18.5 16.65 12 21 12 21Z",
    "M12 3 4 7.5V12c0 5.25 3.45 10.14 8 11 4.55-.86 8-5.75 8-11V7.5L12 3Z",
    "M8 4h8M6 8h12M8 12h8M10 16h4M11 20h2",
    "M6 12a6 6 0 1 1 12 0c0 2.2-1.2 3.9-2.8 5.2-.95.78-1.7 1.7-2.2 2.8h-2c-.5-1.1-1.25-2.02-2.2-2.8C7.2 15.9 6 14.2 6 12Z",
    "M4 12c3-5.33 13-5.33 16 0-3 5.33-13 5.33-16 0Zm8 2.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  ];

  return (
    <svg
      className="h-12 w-12 text-[#E2004F] transition-transform duration-500 group-hover:scale-110 lg:h-16 lg:w-16"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
        d={icons[index]}
      />
    </svg>
  );
}

export default function IvexiaTherapyGroups() {
  return (
    <section className="relative bg-[#FFF8F5] py-20 md:py-24">
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#FF7A00] to-[#E2004F]" />

      <div className="mb-14 px-4 text-center">
        <h2 className="mb-3 text-3xl font-bold text-[#222] md:text-4xl">
          Our Therapy Areas
        </h2>

        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-600 md:text-base">
          <span className="font-semibold text-[#E2004F]">
            Focused Innovation.
          </span>{" "}
          Delivering specialized pharmaceutical solutions across key
          therapeutic segments.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 px-6 md:gap-6 md:px-20 lg:flex lg:flex-wrap lg:items-stretch lg:justify-center lg:gap-8">
        {therapies.map((item, index) => (
          <div
            key={item.title}
            className="group relative w-full rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-md transition-all duration-500 hover:-translate-y-2 hover:border-transparent hover:shadow-xl lg:w-[300px] lg:p-8 xl:w-[320px]"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#FF7A00]/10 to-[#E2004F]/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative z-10 flex h-full flex-col items-center justify-between">
              <div className="mb-3 lg:mb-4">
                <TherapyIcon index={index} />
              </div>

              <h3 className="mb-2 text-base font-semibold text-[#222] transition-colors duration-300 group-hover:text-[#E2004F] lg:text-lg">
                {item.title}
              </h3>

              <p className="text-xs leading-relaxed text-gray-600 lg:text-sm">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#FF7A00] to-[#E2004F]" />
    </section>
  );
}
