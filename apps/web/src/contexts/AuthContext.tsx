import { createContext, useContext, useState, ReactNode } from "react";
import { RoleKey } from "@codepharma/shared";

type AuthState = {
  token: string;
  role: RoleKey;
  username: string;
  permissions: string[];
} | null;

type AuthContextType = {
  auth: AuthState;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(null);

  const login = async (username: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    if (!res.ok) throw new Error("Invalid credentials");
    const data = await res.json();
    setAuth({ ...data, username });
  };

  const logout = () => setAuth(null);

  const hasPermission = (permission: string) => {
    return auth?.permissions.includes(permission) ?? false;
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be within AuthProvider");
  return ctx;
}
