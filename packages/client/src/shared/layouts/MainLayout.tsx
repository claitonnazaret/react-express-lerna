import { useEffect } from 'react';
import { useDrawer } from '../../shared/contexts/hooks';
import { SideBar } from '../components';
import Logo from '../../assets/react.svg';
import AppRoutes from '../../routes';
import { AppFormProvider } from '../contexts';

export const MainLayout = () => {
    const { toogleOpen, setAppInfo } = useDrawer();

    useEffect(() => {
        setAppInfo({
            titulo: 'Novo Titulo',
            iconProfile: Logo,
        });
    }, []);
    return (
        <>
            <SideBar>
                <AppFormProvider>
                    <AppRoutes />
                </AppFormProvider>
            </SideBar>
        </>
    );
};
