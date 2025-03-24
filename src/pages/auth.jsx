import React, { useEffect } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "@/components/login";
import Signup from "@/components/signup";
import { UrlState } from "@/context/context";

const Auth = () => {
    const [searchParams] = useSearchParams();

    const longLink = searchParams.get("createNew");

    const navigate = useNavigate();

    const { isAuthenticated, loading } = UrlState();

    useEffect(() => {
        if (isAuthenticated && !loading) {
            navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
        }
    }, [isAuthenticated, loading]);

    return (
        <div className="mt-20 flex flex-col items-center gap-10">
            <h1 className="text-5xl font-extrabold">
                {longLink ? "Hold up! Let's login first.." : "Login/Sign Up"}
            </h1>
            <Tabs defaultValue="login" className="w-full sm:w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login" className="flex-1 h-full">
                        Login
                    </TabsTrigger>
                    <TabsTrigger value="signup" className="flex-1 h-full">
                        Sign Up
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <Login />
                </TabsContent>
                <TabsContent value="signup">
                    <Signup />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Auth;
