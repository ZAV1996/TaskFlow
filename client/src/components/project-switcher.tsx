"use client"

import * as React from "react"
import { ChevronsUpDown, List, Plus } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { ProjectType } from "@/types/graphql"
import { Logo } from "@/components/icons/LogoIcon"
import { LayoutContext } from "@/layouts/MainLayout"
import useCheckAdministrator from "@/components/hooks/use-check-administrator"
import { Link, useLocation, useNavigate, useNavigation, useParams } from "react-router"
import CreateProjectModal from "@/components/modals/project/create-project-modal"
import { getFullUrl } from "@/lib/utils"

type TProps = {
    projects: ProjectType[]
}
export function ProjectSwitcher({ projects }: TProps) {
    const { isMobile } = useSidebar()
    const ctx = React.useContext(LayoutContext);
    const activeProject = ctx?.activeProject;
    const setActiveProject = ctx?.setActiveProject;
    const isAdmin = useCheckAdministrator()
    const location = useLocation();
    const { id } = useParams();

    const navigate = useNavigate()

    React.useEffect(() => {
        const handleKeyDown = async (event: KeyboardEvent) => {
            if (setActiveProject)
                if ((event.metaKey || event.ctrlKey) && /^[0-9]$/.test(event.key)) {
                    event.preventDefault()
                    if (projects.length > Number(event.key) - 1) {
                        setActiveProject(projects[Number(event.key) - 1])
                    } else setActiveProject(projects[0])
                }
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [])
    React.useEffect(() => {
        if (setActiveProject && activeProject) {
            setActiveProject(activeProject)
        }
    }, [setActiveProject])

    if (activeProject && setActiveProject)
        return (
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton
                                size="lg"
                                className="group/hvr data-[state=open]:bg-primary-dark dark:bg-primary-dark data-[state=open]:text-text-on_primary rounded-lg shadow-base  focus-visible:ring-0 group-data-[collapsible=icon]:shadow-none"
                            >
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg  text-sidebar-primary-foreground">
                                    {activeProject?.image ? <img src={getFullUrl(activeProject.image?.url)!} ></img> : <Logo className="size-8" />}
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        {activeProject?.project_name}
                                    </span>
                                    <span className="truncate text-xs text-text-secondary group-data-[state=open]/hvr:text-text-on_primary group-hover/hvr:text-text-on_primary">{activeProject.key}</span>
                                </div>
                                <ChevronsUpDown className="ml-auto" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                            align="start"
                            side={isMobile ? "bottom" : "right"}
                            sideOffset={4}
                        >
                            <DropdownMenuLabel className="text-xs text-text-secondary cursor-default">
                                Недавние проекты
                            </DropdownMenuLabel>
                            {projects.map((project, index) => (
                                <DropdownMenuItem key={project.key} onClick={async () => {
                                    setActiveProject(project);
                                    await navigate(`project/${project.ID}/dashboard`)
                                }} className="gap-2 p-2 cursor-pointer">
                                    <div className="flex size-6 items-center justify-center rounded-sm border">
                                        {project.image ? <img src={getFullUrl(project.image.url)!} ></img> : <Logo className="size-8" />}
                                    </div>
                                    {project.project_name}
                                    <DropdownMenuShortcut>Ctrl+{index}</DropdownMenuShortcut>
                                </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel className="text-xs text-text-secondary cursor-default">
                                Все доступные проекты
                            </DropdownMenuLabel>
                            <Link to="/available-projects">
                                <DropdownMenuItem className="gap-2 p-2 cursor-pointer">
                                    <div className="flex size-6 items-center justify-center rounded-md border">
                                        <List className="size-4" />
                                    </div>
                                    <div className="font-medium ">Все проекты</div>
                                </DropdownMenuItem>
                            </Link>

                            {isAdmin ?
                                <>
                                    <DropdownMenuSeparator />
                                    <CreateProjectModal asMenu={true} />
                                </>
                                : <></>}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        )
}
