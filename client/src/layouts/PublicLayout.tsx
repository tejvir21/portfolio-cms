import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";
import ScrollToHash from "../components/ScrollToHash";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <ScrollToHash />
      <Outlet />
      <Footer />
    </div>
  );
}
