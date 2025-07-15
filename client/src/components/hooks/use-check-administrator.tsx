import { GET_CURRENT_USER, GET_USER_GROUPS } from "@/services/user.service"
import { useLazyQuery, useQuery } from "@apollo/client"
import { useEffect } from "react";

export default function useCheckAdministrator(): boolean {
    const currentUser = useQuery(GET_CURRENT_USER);

    const groups = useQuery(GET_USER_GROUPS, {
        variables: { GetUserGroups: currentUser.data?.getCurrentUser?.ID! }
    })

    if (groups.data?.getUserGroups)
        return groups.data?.getUserGroups.some(group => group.group_name === "Administrators")
    else return false
}
