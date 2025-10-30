import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://apiv.lifechangebda.com/api",
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
