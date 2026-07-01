const team = [
  {
    title: "Quality Leadership",
    role: "cGMP & Compliance",
    quote: "Batch integrity, validation discipline, and regulatory readiness guide every supply decision.",
  },
  {
    title: "Research Team",
    role: "Formulation Development",
    quote: "Portfolio expansion is driven by market-fit, robust development, and practical innovation.",
  },
  {
    title: "Commercial Team",
    role: "Global Markets",
    quote: "We align product strategy with distributor realities and destination-market expectations.",
  },
  {
    title: "Manufacturing Team",
    role: "Operations Excellence",
    quote: "Reliable throughput comes from process control, disciplined systems, and scalable execution.",
  },
  {
    title: "Customer Support",
    role: "Partner Success",
    quote: "Fast responses and clear coordination help partners move from inquiry to shipment with confidence.",
  },
];

export default function IvexiaLeadershipSection() {
  return (
    <section className="relative overflow-hidden text-white">
      <div className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden bg-white px-8 py-8 text-center md:min-h-[80vh] md:px-16 md:py-12">
        <div
          className="absolute inset-0 bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/quality system.jpg')" }}
        />
      </div>

      <div className="relative z-10 -mt-8 rounded-t-[24px] bg-[#0d2d47]/95 px-4 py-8 shadow-inner md:-mt-12 md:rounded-t-[40px] md:px-16 md:py-16">
        <div className="mb-6 text-center md:mb-10">
          <h3 className="mb-2 text-xl font-semibold text-white md:text-3xl">
            Leadership & Operating Principles
          </h3>

          <p className="mx-auto max-w-2xl text-xs text-gray-300 md:text-sm">
            The same Ivexia-style team grid, adapted to the way Larksois
            manages quality, innovation, manufacturing, and customer delivery.
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-5">
          {team.map((member, index) => (
            <article
              key={member.title}
              className="rounded-xl bg-white/10 p-3 text-center shadow-lg transition-all hover:scale-[1.05] hover:bg-white/20 hover:shadow-2xl md:rounded-2xl md:p-4"
            >
              <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#19a6b5] bg-[#123a56] text-lg font-semibold md:h-16 md:w-16">
                {index + 1}
              </div>

              <h4 className="text-xs font-semibold text-white md:text-sm">
                {member.title}
              </h4>

              <p className="mb-1 text-[10px] text-[#19a6b5] md:text-xs">
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
