import { Pencil, Trash2 } from "lucide-react";

import DataTable from "../../../components/admin/DataTable";
import { type Experience } from "../types/experience.types";

interface Props {
  experiences: Experience[];
  onEdit: (experience: Experience) => void;
  onDelete: (experience: Experience) => void;
}

const formatDate = (value?: string) => {
  if (!value) return "Present";

  return new Date(value).toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
  });
};

export default function ExperienceTable({
  experiences,
  onEdit,
  onDelete,
}: Props) {
  return (
    <DataTable
      data={experiences}
      columns={[
        {
          key: "company",
          title: "Company",
          render: (row) => (
            <div className="flex items-center gap-3">
              {row.companyLogo && (
                <img
                  src={row.companyLogo}
                  alt=""
                  className="h-10 w-10 rounded-lg object-cover"
                />
              )}

              <div>
                <p className="font-medium">{row.company}</p>
                <p className="text-sm text-slate-400">{row.location}</p>
              </div>
            </div>
          ),
        },
        {
          key: "position",
          title: "Position",
        },
        {
          key: "employmentType",
          title: "Type",
        },
        {
          key: "duration",
          title: "Duration",
          render: (row) =>
            `${formatDate(row.startDate)} - ${
              row.currentlyWorking ? "Present" : formatDate(row.endDate)
            }`,
        },
        {
          key: "actions",
          title: "Actions",
          render: (row) => (
            <div className="flex gap-3">
              <button type="button" onClick={() => onEdit(row)}>
                <Pencil
                  size={18}
                  className="hover:cursor-pointer hover:text-sky-500"
                />
              </button>

              <button type="button" onClick={() => onDelete(row)}>
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
