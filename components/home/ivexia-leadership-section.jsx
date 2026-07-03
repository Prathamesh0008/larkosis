const team = [
  {
    title: "Quality Leadership",
    role: "cGMP & Compliance",
    quote: "Batch integrity, validation discipline, and regulatory readiness guide every supply decision.",
    icon: (
      <svg className="h-6 w-6 md:h-7 md:w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.5 12.5l1.8 1.8 3.2-4" />
      </svg>
    ),
  },
  {
    title: "Research Team",
    role: "Formulation Development",
    quote: "Portfolio expansion is driven by market-fit, robust development, and practical innovation.",
    icon: (
      <svg className="h-6 w-6 md:h-7 md:w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0l-4-4a4 4 0 115.656-5.656l4 4a4 4 0 010 5.656z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l10 10" />
      </svg>
    ),
  },
  {
    title: "Commercial Team",
    role: "Global Markets",
    quote: "We align product strategy with distributor realities and destination-market expectations.",
    icon: (
      <svg className="h-6 w-6 md:h-7 md:w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" strokeWidth={2} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18" />
      </svg>
    ),
  },
  {
    title: "Manufacturing Team",
    role: "Operations Excellence",
    quote: "Reliable throughput comes from process control, disciplined systems, and scalable execution.",
    icon: (
      <svg className="h-6 w-6 md:h-7 md:w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21h18M5 21V9l7-4 7 4v12M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    title: "Customer Support",
    role: "Partner Success",
    quote: "Fast responses and clear coordination help partners move from inquiry to shipment with confidence.",
    icon: (
      <svg className="h-6 w-6 md:h-7 md:w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
];

export default function IvexiaLeadershipSection() {
  return (
    <section className="relative overflow-hidden text-white">
     

      <div className="relative z-10 -mt-8 rounded-t-[24px] bg-[#241a14]/95 px-4 py-8 shadow-inner  md:rounded-t-[40px] md:px-16 md:py-16">
        <div className="mb-6 text-center md:mb-10">
          <h3 className="mb-2 mt-4 text-xl font-semibold text-white md:text-3xl">
            Leadership & Operating Principles
          </h3>

          <p className="mx-auto max-w-2xl text-xs text-gray-300 md:text-sm">
            The same Ivexia-style team grid, adapted to the way Larksois
            manages quality, innovation, manufacturing, and customer delivery.
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-5">
          {team.map((member) => (
            <article
              key={member.title}
              className="rounded-xl bg-white/10 p-3 text-center shadow-lg transition-all hover:scale-[1.05] hover:bg-white/20 hover:shadow-2xl md:rounded-2xl md:p-4"
            >
              <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#f4b083] bg-[#3f2d24] text-lg font-semibold md:h-16 md:w-16">
                {member.icon}
              </div>

              <h4 className="text-xs font-semibold text-white md:text-sm">
                {member.title}
              </h4>

              <p className="mb-1 text-[10px] text-[#f4b083] md:text-xs">
                {member.role}
              </p>

              <p className="text-[10px] italic leading-tight text-gray-300 md:text-[11px]">
                &quot;{member.quote}&quot;
              </p>
            </article>
          ))}
        </div>
      </div>

    </section>
  );
}
