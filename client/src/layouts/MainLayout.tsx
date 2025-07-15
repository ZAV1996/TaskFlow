import { AppSidebar } from "../components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Link, Outlet, useLoaderData, useLocation, useParams } from "react-router"

import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { ProjectType, User } from "@/types/graphql"
import { useLazyQuery, useQuery } from "@apollo/client"
import { GET_CURRENT_USER } from "@/services/user.service"
import { GET_AVAILABLE_PROJECTS, GET_PROJECT_BY_ID, GET_RECENT_PROJECTS } from "@/services/project.service"
interface IGlobalContext {
    activeProject: ProjectType | null,
    setActiveProject: Dispatch<SetStateAction<ProjectType | null>>
}
export const LayoutContext = React.createContext<IGlobalContext | null>(null)

export default function MainLayout() {
    const location = useLocation()
    const [projects, setProjects] = useState<ProjectType[]>()
    const recentQuery = useQuery(GET_RECENT_PROJECTS)
    const currentUser = useQuery(GET_CURRENT_USER).data?.getCurrentUser!;
    const [activeProject, setActiveProject] = useState<ProjectType | null>(null);
    const { id } = useParams()
    const [getLocationProject, { data }] = useLazyQuery(GET_PROJECT_BY_ID)



    useEffect(() => {
        const recentProjects = recentQuery.data?.getRecentProjects
        if (recentProjects && recentProjects.length > 0) {
            setProjects(recentProjects);
            if (id && location.pathname.includes("project")) {
                getLocationProject({
                    variables: {
                        ID: Number(id)
                    }
                })
            } else {
                setActiveProject(recentProjects[0] ?? null)
            }
        }
    }, [recentQuery.data?.getRecentProjects])
    useEffect(() => {
        if (data?.getProjectByID) {
            setActiveProject(data?.getProjectByID)
        }
    }, [data?.getProjectByID])
    return (
        <>
            <LayoutContext.Provider value={{ activeProject, setActiveProject }}>
                <SidebarProvider >
                    <AppSidebar projects={projects} user={currentUser} />
                    <SidebarInset >
                        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border px-4 bg-background-secondary">
                            <SidebarTrigger className="-ml-1" />
                            <Separator orientation="vertical" className="mr-2 h-4" />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbLink href="#" asChild={true}>
                                            <Link to="/"> Главная</Link>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className="hidden md:block" />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>Дашборд</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                            <p>2321</p>
                        </header>
                        <div className="flex flex-1 flex-col h-full w-full">
                            <Outlet />
                        </div>
                    </SidebarInset>
                </SidebarProvider>
            </LayoutContext.Provider >
        </>
    )
}

