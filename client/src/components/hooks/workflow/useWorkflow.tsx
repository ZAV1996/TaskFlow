import { useQuery } from "@apollo/client"
import { useParams } from "react-router"
import { GET_ALL_WORKFLOWS_BY_PROJECT_ID } from "@/services/workflow"

export function useWorkflow() {
    const { id } = useParams<{ id: string }>()
    const ID = Number(id)

    const { data, error, loading } = useQuery(GET_ALL_WORKFLOWS_BY_PROJECT_ID, {
        variables: { ID },
        skip: isNaN(ID) // Пропускаем запрос если ID невалидный
    })

    // Лучше выбрасывать ошибку или возвращать null, чем рендерить компонент
    if (error) throw new Error(error.message)

    return {
        workflows: data?.getAllWorkflowsByProjectID || [],
        isLoading: loading,
        error
    }
}