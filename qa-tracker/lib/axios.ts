import axios from "axios";

const instance = axios.create({
  // No baseURL needed since we use relative `/api/...` paths
  withCredentials: true, // send cookies (for JWT or session-based auth)
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor (optional customization point)
instance.interceptors.request.use(
  (config) => {
    // You can attach tokens here if needed (not needed for HttpOnly cookies)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      // Optionally mark as retried to prevent infinite loop
      // originalRequest._retry = true;

      // Since token expired or unauthorized, redirect to login or home
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
