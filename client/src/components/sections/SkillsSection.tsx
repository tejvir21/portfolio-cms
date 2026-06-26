import { useMemo } from "react";
import {
  FaCss3Alt,
  FaDocker,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaNodeJs,
  FaPython,
  FaReact,
} from "react-icons/fa";
import {
  SiDjango,
  SiExpress,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiPostman,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { Code2, Database, Server, Wrench } from "lucide-react";

import { type Skill } from "../../features/skills/types/skill.types";
import { useSkills } from "../../features/skills/hooks/useSkills";
import SkillsSkeleton from "../skeletons/SkillsSkeleton";

const skillIconMap = {
  css: FaCss3Alt,
  css3: FaCss3Alt,
  html: FaHtml5,
  html5: FaHtml5,
  javascript: SiJavascript,
  typescript: SiTypescript,
  react: FaReact,
  "react.js": FaReact,
  redux: SiRedux,
  next: SiNextdotjs,
  "next.js": SiNextdotjs,
  tailwind: SiTailwindcss,
  "tailwind css": SiTailwindcss,
  node: FaNodeJs,
  "node.js": FaNodeJs,
  express: SiExpress,
  "express.js": SiExpress,
  python: FaPython,
  django: SiDjango,
  mongodb: SiMongodb,
  mongoose: SiMongodb,
  docker: FaDocker,
  git: FaGitAlt,
  github: FaGithub,
  postman: SiPostman,
  api: Server,
  "rest api": Server,
  "rest apis": Server,
  database: Database,
  tools: Wrench,
};

const getSkillIcon = (skill: Skill) => {
  const normalized = skill.name.toLowerCase().trim();

  return (
    skillIconMap[normalized as keyof typeof skillIconMap] ??
    skillIconMap[normalized.replace(/\s+/g, "") as keyof typeof skillIconMap] ??
    Code2
  );
};

function SkillCard({ skill }: { skill: Skill }) {
  const Icon = getSkillIcon(skill);

  return (
    <div className="group rounded-2xl border border-slate-800 bg-slate-900/80 p-4 transition hover:-translate-y-1 hover:border-cyan-500/30 hover:shadow-[0_0_28px_rgba(34,211,238,0.08)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
            <Icon className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="text-base font-semibold text-slate-100">
              {skill.name}
            </p>
            {/* <p className="mt-1 text-sm text-slate-400 w-32">
              {skill.category || "Skill"}
            </p> */}
          </div>
        </div>

        <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
          {skill.proficiency}%
        </span>
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const { data, isLoading } = useSkills();

  const skillGroups = useMemo(() => {
    return [...(data ?? [])]
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .reduce<Record<string, Skill[]>>((groups, skill) => {
        const category = skill.category || "Other";

        groups[category] = groups[category] ?? [];
        groups[category].push(skill);

        return groups;
      }, {});
  }, [data]);

  if (isLoading) return <SkillsSkeleton />;

  if (!data?.length) return null;

  return (
    <section id="skills" className="mx-auto max-w-7xl px-6 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-bold text-sky-400">Skills & Expertise</h2>

        <p className="mt-4 text-slate-400">
          A snapshot of the technologies, tools, and backend/frontend systems I
          use most across product and full-stack engineering work.
        </p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        {Object.entries(skillGroups).map(([category, skills]) => (
          <div
            key={category}
            className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 md:p-7"
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <h3 className="text-2xl font-bold text-slate-100">{category}</h3>

              <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">
                {skills.length} skills
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {skills
                .sort((a, b) => (a.skillSequence ?? 0) - (b.skillSequence ?? 0))
                .map((skill) => (
                  <SkillCard key={skill._id} skill={skill} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// import { useMemo } from "react";
// import {
//   FaCss3Alt,
//   FaDocker,
//   FaGitAlt,
//   FaGithub,
//   FaHtml5,
//   FaNodeJs,
//   FaPython,
//   FaReact,
// } from "react-icons/fa";
// import {
//   SiDjango,
//   SiExpress,
//   SiJavascript,
//   SiMongodb,
//   SiNextdotjs,
//   SiPostman,
//   SiRedux,
//   SiTailwindcss,
//   SiTypescript,
// } from "react-icons/si";
// import { Code2, Database, Server, Wrench } from "lucide-react";

// import { type Skill } from "../../features/skills/types/skill.types";
// import { useSkills } from "../../features/skills/hooks/useSkills";
// import SkillsSkeleton from "../skeletons/SkillsSkeleton";

// const skillIconMap = {
//   css: FaCss3Alt,
//   css3: FaCss3Alt,
//   html: FaHtml5,
//   html5: FaHtml5,
//   javascript: SiJavascript,
//   typescript: SiTypescript,
//   react: FaReact,
//   "react.js": FaReact,
//   redux: SiRedux,
//   next: SiNextdotjs,
//   "next.js": SiNextdotjs,
//   tailwind: SiTailwindcss,
//   "tailwind css": SiTailwindcss,
//   node: FaNodeJs,
//   "node.js": FaNodeJs,
//   express: SiExpress,
//   "express.js": SiExpress,
//   python: FaPython,
//   django: SiDjango,
//   mongodb: SiMongodb,
//   mongoose: SiMongodb,
//   docker: FaDocker,
//   git: FaGitAlt,
//   github: FaGithub,
//   postman: SiPostman,
//   api: Server,
//   "rest api": Server,
//   "rest apis": Server,
//   database: Database,
//   tools: Wrench,
// };

// const getSkillIcon = (skill: Skill) => {
//   const normalized = skill.name.toLowerCase().trim();

//   return (
//     skillIconMap[normalized as keyof typeof skillIconMap] ??
//     skillIconMap[normalized.replace(/\s+/g, "") as keyof typeof skillIconMap] ??
//     Code2
//   );
// };

// export default function SkillsSection() {
//   const { data, isLoading } = useSkills();

//   const skillGroups = useMemo(() => {
//     return [...(data ?? [])]
//       .sort((a, b) => a.displayOrder - b.displayOrder)
//       .reduce<Record<string, Skill[]>>((groups, skill) => {
//         const category = skill.category || "Other";

//         groups[category] = groups[category] ?? [];
//         groups[category].push(skill);

//         return groups;
//       }, {});
//   }, [data]);

//   if (isLoading) return <SkillsSkeleton />;

//   if (!data?.length) return null;

//   return (
//     <section id="skills" className="mx-auto max-w-7xl px-6 py-16">
//       <h2 className="mb-12 text-center text-4xl font-bold text-sky-400">
//         Skills & Expertise
//       </h2>

//       <div className="grid gap-12 md:grid-cols-2">
//         {Object.entries(skillGroups).map(([category, skills]) => (
//           <div key={category}>
//             <h3 className="mb-8 text-3xl font-bold">{category}</h3>

//             <div className="space-y-7">
//               {skills.map((skill) => {
//                 const Icon = getSkillIcon(skill);

//                 return (
//                   <div key={skill._id}>
//                     <div className="mb-3 flex items-center justify-between gap-4">
//                       <div className="flex items-center gap-3">
//                         <Icon className="h-6 w-6 shrink-0 text-cyan-300" />

//                         <span className="text-lg font-medium">
//                           {skill.name}
//                         </span>
//                       </div>

//                       <span className="text-cyan-300">
//                         {skill.proficiency}%
//                       </span>
//                     </div>

//                     <div className="h-3 overflow-hidden rounded-full bg-slate-800">
//                       <div
//                         className="h-full rounded-full bg-linear-to-r from-cyan-400 to-indigo-500"
//                         style={{ width: `${skill.proficiency}%` }}
//                       />
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
