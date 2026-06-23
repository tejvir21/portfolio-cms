import { Menu, LogOut } from "lucide-react";

interface Props {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: Props) {
  const logout = () => {
    localStorage.removeItem("token");

    window.location.href = "/admin/login";
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-6">
        <button onClick={onMenuClick} className="lg:hidden">
          <Menu />
        </button>

        <div />

        <button
          onClick={logout}
          className="flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  );
}
