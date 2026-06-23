import { Eye, Trash2 } from "lucide-react";

import DataTable from "../../../components/admin/DataTable";
import { type ContactMessage } from "../types/contact.types";

interface Props {
  messages: ContactMessage[];
  onView: (message: ContactMessage) => void;
  onDelete: (message: ContactMessage) => void;
}

export default function MessageTable({ messages, onView, onDelete }: Props) {
  return (
    <DataTable
      data={messages}
      columns={[
        { key: "name", title: "Name" },
        { key: "email", title: "Email" },
        { key: "subject", title: "Subject" },
        {
          key: "createdAt",
          title: "Received",
          render: (row) => new Date(row.createdAt).toLocaleDateString("en-IN"),
        },
        {
          key: "actions",
          title: "Actions",
          render: (row) => (
            <div className="flex gap-3">
              <button type="button" onClick={() => onView(row)}>
                <Eye size={18} className="hover:text-sky-500" />
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
