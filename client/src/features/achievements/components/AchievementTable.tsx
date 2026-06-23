import { Pencil, Trash2 } from "lucide-react";

import DataTable from "../../../components/admin/DataTable";
import { type Achievement } from "../types/achievement.types";

interface Props {
  achievements: Achievement[];
  onEdit: (achievement: Achievement) => void;
  onDelete: (achievement: Achievement) => void;
}

export default function AchievementTable({
  achievements,
  onEdit,
  onDelete,
}: Props) {
  return (
    <DataTable
      data={achievements}
      columns={[
        {
          key: "title",
          title: "Title",
          render: (row) => (
            <div className="flex items-center gap-3">
              {row.imageUrl && (
                <img
                  src={row.imageUrl}
                  alt=""
                  className="h-10 w-10 rounded-lg object-cover"
                />
              )}
              <span>{row.title}</span>
            </div>
          ),
        },
        { key: "organization", title: "Organization" },
        { key: "displayOrder", title: "Order" },
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
