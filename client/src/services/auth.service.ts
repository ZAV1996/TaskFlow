import { gql } from '@/types/gql';
const SIGN_IN = gql(
    `
mutation Login($email: String!, $password: String!) {
    login(LoginInput: { email: $email, password: $password }){
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
const LOGOUT = gql(`
    mutation Logout {
        logout
    }
`)

const REGISTER = gql(`
mutation Register(
    $email: String!, 
    $name: String!, 
    $surname: String!, 
    $patronymic: String!,
    $password: String! 
    ) {
    register(
        RegisterInput: { 
        email: $email, 
        name: $name, 
        surname: $surname, 
        patronymic: $patronymic, 
        password: $password }
    )
}
`)
const CONFIRM_TOKEN = gql(`
    mutation Confirm($email: String!, $activationToken: String!) {
        confirm(ConfirmToken: { email: $email, activationToken: $activationToken })
    }
`);
const SEND_FORGOT = gql(`
    mutation Forgot( $email: String! ) {
        forgot(ForgotPassInput: { email: $email })
    }`)
const SET_NEW_PASS_FROM_FORGOT = gql(`
    mutation UpdatePass(
        $email: String!,
        $password: String!,
        $token: String!,
        $double_password: String!
    ) {
        updatePass(
            ForgotPass: { 
                email: $email, 
                password: $password, 
                token: $token, 
                double_password: $double_password 
            }
            )
    }
    `)

const CHANGE_PASSWORD = gql(`
    mutation ChangePassword($ID: Int!, $currentPassword: String!, $newPassword: String!, $repeatNewPassword: String!) {
    changePassword(
        Input: {
            ID: $ID
            currentPassword: $currentPassword
            newPassword: $newPassword
            repeatNewPassword: $repeatNewPassword
        }
    ) {
        ID
    }
}

    `)
const GET_USER_SESSIONS = gql(`
    query GetUserSessions($email: String!) {
    getUserSessions(email: $email) {
        session_uuid
        device {
            userAgent
            ip
        }
        deviceId
        expireIn
        }
    }
    `)
const GET_CURRENT_USER_SESSIONS = gql(`
    query GetCurrentUserSessions {
    getCurrentUserSessions {
        deviceId
        session_uuid
        expireIn
        createdAt
        device {
            userAgent
            ip
        }
    }
    getCurrentUserSession {
        deviceId
        session_uuid
        expireIn
        createdAt
        device {
            userAgent
            ip
        }
    }
}
    `)

const KILL_SESSION = gql(`
                    mutation Kill_session($session_uuid: String!) {
                kill_session(session_uuid: $session_uuid)
            }
        `)
const FOGOT_PASSWORD = gql(`
    mutation FogotPassword($email: String!) {
        forgot(ForgotPassInput: { email: $email })
    }
`)

const KILL_ALL_SESSIONS = gql(`
        mutation Kill_all_sessions {
            kill_all_sessions
        }
        `)



export {
    FOGOT_PASSWORD,
    GET_CURRENT_USER_SESSIONS,
    SIGN_IN,
    LOGOUT,
    REGISTER,
    CONFIRM_TOKEN,
    SEND_FORGOT,
    SET_NEW_PASS_FROM_FORGOT,
    CHANGE_PASSWORD,
    KILL_SESSION,
    KILL_ALL_SESSIONS
}
