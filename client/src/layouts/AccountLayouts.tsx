import { useParams } from 'react-router'
import SettingsLayout from './SettingsLayout'
import { useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '@/services/user.service';

import Loader from '@/components/ui/Loader';
import NotFound from '@/pages/not-found';
import NavAccount from '@/components/navigate/Navigateaccount';


export default function AccountLayouts() {
    const { id } = useParams();
    const query = useQuery(GET_USER_BY_ID, { variables: { ID: Number(id) } });
    if (query.loading)
        return <Loader />
    if (query.error?.message) return <NotFound />
    if (query.data?.getUserByID)
        return (
            <SettingsLayout layoutTitle='Настройки аккаунта'>
                <NavAccount id={Number(id)} />
            </SettingsLayout>
        )
}
