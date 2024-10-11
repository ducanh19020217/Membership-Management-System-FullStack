// src/services/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/';

const getAccessToken = () => {
    return localStorage.getItem('access_token');
};

const api = axios.create({
    baseURL: API_URL,
});

// Thêm interceptor để thêm token vào header của mỗi yêu cầu
api.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Thêm interceptor để xử lý lỗi 401 và refresh token nếu cần
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refresh_token');
            try {
                const response = await axios.post(`${API_URL}token/refresh/`, { refresh: refreshToken });
                localStorage.setItem('access_token', response.data.access);
                api.defaults.headers['Authorization'] = `Bearer ${response.data.access}`;
                originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;
                return api(originalRequest);
            } catch (err) {
                console.error('Refresh token failed:', err);
                // Nếu refresh token cũng hết hạn hoặc không hợp lệ, bạn có thể đăng xuất người dùng
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/login';
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
