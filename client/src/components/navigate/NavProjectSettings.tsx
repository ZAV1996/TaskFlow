import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import { NavLink } from 'react-router'
import { Bell, ClipboardList, Component, Flag, LayoutList, ListChecks, Lock, SignalHigh, Tags, Type, User2, UserCog, Workflow } from 'lucide-react'

export default function NavProjectSettings() {
    return (
        <SidebarGroup className='w-64 p-0'>
            <SidebarMenu>
                <SidebarMenuItem>
                    <NavLink to={`./summary`}>
                        {({ isActive }) => (
                            <SidebarMenuButton isActive={isActive} className='text-text'>
                                <ClipboardList />
                                Сводка
                            </SidebarMenuButton>
                        )}
                    </NavLink>
                </SidebarMenuItem>

                <SidebarMenuItem>
                    <NavLink to={`./issue-types`}>
                        {({ isActive }) => (
                            <SidebarMenuButton isActive={isActive} className='text-text'>
                                <ListChecks />
                                Типы задач
                            </SidebarMenuButton>
                        )}
                    </NavLink>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <NavLink to={`./workflows`}>
                        {({ isActive }) => (
                            <SidebarMenuButton isActive={isActive} className='text-text'>
                                <Workflow />
                                Бизнесс-процессы
                            </SidebarMenuButton>
                        )}
                    </NavLink>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <NavLink to={`./components`}>
                        {({ isActive }) => (
                            <SidebarMenuButton isActive={isActive} className='text-text'>
                                <Component />
                                Компоненты
                            </SidebarMenuButton>
                        )}
                    </NavLink>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <NavLink to={`./notifications`}>
                        {({ isActive }) => (
                            <SidebarMenuButton isActive={isActive} className='text-text'>
                                <Bell />
                                Уведомления
                            </SidebarMenuButton>
                        )}
                    </NavLink>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <NavLink to={`./priorities`}>
                        {({ isActive }) => (
                            <SidebarMenuButton isActive={isActive} className='text-text'>
                                <Flag />
                                Приоритеты
                            </SidebarMenuButton>
                        )}
                    </NavLink>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <NavLink to={`./permissions`}>
                        {({ isActive }) => (
                            <SidebarMenuButton isActive={isActive} className='text-text'>
                                <Lock />
                                Права доступа
                            </SidebarMenuButton>
                        )}
                    </NavLink>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <NavLink to={`./role`}>
                        {({ isActive }) => (
                            <SidebarMenuButton isActive={isActive} className='text-text'>
                                <UserCog />
                                Пользователи и роли
                            </SidebarMenuButton>
                        )}
                    </NavLink>
                </SidebarMenuItem>

            </SidebarMenu>
        </SidebarGroup>
    )
}
