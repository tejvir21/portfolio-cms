import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import Sidebar from "../components/admin/Sidebar";
import MobileSidebar from "../components/admin/MobileSidebar";
import Topbar from "../components/admin/Topbar";
import { useSeoStore } from "@/store/seo.store";
import PageLoader from "@/components/common/PageLoader";
import SEO from "@/lib/seo";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);

  const { fetchSeo, seo } = useSeoStore();

  useEffect(() => {
    fetchSeo();
  }, []);

  if (!seo) return <PageLoader />;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEO
        title={seo?.homeTitle || "Tejvir's Portfolio"}
        description={seo?.homeDescription || ""}
        keywords={seo?.keywords?.join(", ")}
        ogImage={seo?.ogImage || "/favicon.svg"}
      />

      <div className="flex">
        <Sidebar />

        <MobileSidebar open={open} onClose={() => setOpen(false)} />

        <div className="flex min-h-screen flex-1 flex-col overflow-hidden">
          <Topbar onMenuClick={() => setOpen(true)} />

          <main className="flex-1 p-6 md:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
