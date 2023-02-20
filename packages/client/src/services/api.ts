import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { IUser } from '../components/context/AuthProvider/types';
import _ from 'lodash';
import { LocalStorage } from '../util/LocalStorage';
import { redirect } from 'react-router-dom';

const { VITE_SERVER_URL } = import.meta.env;

export interface IResponse {
    status: number;
    message: string | null;
    errors: string | null;
    data: any | any[] | null;
}

export const HandleError = (err: any): AxiosError => {
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

const Api = axios.create({
    baseURL: `${VITE_SERVER_URL}/api`,
    timeout: 100000,
    headers: { 'content-type': 'application/json' },
});

Api.interceptors.request.use((request) => {
    const userLocalStorage = LocalStorage.getUser();
    if (userLocalStorage?.accessToken) {
        request.headers.Authorization = `Bearer ${userLocalStorage?.accessToken}`;
    }
    // Este return é necessário para continuar a requisição para o endpoint.
    return request;
});

Api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error?.response?.status === 401 && !originalRequest?.__isRetryRequest) {
            originalRequest.retry = true;
            const userLocalStorage = LocalStorage.getUser();
            if (!userLocalStorage?.accessToken) {
                LocalStorage.clear();
                return (window.location.href = '/');
            }

            const resData = await Api.get(`${VITE_SERVER_URL}/api/user/refresh-token`, {
                withCredentials: true,
            });

            const user: IUser = {
                email: resData.data?.data?.email,
                accessToken: resData.data?.data?.accessToken,
            };
            LocalStorage.setUser(user);

            return Api(originalRequest);
        }

        return Promise.reject(error);
    }
);

export default Api;
