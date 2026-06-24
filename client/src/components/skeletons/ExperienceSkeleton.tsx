import CardSkeleton from "./CardSkeleton";

export default function ExperienceSkeleton() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mx-auto mb-12 h-10 w-64 rounded bg-slate-800 animate-pulse" />

      <div className="space-y-6">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </section>
  );
}
