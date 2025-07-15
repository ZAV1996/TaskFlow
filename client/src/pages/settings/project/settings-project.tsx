import Loader from "@/components/ui/Loader"
import { GET_PERMISSIONS_RULES_BY_PROJECT_ID } from "@/services/permissions.service"
import { useQuery } from "@apollo/client"
import { useParams } from "react-router"

export default function SettingsProject() {
    const { id } = useParams()
    const ID = Number(id)
    const { data, loading, error } = useQuery(GET_PERMISSIONS_RULES_BY_PROJECT_ID, { variables: { ID } })
    if (loading) return <Loader />
    
    return (
        <div>settings-project</div>
    )
}
