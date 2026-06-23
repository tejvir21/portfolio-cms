import { useEffect, useRef, useState } from "react";
import { Code2, ExternalLink } from "lucide-react";

import { type Project } from "../../features/projects/types/project.types";
import { Link } from "react-router-dom";

interface Props {
  project: Project;
}

function TechList({ technologies }: { technologies: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(technologies.length);

  useEffect(() => {
    const calculateVisibleCount = () => {
      const container = containerRef.current;
      const measure = measureRef.current;

      if (!container || !measure) return;

      const availableWidth = container.clientWidth;
      const gap = 8;
      const children = Array.from(measure.children) as HTMLElement[];
      const moreBadgeWidth = 28;

      let usedWidth = 0;
      let count = 0;

      for (let index = 0; index < technologies.length; index += 1) {
        const child = children[index];
        const nextWidth = child?.offsetWidth ?? 0;
        const nextUsedWidth = usedWidth + (count > 0 ? gap : 0) + nextWidth;
        const remaining = technologies.length - index - 1;
        const reservedWidth = remaining > 0 ? gap + moreBadgeWidth : 0;

        if (nextUsedWidth + reservedWidth > availableWidth) {
          break;
        }

        usedWidth = nextUsedWidth;
        count += 1;
      }

      setVisibleCount(Math.max(1, count));
    };

    calculateVisibleCount();

    const resizeObserver = new ResizeObserver(calculateVisibleCount);

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [technologies]);

  if (!technologies.length) return null;

  const visibleTech = technologies.slice(0, visibleCount);
  const extraTechCount = technologies.length - visibleCount;

  return (
    <div ref={containerRef} className="relative mt-6 min-w-0 overflow-hidden">
      <div className="flex flex-nowrap items-center gap-2">
        {visibleTech.map((tech) => (
          <span key={tech} className="shrink-0 text-sm text-cyan-300">
            {tech}
          </span>
        ))}

        {extraTechCount > 0 && (
          <span className="shrink-0 text-sm text-cyan-300">
            +{extraTechCount}
          </span>
        )}
      </div>

      <div
        ref={measureRef}
        className="pointer-events-none invisible absolute left-0 top-0 flex flex-nowrap items-center gap-2"
        aria-hidden="true"
      >
        {technologies.map((tech) => (
          <span key={tech} className="shrink-0 text-sm">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ProjectCard({ project }: Props) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-[0_0_35px_rgba(34,211,238,0.06)] transition hover:-translate-y-1 hover:border-cyan-400/70 hover:shadow-[0_0_45px_rgba(34,211,238,0.16)]">
      {project.imageUrl && (
        <div className="aspect-[16/9] overflow-hidden bg-slate-950">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      )}

      <div className="p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {project.category && (
            <span className="rounded-full border border-cyan-400/30 px-3 py-1 text-xs text-cyan-300">
              {project.category}
            </span>
          )}

          <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">
            {project.status === "completed" ? "Completed" : "In progress"}
          </span>
        </div>

        <h3 className="text-2xl font-semibold">{project.title}</h3>

        <p className="mt-4 line-clamp-3 text-slate-400">
          {project.shortDescription}
        </p>

        <TechList technologies={project.technologies ?? []} />

        {(project.githubUrl || project.liveUrl) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm hover:border-cyan-400 hover:text-cyan-300"
              >
                <Code2 size={16} />
                Code
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-4 py-2 text-sm font-medium text-slate-950"
              >
                <ExternalLink size={16} />
                Live
              </a>
            )}

            {project.slug && (
              <Link
                to={`/projects/${project.slug}`}
                className="inline-flex items-center rounded-xl border border-slate-700 px-4 py-1 hover:border-cyan-400 hover:text-cyan-300"
              >
                Show Details
              </Link>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
