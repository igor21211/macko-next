import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://macko-doors.md-design.pw/api1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

type LoginResponse = {
  message: string;
  apiKey: string;
};

export const login = async (): Promise<string | null> => {
  try {
    const response = await api.post<LoginResponse>('/login/', {
      login: 'macko',
      password: 'macko',
    });
    const token = response.data.apiKey;
    if (token) {
      localStorage.setItem('token', token);
      return token;
    }
    return null;
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
};

// Асинхронный request-интерцептор
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = token;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response-интерцептор для обработки истёкшего токена (401)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const token = await login();
      if (token) {
        originalRequest.headers.Authorization = token;
        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);
