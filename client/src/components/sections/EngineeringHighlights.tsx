import { useSettings } from "../../features/settings/hooks/useSettings";

export default function EngineeringHighlights() {
  const { data } = useSettings();

  const highlights = data?.engineeringHighlights ?? [];

  if (!highlights.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="mb-12 text-center text-4xl font-bold text-sky-400">
        Engineering Highlights
      </h2>
      {/* <h2 className="mb-8 text-3xl font-bold">Engineering Highlights</h2> */}

      <div className="grid gap-4 md:grid-cols-2">
        {highlights.map((item) => (
          <div
            key={item}
            className="rounded-lg border border-slate-800 bg-slate-950 p-4"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
