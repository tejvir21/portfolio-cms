import { useExperiences } from "../../features/experience/hooks/useExperiences";

const formatDate = (value?: string) => {
  if (!value) return "Present";

  return new Date(value).toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
  });
};

const toPoints = (value?: string) => {
  if (!value) return [];

  const lineParts = value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);

  if (lineParts.length > 1) return lineParts;

  return value
    .split(/(?<=[.!?])\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
};

export default function ExperienceSection() {
  const { data } = useExperiences();

  if (!data?.length) return null;

  return (
    <section id="experience" className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="mb-12 text-center text-4xl font-bold text-sky-400">
        Experience
      </h2>
      {/* <h2 className="mb-12 text-4xl font-bold">Experience</h2> */}

      <div className="space-y-8">
        {data
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((item) => {
            const points = toPoints(item.description);

            return (
              <div
                key={item._id}
                className="rounded-xl border border-slate-800 bg-slate-900 p-6"
              >
                <div className="flex flex-col justify-between gap-4 md:flex-row">
                  <div className="flex gap-4">
                    {item.companyLogo && (
                      <img
                        src={item.companyLogo}
                        alt=""
                        className="h-14 w-14 rounded-xl object-cover"
                      />
                    )}

                    <div>
                      <h3 className="text-2xl font-semibold">
                        {item.position}
                      </h3>

                      <p className="text-sky-400">{item.company}</p>

                      {item.location && (
                        <p className="mt-1 text-sm text-slate-500">
                          {item.location}
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="text-slate-400">
                    {formatDate(item.startDate)} -{" "}
                    {item.currentlyWorking
                      ? "Present"
                      : formatDate(item.endDate)}
                  </p>
                </div>

                {points.length > 0 && (
                  <ul className="mt-5 space-y-2 text-slate-400">
                    {points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {!!item.technologies?.length && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-slate-700 px-3 py-1 text-sm"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </section>
  );
}
