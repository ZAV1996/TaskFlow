import { LayoutContext } from "@/layouts/MainLayout";
import { useContext } from "react";
import { Navigate } from "react-router";
import EmptyProjectsPlaceholder from "../placeholders/EmptyProjectsPlaceholder";


export default function NavigateDashboard() {
    const ctx = useContext(LayoutContext);
    if (ctx?.activeProject?.ID)
        return <Navigate to={`/project/${ctx?.activeProject?.ID}/dashboard`} />
    else return <div className="p-5"><EmptyProjectsPlaceholder /></div>
}


