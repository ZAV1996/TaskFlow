import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ChevronDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/Button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/Input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/Table"
import { ProjectType, User } from "@/types/graphql"
import { Await, Link, useLoaderData } from "react-router"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useQuery } from "@apollo/client"
import { GET_AVAILABLE_PROJECTS } from "@/services/project.service"
import Loader from "@/components/ui/Loader"
const columns: ColumnDef<ProjectType>[] = [

    {
        id: "image",
        accessorKey: "image",
        header: "",
        enableHiding: false,
        cell: ({ row }) => {
            return (
                <div className="capitalize flex flex-col">
                    <Avatar variant={"default"}>
                        <AvatarImage src={row.getValue("image")} />
                        <AvatarFallback>{row.getValue("key")}</AvatarFallback>
                    </Avatar>
                </div>
            )
        },
    },
    {
        id: "ID",
        accessorKey: "ID",
        enableHiding: false
    },
    {
        id: "project_name",
        accessorKey: "project_name",
        header: "Название",
        cell: ({ row }) => {
            return (
                <div className="capitalize flex flex-col">
                    <Link to={`/project/${row.getValue('ID')}/issues`} className="text-sm underline-offset-4 hover:underline">{row.getValue("project_name")}</Link>
                </div>
            )
        },
    },
    {
        id: "key",
        accessorKey: "key",
        header: "Ключ",
        cell: ({ row }) => (
            <div className="capitalize flex flex-col">
                {row.getValue("key")}
            </div>
        ),
    },
    {
        id: "lead",
        accessorKey: "lead",
        header: "Руководитель",
        cell: ({ row }) => {
            const user = row.getValue<User>("lead")
            if (user)
                return (
                    <div className="capitalize flex flex-col">
                        <Link to={`/account/${user.ID}/profile`} className="text-sm underline-offset-4 hover:underline">{`${user.surname} ${user.name} ${user.patronymic}`}</Link>
                    </div>
                )
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const project = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(project.ID.toString())}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
export default function AvailableProjects() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const { data, loading } = useQuery(GET_AVAILABLE_PROJECTS)
    const table = useReactTable({
        data: data?.getAvailableProjects!,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })
    if (loading) return <Loader />
    if (data?.getAvailableProjects)
        return (
            <Await resolve={data}>
                <div className="w-full px-5">
                    <div className="flex items-center py-5">
                        <div>
                            <Input
                                type="text"
                                placeholder="Поиск по названию..."
                                value={(table.getColumn("project_name")?.getFilterValue() as string) ?? ""}
                                onChange={(event) =>
                                    table.getColumn("project_name")?.setFilterValue(event.target.value)
                                }
                                className="max-w-sm"
                            />
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="ml-auto">
                                    Колонки <ChevronDown />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {table
                                    .getAllColumns()
                                    .filter((column) => column.getCanHide())
                                    .map((column) => {
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize"
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) =>
                                                    column.toggleVisibility(!!value)
                                                }
                                            >
                                                {column.columnDef.header as string}
                                            </DropdownMenuCheckboxItem>
                                        )
                                    })}

                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="rounded-md border border-border">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id}>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                </TableHead>
                                            )
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) :
                                    (
                                        <TableRow>
                                            <TableCell
                                                colSpan={columns.length}
                                                className="h-24 text-center"
                                            >
                                                No results.
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </div>
                    <div className="flex items-center justify-end space-x-2 py-4">
                        <div className="flex-1 text-sm text-muted-foreground">
                            {table.getFilteredSelectedRowModel().rows.length} of{" "}
                            {table.getFilteredRowModel().rows.length} row(s) selected.
                        </div>
                        <div className="space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </div >
            </Await>

            // <DataTableDemo />
        )
}
