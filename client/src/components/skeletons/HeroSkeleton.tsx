export default function HeroSkeleton() {
  return (
    <section className="mx-auto grid min-h-[80vh] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] animate-pulse">
      <div>
        <div className="h-20 w-96 rounded bg-slate-800" />

        <div className="mt-8 h-8 w-64 rounded bg-slate-800" />

        <div className="mt-8 space-y-3">
          <div className="h-4 w-full rounded bg-slate-800" />
          <div className="h-4 w-4/5 rounded bg-slate-800" />
          <div className="h-4 w-3/5 rounded bg-slate-800" />
        </div>

        <div className="mt-10 flex gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="h-12 w-12 rounded-full bg-slate-800" />
          ))}
        </div>
      </div>

      <div className="mx-auto h-80 w-80 rounded-full bg-slate-800" />
    </section>
  );
}
