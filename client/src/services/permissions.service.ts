import { gql } from '@/types/gql';
export const GET_PERMISSIONS_RULES_BY_PROJECT_ID = gql(`
    query GetPermissionRulesByProjectID($ID: Int!) {
        getPermissionRulesByProjectID(getPermissionRulesByProjectID: { ID: $ID }) {
            ID
            permissionKey {
                ID
                permissionKey
                description
            }
            is_Project_Lead
            is_Assegnee
            is_Owner
            projectRole {
                ID
                name
                description
                members {
                    ID
                    role {
                        ID
                        name
                        description
                        members {
                            ID
                            members {
                                ID
                                email
                                name
                                surname
                                patronymic
                                department
                                isActivated
                                register_date
                                updated_date
                            }
                        }
                    }
                }
            }
            group {
                ID
                group_name
            }
            user {
                ID
                email
                name
                surname
                patronymic
                department
                isActivated
                register_date
                updated_date
            }
    
        }
    }
    `)

export const GET_PERMISSIONS_KEYS = gql(`
        query GetPermissionKeys{
        getPermissionKeys {
            ID
            permissionName
            permissionKey
            description
        }
    }
        `)