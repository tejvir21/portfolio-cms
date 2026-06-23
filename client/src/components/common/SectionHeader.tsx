interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
}

export default function SectionHeader({ eyebrow, title, description }: Props) {
  return (
    <div className="mb-12">
      {eyebrow && (
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-sky-400">
          {eyebrow}
        </p>
      )}

      <h2 className="text-4xl font-bold">{title}</h2>

      {description && (
        <p className="mt-4 max-w-2xl text-slate-400">{description}</p>
      )}
    </div>
  );
}
