import AddStatusPopover from "@/components/drawers/workflow/ui/AddStatusPopover"
import { CheckboxReactHookFormMultiple } from "@/components/examples/CheckBoxForm"
import CreateStatusForm from "@/components/forms/workflow/create-status-form"
import CreateTransitionForm from "@/components/forms/workflow/create-transition-form"
import { GET_ISSUE_BY_PROJECT_ID, GET_RECENT_PROJECTS } from "@/services/project.service"
import { useQuery } from "@apollo/client"
import { useParams } from "react-router"

//заглушка. Сделан запрос на пулучение задач проекта, для того чтобы переключался акивный проект. Доделать дашборд в будущем
export default function dashboard() {
    const { id } = useParams()
    const ID = Number(id)
    const query = useQuery(GET_ISSUE_BY_PROJECT_ID, {
        variables: { Input: { ID } },
    })
    return <CreateTransitionForm />


}
