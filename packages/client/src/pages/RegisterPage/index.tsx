import React, { useState, useEffect } from 'react';
import {
    Avatar,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    IconButton,
    InputAdornment,
    Link,
    OutlinedInput,
    Radio,
    RadioGroup,
    Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from '../../components/context/AuthProvider/useAuth';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

import { useForm, SubmitHandler, FormProvider, Controller, useFormContext } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterInput, registerSchema } from './util';
import { Visibility, VisibilityOff } from '@mui/icons-material';

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

    const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
        console.log(JSON.stringify(values));
        // auth.authenticated(email, password)
        //     .then(() => {
        //         navigate('/login');
        //     })
        //     .catch((error) => {
        //         enqueueSnackbar(_.get(error, 'response.data.error', 'Internal server Error'), {
        //             variant: 'error',
        //             autoHideDuration: 3000,
        //         });
        //     });
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
                            autoComplete="off"
                            autoFocus
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

                        <FormControl>
                            <FormLabel>Cadastro</FormLabel>
                            <Controller
                                name="roleId"
                                render={({ field }) => (
                                    <RadioGroup {...field} row>
                                        <FormControlLabel
                                            name="roleId"
                                            value="2"
                                            control={<Radio />}
                                            label="Prestador"
                                        />
                                        <FormControlLabel
                                            name="roleId"
                                            value="3"
                                            control={<Radio />}
                                            label="Cliente"
                                        />
                                    </RadioGroup>
                                )}
                            />
                        </FormControl>

                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Registrar
                        </Button>
                    </Box>
                </FormProvider>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Box>
        </Box>
    );
};

export default RegisterPage;
