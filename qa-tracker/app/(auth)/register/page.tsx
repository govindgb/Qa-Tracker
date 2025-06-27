"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, Mail, Lock, User, UserPlus, AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Loader from "@/app/common/loader";
export default function RegisterPage() {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const role = searchParams.get("role") ?? "user"; // Default to 'user' if no role is provided

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email || !password || !name || !role) {
      setError("All fields are required.");
      setIsLoading(false);
      return;
    }

    try {
      await register(email, password, name, role);
    } catch (err: any) {
      setError("Registration failed.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  if(isLoading) {
      return <Loader />
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
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

      {/* Layout */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-72px)]">
        {/* Left Image Section */}
        <div className="hidden lg:flex w-1/2 bg-white-50 relative p-8 items-center justify-center">
          <div className="relative w-[1000px] h-[700px]">
            <Image
              src="/IconImg10.png"
              alt="Main QA Illustration"
              fill
              className="object-contain absolute top-[-23px] left-[-40px] w-[620px] h-[413px]"
            />
          </div>

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

        {/* Right Form Section */}
        <div className="w-full lg:w-7/12 flex items-center justify-start p-6 lg:pl-10 lg:pr-0">
          <div className="w-full max-w-xl bg-white shadow-2xl border border-gray-200 rounded-2xl p-12 -mt-6 ml-30 z-10">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Create your account <span className="inline-block">🚀</span>
            </h2>
            <p className="text-base text-gray-600 mb-8">
              Start your testing journey today
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3 animate-pulse">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <InputField
                icon={<User className="h-6 w-6 text-gray-400" />}
                value={name}
                onChange={(e: any) => setName(e.target.value)}
                placeholder="Full Name"
              />

              {/* Email Field */}
              <InputField
                icon={<Mail className="h-6 w-6 text-gray-400" />}
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                placeholder="Email Address"
                type="email"
              />

              {/* Password Field */}
              <PasswordField
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                placeholder="Create Password"
              />

              {/* Strength Meter */}
              <div className="flex space-x-1">
                <div className={`h-1 flex-1 rounded-full ${password.length >= 8 ? "bg-green-400" : "bg-gray-200"}`} />
                <div className={`h-1 flex-1 rounded-full ${/[A-Z]/.test(password) ? "bg-green-400" : "bg-gray-200"}`} />
                <div className={`h-1 flex-1 rounded-full ${/[0-9]/.test(password) ? "bg-green-400" : "bg-gray-200"}`} />
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 text-white py-4 text-lg rounded-xl hover:bg-indigo-700 transition-all duration-200 disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Creating account...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    <span>Register</span>
                  </>
                )}
              </button>
            </form>

            {/* Sign In Link */}
            <div className="mt-8 text-base text-center text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-indigo-600 hover:underline font-medium"
              >
                Sign in
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Input Field
function InputField({ icon, ...props }: any) {
  return (
    <div className="relative">
      <div className="absolute top-4 left-4">{icon}</div>
      <input
        {...props}
        className="w-full pl-14 pr-4 py-4 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      />
    </div>
  );
}

// Reusable Password Field
function PasswordField({ value, onChange, showPassword, setShowPassword, placeholder }: any) {
  return (
    <div className="relative">
      <Lock className="absolute top-4 left-4 h-6 w-6 text-gray-400" />
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-14 pr-12 py-4 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
  );
}
