import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const Whatsapp: AxiosInstance = axios.create();

const whatsappApiKey: string = (process.env.WHATSAPP_API_KEY as string);

/**
 * this interceptor handles all network request
 * made to the thirdparty service
 */
Whatsapp.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        config.baseURL = process.env.WHATSAPP_API_URL;
        config.headers!['API-KEY'] = whatsappApiKey;
        config.headers!['Content-Type'] = 'application/json';
        config.headers!['Accept'] = 'application/json';

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

/**
 * this interceptor handles all network response
 * from the thirdparty service
 */
Whatsapp.interceptors.response.use(
    (response: AxiosResponse) => {
        return response
    },
    error => {
        // console.error('error_status', error.response.status);
        if (error?.response?.status === 401) {
            console.error(error);
        }
        return Promise.reject(error);
    })

export default Whatsapp;


