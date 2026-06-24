import { MapPin, Sparkles } from "lucide-react";

import SocialLinks from "../common/SocialLinks";
import StatCard from "../common/StatCard";
import HeroSkeleton from "../skeletons/HeroSkeleton";

import { useProfile } from "../../features/profile/hooks/useProfile";
import { useProjects } from "../../features/projects/hooks/useProjects";

export default function HeroSection() {
  const { data, isLoading } = useProfile();
  const { data: projects } = useProjects();

  if (isLoading) return <HeroSkeleton />;

  if (!data?.name && !data?.role && !data?.bio) return null;

  const imageUrl = data?.imageUrl || data?.profileImage;
  const [firstName, ...restName] = data?.name?.split(" ") ?? [];

  const headlineItems =
    data?.headline
      ?.split("•")
      .map((item: any) => item.trim())
      .filter(Boolean) ?? [];

  const projectCount = projects?.length ?? 0;
  const yearsExperience = data?.yearsExperience?.toString().trim() || "1+";
  const education = data?.education?.trim() || "B.Tech CSE";

  return (
    <section className="mx-auto max-w-7xl px-6 py-14 md:py-20">
      <div
        className={`grid items-center gap-12 lg:gap-16 ${
          imageUrl ? "lg:grid-cols-[1.05fr_0.95fr]" : ""
        }`}
      >
        <div className="order-2 lg:order-1">
          {(data?.location || data?.isOpenToWork) && (
            <div className="mb-5 flex flex-wrap gap-3">
              {data?.isOpenToWork && (
                <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  Open to opportunities
                </div>
              )}

              {data?.location && (
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300">
                  <MapPin size={15} />
                  {data.location}
                </div>
              )}
            </div>
          )}

          {data?.name && (
            <h1 className="max-w-4xl text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
              Hi, I&apos;m <span className="text-cyan-300">{firstName}</span>
              {restName.length > 0 && (
                <>
                  <br />
                  <span className="text-sky-500">{restName.join(" ")}</span>
                </>
              )}
            </h1>
          )}

          {data?.role && (
            <p className="mt-5 text-lg font-medium text-slate-200 md:text-2xl">
              {data.role}
            </p>
          )}

          {headlineItems.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {headlineItems.map((item: any) => (
                <span
                  key={item}
                  className="rounded-full border border-cyan-500/25 bg-cyan-500/5 px-4 py-2 text-sm font-medium text-cyan-300"
                >
                  {item}
                </span>
              ))}
            </div>
          )}

          {data?.bio && (
            <p className="mt-8 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              {data.bio}
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-4">
            <StatCard value={`${projectCount}+`} label="Projects" />
            <StatCard value={yearsExperience} label="Years Experience" />
            <StatCard value="B.Tech" label={education} />
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            {!!projects?.length && (
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                View Projects
              </a>
            )}

            {data?.resumeUrl && (
              <a
                href={data.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 font-semibold text-slate-100 transition hover:border-cyan-400 hover:text-cyan-300"
              >
                View Resume
              </a>
            )}
          </div>

          <div className="mt-8">
            <SocialLinks profile={data} showResume={false} />
          </div>
        </div>

        {imageUrl && (
          <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <div className="relative w-full max-w-85 md:max-w-105">
              <div className="absolute inset-0 rounded-4xl bg-cyan-400/10 blur-3xl" />

              <div className="relative overflow-hidden rounded-4xl border border-cyan-400/25 bg-slate-900/90 p-3 shadow-[0_0_60px_rgba(34,211,238,0.14)]">
                <div className="absolute right-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-slate-950/80 px-3 py-1 text-xs font-medium text-cyan-300 backdrop-blur">
                  <Sparkles size={14} />
                  Portfolio
                </div>

                <div className="aspect-4/5 overflow-hidden rounded-3xl bg-slate-950">
                  <img
                    src={imageUrl}
                    alt={data?.name ?? "Profile"}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// import SocialLinks from "../common/SocialLinks";
// import StatCard from "../common/StatCard";
// import HeroSkeleton from "../skeletons/HeroSkeleton";

// import { useProfile } from "../../features/profile/hooks/useProfile";
// import { useProjects } from "../../features/projects/hooks/useProjects";

// export default function HeroSection() {
//   const { data, isLoading } = useProfile();
//   const { data: projects } = useProjects();

//   if (isLoading) return <HeroSkeleton />;

//   if (!data?.name && !data?.role && !data?.bio) return null;

//   const imageUrl = data?.imageUrl || data?.profileImage;
//   const [firstName, ...restName] = data?.name?.split(" ") ?? [];

//   const headlineItems =
//     data?.headline
//       ?.split("•")
//       .map((item: any) => item.trim())
//       .filter(Boolean) ?? [];

//   const projectCount = projects?.length ?? 0;
//   const yearsExperience = data?.yearsExperience?.toString().trim() || "1+";
//   const education = data?.education?.trim() || "B.Tech CSE";

//   return (
//     <section
//       className={`mx-auto min-h-[80vh] max-w-7xl items-center gap-14 px-6 py-14 md:py-20 ${
//         imageUrl ? "grid lg:grid-cols-[1.05fr_0.95fr]" : "flex"
//       }`}
//     >
//       <div className="w-full">
//         {data?.name && (
//           <h1 className="max-w-4xl text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
//             Hi, I&apos;m <span className="text-cyan-300">{firstName}</span>
//             {restName.length > 0 && (
//               <>
//                 <br />
//                 <span className="text-sky-500">{restName.join(" ")}</span>
//               </>
//             )}
//           </h1>
//         )}

//         {data?.role && (
//           <p className="mt-5 text-lg font-medium text-slate-200 md:text-2xl">
//             {data.role}
//           </p>
//         )}

//         {headlineItems.length > 0 && (
//           <div className="mt-6 flex flex-wrap gap-3">
//             {headlineItems.map((item: any) => (
//               <span
//                 key={item}
//                 className="rounded-full border border-cyan-500/25 bg-cyan-500/5 px-4 py-2 text-sm font-medium text-cyan-300"
//               >
//                 {item}
//               </span>
//             ))}
//           </div>
//         )}

//         {data?.isOpenToWork && (
//           <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400">
//             <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
//             Open To Opportunities
//           </div>
//         )}

//         {data?.bio && (
//           <p className="mt-8 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
//             {data.bio}
//           </p>
//         )}

//         <div className="mt-8 flex flex-wrap gap-4">
//           <StatCard value={`${projectCount}+`} label="Projects" />
//           <StatCard value={yearsExperience} label="Years Experience" />
//           <StatCard value="B.Tech" label={education} />
//         </div>

//         <div className="mt-10 flex flex-wrap gap-4">
//           {!!projects?.length && (
//             <a
//               href="#projects"
//               className="inline-flex items-center justify-center rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
//             >
//               View Projects
//             </a>
//           )}

//           {data?.resumeUrl && (
//             <a
//               href={data.resumeUrl}
//               target="_blank"
//               rel="noreferrer"
//               className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 font-semibold text-slate-100 transition hover:border-cyan-400 hover:text-cyan-300"
//             >
//               View Resume
//             </a>
//           )}
//         </div>

//         <div className="mt-8">
//           <SocialLinks profile={data} showResume={false} />
//         </div>
//       </div>

//       {imageUrl && (
//         <div className="flex justify-center lg:justify-end">
//           <div className="relative aspect-square w-full max-w-85 rounded-full border-4 border-cyan-400/80 bg-slate-950 p-2 shadow-[0_0_60px_rgba(34,211,238,0.16)] md:max-w-100">
//             <div className="absolute inset-0 rounded-full bg-cyan-400/5 blur-3xl" />
//             <img
//               src={imageUrl}
//               alt={data?.name ?? "Profile"}
//               className="relative h-full w-full rounded-full object-cover"
//             />
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }
