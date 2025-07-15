"use client"

import { ChevronRight, Star } from "lucide-react"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import React from "react";
import { LayoutContext } from "@/layouts/MainLayout";
import { Logo } from "./icons/LogoIcon";

export function NavMain() {
    const ctx = React.useContext(LayoutContext);
    const activeProject = ctx?.activeProject;
    const items = [{
        title: activeProject?.project_name,
        isActive: true,
        icon: (() => activeProject?.image ? <img src={activeProject.image} className="size-8" ></img> : <Logo className="size-8" />),
        items: [
            {
                title: "Задачи",
                url: '/'
            },
            {
                title: "Настройки",
                url: '/'
            },
        ]
    }]
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Панели</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item, index) => (
                    <Collapsible
                        key={index}
                        asChild
                        defaultOpen={item.isActive}
                        className="group/collapsible"
                    >
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton tooltip={item.title}>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    {item.items?.map((subItem) => (
                                        <SidebarMenuSubItem key={subItem.title}>
                                            <SidebarMenuSubButton asChild>
                                                <a href={subItem.url}>
                                                    <span>{subItem.title}</span>
                                                </a>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    ))}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                ))}
            </SidebarMenu>

        </SidebarGroup>
    )
}
