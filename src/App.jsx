import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/app-layout";
import LandingPage from "./pages/landing-page";
import Dashboard from "./pages/dashboard";
import Auth from "./pages/auth";
import Link from "./pages/link";
import RedirectLink from "./pages/redirect-link";
import UrlProvider from "./context/context";
import RequireAuth from "./components/require-auth";

export const BASE_URL = process.env.VITE_BASE_URL;

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <LandingPage />,
            },
            {
                path: "/dashboard",
                element: (
                    <RequireAuth>
                        <Dashboard />
                    </RequireAuth>
                ),
            },
            {
                path: "/auth",
                element: <Auth />,
            },
            {
                path: "/link/:id",
                element: (
                    <RequireAuth>
                        <Link />
                    </RequireAuth>
                ),
            },
            {
                path: "/:id",
                element: <RedirectLink />,
            },
        ],
    },
]);

export default function App() {
    return (
        <UrlProvider>
            <RouterProvider router={router} />
        </UrlProvider>
    );
}
