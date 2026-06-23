import { Link } from "react-router-dom";

import { useAchievements } from "../../features/achievements/hooks/useAchievements";
import { useExperiences } from "../../features/experience/hooks/useExperiences";
import { useProfile } from "../../features/profile/hooks/useProfile";
import { useProjects } from "../../features/projects/hooks/useProjects";
import { useSkills } from "../../features/skills/hooks/useSkills";

export default function Navbar() {
  const { data: profile } = useProfile();
  const { data: experiences } = useExperiences();
  const { data: projects } = useProjects();
  const { data: achievements } = useAchievements();
  const { data: skills } = useSkills();

  const initials =
    profile?.name
      ?.split(" ")
      .map((part: string) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "";

  const navItems = [
    {
      label: "Experience",
      href: "#experience",
      visible: Boolean(experiences?.length),
    },
    {
      label: "Projects",
      href: "#projects",
      visible: Boolean(projects?.length),
    },
    {
      label: "Achievements",
      href: "#achievements",
      visible: Boolean(achievements?.length),
    },
    {
      label: "Skills",
      href: "#skills",
      visible: Boolean(skills?.length),
    },
    {
      label: "Contact",
      href: "#contact",
      visible: Boolean(profile?.email || profile?.github || profile?.linkedin),
    },
  ].filter((item) => item.visible);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="text-xl font-bold">
          {initials}
        </Link>

        {!!navItems.length && (
          <nav className="hidden gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-slate-400 transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
