import { useEffect, useState } from 'react';
import { useAuth, useLoading } from '../../shared/contexts/hooks';
import { ProfileService } from '../../shared/services';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';
import { useAppForm } from '../../shared/contexts/hooks/useAppForm';

interface IProfile {
    id?: number;
    nome?: string | null;
    sobreNome?: string | null;
    avatar?: string | null;
    documento?: string | null;
    userId?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

const ProfilePage = () => {
    const [data, setData] = useState<IProfile | null>();
    const { id } = useAuth();
    const { loading } = useLoading();
    const { enqueueSnackbar } = useSnackbar();
    const { setActions } = useAppForm();

    const handleTeste = async () => {
        await alert('Testou o botão');
    };

    useEffect(() => {
        setActions([
            {
                icon: 'save',
                label: 'Salvar',
                handle: handleTeste,
            },
        ]);

        loading(true);
        ProfileService.findOne(id ?? 0)
            .then((res) => {
                setData(res.data);
            })
            .catch((err: AxiosError) => {
                enqueueSnackbar(err.message, { variant: 'error' });
            })
            .finally(() => loading(false));
    }, []);

    return (
        <>
            <h1>Profile Page</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
    );
};

export default ProfilePage;
