import React, { useState } from 'react';
import {
    Avatar,
    Button,
    Grid,
    Link,
    TextField,
    Container,
    Typography,
    Snackbar,
} from '@mui/material';
import { Box } from '@mui/system';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from '../../components/context/AuthProvider/useAuth';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

function Copyright(props: any) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const LoginPage = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        auth.authenticated(email, password)
            .then(() => {
                navigate('/dashboard');
            })
            .catch((error) => {
                enqueueSnackbar(
                    _.get(
                        error,
                        'response.data.error',
                        'Internal server Error'
                    ),
                    {
                        variant: 'error',
                        autoHideDuration: 3000,
                        disableWindowBlurListener: true,
                    }
                );
            });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100vw',
                minHeight: '100vh',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: '380px',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box
                    component="form"
                    onSubmit={() => {}}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(ev) => setEmail(ev.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(ev) => setPassword(ev.target.value)}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleLogin}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Box>
        </Box>
    );
};

export default LoginPage;
