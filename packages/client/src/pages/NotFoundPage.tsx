import { Box, Grid, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../shared/contexts/hooks';

export const NotFoundPage = () => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const goHome = () => {
    navigate(!accessToken ? '/login' : '/');
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
          <>The page you’re looking for doesn’t exist.</>
        </Typography>
        <Button variant="contained" onClick={goHome}>
          Back Home
        </Button>
      </Grid>
    </Box>
  );
};
