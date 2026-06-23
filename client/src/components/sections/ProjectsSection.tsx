import { useMemo, useState } from "react";
import { useProjects } from "../../features/projects/hooks/useProjects";

import ProjectCard from "../cards/ProjectCard";

export default function ProjectsSection() {
  const { data, isLoading } = useProjects();
  const [showAll, setShowAll] = useState(false);

  const projects = useMemo(() => {
    return [...(data ?? [])].sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;

      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, [data]);

  if (isLoading || !data?.length) return null;

  const featuredProjects = projects.filter((project) => project.featured);

  const collapsedProjects = featuredProjects.length
    ? featuredProjects
    : projects.slice(0, 6);

  const visibleProjects = showAll ? projects : collapsedProjects;
  const hasHiddenProjects = projects.length > visibleProjects.length;

  if (!projects.length) return null;

  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="mb-12 text-center text-4xl font-bold text-sky-400">
        Projects
      </h2>

      {/* <h2 className="mb-12 text-4xl font-bold">Projects</h2> */}

      {/* <p className="mx-auto mb-12 max-w-2xl text-center text-slate-400">
        Featured projects are shown first. Use the admin Featured toggle for the
        projects you want visitors to notice immediately.
      </p> */}

      <div className="grid gap-6 md:grid-cols-2">
        {visibleProjects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}

        {(hasHiddenProjects || showAll) && projects.length > 6 && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setShowAll((current) => !current)}
              className="rounded-xl border border-cyan-400 px-5 py-3 text-cyan-300 transition hover:bg-cyan-400 hover:text-slate-950"
            >
              {showAll
                ? "Show featured only"
                : `Show all projects (${projects.length})`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
