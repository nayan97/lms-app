import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure"


export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  // ✅ Fetch current user on mount
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await axiosSecure.get("/user"); // 👈 no need for /api prefix, axiosSecure already has it
        setUser(data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [axiosSecure]);

  // ✅ Login
  // const login = async (email, password) => {
  //   try {
  //     const { data } = await axiosSecure.post("/login", { email, password });

  //     // Save token & user
  //     localStorage.setItem("auth_token", data.token);
  //     localStorage.setItem("user", JSON.stringify(data.user));

  //     setUser(data.user);
  //   } catch (err) {
  //     console.error("Login failed", err);
  //     throw err;
  //   }
  // };

  const login = async (email, password) => {
  try {
    const { data } = await axiosSecure.post("/login", { email, password });

    // Save token & user
    localStorage.setItem("auth_token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setUser(data.user); // updates context

    return data.user; // ✅ return user so caller can decide navigation
  } catch (err) {
    console.error("Login failed", err);
    throw err;
  }
};


const logout = async () => {
  try {
    console.log("Sending logout request...");
    const res = await axiosSecure.post("/logout");
    console.log("Backend response:", res.data);

    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    setUser(null);

    return Promise.resolve("Logged out successfully");
  } catch (err) {
    console.error("Logout failed:", err.response ? err.response.data : err);
    return Promise.reject(err);
  }
};


  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
