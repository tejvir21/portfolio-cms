import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

import { useAchievements } from "../../features/achievements/hooks/useAchievements";
import { useExperiences } from "../../features/experience/hooks/useExperiences";
import { useProfile } from "../../features/profile/hooks/useProfile";
import { useProjects } from "../../features/projects/hooks/useProjects";
import { useSkills } from "../../features/skills/hooks/useSkills";
import { useCertificates } from "@/features/certificates/hooks/useCertificates";
import { useSeoStore } from "@/store/seo.store";

export default function Navbar() {
  const { data: profile } = useProfile();
  const { data: experiences } = useExperiences();
  const { data: projects } = useProjects();
  const { data: achievements } = useAchievements();
  const { data: skills } = useSkills();
  const { data: certificates } = useCertificates();

  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const { seo } = useSeoStore();

  const initials = seo?.ogImage ? (
    <img src={seo?.ogImage} className="h-11 w-11" alt="<TC/>" />
  ) : (
    profile?.name
      ?.split(" ")
      .map((part: string) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "<TC/>"
  );

  const navItems = useMemo(
    () =>
      [
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
          label: "Certificates",
          href: "#certificates",
          visible: Boolean(certificates?.length),
        },
        {
          label: "Contact",
          href: "#contact",
          visible: Boolean(
            profile?.email || profile?.github || profile?.linkedin,
          ),
        },
      ].filter((item) => item.visible),
    [
      achievements?.length,
      experiences?.length,
      profile,
      projects?.length,
      skills?.length,
    ],
  );

  const buildHref = (hash: string) => {
    if (location.pathname === "/") return hash;
    return `/${hash}`;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-3 text-xl font-bold tracking-wide text-white"
          onClick={() => window.scrollTo(0, 0)}
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-sm font-bold text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.12)]">
            {initials}
          </span>
        </Link>

        {!!navItems.length && (
          <>
            <nav className="hidden items-center gap-8 md:flex">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={buildHref(item.href)}
                  className="text-sm font-medium text-slate-400 transition hover:text-cyan-300"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((prev) => !prev)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-200 transition hover:border-cyan-500/30 hover:text-cyan-300 md:hidden"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </>
        )}
      </div>

      {mobileOpen && !!navItems.length && (
        <div className="border-t border-slate-800 bg-slate-950/95 px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={buildHref(item.href)}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-900 hover:text-cyan-300"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

// import { Link } from "react-router-dom";

// import { useAchievements } from "../../features/achievements/hooks/useAchievements";
// import { useExperiences } from "../../features/experience/hooks/useExperiences";
// import { useProfile } from "../../features/profile/hooks/useProfile";
// import { useProjects } from "../../features/projects/hooks/useProjects";
// import { useSkills } from "../../features/skills/hooks/useSkills";

// export default function Navbar() {
//   const { data: profile } = useProfile();
//   const { data: experiences } = useExperiences();
//   const { data: projects } = useProjects();
//   const { data: achievements } = useAchievements();
//   const { data: skills } = useSkills();

//   const initials =
//     profile?.name
//       ?.split(" ")
//       .map((part: string) => part[0])
//       .join("")
//       .slice(0, 2)
//       .toUpperCase() || "";

//   const navItems = [
//     {
//       label: "Experience",
//       href: "#experience",
//       visible: Boolean(experiences?.length),
//     },
//     {
//       label: "Projects",
//       href: "#projects",
//       visible: Boolean(projects?.length),
//     },
//     {
//       label: "Achievements",
//       href: "#achievements",
//       visible: Boolean(achievements?.length),
//     },
//     {
//       label: "Skills",
//       href: "#skills",
//       visible: Boolean(skills?.length),
//     },
//     {
//       label: "Contact",
//       href: "#contact",
//       visible: Boolean(profile?.email || profile?.github || profile?.linkedin),
//     },
//   ].filter((item) => item.visible);

//   return (
//     <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
//       <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
//         <Link to="/" className="text-xl font-bold">
//           {initials}
//         </Link>

//         {!!navItems.length && (
//           <nav className="hidden gap-8 md:flex">
//             {navItems.map((item) => (
//               <a
//                 key={item.label}
//                 href={item.href}
//                 className="text-slate-400 transition hover:text-white"
//               >
//                 {item.label}
//               </a>
//             ))}
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// }
