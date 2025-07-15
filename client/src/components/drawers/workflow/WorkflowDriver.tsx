import { Disc, Disc2, PenBox, Plus, Save, X } from "lucide-react";
import { Button } from "../../ui/Button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "../../ui/drawer";
import { addEdge, Background, BackgroundVariant, Controls, MiniMap, ReactFlow, useEdgesState, useNodesState, type Node, type Edge, reconnectEdge, Connection, OnNodesChange, NodeChange, EdgeChange, ReactFlowProvider } from '@xyflow/react';

import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { StatusNode, StatusNodeProps } from "./ui/StatusNode";
import StatusEdge from "./ui/StatusEdge";
import { Separator } from "@/components/ui/separator";
import AddStatusPopover from "./ui/AddStatusPopover";
import { useForm } from "react-hook-form";
import { CreateOrUpdateStatusInput, StatusStyleVariant } from "@/types/graphql";
import { useLocation, useNavigate, useNavigation } from "react-router";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_STATUSES_BY_WORKFLOW_ID, GET_ALL_TRANSITIONS_BY_WORKFLOW_ID, UPDATE_STATUS } from "@/services/workflow";
import { useStatuses } from "@/components/hooks/workflow/useStatuses";
import { useTransitions } from "@/components/hooks/workflow/useTransitions";
import CreateTransitionForm from "@/components/forms/workflow/create-transition-form";
import AddTransitionPopover from "./ui/AddTransitionPopover";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";

interface IWorkflow {
    edges: Edge[]
    nodes: StatusNodeProps[]
    setNodes: React.Dispatch<React.SetStateAction<StatusNodeProps[]>>
    setEdges: React.Dispatch<React.SetStateAction<Edge[]>>
    event: string,
    setEvent: React.Dispatch<React.SetStateAction<string>>
}

export const wfContext = React.createContext<IWorkflow | null>(null)

