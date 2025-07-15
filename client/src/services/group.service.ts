import { gql } from '@/types/gql';
const CREATE_GROUP = gql(`
    mutation CreateGroup(
        $group_name: String!,
        $description: String!
        ) {
        createGroup(CreateGroupInput: {
                group_name: $group_name,
                description: $description 
            }) {
            ID
            group_name
            create_date
            updated_date
            description
        }
    }
    `)
const UPDATE_GROUP = gql(`
mutation UpdateGroup(
        $ID: Int!,
        $group_name: String, 
        $description: String,
    ) {
    updateGroup(UpdateGroupInput: { 
            ID: $ID,
            group_name: $group_name, 
            description: $description, 
        }) {
        ID
        group_name
        create_date
        updated_date
        description
    }
    }`)
const REMOVE_GROUP = gql(`
    mutation RemoveGroup(
        $RemoveGroup: Int!
    ) {
        removeGroup(RemoveGroup: $RemoveGroup)
    }
    `)

export {
    CREATE_GROUP,
    UPDATE_GROUP,
    REMOVE_GROUP,
}