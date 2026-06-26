import { Code2, Layers3, Rocket, ShieldCheck, Wrench } from "lucide-react";

import { useSettings } from "../../features/settings/hooks/useSettings";

const icons = [Rocket, Layers3, ShieldCheck, Code2, Wrench];

export default function EngineeringHighlights() {
  const { data } = useSettings();

  const highlights = data?.engineeringHighlights ?? [];

  if (!highlights.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-bold text-sky-400">
          Engineering Highlights
        </h2>

        <p className="mt-4 text-slate-400">
          A quick view of the kind of systems, architecture, and engineering
          work I focus on across full-stack products.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {highlights.map((item, index) => {
          const Icon = icons[index % icons.length];

          return (
            <div
              key={item}
              className="group rounded-2xl border border-slate-800 bg-slate-900/80 py-2 px-4 transition hover:-translate-y-1 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]"
            >
              <div className="flex items-center gap-4 py-2 text-cyan-300">
                <Icon className="bg-cyan-500/10 h-fit w-fit p-2 rounded-2xl" />

                <p className="text-base leading-7 text-slate-200">{item}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// import { useSettings } from "../../features/settings/hooks/useSettings";

// export default function EngineeringHighlights() {
//   const { data } = useSettings();

//   const highlights = data?.engineeringHighlights ?? [];

//   if (!highlights.length) return null;

//   return (
//     <section className="mx-auto max-w-7xl px-6 py-16">
//       <h2 className="mb-12 text-center text-4xl font-bold text-sky-400">
//         Engineering Highlights
//       </h2>
//       {/* <h2 className="mb-8 text-3xl font-bold">Engineering Highlights</h2> */}

//       <div className="grid gap-4 md:grid-cols-2">
//         {highlights.map((item) => (
//           <div
//             key={item}
//             className="rounded-lg border border-slate-800 bg-slate-950 p-4"
//           >
//             {item}
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
