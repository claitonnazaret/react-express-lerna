import Api from './api';

export const UserService = {
    login: async (email: string, password: string) =>
        await Api.post('/user/login', { email, password }, { withCredentials: true }),
    logout: async () => await Api.get('/user/logout'),
};
