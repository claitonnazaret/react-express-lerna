import React, { useState, useEffect } from 'react';
import { Avatar, IconButton, InputAdornment, Link, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth, useLoading } from '../shared/contexts/hooks';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { object, string, TypeOf } from 'zod';
import _ from 'lodash';
import { Copyright } from './LoginPage';
import { RadioButtonGroup, TextFieldElement } from 'react-hook-form-mui';
import { REQUIRED_FIELD } from '../shared/utils';

const registerSchema = object({
  name: string({
    required_error: REQUIRED_FIELD,
  }),
  email: string({
    required_error: REQUIRED_FIELD,
  }).email('Email inválido'),
  password: string({
    required_error: REQUIRED_FIELD,
  })
    .min(8, 'Senha deve conter mais de 8 caracteres')
    .max(32, 'Senha deve conter no máximo 32 caracteress'),
  confirmPassword: string({
    required_error: 'Você deve confirmar a senha',
  })
    .min(8, 'Senha deve conter mais de 8 caracteres')
    .max(32, 'Senha deve conter no máximo 32 caracteress'),
  roleId: string({
    required_error: REQUIRED_FIELD,
  }),
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'As senhas não coincidem',
});

type RegisterInput = TypeOf<typeof registerSchema>;

export const RegisterPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { loading } = useLoading();

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

  const onSubmitHandler: SubmitHandler<RegisterInput> = async ({
    name,
    email,
    password,
    confirmPassword,
    roleId,
  }) => {
    loading(true);
    await auth
      .register({
        name,
        email,
        password,
        confirmPassword,
        roleId,
      })
      .then(() => {
        navigate('/login');
      })
      .catch((err: AxiosError) => {
        const message = err.response?.status === 401 ? 'Email / Senha inválido!' : err.message;
        enqueueSnackbar(message, { variant: 'error' });
      })
      .finally(() => loading(false));
  };

  const handleShowPassword = () => setShowPassword((show) => !show);
  const handleShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

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
          <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(onSubmitHandler)}>
            <TextFieldElement
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nome Completo"
              name="name"
              autoComplete="off"
              autoFocus
            />
            <TextFieldElement
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
              autoComplete="off"
            />
            <TextFieldElement
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
                      onMouseDown={(ev) => ev.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextFieldElement
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
                      onMouseDown={(ev) => ev.preventDefault()}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <RadioButtonGroup
              row
              type="number"
              name="roleId"
              label="Cadastro"
              options={[
                { id: 2, label: 'Prestador', size: 'small' },
                { id: 3, label: 'Cliente', size: 'small' },
              ]}
            />

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              <span>Registrar</span>
            </Button>
          </Box>
        </FormProvider>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Box>
    </Box>
  );
};
