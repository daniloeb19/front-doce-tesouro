import axios, { AxiosResponse, InternalAxiosRequestConfig, AxiosHeaders } from 'axios';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' }
});

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token) {
            (config.headers as AxiosHeaders).set('x-access-token', token);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);
