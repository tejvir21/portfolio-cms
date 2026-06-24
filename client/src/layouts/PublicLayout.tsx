import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";
import ScrollToHash from "../components/ScrollToHash";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <ScrollToHash />

      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}

// import { Outlet } from "react-router-dom";
// import Footer from "../components/common/Footer";
// import ScrollToHash from "../components/ScrollToHash";

// export default function PublicLayout() {
//   return (
//     <div className="min-h-screen bg-slate-950 text-white">
//       <ScrollToHash />
//       <Outlet />
//       <Footer />
//     </div>
//   );
// }
