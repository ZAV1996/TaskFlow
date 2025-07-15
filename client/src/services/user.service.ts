import { client } from '@/main';
import { gql } from '@/types/gql';
import { GraphQLError } from 'graphql';
import { LoaderFunction } from 'react-router';
const GET_USER_BY_ID = gql(`
    query GetUserByID($ID: Int!) {
        getUserByID(ID: $ID) {
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
    `)
const GET_CURRENT_USER = gql(`
        query GetCurrentUser {
            getCurrentUser {
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
    `);
const GET_ALL_USERS = gql(`
    query GetAllUsers {
        getAllUsers {
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
                originalName
                url
            }

        }
    }
    `)
const GET_USER_GROUPS = gql(`
        query GetUserGroups($GetUserGroups: Int!) {
            getUserGroups(GetUserGroups: $GetUserGroups) {
                ID
                group_name
            }
        }
    `)

const GET_GROUP_USERS = gql(`
        query GetUsersInGroup($GetUsersInGroup: Int!) {
            getUsersInGroup(GetUsersInGroup: $GetUsersInGroup) {
                ID
                email
                name
                surname
                patronymic
                department
                isActivated
                register_date
                avatar {
                    ID
                }
                updated_date
            }
        }
    `)


const CREATE_USER = gql(`
    mutation CreateUser(
            $password: String!, 
            $patronymic: String!, 
            $surname: String!, 
            $name: String!, 
            $email: String! 
    ) {
        createUser(
            CreateUser: { 
                password: $password, 
                patronymic:  $patronymic, 
                surname: $surname, 
                name: $name, 
                email: $email 
            }
        ) {
            ID
            email
            name
            surname
            patronymic
            department
            isActivated
            register_date
            avatar{
                ID
            }
            updated_date
        }
}
    `);
const UPDATE_USER = gql(`
    mutation UpdateUser(
        $ID: Int!,
        $email: String,
        $name: String,
        $surname: String,
        $patronymic: String,
        $password: String,
        $department: String,
        $isActivated: Boolean
            ) {
        updateUser(
            UpdateUser: {
                ID: $ID
                email: $email
                name: $name
                surname: $surname
                patronymic: $patronymic
                password: $password
                department: $department
                isActivated: $isActivated
            }
        ) {
            ID
            email
            name
            surname
            patronymic
            department
            isActivated
            register_date
            avatar{
                ID
            }
            updated_date
        }
    }
    `)
const DELETE_USER = gql(`
    mutation DeleteUser($ID: Int!) {
        deleteUser(ID: $ID)
    }`)

const UPDATE_MY_PROFILE = gql(`
mutation UpdateMyProfile($ID: Int!, $name: String, $surname: String, $patronymic: String, $department: String, ) {
    updateMyProfile(
        UpdateMyProfile: { ID: $ID, name: $name, surname: $surname, patronymic: $patronymic, department: $department}
    ) {
        ID
        name
        surname
        patronymic
        email
        department
        isActivated
        avatar {
            ID
            url
            originalName
        }
        register_date
        updated_date
    }
}
    `)

const SET_AVATAR = gql(`
        mutation SetAvatar(
            $file: Upload!,
        ) {
            setAvatar(file: $file){
        ID
        name
        surname
        patronymic
        email
        department
        isActivated
        avatar {
            ID
            originalName
            url
        }
        register_date
        updated_date
            }
        }
    `);
export {
    GET_USER_BY_ID,
    GET_ALL_USERS,
    GET_GROUP_USERS,
    GET_CURRENT_USER,
    GET_USER_GROUPS,

    CREATE_USER,
    UPDATE_USER,
    DELETE_USER,
    UPDATE_MY_PROFILE,
    //UPLOAD_IMAGE,
    SET_AVATAR
}
export const CurrentUserLoader: LoaderFunction = async () => {
    return exceptionHandler(async () => {
        const { data } = await client.query({
            query: GET_CURRENT_USER,
            errorPolicy: 'ignore' // Игнорируем ошибки для ручной обработки
        });
        return data?.getCurrentUser || null;
    })
}

export const exceptionHandler = async (func: Function) => {
    try {
        return await func() || null;
    } catch (error: any) {
        // Проверяем, является ли ошибка аутентификационной
        if (
            error.networkError?.statusCode === 401 ||
            error.graphQLErrors?.some((e: GraphQLError) => e.extensions?.code === 'UNAUTHENTICATED') ||
            error.graphQLErrors?.some((e: GraphQLError) => e.message === 'jwt expired')
        ) {
            return null;
        }
        // Пробрасываем другие ошибки для обработки ErrorBoundary
        throw error;
    }
}