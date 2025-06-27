"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Image from "next/image";
import Loader from "@/app/common/loader";

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
  if(isLoading) {
        return <Loader />
    }
  

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
        <div className="hidden lg:flex w-1/2 bg-white-50 relative p-8 items-center justify-center ">
          {/* Main Illustration Centered */}
          <div className="relative w-[1000px] h-[700px]">
            <Image
              src="/IconImg10.png"
              alt="Main QA Illustration"
              fill
              className="object-contain absolute top-[-23px] left-[-40px] w-[620px] h-[413px] rounded-none"
            />
          </div>

          {/* Decorative Icons Around */}
          <Image
            src="/Iconimg4.jpg"
            alt="Bug Icon"
            width={120}
            height={100}
            className="absolute top-20 left-30"
          />
          <Image
            src="/Iconimg2.jpg"
            alt="QA Icon"
            width={120}
            height={100}
            className="absolute top-30 right-25"
          />
          <Image
            src="/Iconimg3.jpg"
            alt="Gear Icon"
            width={120}
            height={100}
            className="absolute bottom-50 left-30"
          />
        </div>

        {/* Right Side - Login Form as a Card */}
        <div className="w-full lg:w-7/12 flex items-center justify-start p-6 lg:pl-10 lg:pr-0">
        <div className="w-full max-w-xl bg-white shadow-2xl border border-gray-200 rounded-2xl p-12 -mt-6 ml-30 z-10">

            {" "}
            {/* changed max-w-md to max-w-lg */}
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {" "}
              {/* text-3xl → text-4xl */}
              Welcome back <span className="inline-block">👋</span>
            </h2>
            <p className="text-base text-gray-600 mb-8">
              {" "}
              {/* text-sm → text-base */}
              Log in to your account
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="relative">
                <Mail className="absolute top-4 left-4 h-6 w-6 text-gray-400" />
                <input
                  type="email"
                  placeholder="jrobinson@hotmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-14 pr-4 py-4 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <Lock className="absolute top-4 left-4 h-6 w-6 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-14 pr-12 py-4 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-4 right-4"
                >
                  {showPassword ? (
                    <EyeOff className="h-6 w-6 text-gray-400" />
                  ) : (
                    <Eye className="h-6 w-6 text-gray-400" />
                  )}
                </button>
              </div>

              {/* Forgot Password Link */}
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
                className="w-full bg-indigo-600 text-white py-4 text-lg rounded-xl hover:bg-indigo-700 transition-all duration-200 disabled:opacity-50"
              >
                {isLoading ? "Signing in..." : "Continue"}
              </button>
            </form>
            {/* Sign Up Link */}
            <div className="mt-8 text-base text-center text-gray-600">
              Don’t have an account?{" "}
              <a
                href="/register"
                className="text-indigo-600 hover:underline font-medium"
              >
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
