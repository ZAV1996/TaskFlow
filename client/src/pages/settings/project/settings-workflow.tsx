import { Panel } from '@/components/containers/Panel'
import { TypographyH3, TypographyH4, TypographyMuted } from '@/components/ui/Typography'
import { useWorkflow } from '@/components/hooks/workflow/useWorkflow'
import Loader from '@/components/ui/Loader'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@radix-ui/react-avatar'
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Workflow } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { convertDataTimeToHumanReadable } from '@/lib/TimeToHuman'
import RightDriver from '@/components/drawers/workflow/WorkflowDriver'
import { Link } from 'react-router'
import AddStatusPopover from '@/components/drawers/workflow/ui/AddStatusPopover'

export default function SettingsWorkflow() {
    const { isLoading, workflows } = useWorkflow()
    if (isLoading) return <Loader />
    if (workflows)
        return (
            <>
                <TypographyH3 className='flex items-center gap-2'>
                    <Workflow className="w-5 h-5 text-text" />
                    <span>Бизнесс-процессы</span>
                </TypographyH3>
                <TypographyMuted>Бизнес-процесс устанавливает, какие статусы и изменения состояний может использовать какой-либо тип проблемы в проекте.</TypographyMuted>
                {workflows.map(workflow => (
                    <Panel key={workflow.ID}>
                        <div className='flex justify-between' >
                            <span>
                                <TypographyH4 className='text-xl'> {workflow.title}</TypographyH4>
                                <TypographyMuted>{workflow.description}</TypographyMuted>
                            </span>
                            
                            <Link to={`./?id=${workflow.ID}`}>
                                <RightDriver />
                            </Link>


                        </div>
                        <Separator />
                        <Panel orientation={'horizontal'} variant={"ghost"} className='p-0 justify-start flex-1 flex-wrap'>
                            <TypographyH4 className='text-md'>Типы задач: </TypographyH4>
                            {workflow.issueType.map(type => (
                                <Badge key={type.ID} variant={'outline'}>
                                    <Avatar>
                                        <AvatarImage src={type.icon_url!} />
                                        <AvatarFallback className='size-5 rounded-md'>
                                            {type.name[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    {type.name}
                                </Badge>
                            )
                            )}
                        </Panel>
                        <TypographyMuted>Последнее обновление: {convertDataTimeToHumanReadable(workflow.update_date)}</TypographyMuted>
                    </Panel >
                ))
                }
            </>
        )
}
