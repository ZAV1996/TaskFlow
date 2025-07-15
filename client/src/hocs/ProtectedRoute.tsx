import Loader from "@/components/ui/Loader";
import { Errors } from "@/constants/constants";
import { AuthContext } from "@/providers/AuthProvider";
import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router";

export default function ProtectedRoute() {
    const { pathname } = useLocation();
    const context = useContext(AuthContext);
    if (context === null) {
        return <Loader />;
    }
    if (!context.isAuth) {
        return <Navigate to="/login" state={{ from: pathname, error: Errors.Unauthorized }} replace />;
    }
    return <Outlet />;
}