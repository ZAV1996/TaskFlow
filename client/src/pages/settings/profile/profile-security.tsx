import EditPasswordForm from '@/components/forms/auth/edit-password-form'
import { Button } from '@/components/ui/Button'
import Loader from '@/components/ui/Loader'
import { Separator } from '@/components/ui/separator'
import { SecuritySessionCard } from '@/components/ui/sessions/security-session-card'
import { TypographyH3, TypographyH4, TypographyMuted } from '@/components/ui/Typography'
import { GET_CURRENT_USER_SESSIONS, KILL_ALL_SESSIONS } from '@/services/auth.service'
import { useMutation, useQuery } from '@apollo/client'
import { Lock, LogOut, RefreshCw, Shield } from 'lucide-react'
export default function ProfileSecurity() {
    const session_query = useQuery(GET_CURRENT_USER_SESSIONS)
    const sessions = session_query.data?.getCurrentUserSessions;
    const current_session = session_query.data?.getCurrentUserSession;
    const [_kill_all_sessions] = useMutation(KILL_ALL_SESSIONS)

    function kill_all_sessions() {
        _kill_all_sessions({
            refetchQueries: [
                { query: GET_CURRENT_USER_SESSIONS }
            ]
        })
    }
    if (session_query.loading) return <Loader />
    if (sessions && current_session)
        return (
            <>
                <TypographyH3 className='flex items-center gap-2'>
                    <Lock className="w-5 h-5 text-text" />
                    <span>Безопасность</span>
                </TypographyH3>
                <div className='p-5 border border-border rounded-lg flex flex-col gap-5'>
                    <TypographyH4 className='flex items-center gap-2'><Shield className="w-5 h-5 text-text" />Активные сессии пользователя</TypographyH4>
                    <TypographyMuted>Управление вашими активными сеансами входа</TypographyMuted>
                    <Separator />
                    {sessions.map(session => <SecuritySessionCard key={session.session_uuid}
                        expireIn={session.expireIn}
                        device={session.device.userAgent}
                        location={session.device.ip}
                        createdAt={session.createdAt}
                        session_uuid={session.session_uuid}
                        isCurrentSession={session.session_uuid === current_session.session_uuid}
                    />)}
                    {sessions.length > 1 ?

                        <Button variant="outline" className="gap-2" onClick={() => kill_all_sessions()}>
                            <LogOut className="w-4 h-4" />
                            Завершить все сессии
                            <TypographyMuted className='text-xs'>(кроме текущей)</TypographyMuted>
                        </Button> : <></>
                    }
                </div>
                <div className='p-5 border border-border rounded-lg flex flex-col gap-5'>
                    <TypographyH4 className='flex items-center gap-2'>
                        <RefreshCw className="w-5 h-5 text-text" />
                        <span>Сменить пароль</span>
                    </TypographyH4>
                    <Separator />
                    <EditPasswordForm />
                </div>


            </>

        )
}

