"use client";
import { createContext, useContext, useState, ReactNode , useEffect } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

type User = {
  email: string;
  name?: string;
};

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string , name: string , role: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string, newPassword: string, confirmPassword: string) => Promise<void>;
  authenticated?: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const res = await axios.get("/api/auth/me");
  //       setUser(res.data.user);
  //       if (res.data.authenticated) {
  //         router.push("/login");
  //       }
  //     } catch {
       
  //       console.log("User not authenticated");
  //     }
  //   };
  
  //   checkAuth();
  //   // Only run this once on mount
  // }, []);
  
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


  const resetPassword = async (email: string, newPassword: string, confirmPassword:string) => {
    try {
      const res = await axios.post("/api/auth/reset-password", {
        email,
        newPassword,
        confirmPassword,
      });
      setUser(res.data.user); // assuming backend sends user
      alert("Password reset successful. Please log in again.");
      router.push("/login");
    } catch (err) {
      console.error("Password reset failed:", err);
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
    <AuthContext.Provider value={{ user, login, register, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
