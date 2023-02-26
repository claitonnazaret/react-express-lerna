import React, { useState, useEffect } from 'react';
import { Avatar, Grid, Link, Typography, InputAdornment, IconButton, Button } from '@mui/material';
import { Box } from '@mui/system';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterInput, registerSchema } from './util';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import _ from 'lodash';
import { FormInput } from '../../shared/components';
import { useAuth } from '../../shared/contexts/hooks';

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
    const [showPassword, setShowPassword] = useState(false);
    const [loadingBtn, setLoadingBtn] = useState(false);

    const handleShowPassword = () => setShowPassword((show) => !show);

    const methods = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
        values: {
            email: 'claitonnazaret@gmail.com',
            password: 'L5h3x7V6',
        },
    });

    const {
        reset,
        handleSubmit,
        register,
        formState: { isSubmitSuccessful, errors },
    } = methods;

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful]);

    const onSubmitHandler: SubmitHandler<RegisterInput> = async ({ email, password }) => {
        await auth.login(email, password);
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
                                            onMouseDown={(ev) => ev.preventDefault()}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            <span>Login</span>
                        </Button>

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
                    </Box>
                </FormProvider>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Box>
        </Box>
    );
};

export default LoginPage;
