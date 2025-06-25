"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";

type User = {
  email: string;
  name?: string;
};

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string , name: string , role: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      setUser(res.data.user); // assuming backend sends user
      router.push("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const register = async (email: string, password: string , name: string , role: string) => {
    try {
      const res = await axios.post("/api/auth/register", { email, password , name , role });
      setUser(res.data.user); // assuming backend sends user
      router.push("/dashboard");
    } catch (err) {
      console.error("Register failed:", err);
    }
  };

  const logout = async () => {
    try {
      await axios.post("/api/auth/logout");
      setUser(null);
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };
  

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
