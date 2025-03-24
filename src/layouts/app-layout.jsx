import Header from "@/components/header";
import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
    return (
        <div className="flex flex-col items-center">
            <main className="min-h-screen container px-4 md:px-0">
                <Header />
                <Outlet />
                {/* footer  */}
            </main>
            <div className="w-full p-10 text-center bg-gray-800 mt-10">
                Made for learning 📖 supabase by Pritam
            </div>
        </div>
    );
};

export default AppLayout;
