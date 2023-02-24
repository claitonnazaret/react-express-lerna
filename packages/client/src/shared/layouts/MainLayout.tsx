import { Box, Button } from '@mui/material';
import AppRoutes from '../../routes';
import { useDrawer } from '../../shared/contexts/hooks';
import { SideBar } from '../components';

export const MainLayout = () => {
    const { toogleOpen } = useDrawer();
    return (
        <>
            <SideBar>
                <Button onClick={toogleOpen}>Open</Button>
                <Box sx={{ backgroundColor: 'red', width: '500px', height: '500px' }}>
                    <AppRoutes />
                </Box>
            </SideBar>
        </>
    );
};
