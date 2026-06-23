interface Props {
  title: string;
  description: string;
}

export default function EmptyState({ title, description }: Props) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-700 p-12 text-center">
      <h3 className="text-xl font-semibold">{title}</h3>

      <p className="mt-2 text-slate-400">{description}</p>
    </div>
  );
}
