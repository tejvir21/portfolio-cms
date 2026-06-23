export default function TableSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((row) => (
        <div key={row} className="h-14 animate-pulse rounded-xl bg-slate-900" />
      ))}
    </div>
  );
}
