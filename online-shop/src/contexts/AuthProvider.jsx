import { useEffect, useState, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      setLoading(false);
      setUser(null);
      return;
    }

    try {
      const { data } = await axiosSecure.get("/user");
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [axiosSecure]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await axiosSecure.post("/login", { email, password });
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ Immediately update the context with backend data
      await fetchUser();

      return data.user;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axiosSecure.post("/logout");
    } finally {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
