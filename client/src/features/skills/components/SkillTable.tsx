import { Pencil, Trash2 } from "lucide-react";

import DataTable from "../../../components/admin/DataTable";
import { type Skill } from "../types/skill.types";

interface Props {
  skills: Skill[];
  onEdit: (skill: Skill) => void;
  onDelete: (skill: Skill) => void;
}

export default function SkillTable({ skills, onEdit, onDelete }: Props) {
  return (
    <DataTable
      data={skills}
      columns={[
        { key: "name", title: "Name" },
        { key: "category", title: "Category" },
        {
          key: "proficiency",
          title: "Proficiency",
          render: (row) => `${row.proficiency}%`,
        },

        { key: "skillSequence", title: "Skill Order" },

        { key: "displayOrder", title: "Display Order" },
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
