import { X } from "lucide-react";
import { NavLink } from "react-router-dom";

interface Props {
  open: boolean;
  onClose: () => void;
}

const menu = [
  ["Dashboard", "/admin"],
  ["Profile", "/admin/profile"],
  ["Projects", "/admin/projects"],
  ["Experience", "/admin/experience"],
  ["Skills", "/admin/skills"],
  ["Achievements", "/admin/achievements"],
  ["Certificates", "/admin/certificates"],
  ["Messages", "/admin/messages"],
  ["Settings", "/admin/settings"],
];

export default function MobileSidebar({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 z-40 bg-black/50" />

      <div className="fixed left-0 top-0 z-50 h-full w-72 bg-slate-950 border-r border-slate-800">
        <div className="flex items-center justify-between border-b border-slate-800 p-5">
          <h2 className="font-bold">Tejvir CMS</h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <nav className="p-4">
          <div className="space-y-2">
            {menu.map(([label, path]) => (
              <NavLink
                key={path}
                to={path}
                onClick={onClose}
                className="block rounded-lg px-4 py-3 text-slate-300 hover:bg-slate-900"
              >
                {label}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}
