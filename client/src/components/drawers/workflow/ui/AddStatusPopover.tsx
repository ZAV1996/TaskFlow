import CreateStatusForm from "@/components/forms/workflow/create-status-form";
import { Button } from "@/components/ui/Button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { Plus } from "lucide-react";
export default function AddStatusPopover() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={'outline'}><Plus />Создать новый статус</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="start">
                <CreateStatusForm />
            </PopoverContent>
        </Popover>
    )
}
