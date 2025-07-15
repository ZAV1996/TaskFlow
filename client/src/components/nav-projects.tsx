"use client"

import {
    BarChart,
    ClipboardList,
    Component,
    Folder,
    Forward,
    IconNode,
    LayoutDashboardIcon,
    MoreHorizontal,
    Rocket,
    Settings,
    Trash2,
} from "lucide-react"
import { Icon, LucideIcon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { useContext } from "react"
import { NavLink, useLocation } from "react-router";
import { LayoutContext } from "@/layouts/MainLayout";
interface IMunuItem {
    title: string,
    url: string,
    icon: LucideIcon,
    children?: IMunuItem[]
}
export function NavProject() {
    const { isMobile } = useSidebar()
    const ctx = useContext(LayoutContext)
    const activeProject = ctx?.activeProject
    const location = useLocation();
    const isActive = (url: string) => {
        return location.pathname.includes(url);
    }
    const menu_items: IMunuItem[] = [
        {
            title: "Дашборд",
            url: `project/${ctx?.activeProject?.ID}/dashboard`,
            icon: LayoutDashboardIcon
        },
        {
            title: "Задачи",
            url: `project/${ctx?.activeProject?.ID}/issues`,
            icon: ClipboardList
        },
        {
            title: "Отчеты",
            url: `project/${ctx?.activeProject?.ID}/reports`,
            icon: BarChart
        },
        {
            title: "Версии",
            url: `project/${ctx?.activeProject?.ID}/release`,
            icon: Rocket
        },
        {
            title: "Компоненты",
            url: `project/${ctx?.activeProject?.ID}/components`,
            icon: Component

        },
        {
            title: "Настройки",
            url: `project/${ctx?.activeProject?.ID}/settings`,
            icon: Settings
        },
    ]

    return (
        <SidebarGroup >
            <SidebarGroupLabel >Проект</SidebarGroupLabel>
            {/* className="group-data-[collapsible=icon]:hidden" */}
            {activeProject ?
                <SidebarMenu >
                    {menu_items.map((item, index) => {
                        return (

                            <SidebarMenuItem key={index}>
                                <SidebarMenuButton asChild isActive={isActive(item.url)}>
                                    <NavLink to={item.url}>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </NavLink>
                                </SidebarMenuButton>
                                {item.children ?
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <SidebarMenuAction showOnHover>
                                                <MoreHorizontal />
                                                <span className="sr-only">More</span>
                                            </SidebarMenuAction>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            className="w-48 rounded-lg"
                                            side={isMobile ? "bottom" : "right"}
                                            align={isMobile ? "end" : "start"}
                                        >
                                            <DropdownMenuItem>
                                                <Folder className="text-muted-foreground" />
                                                <span>View Project</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Forward className="text-muted-foreground" />
                                                <span>Share Project</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <Trash2 className="text-muted-foreground" />
                                                <span>Delete Project</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu> : <></>
                                }

                            </SidebarMenuItem>
                        )
                    })
                    }
                </SidebarMenu> :
                <div className="px-4 py-2 text-sm text-text-secondary">
                    Нет доступных проектов
                </div>
            }
        </SidebarGroup>
    )
}
