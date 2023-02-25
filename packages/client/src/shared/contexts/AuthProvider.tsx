import React, { createContext, useEffect, useState } from 'react';
import { IAuthProvider, IContext, IRegister, IUser } from '../types';
import { StorageService, UserService } from '../services';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
    const [user, setUser] = useState<IUser | null>();
    const navigate = useNavigate();
    const enqueueSnackbar = useSnackbar();

    useEffect(() => {
        const userLS = StorageService.getUser();

        if (userLS != null) {
            setUser(userLS);
        }
    }, []);

    const login = async (email: string, password: string) => {
        await UserService.login(email, password)
            .then((res) => {
                setUser(res.data.data);
                StorageService.setUser(res.data.data);
                navigate('/dashboard');
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {});
    };

    const register = async (values: IRegister) => {
        await UserService.register(values)
            .then((res) => {
                navigate('/');
            })
            .catch((err) => {
                console.error(err);
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
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {});
    };

    const values: IContext = { ...user, login, register, logout };

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
