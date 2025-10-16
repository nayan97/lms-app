import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// ✅ Attach Authorization token automatically
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
