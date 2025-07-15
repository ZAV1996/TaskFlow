import * as React from "react"

import { NavUser } from "@/components/nav-user"
import { ProjectSwitcher } from "@/components/project-switcher"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import { ProjectType, User } from "@/types/graphql"
import { NavProject } from "./nav-projects"
import { NavMain } from "./nav-main"
import useCheckAdministrator from "./hooks/use-check-administrator"
import CreateProjectModal from "@/components/modals/project/create-project-modal"

interface IProps {
    projects: ProjectType[] | undefined,
    user: User
}
export function AppSidebar({ projects, user, ...props }: React.ComponentProps<typeof Sidebar> & IProps) {
    const isAdmin = useCheckAdministrator()
    return (
        <Sidebar collapsible="icon" {...props} variant="sidebar" >
            <SidebarHeader>
                {
                    projects ? <ProjectSwitcher projects={projects} /> :
                        isAdmin ? <CreateProjectModal asMenu /> : <></>
                }
            </SidebarHeader>
            <SidebarContent>
                <NavProject />
                {/* <NavMain /> */}
            </SidebarContent>
            <SidebarFooter>
                <NavUser {...user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}