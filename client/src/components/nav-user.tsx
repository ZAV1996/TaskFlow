"use client"

import {
    BadgeCheck,
    Bell,
    ChevronsUpDown,
    LogOut,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { useMutation } from "@apollo/client"
import { LOGOUT } from "@/services/auth.service"
import { AuthContext } from "@/providers/AuthProvider"
import { useContext } from "react"
import { client } from "@/main"
import { User } from "@/types/graphql"
import { Link } from "react-router"
import { getFullUrl } from "@/lib/utils"

export function NavUser(user: User) {
    const { isMobile } = useSidebar()

    const authContext = useContext(AuthContext)
    const [logout, _] = useMutation(LOGOUT)
    async function Logout() {
        await logout()
        authContext?.setIsAuth(false);
        client.clearStore();
    }
    const inicials = `${user.name?.charAt(0).toLocaleUpperCase()}${user.surname?.charAt(0).toLocaleUpperCase()}`
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                {user.avatar ?
                                    <AvatarImage src={getFullUrl(user.avatar.url)!} alt={user.name!} /> :
                                    <AvatarFallback className="rounded-lg">{inicials}</AvatarFallback>
                                }
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{user.name} {user.surname}</span>
                                <span className="truncate text-xs">{user.email}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={getFullUrl(user.avatar?.url)!} alt={user.name!} />
                                    <AvatarFallback className="rounded-lg">{inicials}</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{user.name} {user.surname}</span>
                                    <span className="truncate text-xs">{user.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuGroup>
                            <Link to={`/account/${user.ID}/profile`} state={user.ID}>
                                <DropdownMenuItem>
                                    <BadgeCheck />
                                    Аккаунт
                                </DropdownMenuItem>
                            </Link>
                            {/* <DropdownMenuItem>
                                <CreditCard />
                                Billing
                            </DropdownMenuItem> */}
                            <DropdownMenuItem>
                                <Bell />
                                Уведомления
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => Logout()}>
                            <LogOut />
                            Выход
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
