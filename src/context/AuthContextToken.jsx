import { createContext, useContext, useState } from "react";

const AuthContextToken = createContext();

export function AuthToken({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email) => {
    const fakeUser = { email };
    setUser(fakeUser);
    localStorage.setItem("token", "123456");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
 
  return (
    <AuthContextToken.Provider value={{ user, login, logout }}>
      {children}
    </AuthContextToken.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContextToken);
