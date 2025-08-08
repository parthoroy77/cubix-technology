"use client";
import { User } from "@/types";
import { createContext, ReactNode, useEffect, useState } from "react";

type AuthContext = {};

const AuthContext = createContext<AuthContext | null>(null);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user-auth");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Store in local storage
    if (email === "admin@parthoroy.com" && password === "admin123") {
      const userData: User = {
        id: "1",
        name: "Admin User",
        email: "admin@parthoroy.com",
        role: "admin" as const,
      };
      setUser(userData);
      localStorage.setItem("user-auth", JSON.stringify(userData));
      return true;
    } else if (email === "editor@parthoroy.com" && password === "editor123") {
      const userData: User = {
        id: "2",
        name: "Editor User",
        email: "editor@parthoroy.com",
        role: "editor" as const,
      };
      setUser(userData);
      localStorage.setItem("user-auth", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user-auth");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
