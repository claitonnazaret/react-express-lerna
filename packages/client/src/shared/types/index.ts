import { AxiosResponse } from 'axios';

// Types
export type IRegister = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    roleId: string;
};

// Interfaces
export interface IUser {
    name?: string;
    email?: string;
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

export interface IResponse {
    status: number;
    message: string | null;
    errors: string | null;
    data: any | any[] | null;
}
