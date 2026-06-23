import { Pencil, Trash2 } from "lucide-react";

import DataTable from "../../../components/admin/DataTable";
import StatusBadge from "../../../components/admin/StatusBadge";
import { type Certificate } from "../types/certificate.types";

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
        { key: "title", title: "Title" },
        { key: "issuer", title: "Issuer" },
        {
          key: "featured",
          title: "Status",
          render: (row) => <StatusBadge active={row.featured} />,
        },
        {
          key: "actions",
          title: "Actions",
          render: (row) => (
            <div className="flex gap-3">
              <button type="button" onClick={() => onEdit(row)}>
                <Pencil size={18} className="hover:text-sky-500" />
              </button>
              <button type="button" onClick={() => onDelete(row)}>
                <Trash2 size={18} className="hover:text-red-500" />
              </button>
            </div>
          ),
        },
      ]}
    />
  );
}
