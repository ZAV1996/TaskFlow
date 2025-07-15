import CreateProjectForm from "@/components/forms/project/create-project-form"
import { EditProfileFormHandle } from "@/components/forms/user/edit-user-form"
import { Button } from "@/components/ui/Button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/Dialog"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useRef, useState } from "react"
interface IProps {
    asMenu: boolean
}
export default function CreateProjectModal({ asMenu = true }: IProps) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<EditProfileFormHandle>(null);
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {asMenu ?
                    <Button variant={'ghost'} className="gap-2 p-2 cursor-pointer w-full justify-start hover:bg-primary hover:text-text-on_primary" >
                        <div className="flex size-6 items-center justify-center rounded-md border">
                            <Plus className="size-4" />
                        </div>
                        <div className="font-medium">Создать проект</div>
                    </Button> :
                    <Button variant={"primary"}>
                        <Plus className="size-4" />
                        Создать проект
                    </Button>
                }
            </DialogTrigger>
            <DialogContent className="min-w-max max-w-lg w-full">
                <DialogHeader>
                    <DialogTitle>Создание проекта</DialogTitle>
                    <DialogDescription>Заполните поля формы затем нажмите "Сохранить"</DialogDescription>
                    <Separator orientation="horizontal" />
                </DialogHeader>
                <CreateProjectForm ref={ref} />
                <DialogFooter>
                    <DialogTrigger asChild>
                        <Button variant={"outline"}>Отмена</Button>
                    </DialogTrigger>
                    <Button type="button" onClick={async () => {
                        if (ref.current && ref.current.submitForm) {
                            await ref.current.submitForm();
                        }
                    }}>Сохранить</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
