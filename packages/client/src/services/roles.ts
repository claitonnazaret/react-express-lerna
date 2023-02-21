import Api from './api';

export const RoleService = {
    getAll: async () => await Api.get('/role'),
};
