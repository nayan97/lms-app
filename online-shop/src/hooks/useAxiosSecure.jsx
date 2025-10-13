import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://api.lifechangebda.com/api",
});

// ✅ Attach interceptor right away
axiosSecure.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
