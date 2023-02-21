import React, { useState, useEffect } from 'react';
import { Avatar, IconButton, InputAdornment, Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from '../../components/context/AuthProvider/useAuth';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterInput, registerSchema } from './util';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormInput, FormRadioGroup } from '../../components/form';
import { UserService } from '../../services/user';
import LoadingButton from '@mui/lab/LoadingButton';
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

const RegisterPage = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loadingBtn, setLoadingBtn] = useState(false);

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
    }, [isSubmitSuccessful]);

    const onSubmitHandler: SubmitHandler<RegisterInput> = ({
        name,
        email,
        password,
        confirmPassword,
        roleId,
    }) => {
        setLoadingBtn(true);
        UserService.register({
            name,
            email,
            password,
            confirmPassword,
            roleId,
        })
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                enqueueSnackbar(_.get(error, 'response.data.error', 'Internal server Error'), {
                    variant: 'error',
                    autoHideDuration: 3000,
                });
            })
            .finally(() => setLoadingBtn(false));
    };

    const handleShowPassword = () => setShowPassword((show) => !show);
    const handleShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
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
                    Registre-se
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
                            id="name"
                            label="Nome Completo"
                            name="name"
                            autoComplete="off"
                            autoFocus
                        />
                        <FormInput
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            type="email"
                            autoComplete="off"
                        />
                        <FormInput
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
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
                        <FormInput
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirmar Password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            autoComplete="off"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleShowConfirmPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <FormRadioGroup
                            row
                            type="number"
                            name="roleId"
                            label="Cadastro"
                            options={[
                                { id: 2, label: 'Prestador', size: 'small' },
                                { id: 3, label: 'Cliente', size: 'small' },
                            ]}
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
                    </Box>
                </FormProvider>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Box>
        </Box>
    );
};

export default RegisterPage;
