import axios from "axios";

// ✅ Axios instance for public requests
const axiosUser = axios.create({
  baseURL: "https://apiv.lifechangebda.com/api", // 🔹 change if your backend URL is different
  headers: {
    Accept: "application/json",
  },
});

// ✅ Hook just returns the instance
const useUserAxios = () => {
  return axiosUser;
};

export default useUserAxios;