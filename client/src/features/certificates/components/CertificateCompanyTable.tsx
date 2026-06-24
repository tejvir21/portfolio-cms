import { Pencil, Trash2 } from "lucide-react";
import type { CertificateCompany } from "../api/certificateCompany.api";

interface Props {
  companies: CertificateCompany[];
  onEdit: (company: CertificateCompany) => void;
  onDelete: (company: CertificateCompany) => void;
}

export default function CertificateCompanyTable({
  companies,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="border-b border-slate-800 bg-slate-950/60 text-sm text-slate-400">
            <tr>
              <th className="px-5 py-4 font-medium">Logo</th>
              <th className="px-5 py-4 font-medium">Company</th>
              <th className="px-5 py-4 font-medium">Slug</th>
              <th className="px-5 py-4 font-medium">Sort</th>
              <th className="px-5 py-4 font-medium">Status</th>
              <th className="px-5 py-4 text-right font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {companies.map((company) => (
              <tr
                key={company._id}
                className="border-b border-slate-800/70 text-sm"
              >
                <td className="px-5 py-4">
                  <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-slate-700 bg-slate-950">
                    {company.logoUrl ? (
                      <img
                        src={company.logoUrl}
                        alt={company.name}
                        className="h-8 w-8 object-contain"
                      />
                    ) : (
                      <span className="text-xs text-slate-500">No logo</span>
                    )}
                  </div>
                </td>

                <td className="px-5 py-4">
                  <div className="font-medium text-white">{company.name}</div>
                </td>

                <td className="px-5 py-4 text-slate-400">{company.slug}</td>

                <td className="px-5 py-4 text-slate-300">
                  {company.sortOrder ?? 0}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      company.active
                        ? "border border-green-500/20 bg-green-500/10 text-green-400"
                        : "border border-slate-700 bg-slate-800 text-slate-400"
                    }`}
                  >
                    {company.active ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(company)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(company)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 text-slate-300 transition hover:border-red-400 hover:text-red-400"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
