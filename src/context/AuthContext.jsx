import { createContext, useContext, useEffect, useState } from "react";
import { getCSRF, loginApi, registerApi, logoutApi, userApi } from "../api/authApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD USER ================= */
  const loadUser = async () => {
    try {
      const res = await userApi();
      setUser(res.data);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOGIN ================= */
  const login = async (email, password) => {
    await getCSRF(); 

    await loginApi({ email, password });

    await loadUser();
  };

  /* ================= REGISTER ================= */
  const register = async (data) => {
    await getCSRF();

    await registerApi(data);

    await loadUser();
  };

  /* ================= LOGOUT ================= */
  const logout = async () => {
    await logoutApi();
    setUser(null);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);