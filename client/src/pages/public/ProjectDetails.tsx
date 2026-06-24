import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  CalendarDays,
  FolderKanban,
  BriefcaseBusiness,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Zoom from "react-medium-image-zoom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "react-medium-image-zoom/dist/styles.css";

import { useProject } from "../../features/projects/hooks/useProject";
import { useProjects } from "@/features/projects/hooks/useProjects";
import { useProjectView } from "@/features/projects/hooks/useProjectView";
import { techIcons } from "@/constants/techIcons";
import ProjectCard from "@/components/cards/ProjectCard";
import PageLoader from "@/components/common/PageLoader";

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-16">
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 md:p-8">
        <h2 className="mb-6 text-2xl font-bold md:text-3xl">{title}</h2>
        {children}
      </div>
    </section>
  );
}

function InfoPill({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
        {icon}
      </div>

      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 font-semibold text-slate-100">{value}</p>
    </div>
  );
}

export default function ProjectDetails() {
  const { slug } = useParams();
  const { data: project, isLoading } = useProject(slug || "");
  const { data: projects = [] } = useProjects();
  const viewMutation = useProjectView();

  const [showArchitecture, setShowArchitecture] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!slug) return;
    viewMutation.mutate(slug);
  }, [slug]);

  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      if (a.featured !== b.featured) {
        return a.featured ? -1 : 1;
      }

      return (a.displayOrder ?? 999) - (b.displayOrder ?? 999);
    });
  }, [projects]);

  const currentIndex = sortedProjects.findIndex(
    (p: any) => p && p?.slug === project?.slug,
  );

  const previous = currentIndex > 0 ? sortedProjects[currentIndex - 1] : null;
  const next =
    currentIndex >= 0 && currentIndex < sortedProjects.length - 1
      ? sortedProjects[currentIndex + 1]
      : null;

  if (isLoading) {
    return <PageLoader />;
  }

  if (!project) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20 text-slate-300">
        Project not found
      </div>
    );
  }

  const challengeBlocks = project.challenges
    ?.split(/\n(?=\d+\.)/)
    .filter(Boolean);

  const learningSections = project.learnings
    ?.split("\n\n")
    .map((section: string) => section.split("\n").filter(Boolean))
    .filter((section: any) => section.length > 0);

  const relatedProjects = sortedProjects
    .filter(
      (p: any) => p.category === project.category && p._id !== project._id,
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Helmet>
        <title>{project.title} | Tejvir Chauhan</title>
        <meta name="description" content={project.shortDescription} />
        <meta name="keywords" content={project.technologies.join(",")} />
      </Helmet>

      {/* Top navigation */}
      <section className="mx-auto max-w-7xl px-6 pt-8 md:pt-10">
        <div className="mb-8 flex flex-col gap-4">
          <Link
            to="/#projects"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-500 hover:text-cyan-400"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </Link>

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
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div>
            <div className="mb-5 flex flex-wrap gap-3">
              <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm text-cyan-400">
                {project.category}
              </span>

              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm capitalize text-emerald-400">
                {project.status}
              </span>

              {project.featured && (
                <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-sm text-amber-300">
                  Featured Project
                </span>
              )}
            </div>

            <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              {project.title}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
              {project.shortDescription}
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-slate-300">
                <FiEye />
                {project.views ?? 0} Views
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-slate-300">
                <BriefcaseBusiness size={16} />
                {project.role}
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-slate-300">
                <FolderKanban size={16} />
                {project.technologies.length} Technologies
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-slate-300">
                <CalendarDays size={16} />
                {new Date(project.updatedAt).toLocaleDateString()}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.technologies.map((tech: string) => {
                const Icon = techIcons[tech];

                return (
                  <div
                    key={tech}
                    className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 transition hover:border-cyan-500/30"
                  >
                    {Icon && (
                      <Icon size={22} className="shrink-0 text-cyan-400" />
                    )}

                    <span className="font-medium text-slate-100">{tech}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-6 py-3 font-medium transition hover:border-cyan-500 hover:text-cyan-300"
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
                  className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-medium text-black transition hover:bg-cyan-400"
                >
                  <FaExternalLinkAlt />
                  Live Demo
                </a>
              )}
            </div>
          </div>

          <div>
            <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-[0_0_35px_rgba(34,211,238,0.08)]">
              {project.imageUrl ? (
                <Zoom>
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                </Zoom>
              ) : (
                <div className="flex h-80 items-center justify-center text-slate-500">
                  Project Screenshot
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <SectionCard title="Project Overview">
        <p className="whitespace-pre-line leading-8 text-slate-300">
          {project.fullDescription}
        </p>
      </SectionCard>

      {/* INFO GRID */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid gap-5 md:grid-cols-3">
          <InfoPill
            icon={<BriefcaseBusiness className="h-5 w-5" />}
            label="Role"
            value={project.role}
          />

          <InfoPill
            icon={<FolderKanban className="h-5 w-5" />}
            label="Category"
            value={project.category}
          />

          <InfoPill
            icon={<CalendarDays className="h-5 w-5" />}
            label="Status"
            value={project.status}
          />
        </div>
      </section>

      {/* PROBLEM */}
      <SectionCard title="Problem Statement">
        <p className="whitespace-pre-line leading-8 text-slate-300">
          {project.problemStatement}
        </p>
      </SectionCard>

      {/* ARCHITECTURE */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 md:p-8">
          <h2 className="mb-6 text-2xl font-bold md:text-3xl">Architecture</h2>

          <button
            onClick={() => setShowArchitecture((prev) => !prev)}
            className="flex w-full items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 px-5 py-4 text-left transition hover:border-cyan-500/30"
          >
            <span className="font-medium text-slate-200">
              View Detailed Architecture
            </span>

            <ChevronDown
              className={`transition ${showArchitecture ? "rotate-180" : ""}`}
            />
          </button>

          {showArchitecture && (
            <pre className="mt-4 overflow-auto rounded-2xl border border-slate-800 bg-black p-5 text-sm leading-7 text-slate-300">
              {project.architecture}
            </pre>
          )}
        </div>
      </section>

      {/* CHALLENGES */}
      <SectionCard title="Challenges">
        <div className="grid gap-5">
          {challengeBlocks.map((challenge: string, index: number) => {
            const lines = challenge.split("\n").filter(Boolean);

            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-800 bg-slate-950 p-5 md:p-6"
              >
                <h3 className="mb-3 text-lg font-semibold text-cyan-400 md:text-xl">
                  {lines[0]}
                </h3>

                <p className="leading-7 text-slate-300">
                  {lines.slice(1).join(" ")}
                </p>
              </div>
            );
          })}
        </div>
      </SectionCard>

      {/* LEARNINGS */}
      <SectionCard title="Key Learnings">
        <div className="space-y-10">
          {learningSections.map((section: string[], index: number) => {
            const heading = section[0];
            const points = section.slice(1);

            return (
              <div key={index}>
                <h3 className="mb-5 text-xl font-semibold text-cyan-400">
                  {heading}
                </h3>

                <div className="grid gap-4 md:grid-cols-2">
                  {points.map((point, pointIndex) => (
                    <div
                      key={pointIndex}
                      className="rounded-2xl border border-slate-800 bg-slate-950 p-4 leading-7 text-slate-300"
                    >
                      ✓ {point}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>

      {/* GALLERY */}
      {project.gallery?.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-16">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 md:p-8">
            <h2 className="mb-8 text-2xl font-bold md:text-3xl">
              Project Gallery
            </h2>

            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={20}
              slidesPerView={1}
            >
              {project.gallery.map((image: any, index: number) => (
                <SwiperSlide key={index}>
                  <Zoom>
                    <img
                      src={image.url}
                      alt={`Screenshot ${index + 1}`}
                      className="max-h-180 w-full rounded-2xl object-cover"
                    />
                  </Zoom>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}

      {/* RELATED PROJECTS */}
      {relatedProjects.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold md:text-3xl">
                Related Projects
              </h2>

              <p className="mt-2 text-slate-400">
                More work in a similar category or product space.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedProjects.map((item: any) => (
              <ProjectCard key={item._id} project={item} />
            ))}
          </div>
        </section>
      )}

      {/* PREV / NEXT */}
      {(previous || next) && (
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="grid gap-6 md:grid-cols-2">
            {previous ? (
              <Link
                to={`/projects/${previous.slug}`}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-500/30"
              >
                <p className="mb-2 text-sm text-slate-500">Previous Project</p>
                <h3 className="font-semibold text-slate-100">
                  {previous.title}
                </h3>
              </Link>
            ) : (
              <div />
            )}

            {next && (
              <Link
                to={`/projects/${next.slug}`}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-left transition hover:border-cyan-500/30 md:text-right"
              >
                <p className="mb-2 text-sm text-slate-500">Next Project</p>
                <h3 className="font-semibold text-slate-100">{next.title}</h3>
              </Link>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

// import { Link, useParams } from "react-router-dom";
// import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

// import { useProject } from "../../features/projects/hooks/useProject";
// import { techIcons } from "@/constants/techIcons";
// import { useEffect, useState } from "react";
// import { ArrowLeft, ChevronDown, ChevronRight } from "lucide-react";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { useProjects } from "@/features/projects/hooks/useProjects";
// import ProjectCard from "@/components/cards/ProjectCard";
// import { Helmet } from "react-helmet-async";

// import Zoom from "react-medium-image-zoom";
// import "react-medium-image-zoom/dist/styles.css";
// import { useProjectView } from "@/features/projects/hooks/useProjectView";

// import { FiEye } from "react-icons/fi";

// export default function ProjectDetails() {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const { slug } = useParams();

//   useEffect(() => {
//     if (!slug) return;

//     viewMutation.mutate(slug);
//   }, [slug]);

//   const [showArchitecture, setShowArchitecture] = useState(false);

//   const { data: projects = [] } = useProjects();

//   const viewMutation = useProjectView();

//   const { data: project, isLoading } = useProject(slug || "");

//   const sortedProjects = [...projects].sort((a, b) => {
//     if (a.featured !== b.featured) {
//       return a.featured ? -1 : 1;
//     }

//     return (a.displayOrder ?? 999) - (b.displayOrder ?? 999);
//   });

//   //   const currentIndex = projects.findIndex(
//   //     (p: any) => p && p?.slug === project?.slug,
//   //   );

//   const currentIndex = sortedProjects.findIndex(
//     (p: any) => p && p?.slug === project?.slug,
//   );

//   //   const previous = projects[currentIndex - 1];

//   //   const next = projects[currentIndex + 1];

//   const previous = sortedProjects[currentIndex - 1];

//   const next = sortedProjects[currentIndex + 1];

//   if (isLoading) {
//     return <div className="mx-auto max-w-7xl px-6 py-20">Loading...</div>;
//   }

//   if (!project) {
//     return (
//       <div className="mx-auto max-w-7xl px-6 py-20">Project not found</div>
//     );
//   }

//   const challengeBlocks = project.challenges
//     .split(/\n(?=\d+\.)/)
//     .filter(Boolean);

//   //   const relatedProjects = projects
//   //     .filter(
//   //       (p: any) => p.category === project.category && p._id !== project._id,
//   //     )
//   //     .slice(0, 3);

//   const relatedProjects = sortedProjects
//     .filter(
//       (p: any) => p.category === project.category && p._id !== project._id,
//     )
//     .slice(0, 3);

//   return (
//     <div className="min-h-screen bg-slate-950 text-white">
//       {/* SEO */}

//       <Helmet>
//         <title>{project.title} | Tejvir Chauhan</title>

//         <meta name="description" content={project.shortDescription} />

//         <meta name="keywords" content={project.technologies.join(",")} />
//       </Helmet>

//       {/* Breadcrumb + Back Button */}

//       <section className="mx-auto max-w-7xl px-6 pt-10">
//         <div className="mb-8 flex flex-col gap-4">
//           {/* Back Button */}

//           <Link
//             to="/#projects"
//             className="
//       inline-flex
//       w-fit
//       items-center
//       gap-2
//       rounded-xl
//       border
//       border-slate-800
//       bg-slate-900
//       px-4
//       py-2
//       text-sm
//       text-slate-300
//       transition-all
//       hover:border-cyan-500
//       hover:text-cyan-400
//       "
//           >
//             <ArrowLeft size={16} />
//             Back to Projects
//           </Link>

//           {/* Breadcrumb */}

//           <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
//             <Link to="/" className="transition hover:text-cyan-400">
//               Home
//             </Link>

//             <ChevronRight size={14} />

//             <Link to="/#projects" className="transition hover:text-cyan-400">
//               Projects
//             </Link>

//             <ChevronRight size={14} />

//             <span className="text-slate-300">{project.title}</span>
//           </div>
//         </div>
//       </section>

//       {/* HERO */}

//       <section className="mx-auto max-w-7xl px-6 py-20 pt-10">
//         <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
//           {/* LEFT */}

//           <div>
//             <div className="mb-4 flex flex-wrap gap-3">
//               <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-sm text-cyan-400">
//                 {project.category}
//               </span>

//               <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-sm text-emerald-400">
//                 {project.status}
//               </span>
//             </div>

//             <h1 className="mb-6 text-5xl font-bold leading-tight">
//               {project.title}
//             </h1>

//             <p className="mb-8 text-lg text-slate-400">
//               {project.shortDescription}
//             </p>

//             {/* Stats */}

//             <div className="mb-8 flex flex-wrap gap-3 text-sm text-slate-400">
//               <div className="flex items-center gap-2">
//                 <FiEye />
//                 {project.views ?? 0} Views
//               </div>

//               <span>•</span>

//               <span>Role: {project.role}</span>

//               <span>•</span>

//               <span>{project.technologies.length} Technologies</span>

//               <span>•</span>

//               <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
//             </div>

//             {/* Technologies */}

//             {/* <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"> */}
//             <div className="flex flex-wrap gap-4">
//               {project.technologies.map((tech: string) => {
//                 const Icon = techIcons[tech];

//                 return (
//                   <div
//                     key={tech}
//                     className="
// flex
// h-16
// items-center
// gap-3
// rounded-xl
// border
// border-slate-800
// bg-slate-900
// px-4
// transition-all
// hover:border-cyan-500/30
// "
//                   >
//                     {Icon && (
//                       <Icon size={24} className="text-cyan-400 shrink-0" />
//                     )}

//                     <span className="font-medium">{tech}</span>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* ACTIONS */}

//             <div className="mb-10 mt-8 flex flex-wrap gap-4">
//               {project.githubUrl && (
//                 <a
//                   href={project.githubUrl}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="
//       inline-flex
//       items-center
//       gap-2
//       rounded-xl
//       border
//       border-slate-700
//       px-6
//       py-3
//       font-medium
//       hover:border-cyan-500
//       "
//                 >
//                   <FaGithub />
//                   Source Code
//                 </a>
//               )}

//               {project.liveUrl && (
//                 <a
//                   href={project.liveUrl}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="
//       inline-flex
//       items-center
//       gap-2
//       rounded-xl
//       bg-cyan-500
//       px-6
//       py-3
//       font-medium
//       text-black
//       "
//                 >
//                   <FaExternalLinkAlt />
//                   Live Demo
//                 </a>
//               )}
//             </div>
//           </div>

//           {/* RIGHT */}

//           <div>
//             <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
//               {project.imageUrl ? (
//                 <Zoom>
//                   <img
//                     src={project.imageUrl}
//                     alt={project.title}
//                     className="h-full w-full object-cover"
//                   />
//                 </Zoom>
//               ) : (
//                 <div className="flex h-100 items-center justify-center text-slate-500">
//                   Project Screenshot
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* OVERVIEW */}

//       <section className="mx-auto max-w-7xl px-6 pb-20">
//         <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
//           <h2 className="mb-6 text-3xl font-bold">Project Overview</h2>

//           <p className="whitespace-pre-line leading-8 text-slate-300">
//             {project.fullDescription}
//           </p>
//         </div>
//       </section>

//       {/* INFO GRID */}

//       <section className="mx-auto max-w-7xl px-6 pb-20">
//         <div className="grid gap-6 md:grid-cols-3">
//           <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
//             <h3 className="mb-2 text-sm text-slate-500">Role</h3>

//             <p className="font-semibold">{project.role}</p>
//           </div>

//           <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
//             <h3 className="mb-2 text-sm text-slate-500">Category</h3>

//             <p className="font-semibold">{project.category}</p>
//           </div>

//           <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
//             <h3 className="mb-2 text-sm text-slate-500">Status</h3>

//             <p className="font-semibold capitalize">{project.status}</p>
//           </div>
//         </div>
//       </section>

//       {/* PROBLEM */}

//       <section className="mx-auto max-w-7xl px-6 pb-20">
//         <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
//           <h2 className="mb-6 text-3xl font-bold">Problem Statement</h2>

//           <p className="whitespace-pre-line text-slate-300">
//             {project.problemStatement}
//           </p>
//         </div>
//       </section>

//       {/* Architecture */}

//       {/* <section className="mx-auto max-w-7xl px-6 pb-20">
//         <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
//           <h2 className="mb-6 text-3xl font-bold">Architecture</h2>

//           <div className="grid gap-6 md:grid-cols-3">
//             <div className="rounded-2xl border border-slate-800 p-6">
//               <h3 className="mb-3 text-xl font-semibold">Frontend</h3>

//               <p className="text-slate-400">React.js</p>
//             </div>

//             <div className="rounded-2xl border border-slate-800 p-6">
//               <h3 className="mb-3 text-xl font-semibold">Backend</h3>

//               <p className="text-slate-400">Node.js + Express.js</p>
//             </div>

//             <div className="rounded-2xl border border-slate-800 p-6">
//               <h3 className="mb-3 text-xl font-semibold">Database</h3>

//               <p className="text-slate-400">MongoDB</p>
//             </div>
//           </div>

//           <pre
//             className="
//       mt-8
//       overflow-x-auto
//       rounded-2xl
//       bg-slate-950
//       p-6
//       text-sm
//       text-slate-300
//       "
//           >
//             {project.architecture}
//           </pre>
//         </div>
//       </section> */}

//       <section className="mx-auto max-w-7xl px-6 pb-20">
//         <h2 className="mb-8 text-3xl font-bold">Architecture</h2>
//         <button
//           onClick={() => setShowArchitecture(!showArchitecture)}
//           className="
//   flex
//   w-full
//   items-center
//   justify-between
//   rounded-2xl
//   border
//   border-slate-800
//   bg-slate-950
//   p-5
//   "
//         >
//           <span>View Detailed Architecture</span>

//           <ChevronDown className={showArchitecture ? "rotate-180" : ""} />
//         </button>

//         {showArchitecture && (
//           <pre
//             className="
//     mt-4
//     overflow-auto
//     rounded-2xl
//     bg-black
//     p-6
//     text-sm
//     "
//           >
//             {project.architecture}
//           </pre>
//         )}
//       </section>

//       {/* CHALLENGES */}

//       <section className="mx-auto max-w-7xl px-6 pb-20">
//         <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
//           <h2 className="mb-6 text-3xl font-bold">Challenges</h2>

//           <div className="grid gap-6">
//             {challengeBlocks.map((challenge: any, index: number) => {
//               const lines = challenge.split("\n").filter(Boolean);

//               return (
//                 <div
//                   key={index}
//                   className="
//           rounded-2xl
//           border
//           border-slate-800
//           bg-slate-950
//           p-6
//           "
//                 >
//                   <h3 className="mb-4 text-xl font-semibold text-cyan-400">
//                     {lines[0]}
//                   </h3>

//                   <p className="text-slate-300 leading-7">
//                     {lines.slice(1).join(" ")}
//                   </p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* LEARNINGS */}

//       <section className="mx-auto max-w-7xl px-6 pb-24">
//         <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
//           <h2 className="mb-8 text-3xl font-bold">Key Learnings</h2>

//           {project.learnings
//             .split("\n\n")
//             .map((section: string, index: number) => {
//               const lines = section.split("\n").filter(Boolean);

//               if (!lines.length) {
//                 return null;
//               }

//               const heading = lines[0];
//               const points = lines.slice(1);

//               return (
//                 <div key={index} className="mb-10">
//                   <h3 className="mb-5 text-xl font-semibold text-cyan-400">
//                     {heading}
//                   </h3>

//                   <div className="grid gap-4 md:grid-cols-2">
//                     {points.map((point, pointIndex) => (
//                       <div
//                         key={pointIndex}
//                         className="
//                     rounded-2xl
//                     border
//                     border-slate-800
//                     bg-slate-950
//                     p-4
//                     "
//                       >
//                         ✓ {point}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               );
//             })}
//         </div>
//       </section>

//       {/* Gallery */}

//       {project.gallery?.length > 0 && (
//         <section className="mx-auto max-w-7xl px-6 pb-24">
//           <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
//             <h2 className="mb-8 text-3xl font-bold">Project Gallery</h2>

//             <Swiper
//               modules={[Navigation, Pagination]}
//               navigation
//               pagination={{
//                 clickable: true,
//               }}
//               spaceBetween={20}
//               slidesPerView={1}
//             >
//               {project.gallery.map((image: any, index: number) => (
//                 <SwiperSlide key={index}>
//                   <Zoom>
//                     <img
//                       src={image.url}
//                       alt={`Screenshot ${index + 1}`}
//                       className="
//       h-125
//       w-full
//       rounded-2xl
//       object-cover
//       "
//                     />
//                   </Zoom>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//         </section>
//       )}

//       {/* Related Projects */}

//       {relatedProjects.length > 0 && (
//         <section className="mx-auto max-w-7xl px-6 pb-24">
//           <h2 className="mb-8 text-3xl font-bold">Related Projects</h2>

//           <div className="grid gap-6 md:grid-cols-3">
//             {relatedProjects.map((item: any) => (
//               <ProjectCard key={item._id} project={item} />
//             ))}
//           </div>
//         </section>
//       )}

//       {/* Navigation */}

//       <section className="mx-auto max-w-7xl px-6 pb-24">
//         <div className="grid gap-6 md:grid-cols-2">
//           {previous && (
//             <Link
//               to={`/projects/${previous.slug}`}
//               className="
//         rounded-2xl
//         border
//         border-slate-800
//         bg-slate-900
//         p-6
//         "
//             >
//               <p className="mb-2 text-sm text-slate-500">Previous Project</p>

//               <h3 className="font-semibold">{previous.title}</h3>
//             </Link>
//           )}

//           {next && (
//             <Link
//               to={`/projects/${next.slug}`}
//               className="
//         rounded-2xl
//         border
//         border-slate-800
//         bg-slate-900
//         p-6
//         text-right
//         "
//             >
//               <p className="mb-2 text-sm text-slate-500">Next Project</p>

//               <h3 className="font-semibold">{next.title}</h3>
//             </Link>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// }
