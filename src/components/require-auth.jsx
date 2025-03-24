import { UrlState } from "@/context/context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

export default function RequireAuth({ children }) {
    const navigate = useNavigate();

    const { loading, isAuthenticated } = UrlState();

    useEffect(() => {
        if (!isAuthenticated && loading === false) navigate("/auth");
    }, [isAuthenticated, loading]);

    if (loading) return <BarLoader width={"100%"} color="#1e2939" />;

    if (isAuthenticated) return children;
}
