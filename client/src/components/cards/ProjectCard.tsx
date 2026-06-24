import { useEffect, useRef, useState } from "react";
import {
  Code2,
  ExternalLink,
  Sparkles,
  BookOpen,
  ImageIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

import { type Project } from "../../features/projects/types/project.types";

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
      const moreBadgeWidth = 40;

      let usedWidth = 0;
      let count = 0;

      for (let index = 0; index < technologies.length; index += 1) {
        const child = children[index];
        const nextWidth = child?.offsetWidth ?? 0;
        const nextUsedWidth = usedWidth + (count > 0 ? gap : 0) + nextWidth;
        const remaining = technologies.length - index - 1;
        const reservedWidth = remaining > 0 ? gap + moreBadgeWidth : 0;

        if (nextUsedWidth + reservedWidth > availableWidth) break;

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
    <div ref={containerRef} className="relative mt-4 min-w-0 overflow-hidden">
      <div className="flex flex-wrap gap-2">
        {visibleTech.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-1 text-[11px] font-medium text-cyan-300"
          >
            {tech}
          </span>
        ))}

        {extraTechCount > 0 && (
          <span className="rounded-full border border-slate-700 px-2.5 py-1 text-[11px] font-medium text-slate-300">
            +{extraTechCount}
          </span>
        )}
      </div>

      <div
        ref={measureRef}
        className="pointer-events-none invisible absolute left-0 top-0 flex flex-nowrap gap-2"
        aria-hidden="true"
      >
        {technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-full border px-2.5 py-1 text-[11px] font-medium"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectOverlayActions({ project }: { project: Project }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-950/72 opacity-0 backdrop-blur-sm transition duration-300 group-hover:opacity-100">
      <div className="flex flex-wrap items-center justify-center gap-3 px-4">
        {project.slug && (
          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            <BookOpen size={16} />
            Case Study
          </Link>
        )}

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-500 bg-slate-900/80 px-4 py-2 text-sm font-medium text-white transition hover:border-cyan-400 hover:text-cyan-300"
          >
            <ExternalLink size={16} />
            Live
          </a>
        )}

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-500 bg-slate-900/80 px-4 py-2 text-sm font-medium text-white transition hover:border-cyan-400 hover:text-cyan-300"
          >
            <Code2 size={16} />
            Code
          </a>
        )}
      </div>
    </div>
  );
}

function ProjectImage({ project }: { project: Project }) {
  if (project.imageUrl) {
    return (
      <div className="relative aspect-video overflow-hidden bg-slate-950">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-t from-slate-950/45 via-transparent to-transparent" />

        <ProjectOverlayActions project={project} />
      </div>
    );
  }

  return (
    <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-slate-950">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300">
          <ImageIcon size={26} />
        </div>

        <p className="mt-3 text-sm font-medium text-slate-300">
          Preview not added
        </p>
      </div>

      <ProjectOverlayActions project={project} />
    </div>
  );
}

