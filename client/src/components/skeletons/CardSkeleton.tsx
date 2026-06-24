export default function CardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="h-6 w-48 rounded bg-slate-800" />

      <div className="mt-4 space-y-2">
        <div className="h-4 rounded bg-slate-800" />
        <div className="h-4 rounded bg-slate-800" />
        <div className="h-4 w-3/4 rounded bg-slate-800" />
      </div>
    </div>
  );
}
