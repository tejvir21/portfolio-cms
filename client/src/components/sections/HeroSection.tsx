import SocialLinks from "../common/SocialLinks";
import { useProfile } from "../../features/profile/hooks/useProfile";
import { useProjects } from "../../features/projects/hooks/useProjects";
import StatCard from "../common/StatCard";

export default function HeroSection() {
  const { data } = useProfile();
  const { data: projects } = useProjects();

  if (!data?.name && !data?.role && !data?.bio) return null;

  const imageUrl = data?.imageUrl || data?.profileImage;
  const [firstName, ...restName] = data?.name?.split(" ") ?? [];

  return (
    // <section className="mx-auto grid min-h-[80vh] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr]">
    <section
      className={`mx-auto min-h-[80vh] max-w-7xl items-center gap-12 px-6 py-16 ${
        imageUrl ? "grid lg:grid-cols-[1.1fr_0.9fr]" : "flex"
      }`}
    >
      <div>
        {data?.name && (
          // <h1 className="max-w-3xl text-5xl font-bold leading-tight md:text-7xl">
          <h1 className="max-w-4xl text-5xl font-bold leading-[1.05] md:text-7xl">
            Hi, I&apos;m <span className="text-cyan-300">{firstName}</span>
            {restName.length > 0 && (
              <>
                <br />
                <span className="text-sky-500">{restName.join(" ")}</span>
              </>
            )}
          </h1>
        )}

        {data?.role && (
          // <p className="mt-5 text-xl text-slate-300">
          <p className="mt-6 text-xl font-medium text-slate-300">{data.role}</p>
        )}

        {data?.headline && (
          <div className="mt-6 flex flex-wrap gap-3">
            {data.headline.split("•").map((item: any) => (
              <span
                key={item}
                className="rounded-full border border-cyan-500/30 bg-cyan-500/5 px-4 py-2 text-sm text-cyan-300"
              >
                {item.trim()}
              </span>
            ))}
          </div>
        )}

        {data?.isOpenToWork && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-green-400">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            Open To Opportunities
          </div>
        )}

        {data?.bio && (
          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">
            {data.bio}
          </p>
        )}

        <div className="mt-8 flex flex-wrap gap-4">
          <StatCard value={`${projects?.length ?? 0}+`} label="Projects" />

          <StatCard value={data?.yearsExperience} label="Years Experience" />

          <StatCard value="B.Tech" label={data?.education} />
        </div>

        {/* <div className="mt-8">
          <SocialLinks profile={data} />
        </div>

        {!!projects?.length && (
          <a
            href="#projects"
            className="mt-8 inline-flex rounded-lg bg-cyan-400 px-5 py-3 font-medium text-slate-950"
          >
            View Projects
          </a>
        )} */}

        <div className="mt-10 flex flex-wrap gap-4">
          {!!projects?.length && (
            <a
              href="#projects"
              className="rounded-xl bg-cyan-400 px-6 py-3 font-medium text-slate-950 transition hover:bg-cyan-300"
            >
              View Projects
            </a>
          )}
        </div>

        <div className="mt-8">
          <SocialLinks profile={data} />
        </div>
      </div>

      {imageUrl && (
        <div className="flex justify-center lg:justify-end">
          <div className="aspect-square w-full max-w-sm rounded-full border-4 border-cyan-400 p-2 shadow-[0_0_45px_rgba(34,211,238,0.18)]">
            <img
              src={imageUrl}
              alt={data?.name ?? "Profile"}
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        </div>
      )}
    </section>
  );
}
