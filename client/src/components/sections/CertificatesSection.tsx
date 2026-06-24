import { useMemo, useState } from "react";
import {
  BadgeCheck,
  CalendarDays,
  ExternalLink,
  Building2,
  Hash,
} from "lucide-react";

import { useCertificates } from "../../features/certificates/hooks/useCertificates";
import { useCertificateCompanies } from "../../features/certificates/hooks/useCertificateCompanies";
import CardSkeleton from "../skeletons/CardSkeleton";

const formatDate = (value?: string) => {
  if (!value) return "";

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "";

  return parsed.toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
  });
};

const getCompanyInitials = (value?: string) => {
  if (!value) return "C";

  const parts = value.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
};

export default function CertificatesSection() {
  const { data, isLoading } = useCertificates();
  const { data: companies } = useCertificateCompanies();
  const [showAll, setShowAll] = useState(false);

  const companyMap = useMemo(() => {
    const map = new Map<string, { logoUrl: string; name: string }>();

    (companies ?? []).forEach((company) => {
      map.set(company.name.toLowerCase(), {
        logoUrl: company.logoUrl,
        name: company.name,
      });
    });

    return map;
  }, [companies]);

  const certificates = useMemo(() => {
    return [...(data ?? [])].sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime();
    });
  }, [data]);

  if (isLoading) return <CardSkeleton />;
  if (!certificates.length) return null;

  const featuredCertificates = certificates.filter(
    (certificate) => certificate.featured,
  );

  const collapsedCertificates = featuredCertificates.length
    ? featuredCertificates.slice(0, 4)
    : certificates.slice(0, 4);

  const visibleCertificates = showAll ? certificates : collapsedCertificates;
  const hasHiddenCertificates =
    certificates.length > visibleCertificates.length;

  return (
    <section id="certificates" className="mx-auto max-w-7xl px-6 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-bold text-sky-400">Certificates</h2>
        <p className="mt-4 text-slate-400">
          Certifications, credentials, and learning milestones that strengthen
          my engineering foundation and domain knowledge.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {visibleCertificates.map((certificate) => {
          const company = certificate.company
            ? companyMap.get(certificate.company.toLowerCase())
            : undefined;

          const issuer = certificate.issuer?.trim();
          const credentialId = certificate.credentialId?.trim();
          const issueDate = formatDate(certificate.issueDate);

          return (
            <article
              key={certificate._id}
              className="rounded-3xl border border-slate-800 bg-slate-900/90 p-5 shadow-[0_0_30px_rgba(34,211,238,0.05)] transition hover:-translate-y-1 hover:border-cyan-500/30 hover:shadow-[0_0_40px_rgba(34,211,238,0.10)]"
            >
              <div className="flex items-start gap-4">
                {/* badge / logo */}
                <div className="relative flex h-18 w-18 shrink-0 items-center justify-center">
                  <div className="absolute inset-0 rounded-2xl bg-cyan-500/10 blur-xl" />

                  <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-slate-700 bg-slate-950">
                    {company?.logoUrl ? (
                      <img
                        src={company.logoUrl}
                        alt={company.name}
                        className="h-10 w-10 object-contain"
                      />
                    ) : certificate.company ? (
                      <span className="text-sm font-semibold tracking-wide text-cyan-300">
                        {getCompanyInitials(certificate.company)}
                      </span>
                    ) : (
                      <BadgeCheck size={26} className="text-cyan-300" />
                    )}
                  </div>
                </div>

                {/* content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-white">
                        {certificate.title}
                      </h3>

                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        {certificate.company && (
                          <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
                            {certificate.company}
                          </span>
                        )}

                        {certificate.featured && (
                          <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-slate-300">
                    {issuer && (
                      <div className="flex items-start gap-3">
                        <Building2
                          size={16}
                          className="mt-0.5 shrink-0 text-cyan-300"
                        />
                        <span className="line-clamp-2">Issued by {issuer}</span>
                      </div>
                    )}

                    {credentialId && (
                      <div className="flex items-start gap-3">
                        <Hash
                          size={16}
                          className="mt-0.5 shrink-0 text-cyan-300"
                        />
                        <span className="line-clamp-2 break-all">
                          Credential ID: {credentialId}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-2 text-sm text-slate-400">
                      {issueDate ? (
                        <>
                          <CalendarDays size={15} />
                          {issueDate}
                        </>
                      ) : (
                        <span className="text-slate-500">
                          Date not available
                        </span>
                      )}
                    </div>

                    {certificate.credentialUrl ? (
                      <a
                        href={certificate.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/5 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:border-cyan-400 hover:bg-cyan-500/10"
                      >
                        <ExternalLink size={15} />
                        View Credential
                      </a>
                    ) : (
                      <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs text-slate-400">
                        No public link
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {(hasHiddenCertificates || showAll) && certificates.length > 4 && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setShowAll((current) => !current)}
            className="rounded-xl border border-cyan-400 px-5 py-3 text-cyan-300 transition hover:bg-cyan-400 hover:text-slate-950"
          >
            {showAll
              ? "Show less"
              : `Show all certificates (${certificates.length})`}
          </button>
        </div>
      )}
    </section>
  );
}

// import { useMemo, useState } from "react";
// import { ExternalLink } from "lucide-react";

// import { useCertificates } from "../../features/certificates/hooks/useCertificates";
// import CardSkeleton from "../skeletons/CardSkeleton";

// const formatDate = (value?: string) => {
//   if (!value) return "";

//   return new Date(value).toLocaleDateString("en-IN", {
//     month: "short",
//     year: "numeric",
//   });
// };

// export default function CertificatesSection() {
//   const { data, isLoading } = useCertificates();
//   const [showAll, setShowAll] = useState(false);

//   const certificates = useMemo(() => {
//     return [...(data ?? [])].sort((a, b) => {
//       if (a.featured !== b.featured) return a.featured ? -1 : 1;

//       return new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime();
//     });
//   }, [data]);

//   const featuredCertificates = certificates.filter(
//     (certificate) => certificate.featured,
//   );

//   const collapsedCertificates = featuredCertificates.length
//     ? featuredCertificates
//     : certificates.slice(0, 6);

//   const visibleCertificates = showAll ? certificates : collapsedCertificates;
//   const hasHiddenCertificates =
//     certificates.length > visibleCertificates.length;

//   if (isLoading) return <CardSkeleton />;

//   if (!certificates.length) return null;

//   return (
//     <section id="certificates" className="mx-auto max-w-7xl px-6 py-24">
//       <h2 className="mb-12 text-center text-4xl font-bold text-sky-400">
//         Certificates
//       </h2>

//       {/* <p className="mx-auto mb-12 max-w-2xl text-center text-slate-400">
//         Featured certificates are shown first. Use the admin Featured toggle for
//         the certificates you want visitors to notice immediately.
//       </p> */}

//       <div className="grid gap-8 md:grid-cols-3">
//         {visibleCertificates.map((certificate) => {
//           const details = [
//             certificate.issuer && `Issued by ${certificate.issuer}`,
//             certificate.issueDate &&
//               `Issued ${formatDate(certificate.issueDate)}`,
//             certificate.credentialId &&
//               `Credential ID: ${certificate.credentialId}`,
//           ].filter(Boolean);

//           return (
//             <article
//               key={certificate._id}
//               className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-[0_0_35px_rgba(34,211,238,0.08)] transition hover:border-cyan-400/70"
//             >
//               {certificate.imageUrl && (
//                 <div className="aspect-4/3 bg-slate-950 p-4">
//                   <img
//                     src={certificate.imageUrl}
//                     alt={certificate.title}
//                     className="h-full w-full rounded-xl object-contain"
//                   />
//                 </div>
//               )}

//               <div className="p-6">
//                 {certificate.featured && (
//                   <span className="mb-4 inline-flex rounded-full border border-cyan-400/40 px-3 py-1 text-xs text-cyan-300">
//                     Featured
//                   </span>
//                 )}

//                 <h3 className="text-center text-xl font-semibold">
//                   {certificate.title}
//                 </h3>

//                 {!!details.length && (
//                   <ul className="mt-5 space-y-2 text-sm text-slate-400">
//                     {details.map((detail) => (
//                       <li key={detail} className="flex gap-3">
//                         <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
//                         <span>{detail}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 )}

//                 {certificate.credentialUrl && (
//                   <div className="text-center">
//                     <a
//                       href={certificate.credentialUrl}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="mt-5 inline-flex items-center gap-2 text-cyan-300"
//                     >
//                       <ExternalLink size={16} />
//                       View certificate
//                     </a>
//                   </div>
//                 )}
//               </div>
//             </article>
//           );
//         })}
//       </div>

//       {(hasHiddenCertificates || showAll) && certificates.length > 6 && (
//         <div className="mt-10 text-center">
//           <button
//             type="button"
//             onClick={() => setShowAll((current) => !current)}
//             className="rounded-xl border border-cyan-400 px-5 py-3 text-cyan-300 transition hover:bg-cyan-400 hover:text-slate-950"
//           >
//             {showAll
//               ? "Show featured only"
//               : `Show all certificates (${certificates.length})`}
//           </button>
//         </div>
//       )}
//     </section>
//   );
// }
