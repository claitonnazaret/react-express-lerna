import React, { createContext, useEffect, useState } from 'react';
import { StorageService, UserService } from '../services';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';
import { useLoading } from './hooks';

export type IRegister = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    roleId: string;
};

export interface IUser {
    name?: string;
    email?: string;
    role?: string;
    accessToken?: string;
}

export interface IContext extends IUser {
    login: (email: string, password: string) => Promise<void>;
    register: (values: IRegister) => Promise<void>;
    logout: () => Promise<void>;
}

export interface IAuthProvider {
    children: JSX.Element;
}

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
    const [user, setUser] = useState<IUser | null>();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { loading } = useLoading();

    useEffect(() => {
        const userLS = StorageService.getUser();

        if (userLS != null) {
            setUser(userLS);
            userInfo();
        }
    }, []);

    const login = async (email: string, password: string) => {
        loading(true);
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
            .finally(() => loading(false));
    };

    const register = async (values: IRegister) => {
        loading(true);
        await UserService.register(values)
            .then((res) => {
                navigate('/');
            })
            .catch((err: AxiosError) => {
                enqueueSnackbar(err.message, { variant: 'error' });
            })
            .finally(() => loading(false));
    };

    const logout = async () => {
        loading(true);
        await UserService.logout()
            .then((res) => {
                setUser(null);
                StorageService.removeUser();
                navigate('/');
            })
            .catch((err: AxiosError) => {
                enqueueSnackbar(err.message, { variant: 'error' });
            })
            .finally(() => loading(false));
    };

    const userInfo = async () => {
        loading(true);
        await UserService.userInfo()
            .then((res) => {
                setUser({ ...user, role: res.data?.Role?.roleName });
            })
            .catch((err: AxiosError) => {
                enqueueSnackbar(err.message, { variant: 'error' });
            })
            .finally(() => loading(false));
    };

    const values: IContext = { ...user, login, register, logout };

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
