import { useQuery } from '@apollo/client'
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import { NavLink } from 'react-router'
import { GET_CURRENT_USER } from '@/services/user.service'
import { Lock, User, User2 } from 'lucide-react'
interface IProps {
    id: number
}
export default function NavAccount({ id }: IProps) {
    const query = useQuery(GET_CURRENT_USER);
    const user = query.data?.getCurrentUser
    return (
        <SidebarGroup className='w-64 p-0'>
            <SidebarMenu>
                <SidebarMenuItem>
                    <NavLink to={`account/${id}/profile`}>
                        {({ isActive }) => (
                            <SidebarMenuButton isActive={isActive} className='text-text'>
                                <User2 />
                                Профиль
                            </SidebarMenuButton>
                        )}
                    </NavLink>
                </SidebarMenuItem>
                {user?.ID === id ?
                    <SidebarMenuItem>
                        <NavLink to={`account/${id}/security`}>
                            {({ isActive }) => (
                                <SidebarMenuButton isActive={isActive} className='text-text'>
                                    <Lock />
                                    Безопасность
                                </SidebarMenuButton>
                            )}
                        </NavLink>
                    </SidebarMenuItem> : <></>
                }

            </SidebarMenu>
        </SidebarGroup>
    )
}
