import { useMemo } from "react";
import { BriefcaseBusiness, CalendarDays, MapPin } from "lucide-react";

import { useExperiences } from "../../features/experience/hooks/useExperiences";
import ExperienceSkeleton from "../skeletons/ExperienceSkeleton";

const formatDate = (value?: string) => {
  if (!value) return "Present";

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "Present";

  return parsed.toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
  });
};

const toPoints = (value?: string) => {
  if (!value) return [];

  const lineParts = value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);

  if (lineParts.length > 1) return lineParts;

  return value
    .split(/(?<=[.!?])\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
};

export default function ExperienceSection() {
  const { data, isLoading } = useExperiences();

  const experiences = useMemo(() => {
    return [...(data ?? [])].sort((a, b) => {
      if (a.displayOrder !== b.displayOrder) {
        return a.displayOrder - b.displayOrder;
      }

      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    });
  }, [data]);

  if (isLoading) return <ExperienceSkeleton />;

  if (!experiences.length) return null;

  return (
    <section id="experience" className="mx-auto max-w-7xl px-6 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-bold text-sky-400">Experience</h2>
        <p className="mt-4 text-slate-400">
          Roles where I’ve built production features, improved engineering
          velocity, and worked across frontend, backend, APIs, and performance.
        </p>
      </div>

      <div className="mt-12 space-y-8">
        {experiences.map((item) => {
          const points = toPoints(item.description);

          return (
            <article
              key={item._id}
              className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-[0_0_30px_rgba(34,211,238,0.05)] transition hover:border-cyan-500/30 hover:shadow-[0_0_40px_rgba(34,211,238,0.10)] md:p-8"
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="flex gap-4">
                  {item.companyLogo ? (
                    <img
                      src={item.companyLogo}
                      alt={item.company || "Company logo"}
                      className="h-14 w-14 rounded-2xl object-cover ring-1 ring-slate-700"
                    />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300">
                      <BriefcaseBusiness size={24} />
                    </div>
                  )}

                  <div>
                    <h3 className="text-2xl font-semibold text-white">
                      {item.position}
                    </h3>

                    <p className="mt-1 text-base font-medium text-cyan-300">
                      {item.company}
                    </p>

                    {(item.location || item.employmentType) && (
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-400">
                        {item.location && (
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin size={14} />
                            {item.location}
                          </span>
                        )}

                        {item.employmentType && (
                          <span className="rounded-full border border-slate-700 px-2.5 py-1 text-xs text-slate-300">
                            {item.employmentType}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300">
                  <CalendarDays size={16} />
                  <span>
                    {formatDate(item.startDate)} –{" "}
                    {item.currentlyWorking
                      ? "Present"
                      : formatDate(item.endDate)}
                  </span>
                </div>
              </div>

              {points.length > 0 && (
                <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-300 md:text-base">
                  {points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-300" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}

              {!!item.technologies?.length && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {item.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-slate-700 bg-slate-950/70 px-3 py-1.5 text-sm text-slate-200"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

// import { useExperiences } from "../../features/experience/hooks/useExperiences";
// import ExperienceSkeleton from "../skeletons/ExperienceSkeleton";

// const formatDate = (value?: string) => {
//   if (!value) return "Present";

//   return new Date(value).toLocaleDateString("en-IN", {
//     month: "short",
//     year: "numeric",
//   });
// };

// const toPoints = (value?: string) => {
//   if (!value) return [];

//   const lineParts = value
//     .split(/\r?\n/)
//     .map((item) => item.trim())
//     .filter(Boolean);

//   if (lineParts.length > 1) return lineParts;

//   return value
//     .split(/(?<=[.!?])\s+/)
//     .map((item) => item.trim())
//     .filter(Boolean);
// };

// export default function ExperienceSection() {
//   const { data, isLoading } = useExperiences();

//   if (isLoading) return <ExperienceSkeleton />;

//   if (!data?.length) return null;

//   return (
//     <section id="experience" className="mx-auto max-w-7xl px-6 py-16">
//       <h2 className="mb-12 text-center text-4xl font-bold text-sky-400">
//         Experience
//       </h2>
//       {/* <h2 className="mb-12 text-4xl font-bold">Experience</h2> */}

//       <div className="space-y-8">
//         {data
//           .sort((a, b) => a.displayOrder - b.displayOrder)
//           .map((item) => {
//             const points = toPoints(item.description);

//             return (
//               <div
//                 key={item._id}
//                 className="rounded-xl border border-slate-800 bg-slate-900 p-6"
//               >
//                 <div className="flex flex-col justify-between gap-4 md:flex-row">
//                   <div className="flex gap-4">
//                     {item.companyLogo && (
//                       <img
//                         src={item.companyLogo}
//                         alt=""
//                         className="h-14 w-14 rounded-xl object-cover"
//                       />
//                     )}

//                     <div>
//                       <h3 className="text-2xl font-semibold">
//                         {item.position}
//                       </h3>

//                       <p className="text-sky-400">{item.company}</p>

//                       {item.location && (
//                         <p className="mt-1 text-sm text-slate-500">
//                           {item.location}
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   <p className="text-slate-400">
//                     {formatDate(item.startDate)} -{" "}
//                     {item.currentlyWorking
//                       ? "Present"
//                       : formatDate(item.endDate)}
//                   </p>
//                 </div>

//                 {points.length > 0 && (
//                   <ul className="mt-5 space-y-2 text-slate-400">
//                     {points.map((point) => (
//                       <li key={point} className="flex gap-3">
//                         <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
//                         <span>{point}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 )}

//                 {!!item.technologies?.length && (
//                   <div className="mt-5 flex flex-wrap gap-2">
//                     {item.technologies.map((technology) => (
//                       <span
//                         key={technology}
//                         className="rounded-full border border-slate-700 px-3 py-1 text-sm"
//                       >
//                         {technology}
//                       </span>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//       </div>
//     </section>
//   );
// }
