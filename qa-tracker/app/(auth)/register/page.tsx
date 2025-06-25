"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, Mail, Lock, User, TestTube2, UserPlus, AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function RegisterPage() {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const role = searchParams.get("role");

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(0,0,0,0.1) 2px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Container */}
      <div className="w-full max-w-md relative z-10">
        {/* Floating Elements */}
        <div className="absolute -top-4 -left-4 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse" />
        <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-purple-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Card */}
        <div className="bg-white/80 rounded-2xl shadow-2xl border border-white/20 p-8 transform hover:scale-[1.01] transition-all duration-300">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
              <TestTube2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Join QA Monitor
            </h1>
            <p className="text-gray-600 mt-2">Start your testing journey today</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3 animate-pulse">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <InputField icon={<User className="h-5 w-5 text-gray-400" />} value={name} onChange={(e:any) => setName(e.target.value)} placeholder="Full Name" />

            {/* Email */}
            <InputField icon={<Mail className="h-5 w-5 text-gray-400" />} value={email} onChange={(e:any) => setEmail(e.target.value)} placeholder="Email" type="email" />

            {/* Password */}
            <PasswordField
              value={password}
              onChange={(e:any) => setPassword(e.target.value)}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              placeholder="Create Password"
            />

            {/* Strength */}
            <div className="flex space-x-1">
              <div className={`h-1 flex-1 rounded-full ${password.length >= 8 ? "bg-green-400" : "bg-gray-200"}`} />
              <div className={`h-1 flex-1 rounded-full ${/[A-Z]/.test(password) ? "bg-green-400" : "bg-gray-200"}`} />
              <div className={`h-1 flex-1 rounded-full ${/[0-9]/.test(password) ? "bg-green-400" : "bg-gray-200"}`} />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
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

          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 font-medium hover:text-purple-600 transition-colors">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Input Field
function InputField({ icon, ...props }: any) {
  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>
      <input
        {...props}
        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 hover:bg-white/70 transition-all"
        required
      />
    </div>
  );
}

// Reusable Password Field
function PasswordField({ value, onChange, showPassword, setShowPassword, placeholder }: any) {
  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Lock className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 hover:bg-white/70 transition-all"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute inset-y-0 right-0 pr-3 flex items-center"
      >
        {showPassword ? (
          <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
        ) : (
          <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
        )}
      </button>
    </div>
  );
}
