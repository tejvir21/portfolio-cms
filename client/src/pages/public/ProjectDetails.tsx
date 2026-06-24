import { Link, useParams } from "react-router-dom";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

import { useProject } from "../../features/projects/hooks/useProject";
import { techIcons } from "@/constants/techIcons";
import { useEffect, useState } from "react";
import { ArrowLeft, ChevronDown, ChevronRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useProjects } from "@/features/projects/hooks/useProjects";
import ProjectCard from "@/components/cards/ProjectCard";
import { Helmet } from "react-helmet-async";

import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useProjectView } from "@/features/projects/hooks/useProjectView";

import { FiEye } from "react-icons/fi";

export default function ProjectDetails() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { slug } = useParams();

  useEffect(() => {
    if (!slug) return;

    viewMutation.mutate(slug);
  }, [slug]);

  const [showArchitecture, setShowArchitecture] = useState(false);

  const { data: projects = [] } = useProjects();

  const viewMutation = useProjectView();

  const { data: project, isLoading } = useProject(slug || "");

  const sortedProjects = [...projects].sort((a, b) => {
    if (a.featured !== b.featured) {
      return a.featured ? -1 : 1;
    }

    return (a.displayOrder ?? 999) - (b.displayOrder ?? 999);
  });

  //   const currentIndex = projects.findIndex(
  //     (p: any) => p && p?.slug === project?.slug,
  //   );

  const currentIndex = sortedProjects.findIndex(
    (p: any) => p && p?.slug === project?.slug,
  );

  //   const previous = projects[currentIndex - 1];

  //   const next = projects[currentIndex + 1];

  const previous = sortedProjects[currentIndex - 1];

  const next = sortedProjects[currentIndex + 1];

  if (isLoading) {
    return <div className="mx-auto max-w-7xl px-6 py-20">Loading...</div>;
  }

  if (!project) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20">Project not found</div>
    );
  }

  const challengeBlocks = project.challenges
    .split(/\n(?=\d+\.)/)
    .filter(Boolean);

  //   const relatedProjects = projects
  //     .filter(
  //       (p: any) => p.category === project.category && p._id !== project._id,
  //     )
  //     .slice(0, 3);

  const relatedProjects = sortedProjects
    .filter(
      (p: any) => p.category === project.category && p._id !== project._id,
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* SEO */}

      <Helmet>
        <title>{project.title} | Tejvir Chauhan</title>

        <meta name="description" content={project.shortDescription} />

        <meta name="keywords" content={project.technologies.join(",")} />
      </Helmet>

      {/* Breadcrumb + Back Button */}

      <section className="mx-auto max-w-7xl px-6 pt-10">
        <div className="mb-8 flex flex-col gap-4">
          {/* Back Button */}

          <Link
            to="/#projects"
            className="
      inline-flex
      w-fit
      items-center
      gap-2
      rounded-xl
      border
      border-slate-800
      bg-slate-900
      px-4
      py-2
      text-sm
      text-slate-300
      transition-all
      hover:border-cyan-500
      hover:text-cyan-400
      "
          >
            <ArrowLeft size={16} />
            Back to Projects
          </Link>

          {/* Breadcrumb */}

          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <Link to="/" className="transition hover:text-cyan-400">
              Home
            </Link>

            <ChevronRight size={14} />

            <Link to="/#projects" className="transition hover:text-cyan-400">
              Projects
            </Link>

            <ChevronRight size={14} />

            <span className="text-slate-300">{project.title}</span>
          </div>
        </div>
      </section>

      {/* HERO */}

      <section className="mx-auto max-w-7xl px-6 py-20 pt-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* LEFT */}

          <div>
            <div className="mb-4 flex flex-wrap gap-3">
              <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-sm text-cyan-400">
                {project.category}
              </span>

              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-sm text-emerald-400">
                {project.status}
              </span>
            </div>

            <h1 className="mb-6 text-5xl font-bold leading-tight">
              {project.title}
            </h1>

            <p className="mb-8 text-lg text-slate-400">
              {project.shortDescription}
            </p>

            {/* Stats */}

            <div className="mb-8 flex flex-wrap gap-3 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <FiEye />
                {project.views ?? 0} Views
              </div>

              <span>•</span>

              <span>Role: {project.role}</span>

              <span>•</span>

              <span>{project.technologies.length} Technologies</span>

              <span>•</span>

              <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
            </div>

            {/* Technologies */}

            {/* <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"> */}
            <div className="flex flex-wrap gap-4">
              {project.technologies.map((tech: string) => {
                const Icon = techIcons[tech];

                return (
                  <div
                    key={tech}
                    className="
flex
h-16
items-center
gap-3
rounded-xl
border
border-slate-800
bg-slate-900
px-4
transition-all
hover:border-cyan-500/30
"
                  >
                    {Icon && (
                      <Icon size={24} className="text-cyan-400 shrink-0" />
                    )}

                    <span className="font-medium">{tech}</span>
                  </div>
                );
              })}
            </div>

            {/* ACTIONS */}

            <div className="mb-10 mt-8 flex flex-wrap gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="
      inline-flex
      items-center
      gap-2
      rounded-xl
      border
      border-slate-700
      px-6
      py-3
      font-medium
      hover:border-cyan-500
      "
                >
                  <FaGithub />
                  Source Code
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="
      inline-flex
      items-center
      gap-2
      rounded-xl
      bg-cyan-500
      px-6
      py-3
      font-medium
      text-black
      "
                >
                  <FaExternalLinkAlt />
                  Live Demo
                </a>
              )}
            </div>
          </div>

          {/* RIGHT */}

          <div>
            <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
              {project.imageUrl ? (
                <Zoom>
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                </Zoom>
              ) : (
                <div className="flex h-100 items-center justify-center text-slate-500">
                  Project Screenshot
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <h2 className="mb-6 text-3xl font-bold">Project Overview</h2>

          <p className="whitespace-pre-line leading-8 text-slate-300">
            {project.fullDescription}
          </p>
        </div>
      </section>

      {/* INFO GRID */}

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="mb-2 text-sm text-slate-500">Role</h3>

            <p className="font-semibold">{project.role}</p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="mb-2 text-sm text-slate-500">Category</h3>

            <p className="font-semibold">{project.category}</p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="mb-2 text-sm text-slate-500">Status</h3>

            <p className="font-semibold capitalize">{project.status}</p>
          </div>
        </div>
      </section>

      {/* PROBLEM */}

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <h2 className="mb-6 text-3xl font-bold">Problem Statement</h2>

          <p className="whitespace-pre-line text-slate-300">
            {project.problemStatement}
          </p>
        </div>
      </section>

      {/* Architecture */}

      {/* <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <h2 className="mb-6 text-3xl font-bold">Architecture</h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 p-6">
              <h3 className="mb-3 text-xl font-semibold">Frontend</h3>

              <p className="text-slate-400">React.js</p>
            </div>

            <div className="rounded-2xl border border-slate-800 p-6">
              <h3 className="mb-3 text-xl font-semibold">Backend</h3>

              <p className="text-slate-400">Node.js + Express.js</p>
            </div>

            <div className="rounded-2xl border border-slate-800 p-6">
              <h3 className="mb-3 text-xl font-semibold">Database</h3>

              <p className="text-slate-400">MongoDB</p>
            </div>
          </div>

          <pre
            className="
      mt-8
      overflow-x-auto
      rounded-2xl
      bg-slate-950
      p-6
      text-sm
      text-slate-300
      "
          >
            {project.architecture}
          </pre>
        </div>
      </section> */}

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <h2 className="mb-8 text-3xl font-bold">Architecture</h2>
        <button
          onClick={() => setShowArchitecture(!showArchitecture)}
          className="
  flex
  w-full
  items-center
  justify-between
  rounded-2xl
  border
  border-slate-800
  bg-slate-950
  p-5
  "
        >
          <span>View Detailed Architecture</span>

          <ChevronDown className={showArchitecture ? "rotate-180" : ""} />
        </button>

        {showArchitecture && (
          <pre
            className="
    mt-4
    overflow-auto
    rounded-2xl
    bg-black
    p-6
    text-sm
    "
          >
            {project.architecture}
          </pre>
        )}
      </section>

      {/* CHALLENGES */}

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <h2 className="mb-6 text-3xl font-bold">Challenges</h2>

          <div className="grid gap-6">
            {challengeBlocks.map((challenge: any, index: number) => {
              const lines = challenge.split("\n").filter(Boolean);

              return (
                <div
                  key={index}
                  className="
          rounded-2xl
          border
          border-slate-800
          bg-slate-950
          p-6
          "
                >
                  <h3 className="mb-4 text-xl font-semibold text-cyan-400">
                    {lines[0]}
                  </h3>

                  <p className="text-slate-300 leading-7">
                    {lines.slice(1).join(" ")}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LEARNINGS */}

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <h2 className="mb-8 text-3xl font-bold">Key Learnings</h2>

          {project.learnings
            .split("\n\n")
            .map((section: string, index: number) => {
              const lines = section.split("\n").filter(Boolean);

              if (!lines.length) {
                return null;
              }

              const heading = lines[0];
              const points = lines.slice(1);

              return (
                <div key={index} className="mb-10">
                  <h3 className="mb-5 text-xl font-semibold text-cyan-400">
                    {heading}
                  </h3>

                  <div className="grid gap-4 md:grid-cols-2">
                    {points.map((point, pointIndex) => (
                      <div
                        key={pointIndex}
                        className="
                    rounded-2xl
                    border
                    border-slate-800
                    bg-slate-950
                    p-4
                    "
                      >
                        ✓ {point}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      </section>

      {/* Gallery */}

      {project.gallery?.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="mb-8 text-3xl font-bold">Project Gallery</h2>

            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{
                clickable: true,
              }}
              spaceBetween={20}
              slidesPerView={1}
            >
              {project.gallery.map((image: any, index: number) => (
                <SwiperSlide key={index}>
                  <Zoom>
                    <img
                      src={image.url}
                      alt={`Screenshot ${index + 1}`}
                      className="
      h-125
      w-full
      rounded-2xl
      object-cover
      "
                    />
                  </Zoom>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}

      {/* Related Projects */}

      {relatedProjects.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <h2 className="mb-8 text-3xl font-bold">Related Projects</h2>

          <div className="grid gap-6 md:grid-cols-3">
            {relatedProjects.map((item: any) => (
              <ProjectCard key={item._id} project={item} />
            ))}
          </div>
        </section>
      )}

      {/* Navigation */}

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-2">
          {previous && (
            <Link
              to={`/projects/${previous.slug}`}
              className="
        rounded-2xl
        border
        border-slate-800
        bg-slate-900
        p-6
        "
            >
              <p className="mb-2 text-sm text-slate-500">Previous Project</p>

              <h3 className="font-semibold">{previous.title}</h3>
            </Link>
          )}

          {next && (
            <Link
              to={`/projects/${next.slug}`}
              className="
        rounded-2xl
        border
        border-slate-800
        bg-slate-900
        p-6
        text-right
        "
            >
              <p className="mb-2 text-sm text-slate-500">Next Project</p>

              <h3 className="font-semibold">{next.title}</h3>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
