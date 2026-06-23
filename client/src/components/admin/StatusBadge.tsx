interface Props {
  active: boolean;
}

export default function StatusBadge({ active }: Props) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        active
          ? "bg-green-500/10 text-green-400"
          : "bg-slate-700 text-slate-300"
      }`}
    >
      {active ? "Featured" : "Normal"}
    </span>
  );
}
