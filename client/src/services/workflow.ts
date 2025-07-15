import { gql } from '@/types/gql';
///////////////////////Status//////////////////////////////
export const GET_ALL_STATUSES_BY_WORKFLOW_ID = gql(`
query GetAllStatusesByWorkflowID($ID: Int!) {
    getStatusesByWorkflowID(getWorkflowStatuses: { ID: $ID }) {
        ID
        title
        is_initial
        is_finished
        on_process
        status_meta {
            ID
            posX
            posY
            variant
        }
    }
}`)
export const UPDATE_STATUS = gql(`
mutation UpdateStatus(
$ID: Int!,
$parent: InputID!,
$title: String,
$is_initial:Boolean,
$is_finished:Boolean,
$on_process:Boolean,
$status_meta: StatusMetaInput,
) {
    updateStatus(
        createStatusInput: {
            ID: $ID
            parent: $parent
            title: $title
            is_initial: $is_initial
            is_finished: $is_finished
            on_process: $on_process
            status_meta: $status_meta
        }
    ) {
        ID
        title
        is_initial
        is_finished
        on_process
    }
}`)
export const CREATE_STATUS = gql(`
mutation CreateStatus($createStatusInput: CreateOrUpdateStatusInput!) {
    createStatus(createStatusInput: $createStatusInput) {
        ID
        title
        is_initial
        is_finished
        on_process
    }
}`)
export const DELETE_STATUS = gql(`
mutation DeleteStatus($deleteStatusInput: InputID!) {
    deleteStatus(deleteStatusInput: $deleteStatusInput)
}`)
///////////////////////TRANSITION//////////////////////////////
export const CREATE_TRANSITION = gql(`
    mutation CreateTransition($createOrUpdateTransitionInput: PartialTransitionInput!) {
        createTransition(createOrUpdateTransitionInput: $createOrUpdateTransitionInput) {
            ID
            title
        }
}`)
export const SET_TRANSITION_RULE = gql(`
mutation SetATransitionRule($TransitionPermissionSchemeRule: TransitionPermissionSchemeRuleInput!) {
    setATransitionRule(TransitionPermissionSchemeRule: $TransitionPermissionSchemeRule) {
        ID
        title
    }
}`)
export const GET_ALL_TRANSITIONS_BY_WORKFLOW_ID = gql(`
    query GetAllTransitionsByWorkflowID($ID: Int!) {
        getAllTransitionsByWorkflowID(InputID: { ID: $ID }) {
            ID
            title
            to {
                ID
            }
            parent {
                ID
            }
            transition_meta {
                ID
                sourceHandle
                targetHandle
            }
        }
}`)
export const DELETE_TRANSITION = gql(`
mutation DeleteTransition($Transition: InputID!) {
    deleteTransition(Transition: $Transition)
}`)
/////////////////////WORKFLOW//////////////////////////////////
export const CREATE_WORKFLOW = gql(`
mutation CreateWorkflow($createWorkflowInput:CreateWorkflowInput! ) {
    createWorkflow(createWorkflowInput: $createWorkflowInput) {
        ID
        title
        description
        create_date
        update_date
    }
}`)
export const UPDATE_WORKFLOW = gql(`
mutation UpdateWorkflow($updateWorkflowInput: UpdateWorkflowInput!) {
    updateWorkflow(updateWorkflowInput: $updateWorkflowInput) {
        ID
        title
        description
        create_date
        update_date
    }
}`)
export const DELETE_WORKFLOW = gql(`
mutation DeleteWorkflow($Input: InputID!) {
    deleteWorkflow(Input: $Input)
}
`)
export const GET_ALL_WORKFLOWS_BY_PROJECT_ID = gql(`
    query getAllWorkflowsByProjectID($ID: Int!) {
        getAllWorkflowsByProjectID(Input: { ID: $ID }) {
            ID
            title
            description
            update_date
            issueType {
                ID
                name
                description
                icon_url
            }
        }
}`);