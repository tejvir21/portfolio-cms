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

export default function SkillsSection() {
  const { data } = useSkills();

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

  if (!data?.length) return null;

  return (
    <section id="skills" className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="mb-12 text-center text-4xl font-bold text-sky-400">
        Skills & Expertise
      </h2>

      <div className="grid gap-12 md:grid-cols-2">
        {Object.entries(skillGroups).map(([category, skills]) => (
          <div key={category}>
            <h3 className="mb-8 text-3xl font-bold">{category}</h3>

            <div className="space-y-7">
              {skills.map((skill) => {
                const Icon = getSkillIcon(skill);

                return (
                  <div key={skill._id}>
                    <div className="mb-3 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Icon className="h-6 w-6 shrink-0 text-cyan-300" />

                        <span className="text-lg font-medium">
                          {skill.name}
                        </span>
                      </div>

                      <span className="text-cyan-300">
                        {skill.proficiency}%
                      </span>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500"
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
