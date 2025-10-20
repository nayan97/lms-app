import axios from "axios";

export const getCsrfToken = async () => {
  await axios.get(" https://api.lifechangebda.com/sanctum/csrf-cookie", {
    withCredentials: true,
  });
};
