import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  FolderGit2,
  Briefcase,
  Code2,
  Trophy,
  Award,
  Mail,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin",
  },
  {
    label: "Profile",
    icon: User,
    path: "/admin/profile",
  },
  {
    label: "Projects",
    icon: FolderGit2,
    path: "/admin/projects",
  },
  {
    label: "Experience",
    icon: Briefcase,
    path: "/admin/experience",
  },
  {
    label: "Skills",
    icon: Code2,
    path: "/admin/skills",
  },
  {
    label: "Achievements",
    icon: Trophy,
    path: "/admin/achievements",
  },
  {
    label: "Certificates",
    icon: Award,
    path: "/admin/certificates",
  },
  {
    label: "Messages",
    icon: Mail,
    path: "/admin/messages",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/admin/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex lg:w-72 lg:flex-col border-r border-slate-800 bg-slate-950">
      <div className="border-b border-slate-800 p-6">
        <h1 className="text-xl font-bold">Tejvir CMS</h1>

        <p className="mt-1 text-sm text-slate-400">Portfolio Management</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === "/admin"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                      isActive
                        ? "bg-sky-500 text-white"
                        : "text-slate-400 hover:bg-slate-900 hover:text-white"
                    }`
                  }
                >
                  <Icon size={18} />

                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