export default function WorkflowDriver() {
    const ID = Number(new URLSearchParams(location.search).get('id'));
    const initialNodes: StatusNodeProps[] = [];
    const initialEdges: Edge[] = []
    const navigate = useNavigate()
    const { statuses, } = useStatuses()
    const { transitions } = useTransitions()
    const [isOpenTransitionModal, setIsOpenTransitionModal] = useState(false)
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const edgeReconnectSuccessful = useRef(true);
    const [mutate] = useMutation(UPDATE_STATUS)

    const [event, setEvent] = useState('')

    useEffect(() => {
        if (statuses) {
            const newNodes = statuses.map((status) => ({
                id: `${status.ID}`,
                position: {
                    x: status.status_meta.posX,
                    y: status.status_meta.posY
                },
                data: {
                    title: status.title!,
                    ID: status.ID,
                    variant: status.status_meta.variant
                },
                type: 'status' as const
            }));
            setNodes(newNodes);
        }
        if (transitions) {
            const edges = transitions.map((transition) => (
                {
                    id: `${transition.ID}`,
                    source: `${transition.parent?.ID}`,
                    target: `${transition.to?.ID}`,
                    sourceHandle: transition.transition_meta.sourceHandle,
                    targetHandle: transition.transition_meta.targetHandle,
                    data: { label: transition.title },
                    type: 'edge' as const,
                }
            ))
            setEdges(edges)
        }
    }, [statuses, transitions, setNodes, setEdges]);



    const NodesChange = useCallback((changes: NodeChange<StatusNodeProps>[]) => {
        onNodesChange(changes)
        const selectChanges = changes.filter(ch =>
            ch.type === 'select' && ch.selected
        );
        for (const e of changes) {
            if (e.type === 'position') {
                if (!e.dragging) {
                    mutate({
                        variables: {
                            status_meta: {
                                posX: e.position?.x,
                                posY: e.position?.y
                            },
                            ID: Number(e.id),
                            parent: {
                                ID
                            }
                        },
                        refetchQueries: [
                            { query: GET_ALL_STATUSES_BY_WORKFLOW_ID, variables: { ID } }
                        ]
                    })
                    setEvent(e.type)
                }
            }
            if (e.type === "select" && selectChanges.length > 0) {
                setEvent(e.type)
            }
        }
    }, [onNodesChange, ID, mutate]);

    function EdgesChange(e: EdgeChange<Edge>[]) {
        onEdgesChange(e)
    }

    const onConnect = useCallback(
        (params: any) => {
            return setEdges((eds) => addEdge({ ...params, type: "edge", data: { label: "Label" } }, eds))
        },
        [setEdges]
    );

    const onReconnect = useCallback((oldEdge: Edge, newConnection: Connection) => {
        edgeReconnectSuccessful.current = true;
        setEdges((els) => reconnectEdge(oldEdge, newConnection, els));
    }, []);
    const onReconnectStart = useCallback(() => {
        edgeReconnectSuccessful.current = false;
    }, []);
    const onReconnectEnd = useCallback((_: any, edge: Edge) => {
        if (!edgeReconnectSuccessful.current) {
            setEdges((eds) => eds.filter((e) => e.id !== edge.id));
        }
        edgeReconnectSuccessful.current = true;
    }, []);



    function addNewStatus() {
        setNodes([
            { id: "asdas", position: { x: 0, y: 0 }, data: { title: 'WF', ID: 1, variant: StatusStyleVariant.Primary }, type: 'status' }, ...nodes,])
    }

    const addStatusForm = useForm<CreateOrUpdateStatusInput>({
        defaultValues: {
            title: "",
            parent: { ID: undefined },
            is_finished: false,
            is_initial: true,
            on_process: false
        }
    })
    const nodeTypes = useMemo(() => ({ status: StatusNode }), []);
    const edgeTypes = useMemo(() => ({ edge: StatusEdge }), []);
    return (
        <wfContext.Provider value={{
            edges, nodes, setEdges, setNodes, event, setEvent
        }}>
            <Drawer direction="right" handleOnly={true} onClose={() => { navigate(-1) }}>
                <DrawerTrigger asChild>
                    <Button variant={"outline"}>Изменить <PenBox /></Button>
                </DrawerTrigger>

                <DrawerContent className="data-[vaul-drawer-direction=right]:sm:max-w-none data-[vaul-drawer-direction=right]:sm:w-auto">
                    <DrawerHeader className="border-b border-border py-5 px-0 gap-5">
                        <div className="flex flex-col gap-5">
                            <div className="flex items-center gap-2 px-5">
                                <DrawerClose asChild>
                                    <Button variant="outline" size={"icon"}><X /></Button>
                                </DrawerClose>
                                <DrawerTitle className="text-xl">Редактирование бизнесс-процесса</DrawerTitle>
                                <DrawerDescription></DrawerDescription>
                            </div>
                            <Separator className="py-0" />
                            <div className="px-5 flex items-center gap-5">
                                <AddStatusPopover />
                                <AddTransitionPopover />
                                <Button><Save />Сохранить</Button>
                            </div>
                        </div>
                    </DrawerHeader>
                    <div className="h-full w-screen container">
                        <ReactFlowProvider>
                            <ReactFlow
                                nodeTypes={nodeTypes}
                                edgeTypes={edgeTypes}
                                nodes={nodes}
                                edges={edges}
                                onNodesChange={NodesChange}
                                onEdgesChange={EdgesChange}
                                onConnect={onConnect}
                                onReconnect={onReconnect}
                                onReconnectStart={onReconnectStart}
                                onReconnectEnd={onReconnectEnd}

                                fitView
                            >
                                <Controls />
                                <Background
                                    bgColor="rgba(var(--background-secondary))"
                                    gap={12}
                                    size={1} />
                            </ReactFlow>
                        </ReactFlowProvider>
                    </div>
                </DrawerContent>
            </Drawer>
        </wfContext.Provider>
    )
}

export function TransitionDialog() {
    return (
        <Popover>
            <PopoverTrigger >
            </PopoverTrigger>
            <PopoverContent>
                Создание перехода
                <DialogDescription></DialogDescription>
                <Input placeholder="Введите название перехода" />
            </PopoverContent>
        </Popover>
    )
}
