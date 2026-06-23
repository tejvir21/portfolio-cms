interface Props {
  value: string | number;
  label: string;
}

export default function StatCard({ value, label }: Props) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 text-center transition hover:border-cyan-500/30">
      <p className="text-3xl font-bold text-cyan-300">{value}</p>

      <p className="mt-1 text-sm text-slate-400">{label}</p>
    </div>
  );
}
