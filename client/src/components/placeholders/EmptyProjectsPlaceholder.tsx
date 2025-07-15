import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { ClipboardList, Lock } from "lucide-react";
import useCheckAdministrator from "@/components/hooks/use-check-administrator";
import CreateProjectModal from "@/components/modals/project/create-project-modal";
import { TypographyMuted } from "@/components/ui/Typography";
export default function EmptyProjectsPlaceholder() {
    const isAdmin = useCheckAdministrator()
    return (
        <Card className="w-full h-full mx-auto">
            <CardHeader className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-background-secondary">
                    {isAdmin ? (
                        <ClipboardList className="h-6 w-6 text-muted-foreground" />
                    ) : (
                        <Lock className="h-6 w-6 text-muted-foreground" />
                    )}
                </div>
                <CardTitle className="mt-4 text-xl font-medium">
                    {isAdmin ? "Нет активных проектов" : "Проекты отсутствуют"}
                </CardTitle>
            </CardHeader>
            <CardContent className="text-center text-sm text-text-secondary">
                {isAdmin ? (
                    <TypographyMuted>
                        В системе пока не создано ни одного проекта. Начните работу, создав
                        новый проект.
                    </TypographyMuted>
                ) : (
                    <TypographyMuted>
                        В настоящее время в системе нет активных проектов. <br />Обратитесь к
                        администратору для создания нового проекта.
                    </TypographyMuted>
                )}
            </CardContent>
            {isAdmin && (
                <CardFooter className="flex justify-center">
                    <CreateProjectModal asMenu={false} />
                </CardFooter>
            )}
        </Card>
    )
}
