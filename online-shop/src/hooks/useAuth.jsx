// import { useContext } from "react";
// import { AuthContext } from "../contexts/AuthContext";


// export default function useAuth() {
//   return useContext(AuthContext);
// }

// hooks/useAuth.js
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
