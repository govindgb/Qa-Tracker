"use client";
 
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Image from "next/image";
 
export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
    } finally {
      setIsLoading(false);
    }
  };
 
  return (
    <div className="min-h-screen bg-white">
      {/* ✅ Header stays at the top */}
      <header className="w-full flex items-center px-6 py-4 border-b border-gray-200 shadow-sm">
        <div className="flex items-center space-x-3">
          <Image
            src="/IconLogo4.png"
            alt="QA Monitor Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="text-xl font-semibold text-gray-800">
            QA Monitor
          </span>
        </div>
      </header>
 
      {/* ✅ Full screen layout with conditional image display */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-72px)]">
        {/* Left Side - Main Illustration (hidden on small screens) */}
        <div className="hidden lg:flex w-1/2 bg-white-50 relative p-8 items-center justify-center">
          {/* Main Illustration Centered */}
          <div className="relative w-[800px] h-[500px]">
            <Image
              src="/IconImg10.png"
              alt="Main QA Illustration"
              fill
              className="object-contain absolute top-[-23px] left-[-96px] w-[620px] h-[413px] rounded-none"
            />
          </div>
 
          {/* Decorative Icons Around */}
          <Image
            src="/Iconimg4.jpg"
            alt="Bug Icon"
            width={120}
            height={100}
            className="absolute top-30 left-30"
          />
          <Image
            src="/Iconimg2.jpg"
            alt="QA Icon"
            width={120}
            height={100}
            className="absolute top-30 right-45"
          />
          <Image
            src="/Iconimg3.jpg"
            alt="Gear Icon"
            width={120}
            height={100}
            className="absolute bottom-50 left-30"
          />
        </div>
 
        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back <span className="inline-block">👋</span>
            </h2>
            <p className="text-sm text-gray-600 mb-6">Log in your account</p>
 
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="relative">
                <Mail className="absolute top-3.5 left-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="jrobinson@hotmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
 
              {/* Password */}
              <div className="relative">
                <Lock className="absolute top-3.5 left-3 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-3.5 right-3"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
 
              {/* Forgot Password */}
              <div className="text-center text-sm">
                <a
                  href="/forget-password"
                  className="text-indigo-600 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
 
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all duration-200 disabled:opacity-50"
              >
                {isLoading ? "Signing in..." : "Log in"}
              </button>
            </form>
 
            {/* Sign up */}
            <div className="mt-6 text-sm text-center text-gray-600">
              Don’t have an account?{" "}
              <a href="/register" className="text-indigo-600 hover:underline">
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 

