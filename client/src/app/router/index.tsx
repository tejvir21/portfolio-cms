import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "../../layouts/PublicLayout";
import AdminLayout from "../../layouts/AdminLayout";

import Home from "../../pages/public/Home";
import Login from "../../pages/admin/Login";
import Dashboard from "../../pages/admin/Dashboard";
import Projects from "../../pages/admin/Projects";
import ProtectedRoute from "../../routes/ProtectedRoute";
import Profile from "../../pages/admin/Profile";
import Experience from "../../pages/admin/Experience";
import Skills from "../../pages/admin/Skills";
import Achievements from "../../pages/admin/Achievements";
import Certificates from "../../pages/admin/Certificates";
import Messages from "../../pages/admin/Messages";
import Settings from "../../pages/admin/Settings";
import ProjectDetails from "@/pages/public/ProjectDetails";
import CertificateCompanies from "@/pages/admin/CertificateCompanies";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },

  {
    path: "/projects/:slug",
    element: <ProjectDetails />,
  },

  {
    path: "/admin/login",
    element: <Login />,
  },

  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },

      {
        path: "profile",
        element: <Profile />,
      },

      {
        path: "projects",
        element: <Projects />,
      },

      {
        path: "experience",
        element: <Experience />,
      },

      {
        path: "skills",
        element: <Skills />,
      },

      {
        path: "achievements",
        element: <Achievements />,
      },

      {
        path: "certificates",
        element: <Certificates />,
      },

      {
        path: "certificate-companies",
        element: <CertificateCompanies />,
      },

      {
        path: "messages",
        element: <Messages />,
      },

      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);
