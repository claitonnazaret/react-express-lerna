import { Box, Grid, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/context/AuthProvider/useAuth';

export default function NotFoundPage() {
    const auth = useAuth();
    const navigate = useNavigate();

    const goHome = () => {
        alert(' Teste');
        navigate(!auth.isSignedIn ? '/' : '/protected');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
            }}
        >
            <Grid display="flex" alignItems="center" flexDirection="column">
                <Typography variant="h1">404</Typography>
                <Typography variant="h6">
                    The page you’re looking for doesn’t exist. {auth.isSignedIn}
                </Typography>
                <Button variant="contained" onClick={goHome}>
                    Back Home
                </Button>
            </Grid>
        </Box>
    );
}
