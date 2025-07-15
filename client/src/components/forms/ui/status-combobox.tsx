import { useStatuses } from "@/components/hooks/workflow/useStatuses"
import { Button } from "@/components/ui/Button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/Command"
import Loader from "@/components/ui/Loader"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown } from "lucide-react"
import React from "react"
interface StatusComboboxProps {
    value: number | null;
    onChange: (value: number) => void;
}
export default function StatusCombobox({ onChange, value }: StatusComboboxProps) {
    const [open, setOpen] = React.useState(false)
    // const [selectedStatus, setSelectedStatus] = React.useState<StatusType | null>(null)
    const { error, isLoading, statuses } = useStatuses()

    if (isLoading) return <Loader />
    if (error) return <span>Статусы не найдены</span>

    const selectedStatus = statuses?.find(status => status.ID === value) || null

    if (statuses)
        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                    >
                        {selectedStatus ? `${selectedStatus.title}` :
                            "Выберите статус..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 bg-background min-w-max max-w-lg"
                    onOpenAutoFocus={(e) => e.preventDefault()}
                >
                    <Command>
                        <CommandInput placeholder="Введите название статуса..." />
                        <div
                            className="overflow-y-auto max-h-[300px]"
                            onWheel={(e) => e.stopPropagation()}
                        >
                            <CommandList>
                                <CommandEmpty>Статус не найден</CommandEmpty>
                                <CommandGroup>
                                    {statuses.map((status) => (
                                        <CommandItem
                                            key={status.ID}
                                            value={status.title!}
                                            onSelect={
                                                () => {
                                                    onChange(status.ID)
                                                    setOpen(false)
                                                }
                                            }
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    `${selectedStatus?.title}` === `${status.title}` ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {status.title}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </div>
                    </Command>
                </PopoverContent>
            </Popover >
        )
}
