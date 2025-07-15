import Loader from '@/components/ui/Loader';
import { Errors } from '@/constants/constants';
import { GET_CURRENT_USER, GET_USER_GROUPS } from '@/services/user.service';
import { User } from '@/types/graphql';
import { useLazyQuery, useQuery } from '@apollo/client';
import { createContext, Dispatch, HTMLAttributes, SetStateAction, Suspense, useEffect, useState } from 'react';
import { Await, Navigate, Outlet, useAsyncValue, useLoaderData, useLocation } from 'react-router';
export type AuthContextType = {
    isAuth: boolean,
    setIsAuth: Dispatch<SetStateAction<boolean>>,
}
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: HTMLAttributes<HTMLDivElement>) => {
    const currentUser = useQuery(GET_CURRENT_USER);
    const [isAuth, setIsAuth] = useState(!!currentUser.data?.getCurrentUser);
    useEffect(() => {
        setIsAuth(!!currentUser.data?.getCurrentUser);
    }, [currentUser]);



    if (currentUser.loading)
        return <Loader />
    else
        return (
            <Suspense fallback={<Loader />}>
                <AuthContext.Provider value={{ isAuth, setIsAuth }}>
                    {children}
                </AuthContext.Provider>
            </Suspense>
        );
};