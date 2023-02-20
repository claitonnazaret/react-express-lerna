import { AxiosResponse } from 'axios';

export interface IUser {
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
