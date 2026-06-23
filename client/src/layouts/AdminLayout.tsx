import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../components/admin/Sidebar";
import MobileSidebar from "../components/admin/MobileSidebar";
import Topbar from "../components/admin/Topbar";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="flex">
        <Sidebar />

        <MobileSidebar open={open} onClose={() => setOpen(false)} />

        <div className="flex min-h-screen flex-1 flex-col">
          <Topbar onMenuClick={() => setOpen(true)} />

          <main className="flex-1 p-6 md:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
