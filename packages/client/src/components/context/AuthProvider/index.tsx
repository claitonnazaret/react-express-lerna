import React, { createContext, useEffect, useState } from 'react';
import { UserService } from '../../../services/user';
import { LocalStorage } from '../../../util/LocalStorage';
import { IAuthProvider, IContext, IUser } from './types';

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
    const [user, setUser] = useState<IUser | null>();

    useEffect(() => {
        const userLS = LocalStorage.getUser();

        if (userLS != null) {
            setUser(userLS);
        }
    }, []);

    const authenticated = async (email: string, password: string) => {
        const res = await UserService.login(email, password);

        if (res.status == 200) {
            setUser(res.data.data);
            LocalStorage.setUser(res.data.data);
        }

        return res;
    };

    const logout = async () => {
        const res = await UserService.logout();

        if (res.status == 200) {
            setUser(null);
            LocalStorage.removeUser();
        }

        return res;
    };

    return (
        <AuthContext.Provider value={{ ...user, authenticated, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
