// import { gql } from '@/types/gql';

// export const ISSUE_BY_PROJECT_ID = gql(`
// query GetAllIssuesByProjectID {
//     getAllIssuesByProjectID(Input: { ID: 3 }) {
//         ID
//         key
//         issueNum
//         issueType
//         title
//         description
//         priority
//         Create
//         Update
//         DueDate
//     }
// }
//     `)
// export const ISSUE_BY_PROJECT_ID1 = gql(`
// query GetAllIssuesByProjectID1 {
//     getAllIssuesByProjectID(Input: { ID: 3 }) {
//         ID
//         Key
//         IssueNum
//         IssueType
//         Title
//         Description
//         Priority
//         Create
//         Update
//         DueDate
//         Author {
//             ID
//             email
//             name
//             surname
//             patronymic
//             department
//             isActivated
//             register_date
//             updated_date
//         }
//         Assignee {
//             ID
//             email
//             name
//             surname
//             patronymic
//             department
//             isActivated
//             register_date
//             updated_date
//         }
//         Status {
//             ID
//             title
//             is_initial
//             is_finished
//             on_process
//         }
//         ChildrenIssues {
//             ID
//             Key
//             IssueNum
//             IssueType
//             Title
//             Description
//             Priority
//             Create
//             Update
//             DueDate
//         }
//         ParentIssue {
//             ID
//             Key
//             IssueNum
//             IssueType
//             Title
//             Description
//             Priority
//             Create
//             Update
//             DueDate
//         }
//     }
// }
//         `)


