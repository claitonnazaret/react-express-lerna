import React, { createContext, useEffect, useState } from 'react';
import { IAuthProvider, IContext, IRegister, IUser } from '../types';
import { StorageService, UserService } from '../services';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
    const [user, setUser] = useState<IUser | null>();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const userLS = StorageService.getUser();

        if (userLS != null) {
            setUser(userLS);
        }
    }, []);

    const login = async (email: string, password: string) => {
        await UserService.login(email, password)
            .then((res) => {
                const { data } = res;
                setUser(data);
                StorageService.setUser(data);
                navigate('/dashboard');
            })
            .catch((err: AxiosError) => {
                enqueueSnackbar(
                    err.response?.status == 401 ? 'Email/Senha inválidos' : err.message,
                    { variant: 'error' }
                );
            })
            .finally(() => {});
    };

    const register = async (values: IRegister) => {
        await UserService.register(values)
            .then((res) => {
                navigate('/');
            })
            .catch((err: AxiosError) => {
                enqueueSnackbar(err.message, { variant: 'error' });
            })
            .finally(() => {});
    };

    const logout = async () => {
        await UserService.logout()
            .then((res) => {
                setUser(null);
                StorageService.removeUser();
                navigate('/');
            })
            .catch((err: AxiosError) => {
                enqueueSnackbar(err.message, { variant: 'error' });
            })
            .finally(() => {});
    };

    const values: IContext = { ...user, login, register, logout };

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
