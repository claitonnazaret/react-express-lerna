import React, { createContext, useEffect, useState } from 'react';
import { IAuthProvider, IContext, IUser } from './types';
import { getUserLocalStorage, LoginRequest, setUserLocalStorage } from './util';

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
    const [user, setUser] = useState<IUser | null>();
    const [isSignedIn, setSignedIn] = useState<boolean>(false);

    useEffect(() => {
        const user = getUserLocalStorage();

        if (user) {
            setUser(user);
            setSignedIn(true);
        }
    }, []);

    const authenticated = async (email: string, password: string) => {
        await LoginRequest(email, password)
            .then((res: any) => {
                const payload = { token: res.data.token, email };

                setUser(payload);
                setSignedIn(true);
                setUserLocalStorage(payload);
            })
            .catch((err: any) => {
                throw err;
            });
    };

    const logout = () => {
        setUser(null);
        setUserLocalStorage(null);
        setSignedIn(false);
    };

    return (
        <AuthContext.Provider
            value={{ ...user, authenticated, logout, isSignedIn }}
        >
            {children}
        </AuthContext.Provider>
    );
};
