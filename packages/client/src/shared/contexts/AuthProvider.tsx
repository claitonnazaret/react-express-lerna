import React, { createContext, useEffect, useState } from 'react';
import { StorageService, UserService } from '../services';
import { AxiosResponse, AxiosError } from 'axios';

export interface IRegister {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  roleId: string;
}

export interface IUser {
  id?: number;
  name?: string;
  email?: string;
  role?: string;
  avatar?: string;
  accessToken?: string;
}

export interface IContext extends IUser {
  login: (email: string, password: string) => Promise<void | AxiosError>;
  register: (values: IRegister) => Promise<void | AxiosError>;
  logout: () => Promise<void | AxiosError>;
}

export interface IAuthProvider {
  children: JSX.Element;
}

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUser | null>();

  useEffect(() => {
    const userLS = StorageService.getUser();

    if (userLS != null) {
      setUser(userLS);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await UserService.login(email, password);
      setUser(data);
      StorageService.setUser(data);
      return await Promise.resolve();
    } catch (err) {
      return await Promise.reject(err);
    }
  };

  const register = async (values: IRegister) => {
    try {
      await UserService.register(values);
      return await Promise.resolve();
    } catch (err) {
      return await Promise.reject(err);
    }
  };

  const logout = async () => {
    try {
      await UserService.logout();
      setUser(null);
      StorageService.removeUser();
      return await Promise.resolve();
    } catch (err) {
      return await Promise.reject(err);
    }
  };

  const values: IContext = { ...user, login, register, logout };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
