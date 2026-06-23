import StatsCard from "../../components/admin/StatsCard";
import { useAchievements } from "../../features/achievements/hooks/useAchievements";
import { useContacts } from "../../features/contact/hooks/useContacts";
import { useProjects } from "../../features/projects/hooks/useProjects";
import { useSkills } from "../../features/skills/hooks/useSkills";

export default function Dashboard() {
  const { data: projects } = useProjects();
  const { data: skills } = useSkills();
  const { data: achievements } = useAchievements();
  const { data: messages } = useContacts();

  const recentProjects = projects?.slice(0, 5) ?? [];
  const recentMessages = messages?.slice(0, 5) ?? [];

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard title="Projects" value={projects?.length ?? 0} />
        <StatsCard title="Skills" value={skills?.length ?? 0} />
        <StatsCard title="Achievements" value={achievements?.length ?? 0} />
        <StatsCard title="Messages" value={messages?.length ?? 0} />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-4 text-xl font-semibold">Recent Projects</h2>

          {recentProjects.length ? (
            <div className="space-y-3">
              {recentProjects.map((project) => (
                <p key={project._id} className="text-slate-400">
                  {project.title}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-slate-400">No projects yet</p>
          )}
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-4 text-xl font-semibold">Recent Messages</h2>

          {recentMessages.length ? (
            <div className="space-y-3">
              {recentMessages.map((message) => (
                <p key={message._id} className="text-slate-400">
                  {message.subject}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-slate-400">No messages yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
