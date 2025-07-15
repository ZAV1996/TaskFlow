import { gql } from '@/types/gql';
const GET_AVAILABLE_PROJECTS = gql(`
query GetAvailableProjects {
    getAvailableProjects {
        ID
        project_name
        description
        key
        image {
            ID
            originalName
            url
        }
        lead {
            ID
            email
            name
            surname
            patronymic
            department
            isActivated
            register_date
            updated_date
            avatar {
                ID
                url
                originalName
            }
        }
    }
}
`)
const GET_RECENT_PROJECTS = gql(`
query GetRecentProjects {
    getRecentProjects {
        ID
        project_name
        description
        key
        image{
            ID
            originalName
            url
        }
        lead {
            ID
            email
            name
            surname
            patronymic
            department
            isActivated
            register_date
            updated_date
            avatar {
                ID
                url
                originalName
            }
        }
    }
}
`)
const DELETE_PROJECT = gql(`
mutation DeleteProject($Input: InputID!) {
    deleteProject(Input: $Input)
}
`)
const GET_ISSUE_BY_PROJECT_ID = gql(`query GetAllIssuesByProjectID($Input: InputID!) {
    getAllIssuesByProjectID(Input: $Input) {
        ID
        key
        issueNum
        issueType {
            ID
            name
            icon_url
        }
        title
        description
        priority
        create_date
        update_date
        due_date
        author {
            ID
            email
            name
            surname
            patronymic
        }
        assignee {
            ID
            email
            name
            surname
            patronymic
        }
    }
}`)


const CREATE_PROJECT = gql(`
mutation CreateProject($lead: Int!, $project_name: String!, $key: String!, $image: Upload, $description: String) {
    createProject(Input: {
            lead: $lead
            project_name: $project_name
            key:  $key
            image: $image
            description: $description
        }) {
        ID
        project_name
        description
        key
        image {
            ID
            originalName
            url
        }
    }
}
        `)

const GET_PROJECT_BY_ID = gql(`
    query GetProjectByID($ID: Int!) {
    getProjectByID(Input: { ID: $ID }) {
        ID
        project_name
        description
        key
        image{
            ID
            originalName
            url
        }
        lead {
            ID
            email
            name
            surname
            patronymic
            department
            isActivated
            register_date
            updated_date
            avatar {
                ID
                url
                originalName
            }
        }
    }
}
    `)



export {
    GET_AVAILABLE_PROJECTS,
    DELETE_PROJECT,
    GET_RECENT_PROJECTS,
    GET_ISSUE_BY_PROJECT_ID,
    CREATE_PROJECT,
    GET_PROJECT_BY_ID,
}

