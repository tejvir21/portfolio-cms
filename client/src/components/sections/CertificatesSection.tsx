import { useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";

import { useCertificates } from "../../features/certificates/hooks/useCertificates";
import CardSkeleton from "../skeletons/CardSkeleton";

const formatDate = (value?: string) => {
  if (!value) return "";

  return new Date(value).toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
  });
};

export default function CertificatesSection() {
  const { data, isLoading } = useCertificates();
  const [showAll, setShowAll] = useState(false);

  const certificates = useMemo(() => {
    return [...(data ?? [])].sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;

      return new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime();
    });
  }, [data]);

  const featuredCertificates = certificates.filter(
    (certificate) => certificate.featured,
  );

  const collapsedCertificates = featuredCertificates.length
    ? featuredCertificates
    : certificates.slice(0, 6);

  const visibleCertificates = showAll ? certificates : collapsedCertificates;
  const hasHiddenCertificates =
    certificates.length > visibleCertificates.length;

  if (isLoading) return <CardSkeleton />;

  if (!certificates.length) return null;

  return (
    <section id="certificates" className="mx-auto max-w-7xl px-6 py-24">
      <h2 className="mb-12 text-center text-4xl font-bold text-sky-400">
        Certificates
      </h2>

      {/* <p className="mx-auto mb-12 max-w-2xl text-center text-slate-400">
        Featured certificates are shown first. Use the admin Featured toggle for
        the certificates you want visitors to notice immediately.
      </p> */}

      <div className="grid gap-8 md:grid-cols-3">
        {visibleCertificates.map((certificate) => {
          const details = [
            certificate.issuer && `Issued by ${certificate.issuer}`,
            certificate.issueDate &&
              `Issued ${formatDate(certificate.issueDate)}`,
            certificate.credentialId &&
              `Credential ID: ${certificate.credentialId}`,
          ].filter(Boolean);

          return (
            <article
              key={certificate._id}
              className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-[0_0_35px_rgba(34,211,238,0.08)] transition hover:border-cyan-400/70"
            >
              {certificate.imageUrl && (
                <div className="aspect-4/3 bg-slate-950 p-4">
                  <img
                    src={certificate.imageUrl}
                    alt={certificate.title}
                    className="h-full w-full rounded-xl object-contain"
                  />
                </div>
              )}

              <div className="p-6">
                {certificate.featured && (
                  <span className="mb-4 inline-flex rounded-full border border-cyan-400/40 px-3 py-1 text-xs text-cyan-300">
                    Featured
                  </span>
                )}

                <h3 className="text-center text-xl font-semibold">
                  {certificate.title}
                </h3>

                {!!details.length && (
                  <ul className="mt-5 space-y-2 text-sm text-slate-400">
                    {details.map((detail) => (
                      <li key={detail} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {certificate.credentialUrl && (
                  <div className="text-center">
                    <a
                      href={certificate.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center gap-2 text-cyan-300"
                    >
                      <ExternalLink size={16} />
                      View certificate
                    </a>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {(hasHiddenCertificates || showAll) && certificates.length > 6 && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setShowAll((current) => !current)}
            className="rounded-xl border border-cyan-400 px-5 py-3 text-cyan-300 transition hover:bg-cyan-400 hover:text-slate-950"
          >
            {showAll
              ? "Show featured only"
              : `Show all certificates (${certificates.length})`}
          </button>
        </div>
      )}
    </section>
  );
}
