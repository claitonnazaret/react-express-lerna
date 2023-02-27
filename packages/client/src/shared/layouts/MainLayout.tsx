import { useEffect } from 'react';
import { useDrawer } from '../../shared/contexts/hooks';
import { SideBar } from '../components';
import Logo from '../../assets/react.svg';
import { Outlet } from 'react-router-dom';
import { AppFormProvider } from '../contexts';
import { menus } from '../../routes';

export const MainLayout = () => {
    const { setAppInfo } = useDrawer();
    const { setDrawerOptions } = useDrawer();

    useEffect(() => {
        setAppInfo({ titulo: 'Novo Titulo', iconProfile: Logo });
        setDrawerOptions(menus);
    }, []);

    useEffect(() => {}, []);
    return (
        <SideBar>
            <AppFormProvider>
                <Outlet />
            </AppFormProvider>
        </SideBar>
    );
};
