import { Box, Button } from '@mui/material';
import AppRoutes from '../../routes';
import { useNavigate } from 'react-router-dom';
import { LeftMenu } from '../../shared/components';
import { useDrawer, useAppTheme, useAuth } from '../../shared/hooks';

const MainPage = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const theme = useAppTheme();
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
