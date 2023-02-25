import ApiService from './ApiService';

const RoleService = {
    getAll: async () => await ApiService.get('/role'),
    save: async (data: any, id?: number) => {
        return !id
            ? await ApiService.post(`/role`, data)
            : await ApiService.put(`/role/${id}`, data);
    },
    findOne: async (id: number) => await ApiService.get(`/role/${id}`),
    delete: async (id: number) => await ApiService.delete(`/role/${id}`),
};

export default RoleService;
