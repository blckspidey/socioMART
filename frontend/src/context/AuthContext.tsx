import { createContext, useContext, useEffect, useState } from "react";

export type UserRole = "customer" | "seller" | "admin";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

type AuthContextType = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("sociomart_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (user: AuthUser, token: string) => {
    localStorage.setItem("sociomart_user", JSON.stringify(user));
    localStorage.setItem("sociomart_token", token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("sociomart_user");
    localStorage.removeItem("sociomart_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
