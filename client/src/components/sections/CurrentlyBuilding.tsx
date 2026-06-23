const projects = [
  {
    title: "Portfolio CMS",
    status: "In Progress",
    stack: "React • TypeScript • Node • MongoDB",
  },
  {
    title: "PG Management SaaS",
    status: "Planning",
    stack: "MERN • Razorpay • PWA",
  },
];

export default function CurrentlyBuilding() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-10 text-4xl font-bold">Currently Building</h2>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.title}
              className="rounded-xl border border-slate-800 bg-slate-900 p-6"
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-xl font-semibold">{project.title}</h3>

                <span className="rounded-full border border-sky-500 px-3 py-1 text-sm text-sky-400">
                  {project.status}
                </span>
              </div>

              <p className="text-slate-400">{project.stack}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
