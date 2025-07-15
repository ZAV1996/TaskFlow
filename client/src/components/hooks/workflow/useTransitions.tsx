import { useQuery } from "@apollo/client"
import { useParams } from "react-router"
import { GET_ALL_TRANSITIONS_BY_WORKFLOW_ID } from "@/services/workflow"

export function useTransitions() {
    const ID = Number(new URLSearchParams(location.search).get('id'));

    const { data, error, loading } = useQuery(GET_ALL_TRANSITIONS_BY_WORKFLOW_ID, {
        variables: { ID },
        skip: isNaN(ID) // Пропускаем запрос если ID невалидный
    })

    // Лучше выбрасывать ошибку или возвращать null, чем рендерить компонент
    if (error) throw new Error(error.message)

    return {
        transitions: data?.getAllTransitionsByWorkflowID || [],
        isLoading: loading,
        error
    }
}