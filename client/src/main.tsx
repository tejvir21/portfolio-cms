import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";

import { router } from "./app/router";

import QueryProvider from "./app/providers/QueryProvider";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { HelmetProvider } from "react-helmet-async";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryProvider>
      <HelmetProvider>
        <RouterProvider router={router} />

        <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      </HelmetProvider>
    </QueryProvider>
  </React.StrictMode>,
);
