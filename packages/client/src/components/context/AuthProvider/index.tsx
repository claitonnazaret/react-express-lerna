import React, { createContext, useEffect, useState } from 'react';
import { IAuthProvider, IContext, IUser } from './types';
import { getUserLocalStorage, LoginRequest, setUserLocalStorage } from './util';

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
    const [user, setUser] = useState<IUser | null>();

    useEffect(() => {
        const userLocalStorage = getUserLocalStorage();

        if (userLocalStorage) {
            setUser(userLocalStorage);
        }
    }, []);

    const authenticated = async (email: string, password: string) => {
        await LoginRequest(email, password)
            .then((res: any) => {
                const payload = { token: res.data.token, email };
                setUser(payload);
                setUserLocalStorage(payload);
            })
            .catch((err: any) => {
                throw err;
            });
    };

    const logout = () => {
        setUser(null);
        setUserLocalStorage(null);
    };

    const isSignedIn = (): boolean => {
        const userLocalStorage = getUserLocalStorage();
        return userLocalStorage != null;
    };

    return (
        <AuthContext.Provider value={{ ...user, authenticated, logout, isSignedIn }}>{children}</AuthContext.Provider>
    );
};
