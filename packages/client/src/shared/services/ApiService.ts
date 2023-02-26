import axios, { AxiosError } from 'axios';
import _ from 'lodash';
import { IUser } from '../types';
import { StorageService } from './StorageService';

const { VITE_SERVER_URL } = import.meta.env;

const HandleError = (err: any): AxiosError => {
    if (axios.isAxiosError(err)) {
        return err as AxiosError;
    }
    return {
        response: {
            status: 500,
        },
        message: 'Internal Server Error',
    } as AxiosError;
};

const ApiService = axios.create({
    baseURL: `${VITE_SERVER_URL}/api`,
    timeout: 100000,
    headers: { 'content-type': 'application/json' },
});

ApiService.interceptors.request.use(
    (config) => {
        const ls = StorageService.getUser();
        if (ls?.accessToken) {
            config.headers.Authorization = `Bearer ${ls?.accessToken}`;
        }
        // Faz alguma coisa antes da requisição ser enviada
        return config;
    },
    (error) => {
        return Promise.reject(HandleError(error));
    }
);

// Adiciona um interceptador na resposta
ApiService.interceptors.response.use(
    (res) => res,
    async (error) => {
        const config = error.config;
        if (error.response && error.response.status === 401 && !config._retry) {
            config._retry = true;
            try {
                const resData = await axios.get(`${VITE_SERVER_URL}/api/user/refresh-token`, {
                    withCredentials: true,
                });

                config.headers.Authorization = `Bearer ${resData?.data?.token}`;

                StorageService.setUser(resData.data);
                return ApiService(config);
            } catch (err) {
                return Promise.reject(HandleError(err));
            }
        }
        return Promise.reject(HandleError(error));
    }
);

export default ApiService;
