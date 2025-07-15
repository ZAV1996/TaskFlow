import { Button } from "@/components/ui/Button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/Command"
import Loader from "@/components/ui/Loader"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover"
import { cn } from "@/lib/utils"
import { GET_ALL_USERS } from "@/services/user.service"
import { User } from "@/types/graphql"
import { useQuery } from "@apollo/client"
import { Check, ChevronsUpDown } from "lucide-react"
import React from "react"
import { UseFormReturn } from "react-hook-form"
interface IProps {
    form: UseFormReturn<{
        key: string;
        project_name: string;
        lead: number;
        description: string;
        image?: any;
    }, any, undefined>
}
export default function UserCombobox({ form }: IProps) {
    const [open, setOpen] = React.useState(false)
    const [selectedUser, setSelectedUser] = React.useState<User | null>(null)
    const { loading, data, error } = useQuery(GET_ALL_USERS)
    if (loading) {
        return <Loader />
    }
    if (error) return <span>Пользователи не найдены</span>
    if (data?.getAllUsers)
        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                    >
                        {selectedUser ? `${selectedUser.surname} ${selectedUser.name} ${selectedUser.patronymic} - ${selectedUser.email}` :
                            "Выберите руководителя проекта..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 bg-background min-w-max max-w-lg"
                    onOpenAutoFocus={(e) => e.preventDefault()}
                >
                    <Command>
                        <CommandInput placeholder="Введите ФИО руководителя..." />
                        <div
                            className="overflow-y-auto max-h-[300px]"
                            onWheel={(e) => e.stopPropagation()}
                        >
                            <CommandList>
                                <CommandEmpty>Пользователь не найден</CommandEmpty>
                                <CommandGroup>
                                    {data?.getAllUsers.map((user) => (
                                        <CommandItem
                                            key={user.ID}
                                            value={`${user.surname} ${user.name} ${user.patronymic} - ${user.email}`}
                                            onSelect={(currentValue) => {
                                                setSelectedUser(
                                                    `${user.surname} ${user.name} ${user.patronymic} - ${user.email}` === currentValue ? user : null
                                                )
                                                form.setValue("lead", user.ID)
                                                setOpen(false)
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    `${selectedUser?.surname} ${selectedUser?.name} ${selectedUser?.patronymic} - ${selectedUser?.email}` === `${user.surname} ${user.name} ${user.patronymic} - ${user.email}` ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {`${user.surname} ${user.name} ${user.patronymic} - ${user.email}`}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </div>
                    </Command>
                </PopoverContent>
            </Popover>
        )
}
