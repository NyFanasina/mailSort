"use client";
import axios from "axios";
import TokenStorage from "./tokenStorage";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = TokenStorage.getToken();

    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const localtion = window.location.pathname;
    if (localtion === "/login") return Promise.reject(error);

    if (error.status === 401) {
      TokenStorage.remove();
      window.location.href = `/login?redirect=${encodeURIComponent(localtion)}`;
    }
  },
);

export default axiosInstance;
