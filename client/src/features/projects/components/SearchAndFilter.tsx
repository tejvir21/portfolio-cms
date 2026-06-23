import { Search } from "lucide-react";

interface Props {
  search: string;
  setSearch: (value: string) => void;

  technologies: string[];
  selectedTech: string;

  setSelectedTech: (value: string) => void;
}

export default function SearchAndFilter({
  search,
  setSearch,
  technologies,
  selectedTech,
  setSelectedTech,
}: Props) {
  return (
    <div className="mb-12 space-y-6">
      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects..."
          className="
            w-full
            rounded-2xl
            border
            border-slate-800
            bg-slate-900
            py-4
            pl-12
            pr-4
            outline-none
            transition
            focus:border-cyan-400
          "
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setSelectedTech("")}
          className={`rounded-full px-4 py-2 text-sm transition ${
            selectedTech === ""
              ? "bg-cyan-400 text-slate-950"
              : "border border-slate-700"
          }`}
        >
          All
        </button>

        {technologies.map((tech) => (
          <button
            key={tech}
            onClick={() => setSelectedTech(tech)}
            className={`rounded-full px-4 py-2 text-sm transition ${
              selectedTech === tech
                ? "bg-cyan-400 text-slate-950"
                : "border border-slate-700"
            }`}
          >
            {tech}
          </button>
        ))}
      </div>
    </div>
  );
}
