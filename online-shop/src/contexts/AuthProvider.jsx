import { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Configure axios base
  axios.defaults.baseURL = "http://127.0.0.1:8000"; // change if needed
  axios.defaults.headers.common["Accept"] = "application/json";

  // ✅ Attach token from localStorage if available
  const token = localStorage.getItem("auth_token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  // ✅ Fetch current user on mount
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await axios.get("/api/user");
        setUser(data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  // ✅ Login
  const login = async (email, password) => {
    try {
      const { data } = await axios.post("/api/login", { email, password });

      // Save token & user
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      setUser(data.user);
    } catch (err) {
      console.error("Login failed", err);
      throw err;
    }
  };

  // ✅ Logout
  const logout = async () => {
    try {
      await axios.post("/api/logout");
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      setUser(null);
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
