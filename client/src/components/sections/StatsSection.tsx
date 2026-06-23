import { useAchievements } from "../../features/achievements/hooks/useAchievements";
import { useExperiences } from "../../features/experience/hooks/useExperiences";
import { useProjects } from "../../features/projects/hooks/useProjects";
import { useSkills } from "../../features/skills/hooks/useSkills";

export default function StatsSection() {
  const { data: experiences } = useExperiences();
  const { data: projects } = useProjects();
  const { data: achievements } = useAchievements();
  const { data: skills } = useSkills();

  const stats = [
    {
      value: experiences?.length ?? 0,
      label: "Experience",
    },
    {
      value: projects?.length ?? 0,
      label: "Projects",
    },
    {
      value: skills?.length ?? 0,
      label: "Skills",
    },
    {
      value: achievements?.length ?? 0,
      label: "Achievements",
    },
  ];

  if (stats.every((item) => item.value === 0)) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-6 md:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-slate-800 bg-slate-900 p-6"
          >
            <h3 className="text-3xl font-bold">{item.value}</h3>

            <p className="mt-2 text-slate-400">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
