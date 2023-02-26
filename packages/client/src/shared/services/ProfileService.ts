import ApiService from './ApiService';

const baseUrl = '/profile';

export const ProfileService = {
    save: async (id: number, data: any) => await ApiService.put(`${baseUrl}/${id}`, data),
    findOne: async (userId: number) => await ApiService.get(`${baseUrl}/${userId}`),
};
