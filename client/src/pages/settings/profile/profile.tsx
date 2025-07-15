import { Panel } from "@/components/containers/Panel";
import EditProfileModal from "@/components/modals/profile/edit-profile-modal";
import UploadImageProfileModal from "@/components/modals/profile/upload-image-profile-modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { TypographyH3, TypographyH4, TypographyMuted } from "@/components/ui/Typography";
import { URL, STATIC_URL } from "@/constants/constants";
import { getFullUrl } from "@/lib/utils";
import { GET_CURRENT_USER, GET_USER_BY_ID } from "@/services/user.service";
import { User } from "@/types/graphql";
import { useQuery } from "@apollo/client";
import { LockIcon, Unlock, User2 } from "lucide-react";

import { useParams } from "react-router"
export default function Account() {
    const { id } = useParams();
    const { data } = useQuery(GET_USER_BY_ID, { variables: { ID: Number(id) } })
    const current_user = useQuery(GET_CURRENT_USER);
    let user: User | null = null
    let isCurUser = current_user.data?.getCurrentUser?.ID === Number(id);
    if (current_user.data?.getCurrentUser?.ID === Number(id)) {
        user = current_user.data?.getCurrentUser
    } else {
        if (data?.getUserByID)
            user = data?.getUserByID
    }
    const inicials = `${user?.name?.charAt(0).toLocaleUpperCase()}${user?.surname?.charAt(0).toLocaleUpperCase()}`
    if (user)
        return (
            <div className="relative flex flex-col gap-5 flex-1" >
                <TypographyH3 className='flex items-center gap-2'>
                    <User2 className="w-5 h-5 text-text" />
                    <span>Профиль</span>
                </TypographyH3>
                <Panel orientation={"horizontal"} className="items-center justify-between">
                    <div className="flex gap-5">
                        <Avatar variant={"middle"}>
                            <AvatarImage src={`${getFullUrl(user.avatar?.url)}`} />
                            <AvatarFallback>{inicials}</AvatarFallback>
                        </Avatar>
                        <span className="flex flex-col justify-end">
                            <TypographyH3>{user.surname} {user.name} {user.patronymic}</TypographyH3>
                            <TypographyMuted>{user.department}</TypographyMuted>
                            <TypographyMuted>{user.email}</TypographyMuted>
                        </span>
                    </div>
                    {isCurUser ? <UploadImageProfileModal /> : <></>}
                </Panel>
                <Panel>
                    <div className="flex gap-5 justify-between">
                        <TypographyH4>Персональная информация</TypographyH4>
                        {isCurUser ? <EditProfileModal /> : <></>}
                    </div>
                    <Separator orientation="horizontal" />
                    <span className="grid grid-cols-2 gap-5">
                        <span>
                            <TypographyMuted>Фамилия</TypographyMuted>
                            <TypographyH4>{user.surname}</TypographyH4>
                        </span>
                        <span>
                            <TypographyMuted>Имя</TypographyMuted>
                            <TypographyH4>{user.name}</TypographyH4>
                        </span>
                        <span>
                            <TypographyMuted>Отчество</TypographyMuted>
                            <TypographyH4>{user.patronymic}</TypographyH4>
                        </span>
                        <span>
                            <TypographyMuted>Адрес электронной почты</TypographyMuted>
                            <TypographyH4><a href={`mailto:${user.email}`}>{user.email}</a></TypographyH4>
                        </span>
                        {user.department ?
                            <span>
                                <TypographyMuted>Место работы</TypographyMuted>
                                <TypographyH4>{user.department}</TypographyH4>
                            </span> : <></>
                        }

                    </span>
                </Panel>
                <Panel>
                    <div className="flex gap-5 justify-between">
                        <TypographyH4>Прочая информация</TypographyH4>
                    </div>
                    <Separator orientation="horizontal" />
                    <span className="grid grid-cols-2 gap-5">
                        <span>
                            <TypographyMuted>Дата регистрации</TypographyMuted>
                            <TypographyH4>{new Date(user.register_date).toLocaleDateString()} {new Date(user.register_date).toLocaleTimeString()}</TypographyH4>
                        </span>
                        <span>
                            <TypographyMuted>Последнее обновление</TypographyMuted>
                            <TypographyH4>{new Date(user.updated_date).toLocaleDateString()} {new Date(user.updated_date).toLocaleTimeString()}</TypographyH4>
                        </span>
                        <span>
                            <TypographyMuted>Статус учетной записи</TypographyMuted>
                            {
                                user.isActivated ?
                                    <TypographyH4>
                                        <span className="flex gap-3 items-center">
                                            Активирована
                                            <Unlock className="text-green-500" />
                                        </span>
                                    </TypographyH4> :
                                    <TypographyH4>
                                        <span className="flex gap-3 items-center">
                                            Заблокирована
                                            <LockIcon className="text-red-500" />
                                        </span>
                                    </TypographyH4>
                            }

                        </span>
                        <span>
                            <TypographyMuted>Уникальный идентификатор в системе</TypographyMuted>
                            <TypographyH4 >{user.ID}</TypographyH4>
                        </span>
                    </span>
                </Panel>
            </div >
        )
}