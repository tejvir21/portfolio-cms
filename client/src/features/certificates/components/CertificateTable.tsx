import { ExternalLink, Pencil, Trash2 } from "lucide-react";

import DataTable from "../../../components/admin/DataTable";
import StatusBadge from "../../../components/admin/StatusBadge";
import { type Certificate } from "../types/certificate.types";

const formatDate = (value?: string) => {
  if (!value) return "—";

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "—";

  return parsed.toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
  });
};

interface Props {
  certificates: Certificate[];
  onEdit: (certificate: Certificate) => void;
  onDelete: (certificate: Certificate) => void;
}

export default function CertificateTable({
  certificates,
  onEdit,
  onDelete,
}: Props) {
  return (
    <DataTable
      data={certificates}
      columns={[
        {
          key: "title",
          title: "Certificate",
          render: (row) => (
            <div className="max-w-70">
              <p className="font-medium text-white">{row.title}</p>
              <p className="mt-1 text-xs text-slate-400">{row.issuer}</p>
            </div>
          ),
        },
        {
          key: "company",
          title: "Company",
          render: (row) => (
            <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
              {row.company || "—"}
            </span>
          ),
        },
        {
          key: "issueDate",
          title: "Issued",
          render: (row) => (
            <span className="text-sm text-slate-300">
              {formatDate(row.issueDate)}
            </span>
          ),
        },
        {
          key: "credentialUrl",
          title: "Credential",
          render: (row) =>
            row.credentialUrl ? (
              <a
                href={row.credentialUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sm text-cyan-300 hover:text-cyan-200"
              >
                <ExternalLink size={14} />
                View
              </a>
            ) : (
              <span className="text-sm text-slate-500">—</span>
            ),
        },
        {
          key: "featured",
          title: "Featured",
          render: (row) => <StatusBadge active={row.featured} />,
        },
        {
          key: "actions",
          title: "Actions",
          render: (row) => (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onEdit(row)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
              >
                <Pencil size={16} />
              </button>

              <button
                type="button"
                onClick={() => onDelete(row)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-300 transition hover:border-red-400 hover:text-red-400"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ),
        },
      ]}
    />
  );
}
