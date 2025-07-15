import { Button } from "@/components/ui/Button";
import { ContextMenuLabel, ContextMenuSeparator } from "@/components/ui/context-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { DELETE_TRANSITION, GET_ALL_TRANSITIONS_BY_WORKFLOW_ID } from "@/services/workflow";
import { useMutation } from "@apollo/client";
import { BaseEdge, getSmoothStepPath, type EdgeProps, type Edge, EdgeLabelRenderer } from "@xyflow/react";
import { PenBox, Split, Trash2 } from "lucide-react";

type TEdge = {
    label: string,
    showLabel: boolean
}
export type EdgeNodeProps = Edge<TEdge, 'edge'>;

export default function StatusEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    selected,
    data,
}: EdgeProps<EdgeNodeProps>) {
    const ID = Number(new URLSearchParams(location.search).get('id'));

    const [edgePath, labelX, labelY] = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });
    const [deleteTransition] = useMutation(DELETE_TRANSITION)

    function deleteTr() {
        deleteTransition({
            variables: {
                Transition: {
                    ID: Number(id)
                }
            },
            refetchQueries: [
                { query: GET_ALL_TRANSITIONS_BY_WORKFLOW_ID, variables: { ID } }
            ]
        })
    }
    return (
        <>
            <BaseEdge
                id={id}
                path={edgePath}
                className="stroke-1 stroke-border focus:stroke-primary transition-colors"
            />
            <EdgeLabelRenderer>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={'primary'}
                            style={{
                                position: 'absolute',
                                transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                                pointerEvents: 'all',
                                outline: '1'
                            }}
                            className={`nodrag nopan  p-1 h-5 text-[0.5rem] ${!selected ? 'opacity-0' : 'opacity-100'} transition-opacity`}
                        >
                            {data?.label}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="px-2 py-2 w-56">
                        <SidebarMenu className="gap-0">
                            <ContextMenuLabel>Опции</ContextMenuLabel>
                            <ContextMenuSeparator />
                            <SidebarMenuItem>
                                <SidebarMenuButton className='text-text justify-between'>
                                    Изменить
                                    <PenBox className="hover:text-text-on_primary" />
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton className='text-text justify-between'>
                                    Условия
                                    <Split className="hover:text-text-on_primary" />
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton className='justify-between' onClick={deleteTr}>
                                    <span>Удалить переход</span>
                                    <Trash2 className="text-error" />
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </PopoverContent>
                </Popover>
            </EdgeLabelRenderer >
            <circle r="4" fill="#000">
                <animateMotion dur="2s" repeatCount="indefinite" path={edgePath} />
            </circle>
        </>
    );
}