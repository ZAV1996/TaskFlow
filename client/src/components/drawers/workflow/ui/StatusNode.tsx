import { Button } from "@/components/ui/Button";
import { ContextMenuLabel, ContextMenuSeparator } from "@/components/ui/context-menu";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { DELETE_STATUS, GET_ALL_STATUSES_BY_WORKFLOW_ID } from "@/services/workflow";
import { StatusStyleVariant } from "@/types/graphql";
import { useMutation } from "@apollo/client";
import { Handle, Node, NodeProps, Position, useInternalNode, useNodeId, useNodes, useNodesData, useOnSelectionChange, useUpdateNodeInternals, } from "@xyflow/react";
import { cva, } from "class-variance-authority";
import { PenBox, Trash2 } from "lucide-react";
import { useContext } from "react";
import { wfContext } from "../WorkflowDriver";

type Status = {
    title: string;
    ID?: number;
    variant?: StatusStyleVariant;
};

export type StatusNodeProps = Node<Status, 'status'>;

const statusVariants = cva(
    "px-4 py-3 rounded-lg border shadow-sm transition-colors flex flex-col gap-2",
    {
        variants: {
            variant: {
                [StatusStyleVariant.Default]: "bg-background border-border hover:border-primary",
                [StatusStyleVariant.Primary]: "bg-blue-50 border-blue-200 hover:border-blue-400",
                [StatusStyleVariant.Success]: "bg-green-50 border-green-200 hover:border-green-400",
                [StatusStyleVariant.Warning]: "bg-yellow-50 border-yellow-200 hover:border-yellow-400",
            },
            selected: {
                true: ''
            }
        },
        defaultVariants: {
            variant: StatusStyleVariant.Default,
        },
        compoundVariants: [
            {
                selected: true,
                variant: [StatusStyleVariant.Default],
                className: 'border-primary'
            },
            {
                selected: true,
                variant: [StatusStyleVariant.Primary],
                className: 'border-blue-400'
            },
            {
                selected: true,
                variant: [StatusStyleVariant.Warning],
                className: 'border-yellow-400'
            },
            {
                selected: true,
                variant: [StatusStyleVariant.Success],
                className: 'border-green-400'
            },
        ]
    }
);

export function StatusNode({ selected, dragging, ...props }: NodeProps<StatusNodeProps>) {
    const [mutation] = useMutation(DELETE_STATUS)
    const ID = Number(new URLSearchParams(location.search).get('id'));

    const ctx = useContext(wfContext)

    function deleteStatus() {
        mutation({
            variables: {
                deleteStatusInput: { ID: props.data.ID! }
            },
            refetchQueries: [
                { query: GET_ALL_STATUSES_BY_WORKFLOW_ID, variables: { ID } }
            ]
        })
    }
    return (
        <Popover open={selected && !dragging && ctx?.event !== 'position'}>
            <PopoverTrigger asChild>
                <div className={`group ${statusVariants({ variant: props.data.variant, selected })} `}>
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center">
                            <h3 className="text-sm font-semibold text-text">{props.data.title}</h3>
                        </div>
                    </div>

                    <Handle
                        type="target"
                        id={'TL'}
                        position={Position.Left}
                        className="!size-3 !bg-green-600 !border-2 !border-background opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    <Handle
                        type="target"
                        id={'TT'}
                        position={Position.Top}
                        style={{ left: "66.6%" }}
                        className="!size-3 !bg-green-600 !border-2 !border-background opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    <Handle
                        type="target"
                        id={"TB"}
                        position={Position.Bottom}
                        style={{ left: "66.6%" }}
                        className="!size-3 !bg-green-600 !border-2 !border-background opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    <Handle
                        type="source"
                        id={'ST'}
                        position={Position.Top}
                        style={{ left: "33.3%" }}
                        className="!size-3 !bg-orange-600 !border-2 !border-background opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    <Handle
                        type="source"
                        id={"SB"}
                        position={Position.Bottom}
                        style={{ left: "33.3%" }}
                        className="!size-3 !bg-orange-600 !border-2 !border-background opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    <Handle
                        type="source"
                        id={"SR"}
                        position={Position.Right}
                        className="!size-3 !bg-orange-600 !border-2 !border-background opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                </div>
            </PopoverTrigger>
            <PopoverContent className="px-2 py-2 w-56">
                <SidebarMenu className="gap-0">
                    <ContextMenuLabel>Опции</ContextMenuLabel>
                    <ContextMenuSeparator />
                    <SidebarMenuItem>
                        <SidebarMenuButton className='text-text justify-between'>
                            <span>Изменить статус</span>
                            <PenBox />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <DeleteStatusDialog deleteStatus={deleteStatus} />
                    </SidebarMenuItem>
                </SidebarMenu>
            </PopoverContent>
        </Popover >
    );
}
type Props = {
    deleteStatus: () => void
}
export function DeleteStatusDialog({ deleteStatus }: Props) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <SidebarMenuButton className='text-text justify-between'>
                    Удалить статус
                    <Trash2 className="text-error" />
                </SidebarMenuButton>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>
                    Удаление статуса
                </DialogTitle>
                <DialogDescription>
                    Вы уверены что ходите удалить статус?
                </DialogDescription>
                <div className="flex gap-4">
                    <DialogClose>
                        <Button
                            className="flex-1"
                            variant={'outline'}
                        >
                            Отмена
                        </Button>
                    </DialogClose>

                    <Button
                        className="flex-1"
                        variant={"destructive"}
                        onClick={deleteStatus}
                    >
                        <Trash2 />
                        Удалить
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
