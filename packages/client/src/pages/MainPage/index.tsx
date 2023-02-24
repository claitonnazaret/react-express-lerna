import { Box, Button } from '@mui/material';
import AppRoutes from '../../routes';
import { LeftMenu } from '../../shared/components';
import { useDrawer } from '../../shared/contexts/hooks';

const MainPage = () => {
    const { toogleOpen } = useDrawer();
    return (
        <>
            <LeftMenu>
                <Button onClick={toogleOpen}>Open</Button>
                <Box sx={{ backgroundColor: 'red', width: '500px', height: '500px' }}>
                    <AppRoutes />
                </Box>
            </LeftMenu>
        </>
    );
};

export default MainPage;
