import { useQuery } from '@apollo/client'
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'
import { NavLink, useParams } from 'react-router'
import { GET_CURRENT_USER } from '@/services/user.service'
import { Lock, User, User2 } from 'lucide-react'
import { GET_ISSUE_BY_PROJECT_ID } from '@/services/project.service'
import Loader from './ui/Loader'

export default function NavIssues() {
    const { id } = useParams()
    const projectQuery = useQuery(GET_ISSUE_BY_PROJECT_ID, {
        variables: { Input: { ID: Number(id) } }
    })
    const issues = projectQuery.data?.getAllIssuesByProjectID




    //     const query = useQuery(GET_CURRENT_USER);
    // const user = query.data?.getCurrentUser

    if (projectQuery.loading)
        return <Loader />
    if (issues)
        return (
            <SidebarGroup className='w-64 p-0'>
                <SidebarMenu>
                    {issues.map((issue) => (
                        <SidebarMenuItem>
                            <NavLink to={`account/${id}/profile`}>
                                {({ isActive }) => (
                                    // <SidebarMenuButton isActive={isActive} className='text-text'>
                                    //     {`${issue.key}-${issue.issueNum}`}
                                    // </SidebarMenuButton>

                                    <SidebarMenuButton
                                        size="lg"
                                        className="group/hvr data-[state=open]:bg-primary-dark dark:bg-primary-dark data-[state=open]:text-text-on_primary rounded-lg border-b focus-visible:ring-0 group-data-[collapsible=icon]:shadow-none"
                                    >
                                        {/* <div className="flex aspect-square size-8 items-center justify-center rounded-lg  text-sidebar-primary-foreground">
                                            {activeProject?.image ? <img src={activeProject.image} ></img> : <Logo className="size-8" />}
                                        </div> */}
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">
                                                {issue?.title}
                                            </span>
                                            <span className="truncate text-xs text-text-secondary group-data-[state=open]/hvr:text-text-on_primary group-hover/hvr:text-text-on_primary">{issue.key}-{issue.issueNum}</span>
                                        </div>
                                    </SidebarMenuButton>
                                )}
                            </NavLink>
                        </SidebarMenuItem>
                    ))}

                </SidebarMenu>
            </SidebarGroup>
        )
}
