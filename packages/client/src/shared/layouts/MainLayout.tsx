import { useEffect } from 'react';
import { useDrawer } from '../../shared/contexts/hooks';
import { SideBar } from '../components';
import { PageLayout } from './PageLayout';
import Logo from '../../assets/react.svg';
import AppRoutes from '../../routes';

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
                <AppRoutes />
            </SideBar>
        </>
    );
};
