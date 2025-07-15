// app/auth/confirm/page.tsx
"use client"

import { useEffect, useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { Link, useSearchParams } from 'react-router'
import { CheckCircleIcon, Loader2, RefreshCw } from 'lucide-react'
import { useMutation } from '@apollo/client'
import { CONFIRM_TOKEN } from '@/services/auth.service'

export default function ConfirmPage() {
    const [searchParams] = useSearchParams()
    const [isMounted, setIsMounted] = useState(false)

    const email = searchParams.get('email')
    const token = searchParams.get('token')

    // Состояния для управления процессом подтверждения
    const [confirmationState, setConfirmationState] = useState<
        'idle' | 'loading' | 'success' | 'error'
    >('idle')
    const [confirmationMessage, setConfirmationMessage] = useState('')

    const [confirm] = useMutation(CONFIRM_TOKEN)

    // Функция для выполнения подтверждения
    const executeConfirmation = async () => {
        if (!email || !token) return

        try {
            setConfirmationState('loading')
            const { data } = await confirm({
                variables: { email, activationToken: token }
            })

            setConfirmationState('success')
            setConfirmationMessage(data?.confirm || 'Ваш email успешно подтвержден!')

        } catch (error: any) {
            setConfirmationState('error')
            setConfirmationMessage(
                error.message || 'Произошла ошибка при подтверждении email'
            )
        }
    }

    useEffect(() => {
        setIsMounted(true)

        // Проверяем наличие обязательных параметров
        if (!email || !token) {
            setConfirmationState('error')
            setConfirmationMessage('Отсутствуют необходимые параметры для подтверждения')
            return
        }

        // Автоматически запускаем подтверждение при монтировании
        executeConfirmation()

        return () => setIsMounted(false)
    }, [])

    // Защита от рендеринга до монтирования
    if (!isMounted) return null

    // Состояние: отсутствуют обязательные параметры
    if (!email || !token) {
        return (
            <div className="container max-w-md py-12">
                <head>
                    <title>Ошибка подтверждения</title>
                </head>

                <Alert variant="error">
                    <AlertTitle>Неполные данные</AlertTitle>
                    <AlertDescription>
                        В URL отсутствуют необходимые параметры для подтверждения email.
                        Пожалуйста, проверьте ссылку в письме.
                    </AlertDescription>
                </Alert>

                <div className="mt-6 flex flex-col gap-3">
                    <Button asChild>
                        <Link to="/">На главную</Link>
                    </Button>
                    <Button variant="secondary" asChild>
                        <Link to="/register">Повторная регистрация</Link>
                    </Button>
                </div>
            </div>
        )
    }

    // Состояние: загрузка
    if (confirmationState === 'loading') {
        return (
            <div className="container max-w-md py-12">
                <head>
                    <title>Подтверждение email...</title>
                </head>

                <Alert>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    <AlertTitle>Проверка вашего email</AlertTitle>
                    <AlertDescription>
                        Пожалуйста, подождите, пока мы подтверждаем ваш адрес электронной почты.
                    </AlertDescription>
                </Alert>
            </div>
        )
    }

    // Состояние: успешное подтверждение
    if (confirmationState === 'success') {
        return (
            <div className="container max-w-md py-12">
                <head>
                    <title>Email подтвержден</title>
                </head>

                <Alert variant="success">
                    <CheckCircleIcon className="h-5 w-5" />
                    <AlertTitle>Email подтвержден!</AlertTitle>
                    <AlertDescription>
                        {confirmationMessage}
                    </AlertDescription>
                </Alert>

                <Button className="mt-6 w-full" asChild>
                    <Link to="/login">Продолжить вход</Link>
                </Button>
            </div>
        )
    }

    // Состояние: ошибка
    return (
        <div className="container max-w-md py-12">
            <head>
                <title>Ошибка подтверждения</title>
            </head>

            <Alert variant="error">
                <AlertTitle>Ошибка подтверждения</AlertTitle>
                <AlertDescription>
                    {confirmationMessage || 'Произошла неизвестная ошибка при подтверждении email'}
                </AlertDescription>
            </Alert>

            <div className="mt-6 flex flex-col gap-3">
                <Button onClick={executeConfirmation}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Повторить попытку
                </Button>
                <Button variant="secondary" asChild>
                    <Link to="/">На главную</Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link to="/register">Повторная регистрация</Link>
                </Button>
            </div>
        </div>
    )
}