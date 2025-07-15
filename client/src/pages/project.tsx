import Loader from "@/components/ui/Loader"
import { LayoutContext } from "@/layouts/MainLayout"
// import { GET_PROJECT_BY_ID } from "@/services/project.service"
import { useQuery } from "@apollo/client"
import React from "react"
import { useParams } from "react-router"
import { ProjectType } from "@/types/graphql"
import { GET_ISSUE_BY_PROJECT_ID } from "@/services/project.service"
import SettingsLayout from "@/layouts/SettingsLayout"
import NavIssues from "@/components/nav-issues"
export default function Project() {
    const ctx = React.useContext(LayoutContext);
    const { id } = useParams()
    const { data, loading, error } = useQuery(GET_ISSUE_BY_PROJECT_ID, {
        variables: {
            Input: {
                ID: Number(id)
            }
        },
        
    })
    if (loading) return <Loader />
    if (data)
        return (
            <SettingsLayout layoutTitle={ctx?.activeProject?.project_name!}>
                <NavIssues />
            </SettingsLayout>
        )
    if (error) return <p>TODO ERROR</p>
}
