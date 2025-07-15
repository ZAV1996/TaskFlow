import Loader from "@/components/ui/Loader"
import { AuthContext } from "@/providers/AuthProvider"
import { useContext } from "react"
import { Navigate, Outlet, useLocation } from "react-router"

export default function PublicRoute() {
    const { state } = useLocation()
    const authContext = useContext(AuthContext)

    if (authContext === null) {
        return <Loader />;
    }
    if (authContext?.isAuth) {
        return <Navigate to={state?.from ?? "/"} replace />
    }

    return <Outlet />
}
