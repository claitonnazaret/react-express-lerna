import ApiService from './ApiService';

const baseUrl = '/role';
export const RoleService = {
    getAll: async () => await ApiService.get(baseUrl),
    save: async (data: any, id?: number) => {
        return !id
            ? await ApiService.post(baseUrl, data)
            : await ApiService.put(`${baseUrl}/${id}`, data);
    },
    findOne: async (id: number) => await ApiService.get(`${baseUrl}/${id}`),
    delete: async (id: number) => await ApiService.delete(`${baseUrl}/${id}`),
};
