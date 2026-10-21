import DataTable from "../../../components/admin/DataTable";

import StatusBadge from "../../../components/admin/StatusBadge";

import { Pencil, Trash2 } from "lucide-react";

import { type Project } from "../types/project.types";

interface Props {
  projects: Project[];

  onEdit: (project: Project) => void;

  onDelete: (project: Project) => void;
}

export default function ProjectTable({ projects, onEdit, onDelete }: Props) {
  return (
    <DataTable
      data={projects}
      columns={[
        {
          key: "title",
          title: "Title",
        },

        {
          key: "views",
          title: "Views",
        },

        {
          key: "display",
          title: "Display",
          render: (row) => (
            <>
              {row.display ? (
                <button
                  type="button"
                  className="bg-green-500 h-4 w-4 rounded-full"
                ></button>
              ) : (
                <button
                  type="button"
                  className="bg-red-500 h-4 w-4 rounded-full"
                ></button>
              )}
            </>
          ),
        },

        {
          key: "displayOrder",
          title: "Display Order",
        },

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
              <button onClick={() => onEdit(row)}>
                <Pencil
                  size={18}
                  className="hover:cursor-pointer hover:text-sky-500"
                />
              </button>

              <button onClick={() => onDelete(row)}>
                <Trash2
                  size={18}
                  className="hover:cursor-pointer hover:text-red-500"
                />
              </button>
            </div>
          ),
        },
      ]}
    />
  );
}
