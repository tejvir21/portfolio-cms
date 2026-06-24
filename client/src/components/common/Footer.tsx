import { Mail, MapPin } from "lucide-react";

import SocialLinks from "./SocialLinks";
import { useProfile } from "../../features/profile/hooks/useProfile";

export default function Footer() {
  const { data } = useProfile();

  return (
    <footer className="border-t border-slate-800 bg-slate-950/80 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <div>
            {data?.name && (
              <h3 className="text-2xl font-semibold text-white">{data.name}</h3>
            )}

            {data?.role && <p className="mt-2 text-slate-300">{data.role}</p>}

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">
              Built with React, TypeScript, and a custom portfolio CMS. Designed
              to showcase projects, engineering work, experience, and technical
              growth in one place.
            </p>

            <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-400">
              {data?.email && (
                <span className="inline-flex items-center gap-2">
                  <Mail size={15} />
                  {data.email}
                </span>
              )}

              {data?.location && (
                <span className="inline-flex items-center gap-2">
                  <MapPin size={15} />
                  {data.location}
                </span>
              )}
            </div>

            {data?.resumeUrl && (
              <a
                href={data.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center rounded-xl border border-cyan-500/30 bg-cyan-500/5 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:border-cyan-400 hover:bg-cyan-500/10"
              >
                View Resume
              </a>
            )}
          </div>

          <div className="flex flex-col items-start gap-5 md:items-end">
            <SocialLinks profile={data} showResume={false} />

            <p className="text-sm text-slate-500 md:text-right">
              © {new Date().getFullYear()} {data?.name || "Portfolio"}. All
              rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// import SocialLinks from "./SocialLinks";
// import { useProfile } from "../../features/profile/hooks/useProfile";

// export default function Footer() {
//   const { data } = useProfile();

//   return (
//     <footer className="border-t border-slate-800 py-10">
//       <div className="mx-auto max-w-7xl px-6">
//         <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
//           <div>
//             {data?.name && (
//               <p className="text-lg font-semibold text-slate-100">
//                 {data.name}
//               </p>
//             )}

//             <p className="mt-2 text-sm text-slate-400">
//               Built with React, TypeScript, and modern web tooling.
//             </p>

//             {data?.resumeUrl && (
//               <a
//                 href={data.resumeUrl}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="mt-3 inline-block text-sm font-medium text-cyan-300 transition hover:text-cyan-200"
//               >
//                 View Resume
//               </a>
//             )}
//           </div>

//           <div className="flex flex-col items-center gap-4 md:items-end">
//             <SocialLinks profile={data} />

//             <p className="text-sm text-slate-500">
//               © {new Date().getFullYear()} {data?.name || "Portfolio"}. All
//               rights reserved.
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }
