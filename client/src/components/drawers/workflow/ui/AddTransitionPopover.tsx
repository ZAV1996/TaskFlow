import CreateTransitionForm from "@/components/forms/workflow/create-transition-form";
import { Button } from "@/components/ui/Button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { Plus } from "lucide-react";

export default function AddTransitionPopover() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"outline"}><Plus />Добавить переход</Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-80">
                <CreateTransitionForm />
            </PopoverContent>
        </Popover>
    )
}