export default function ProjectCard({ project }: Props) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-[0_0_24px_rgba(34,211,238,0.05)] transition hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_0_36px_rgba(34,211,238,0.10)]">
      <ProjectImage project={project} />

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {project.category && (
            <span className="rounded-full border border-cyan-400/30 bg-cyan-400/5 px-2.5 py-1 text-[11px] font-medium text-cyan-300">
              {project.category}
            </span>
          )}

          <span className="rounded-full border border-slate-700 px-2.5 py-1 text-[11px] text-slate-400">
            {project.status === "completed" ? "Completed" : "In progress"}
          </span>

          {project.featured && (
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 text-[11px] font-semibold text-amber-300">
              <Sparkles className="h-3 w-3" />
              Featured
            </span>
          )}
        </div>

        <h3 className="text-2xl font-semibold tracking-tight text-white">
          {project.title}
        </h3>

        {project.role && (
          <p className="mt-1 text-sm text-slate-400">{project.role}</p>
        )}

        <p className="mt-4 line-clamp-2 text-sm leading-7 text-slate-300">
          {project.shortDescription}
        </p>

        <TechList technologies={project.technologies ?? []} />

        {/* mobile fallback buttons */}
        <div className="mt-5 flex flex-wrap gap-2 md:hidden">
          {project.slug && (
            <Link
              to={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-400 px-3.5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              <BookOpen size={15} />
              Case Study
            </Link>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 px-3.5 py-2 text-sm font-medium text-slate-100 transition hover:border-cyan-400 hover:text-cyan-300"
            >
              <Code2 size={15} />
              Code
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 px-3.5 py-2 text-sm font-medium text-slate-100 transition hover:border-cyan-400 hover:text-cyan-300"
            >
              <ExternalLink size={15} />
              Live
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

// import { useEffect, useRef, useState } from "react";
// import { Code2, ExternalLink, Sparkles } from "lucide-react";
// import { Link } from "react-router-dom";

// import { type Project } from "../../features/projects/types/project.types";

// interface Props {
//   project: Project;
// }

// function TechList({ technologies }: { technologies: string[] }) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const measureRef = useRef<HTMLDivElement>(null);
//   const [visibleCount, setVisibleCount] = useState(technologies.length);

//   useEffect(() => {
//     const calculateVisibleCount = () => {
//       const container = containerRef.current;
//       const measure = measureRef.current;

//       if (!container || !measure) return;

//       const availableWidth = container.clientWidth;
//       const gap = 8;
//       const children = Array.from(measure.children) as HTMLElement[];
//       const moreBadgeWidth = 44;

//       let usedWidth = 0;
//       let count = 0;

//       for (let index = 0; index < technologies.length; index += 1) {
//         const child = children[index];
//         const nextWidth = child?.offsetWidth ?? 0;
//         const nextUsedWidth = usedWidth + (count > 0 ? gap : 0) + nextWidth;
//         const remaining = technologies.length - index - 1;
//         const reservedWidth = remaining > 0 ? gap + moreBadgeWidth : 0;

//         if (nextUsedWidth + reservedWidth > availableWidth) {
//           break;
//         }

//         usedWidth = nextUsedWidth;
//         count += 1;
//       }

//       setVisibleCount(Math.max(1, count));
//     };

//     calculateVisibleCount();

//     const resizeObserver = new ResizeObserver(calculateVisibleCount);

//     if (containerRef.current) {
//       resizeObserver.observe(containerRef.current);
//     }

//     return () => resizeObserver.disconnect();
//   }, [technologies]);

//   if (!technologies.length) return null;

//   const visibleTech = technologies.slice(0, visibleCount);
//   const extraTechCount = technologies.length - visibleCount;

//   return (
//     <div ref={containerRef} className="relative mt-6 min-w-0 overflow-hidden">
//       <div className="flex flex-wrap gap-2">
//         {visibleTech.map((tech) => (
//           <span
//             key={tech}
//             className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300"
//           >
//             {tech}
//           </span>
//         ))}

//         {extraTechCount > 0 && (
//           <span className="rounded-full border border-slate-700 px-3 py-1 text-xs font-medium text-slate-300">
//             +{extraTechCount}
//           </span>
//         )}
//       </div>

//       <div
//         ref={measureRef}
//         className="pointer-events-none invisible absolute left-0 top-0 flex flex-nowrap items-center gap-2"
//         aria-hidden="true"
//       >
//         {technologies.map((tech) => (
//           <span
//             key={tech}
//             className="rounded-full border px-3 py-1 text-xs font-medium"
//           >
//             {tech}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default function ProjectCard({ project }: Props) {
//   return (
//     <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-[0_0_35px_rgba(34,211,238,0.05)] transition hover:-translate-y-1 hover:border-cyan-400/60 hover:shadow-[0_0_45px_rgba(34,211,238,0.14)]">
//       {project.imageUrl ? (
//         <div className="relative aspect-video overflow-hidden bg-slate-950">
//           <img
//             src={project.imageUrl}
//             alt={project.title}
//             className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
//           />

//           <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent" />

//           {project.featured && (
//             <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300">
//               <Sparkles className="h-3.5 w-3.5" />
//               Featured
//             </div>
//           )}
//         </div>
//       ) : (
//         <div className="flex aspect-video items-center justify-center bg-slate-950 text-slate-600">
//           <span className="rounded-full border border-slate-800 px-4 py-2 text-sm">
//             Project Preview
//           </span>
//         </div>
//       )}

//       <div className="flex flex-1 flex-col p-6">
//         <div className="mb-4 flex flex-wrap items-center gap-2">
//           {project.category && (
//             <span className="rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3 py-1 text-xs font-medium text-cyan-300">
//               {project.category}
//             </span>
//           )}

//           <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">
//             {project.status === "completed" ? "Completed" : "In progress"}
//           </span>
//         </div>

//         <div>
//           <h3 className="text-2xl font-semibold tracking-tight text-white">
//             {project.title}
//           </h3>

//           {project.role && (
//             <p className="mt-2 text-sm text-slate-400">{project.role}</p>
//           )}
//         </div>

//         <p className="mt-4 line-clamp-3 text-slate-400">
//           {project.shortDescription}
//         </p>

//         <TechList technologies={project.technologies ?? []} />

//         <div className="mt-auto pt-6">
//           <div className="flex flex-wrap gap-3">
//             {project.slug && (
//               <Link
//                 to={`/projects/${project.slug}`}
//                 className="inline-flex items-center rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
//               >
//                 View Case Study
//               </Link>
//             )}

//             {project.githubUrl && (
//               <a
//                 href={project.githubUrl}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-cyan-400 hover:text-cyan-300"
//               >
//                 <Code2 size={16} />
//                 Code
//               </a>
//             )}

//             {project.liveUrl && (
//               <a
//                 href={project.liveUrl}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-cyan-400 hover:text-cyan-300"
//               >
//                 <ExternalLink size={16} />
//                 Live Demo
//               </a>
//             )}
//           </div>
//         </div>
//       </div>
//     </article>
//   );
// }
