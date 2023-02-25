import { Box, Button } from '@mui/material';
import { useEffect } from 'react';
import AppRoutes from '../../routes';
import { useDrawer } from '../../shared/contexts/hooks';
import { SideBar } from '../components';
import { PageLayout } from './PageLayout';
import Logo from '../../assets/react.svg';

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
                <PageLayout>
                    <AppRoutes />
                </PageLayout>
            </SideBar>
        </>
    );
};
