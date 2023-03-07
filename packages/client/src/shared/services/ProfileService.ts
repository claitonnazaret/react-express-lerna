import ApiService from './ApiService';

const baseUrl = '/profile';

export const ProfileService = {
  save: async (id: number, data: any) => {
    console.log(data);

    const formData = new FormData();
    Object.keys(data).map((k) => {
      formData.append(k, data[k]);
    });
    return await ApiService.put(`${baseUrl}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  findOne: async (userId: number) => await ApiService.get(`${baseUrl}/${userId}`),
};
