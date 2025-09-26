import { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";




export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/user", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    await axios.get("/sanctum/csrf-cookie");
    await axios.post("/login", { email, password }, { withCredentials: true });
    const { data } = await axios.get("/api/user", { withCredentials: true });
    setUser(data);
  };

  const logout = async () => {
    await axios.post("/logout", {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
