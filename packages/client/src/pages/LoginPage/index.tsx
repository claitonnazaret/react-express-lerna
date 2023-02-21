import React, { useState, useEffect } from 'react';
import { Avatar, Grid, Link, Typography, InputAdornment, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { useAuth } from '../../components/context/AuthProvider/useAuth';
import { useSnackbar } from 'notistack';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterInput, registerSchema } from './util';
import { FormInput } from '../../components/form';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { HandleError } from '../../services/api';
import LoadingButton from '@mui/lab/LoadingButton';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import _ from 'lodash';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
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
    const location = useLocation();
    const { enqueueSnackbar } = useSnackbar();
    const [showPassword, setShowPassword] = useState(false);
    const [loadingBtn, setLoadingBtn] = useState(false);

    const handleShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const methods = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
        values: {
            email: 'admin@gmail.com',
            password: '12345678',
        },
    });

    const {
        reset,
        handleSubmit,
        register,
        formState: { isSubmitSuccessful, errors },
    } = methods;

    useEffect(() => {
        // if (isSubmitSuccessful) {
        //     reset();
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitSuccessful]);

    const onSubmitHandler: SubmitHandler<RegisterInput> = async ({ email, password }) => {
        setLoadingBtn(true);
        await auth
            .authenticated(email, password)
            .then((res: any) => {
                navigate('/dashboard');
            })
            .catch((error: any) => {
                const err = HandleError(error);
                enqueueSnackbar(
                    _.get(err, 'response.status', 500) == 401
                        ? 'Email / Senha inválidos'
                        : err.message,
                    {
                        variant: 'error',
                        autoHideDuration: 3000,
                    }
                );
            })
            .finally(() => {
                setLoadingBtn(false);
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
                    Login
                </Typography>
                <FormProvider {...methods}>
                    <Box
                        component="form"
                        noValidate
                        sx={{ mt: 1 }}
                        onSubmit={handleSubmit(onSubmitHandler)}
                    >
                        <FormInput
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="off"
                            autoFocus
                        />
                        <FormInput
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Senha"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            autoComplete="off"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <LoadingButton
                            type="submit"
                            fullWidth
                            loading={loadingBtn}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            loadingPosition="end"
                        >
                            <span>Login</span>
                        </LoadingButton>

                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Esqueceu a senha?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {'Crie uma conta'}
                                </Link>
                            </Grid>
                        </Grid>

                        <pre>{JSON.stringify(auth.email, null, 2)}</pre>

                        <pre>{JSON.stringify(import.meta.env.VITE_SERVER_URL, null, 2)}</pre>
                        <pre>{JSON.stringify(import.meta.env.VITE_KEY_USER, null, 2)}</pre>
                    </Box>
                </FormProvider>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Box>
        </Box>
    );
};

export default LoginPage;
