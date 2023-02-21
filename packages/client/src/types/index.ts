import { AxiosResponse } from 'axios';

// Interfaces
export interface IUser {
    name?: string;
    email?: string;
    accessToken?: string;
}

export interface IContext extends IUser {
    authenticated: (email: string, password: string) => Promise<AxiosResponse>;
    logout: () => Promise<AxiosResponse>;
}

export interface IAuthProvider {
    children: JSX.Element;
}

export interface IResponse {
    status: number;
    message: string | null;
    errors: string | null;
    data: any | any[] | null;
}

// Types
export type IRegister = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    roleId: string;
};
