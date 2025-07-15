import EditProfileForm, { EditProfileFormHandle } from "@/components/forms/user/edit-user-form";
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
import { Separator } from "@/components/ui/separator";
import { TypographyMuted } from "@/components/ui/Typography";
import { PenBox } from "lucide-react"
import { useRef } from "react"

export default function EditProfileModal() {
    const ref = useRef<EditProfileFormHandle>(null);
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"}>Изменить <PenBox /></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Редактировать профиль</DialogTitle>
                    <Separator orientation="horizontal" />
                    <DialogDescription asChild={true}>
                        <TypographyMuted>Внесите изменения в свой профиль здесь. Нажмите «Сохранить», когда закончите.</TypographyMuted>
                    </DialogDescription>
                </DialogHeader>
                <EditProfileForm ref={ref} />
                <DialogFooter>
                    <DialogTrigger asChild>
                        <Button variant={"outline"}>Отмена</Button>
                    </DialogTrigger>
                    <Button type="button" onClick={() => {
                        if (ref.current && ref.current.submitForm) {
                            ref.current.submitForm();
                        }
                    }}>Сохранить</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
