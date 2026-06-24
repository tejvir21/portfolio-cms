import { useMemo, useState } from "react";
import { Award, CalendarDays, ExternalLink } from "lucide-react";

import { useAchievements } from "../../features/achievements/hooks/useAchievements";
import CardSkeleton from "../skeletons/CardSkeleton";

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

const formatYear = (value?: string) => {
  if (!value) return "";

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) return "";

  return parsed.getFullYear().toString();
};

export default function AchievementsSection() {
  const { data, isLoading } = useAchievements();
  const [showAll, setShowAll] = useState(false);

  const achievements = useMemo(() => {
    return [...(data ?? [])].sort((a, b) => {
      if (a.displayOrder !== b.displayOrder) {
        return a.displayOrder - b.displayOrder;
      }

      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [data]);

  const visibleAchievements = showAll ? achievements : achievements.slice(0, 3);

  if (isLoading) return <CardSkeleton />;

  if (!achievements.length) return null;

  return (
    <section id="achievements" className="mx-auto max-w-7xl px-6 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-bold text-sky-400">Achievements</h2>

        <p className="mt-4 text-slate-400">
          Highlights from competitions, certifications, recognition, and project
          milestones that reflect both engineering output and problem-solving.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visibleAchievements.map((achievement) => {
          const points = toPoints(achievement.description);
          const year = formatYear(achievement.date);

          return (
            <article
              key={achievement._id}
              className="group flex h-full flex-col rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-[0_0_35px_rgba(34,211,238,0.06)] transition hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-[0_0_40px_rgba(34,211,238,0.12)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  {achievement.imageUrl ? (
                    <img
                      src={achievement.imageUrl}
                      alt={achievement.title}
                      className="h-16 w-16 rounded-2xl object-cover ring-1 ring-slate-700"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300">
                      <Award size={28} />
                    </div>
                  )}

                  <div>
                    <h3 className="text-xl font-semibold leading-tight text-white">
                      {achievement.title}
                    </h3>

                    {achievement.organization && (
                      <p className="mt-1 text-sm font-medium text-cyan-300">
                        {achievement.organization}
                      </p>
                    )}
                  </div>
                </div>

                {year && (
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">
                    <CalendarDays size={14} />
                    {year}
                  </div>
                )}
              </div>

              {points.length > 0 && (
                <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-300">
                  {points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-300" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-auto pt-6">
                {achievement.credentialUrl ? (
                  <a
                    href={achievement.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/5 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:border-cyan-400 hover:bg-cyan-500/10"
                  >
                    <ExternalLink size={16} />
                    View credential
                  </a>
                ) : (
                  <div className="text-sm text-slate-500">
                    Achievement highlight
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {achievements.length > 3 && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setShowAll((current) => !current)}
            className="rounded-xl border border-cyan-400 px-5 py-3 text-cyan-300 transition hover:bg-cyan-400 hover:text-slate-950"
          >
            {showAll
              ? "Show top achievements"
              : `Show all achievements (${achievements.length})`}
          </button>
        </div>
      )}
    </section>
  );
}

// import { useMemo, useState } from "react";
// import { Award, ExternalLink } from "lucide-react";

// import { useAchievements } from "../../features/achievements/hooks/useAchievements";
// import CardSkeleton from "../skeletons/CardSkeleton";

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

// export default function AchievementsSection() {
//   const { data, isLoading } = useAchievements();
//   const [showAll, setShowAll] = useState(false);

//   const achievements = useMemo(() => {
//     return [...(data ?? [])].sort((a, b) => {
//       if (a.displayOrder !== b.displayOrder) {
//         return a.displayOrder - b.displayOrder;
//       }

//       return new Date(b.date).getTime() - new Date(a.date).getTime();
//     });
//   }, [data]);

//   const visibleAchievements = showAll ? achievements : achievements.slice(0, 3);

//   if (isLoading) return <CardSkeleton />;

//   if (!achievements.length) return null;

//   return (
//     <section id="achievements" className="mx-auto max-w-7xl px-6 py-24">
//       <h2 className="mb-12 text-center text-4xl font-bold text-sky-400">
//         Achievements
//       </h2>
//       {/*
//       <p className="mx-auto mb-12 max-w-2xl text-center text-slate-400">
//         The homepage shows your top achievements first. Use display order in
//         admin to control priority.
//       </p> */}

//       <div className="grid gap-8 md:grid-cols-3">
//         {visibleAchievements.map((achievement) => {
//           const points = toPoints(achievement.description);

//           return (
//             <article
//               key={achievement._id}
//               className="rounded-2xl border border-slate-800 bg-slate-900 p-7 shadow-[0_0_35px_rgba(34,211,238,0.08)] transition hover:border-cyan-400/70"
//             >
//               {achievement.imageUrl ? (
//                 <img
//                   src={achievement.imageUrl}
//                   alt={achievement.title}
//                   className="mx-auto mb-6 h-24 w-24 rounded-full object-cover"
//                 />
//               ) : (
//                 <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300">
//                   <Award size={34} />
//                 </div>
//               )}

//               <div className="text-center">
//                 <h3 className="text-xl font-semibold">{achievement.title}</h3>

//                 <p className="mt-2 text-cyan-300">{achievement.organization}</p>
//               </div>

//               {points.length > 0 && (
//                 <ul className="mt-5 space-y-2 text-slate-400">
//                   {points.map((point) => (
//                     <li key={point} className="flex gap-3">
//                       <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
//                       <span>{point}</span>
//                     </li>
//                   ))}
//                 </ul>
//               )}

//               {achievement.credentialUrl && (
//                 <div className="text-center">
//                   <a
//                     href={achievement.credentialUrl}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="mt-5 inline-flex items-center gap-2 text-cyan-300"
//                   >
//                     <ExternalLink size={16} />
//                     View credential
//                   </a>
//                 </div>
//               )}
//             </article>
//           );
//         })}
//       </div>

//       {achievements.length > 3 && (
//         <div className="mt-10 text-center">
//           <button
//             type="button"
//             onClick={() => setShowAll((current) => !current)}
//             className="rounded-xl border border-cyan-400 px-5 py-3 text-cyan-300 transition hover:bg-cyan-400 hover:text-slate-950"
//           >
//             {showAll
//               ? "Show top achievements"
//               : `Show all achievements (${achievements.length})`}
//           </button>
//         </div>
//       )}
//     </section>
//   );
// }
