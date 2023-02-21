import { IRegister } from '../types';
import Api from './api';

const baseUrl = '/user';
export const UserService = {
    login: async (email: string, password: string) =>
        await Api.post(`${baseUrl}/login`, { email, password }, { withCredentials: true }),
    logout: async () => await Api.get('/user/logout'),
    register: async (data: IRegister) =>
        await Api.post(`${baseUrl}/signup`, data, { withCredentials: true }),
};
