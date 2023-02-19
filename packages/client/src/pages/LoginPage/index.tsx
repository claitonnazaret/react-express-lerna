import React, { useState, useEffect } from 'react';
import {
    Avatar,
    Button,
    Grid,
    Link,
    TextField,
    Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from '../../components/context/AuthProvider/useAuth';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterInput, registerSchema } from './util';
import { IUser } from '../../components/context/AuthProvider/types';
import FormInput from '../../components/FormInput';

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

    const methods = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitSuccessful]);

    const onSubmitHandler: SubmitHandler<RegisterInput> = ({
        email,
        password,
    }) => {
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
                            autoComplete="email"
                            autoFocus
                        />
                        <FormInput
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
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
                </FormProvider>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Box>
        </Box>
    );
};

export default LoginPage;
