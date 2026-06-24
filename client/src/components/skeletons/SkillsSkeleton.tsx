export default function SkillsSkeleton() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mx-auto mb-12 h-10 w-64 rounded bg-slate-800 animate-pulse" />

      <div className="grid gap-8 md:grid-cols-2">
        {[1, 2].map((col) => (
          <div key={col} className="space-y-5">
            {[1, 2, 3, 4, 5].map((row) => (
              <div key={row} className="animate-pulse">
                <div className="mb-2 h-4 w-40 rounded bg-slate-800" />

                <div className="h-3 rounded-full bg-slate-800" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
