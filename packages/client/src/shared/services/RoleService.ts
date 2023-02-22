import ApiService from './ApiService';

const RoleService = {
    getAll: async () => await ApiService.get('/role'),
    findOne: async () => await ApiService.get('/role'),
    save: async () => await ApiService.post('/role'),
    delete: async () => await ApiService.delete('/role'),
};

export default RoleService;
