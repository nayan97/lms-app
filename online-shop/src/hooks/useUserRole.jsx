import { useState, useEffect, useCallback } from "react";
import useAuth from "../hooks/useAuth";
// import useUserAxios from "../hooks/useUserAxios"; // axios instance
import useAxiosSecure from "../hooks/useAxiosSecure";

const useUserRole = () => {
  const { user, loading: authLoading } = useAuth();
  const axios = useAxiosSecure();

  const [role, setRole] = useState("guest"); // guest by default
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserRole = useCallback(async () => {
    if (!user?.email) {
      setRole("guest");
      return;
    }

    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      // ✅ Backend should return full user object
      const res = await axios.get(`/users/${user.email}`);
      
      if (res.data && res.data.role) {
        setRole(res.data.role); // "admin" | "user"
      } else {
        setRole("guest");
      }
    } catch (err) {
      console.error("❌ Error fetching user role:", err);
      setIsError(true);
      setError(err);
      setRole("guest");
    } finally {
      setIsLoading(false);
    }
  }, [user?.email, axios]);

  // Fetch role when auth is ready
  useEffect(() => {
    if (!authLoading) {
      fetchUserRole();
    }
  }, [user?.email, authLoading, fetchUserRole]);

  // ✅ Expose helpers
  const isAdmin = role === "admin";
  const isUser = role === "user";

  return {
    role,        // "guest" | "user" | "admin"
    isAdmin,
    isUser,
    isLoading,
    isError,
    error,
    refetch: fetchUserRole,
  };
};

export default useUserRole;
