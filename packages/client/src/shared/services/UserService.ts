import { IRegister } from '../contexts';
import ApiService from './ApiService';

const baseUrl = '/user';

const UserService = {
    login: async (email: string, password: string) =>
        await ApiService.post(`${baseUrl}/login`, { email, password }, { withCredentials: true }),
    logout: async () => await ApiService.get('/user/logout'),
    register: async (data: IRegister) =>
        await ApiService.post(`${baseUrl}/signup`, data, { withCredentials: true }),
    userInfo: async () => await ApiService.get(`${baseUrl}/current-user`),
};

export default UserService;
