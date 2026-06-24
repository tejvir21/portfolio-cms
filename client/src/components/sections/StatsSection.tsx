import {
  Award,
  BriefcaseBusiness,
  FolderKanban,
  Sparkles,
  Wrench,
} from "lucide-react";

import { useAchievements } from "../../features/achievements/hooks/useAchievements";
import { useExperiences } from "../../features/experience/hooks/useExperiences";
import { useProjects } from "../../features/projects/hooks/useProjects";
import { useSkills } from "../../features/skills/hooks/useSkills";

const statIcons = {
  Experience: BriefcaseBusiness,
  Projects: FolderKanban,
  Skills: Wrench,
  Achievements: Award,
};

export default function StatsSection() {
  const { data: experiences } = useExperiences();
  const { data: projects } = useProjects();
  const { data: achievements } = useAchievements();
  const { data: skills } = useSkills();

  const stats = [
    {
      value: experiences?.length ?? 0,
      label: "Experience",
      suffix: "",
    },
    {
      value: projects?.length ?? 0,
      label: "Projects",
      suffix: "",
    },
    {
      value: skills?.length ?? 0,
      label: "Skills",
      suffix: "",
    },
    {
      value: achievements?.length ?? 0,
      label: "Achievements",
      suffix: "",
    },
  ];

  if (stats.every((item) => item.value === 0)) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 md:p-8">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
              <Sparkles size={14} />
              Snapshot
            </div>

            <h2 className="mt-4 text-3xl font-bold text-white">
              Quick Portfolio Stats
            </h2>

            <p className="mt-3 max-w-2xl text-slate-400">
              A quick overview of the experience, project work, technical depth,
              and achievements currently represented across the portfolio.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => {
            const Icon = statIcons[item.label as keyof typeof statIcons];

            return (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 transition hover:-translate-y-1 hover:border-cyan-500/30"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300">
                    <Icon size={22} />
                  </div>

                  <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    {item.label}
                  </span>
                </div>

                <div className="mt-6">
                  <h3 className="text-4xl font-bold text-white">
                    {item.value}
                    {item.suffix}
                  </h3>

                  <p className="mt-2 text-slate-400">{item.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// import { useAchievements } from "../../features/achievements/hooks/useAchievements";
// import { useExperiences } from "../../features/experience/hooks/useExperiences";
// import { useProjects } from "../../features/projects/hooks/useProjects";
// import { useSkills } from "../../features/skills/hooks/useSkills";

// export default function StatsSection() {
//   const { data: experiences } = useExperiences();
//   const { data: projects } = useProjects();
//   const { data: achievements } = useAchievements();
//   const { data: skills } = useSkills();

//   const stats = [
//     {
//       value: experiences?.length ?? 0,
//       label: "Experience",
//     },
//     {
//       value: projects?.length ?? 0,
//       label: "Projects",
//     },
//     {
//       value: skills?.length ?? 0,
//       label: "Skills",
//     },
//     {
//       value: achievements?.length ?? 0,
//       label: "Achievements",
//     },
//   ];

//   if (stats.every((item) => item.value === 0)) return null;

//   return (
//     <section className="mx-auto max-w-7xl px-6 py-16">
//       <div className="grid gap-6 md:grid-cols-4">
//         {stats.map((item) => (
//           <div
//             key={item.label}
//             className="rounded-xl border border-slate-800 bg-slate-900 p-6"
//           >
//             <h3 className="text-3xl font-bold">{item.value}</h3>

//             <p className="mt-2 text-slate-400">{item.label}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
