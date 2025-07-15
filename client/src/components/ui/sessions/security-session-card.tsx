import { DateTime, Duration } from "luxon"
import { Lock, LogOut, Clock, AlertTriangle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { GET_CURRENT_USER_SESSIONS, KILL_ALL_SESSIONS, KILL_SESSION } from "@/services/auth.service"
import { useMutation } from "@apollo/client"
import { convertTimestampToHumanReadable } from "@/lib/TimeToHuman"
import { TypographyH4, TypographyMuted, TypographyP } from "../Typography"
import { Badge } from "../Badge"

interface SessionCardProps {
    location: string
    device: string
    isCurrentSession: boolean
    createdAt: number // ISO string
    expireIn: number // минуты
    session_uuid: string
    className?: string
}

export function SecuritySessionCard({
    location,
    device,
    isCurrentSession,
    createdAt,
    expireIn,
    session_uuid,
    className,
}: SessionCardProps) {
    const loginDate = DateTime.fromMillis(createdAt)
    const expiresAt = loginDate.plus({ seconds: expireIn })
    const duration = Duration.fromObject({ minutes: Math.round(expiresAt.diffNow().as('minutes')) }).shiftTo('days', 'hours', 'minutes').toHuman();

    const [_kill_session] = useMutation(KILL_SESSION)
    function kill_session(session_uuid: string) {
        _kill_session({
            variables: { session_uuid }, refetchQueries: [
                { query: GET_CURRENT_USER_SESSIONS }
            ]
        })
    }

    const timeLeftString = `Истекает через ${duration}`

    return (
        <div className={cn(
            "flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-lg",
            className
        )}>
            <div className="flex items-center gap-3 flex-1">
                <div className="mt-0.5">
                    {isCurrentSession ? (
                        <CheckCircle2 className={cn(
                            "w-5 h-5",
                            "text-green-500"
                        )} />
                    ) : (
                        <TypographyMuted><Lock className="w-5 h-5" /></TypographyMuted>
                    )}
                </div>
                <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                        <TypographyH4 className="sm:text-base">{device}</TypographyH4>
                    </div>
                    <TypographyMuted className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                        Вход: {loginDate.toRelative()}
                        <span className={cn(
                            "inline-flex items-center gap-1",
                        )}>
                            <Clock className="w-3 h-3" />
                            {timeLeftString}
                        </span>
                        <Badge variant={"outline"}>IP: {location}</Badge>
                    </TypographyMuted>

                </div>
            </div>

            <div className="flex-shrink-0">
                {isCurrentSession ? (
                    <Button
                        variant="ghost"
                        size="sm"
                        disabled
                        className={cn(
                            "pointer-events-none",
                        )}
                    >
                        Текущая
                    </Button>
                ) : (
                    <Button
                        variant={"outline"}
                        size="sm"
                        onClick={() => kill_session(session_uuid)}
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Завершить
                    </Button>
                )}
            </div>
        </div>
    )
}