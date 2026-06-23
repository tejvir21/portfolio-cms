import { Plus } from "lucide-react";

interface Props {
  onClick: () => void;
  label?: string;
}

export default function AddButton({ onClick, label = "Add New" }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2 font-medium hover:cursor-pointer"
    >
      <Plus size={18} />
      {label}
    </button>
  );
}
