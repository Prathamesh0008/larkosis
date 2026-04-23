export default function TherapeuticCoverageSection({ categoryCounts }) {
  return (
    <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-[#efd1bb] bg-white p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-[#271b14] sm:text-3xl">
          Therapeutic Coverage
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#5d4435]">
          We support broad pharmaceutical segments from anti-infectives and
          oncology to ophthalmic and cardio-vascular portfolios.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {categoryCounts.slice(0, 12).map((item) => (
            <span
              key={item.name}
              className="rounded-full border border-[#f1d5c3] bg-[#fff7f1] px-3 py-1 text-xs font-semibold text-[#7d4f33]"
            >
              {item.name} ({item.count})
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
