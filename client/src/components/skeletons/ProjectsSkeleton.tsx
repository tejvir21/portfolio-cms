export default function ProjectsSkeleton() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mx-auto mb-12 h-10 w-64 rounded bg-slate-800 animate-pulse" />

      <div className="grid gap-6 md:grid-cols-2">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="animate-pulse rounded-2xl border border-slate-800 bg-slate-900 p-6"
          >
            <div className="h-56 rounded-xl bg-slate-800" />

            <div className="mt-6 h-6 w-3/4 rounded bg-slate-800" />

            <div className="mt-4 space-y-2">
              <div className="h-4 rounded bg-slate-800" />
              <div className="h-4 rounded bg-slate-800" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
