"use client";

import { useState } from "react";
import { UserCircle, Camera, Save, User, Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation"; 
import Image from "next/image";
import DashboardLayout from "@/app/layouts/DashboardLayout";

export default function ProfilePage() {
  const [name, setName] = useState("Tester");
  const [email, setEmail] = useState("tester@example.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!name || !email) {
      setError("Name and Email are required.");
      return;
    }
    try {
      console.log({ name, email, password });
      setSuccess("Profile updated successfully.");
    } catch (err) {
      console.error(err);
      setError("Failed to update profile.");
    }
  };

  return (
    <DashboardLayout>
      {/* Full page layout */}
      <div className="min-h-[calc(100vh-64px)] bg-gray-50 p-6">
        {/* Main Content */}
        <div className="max-w-6xl mx-auto mt-20">
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            {/* Status Messages */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mx-8 mt-8 rounded">
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            )}
            {success && (
              <div className="bg-green-50 border-l-4 border-green-400 p-4 mx-8 mt-8 rounded">
                <p className="text-green-700 font-medium">{success}</p>
              </div>
            )}

            <div className="p-8">
              {/* Profile Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                {/* Profile Image Section */}
                <div className="lg:col-span-2">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                      Profile Picture
                    </h3>

                    {/* Avatar Container */}
                    <div className="relative inline-block">
                      <div className="w-64 h-80 rounded-2xl bg-gray-50 border-2 border-gray-200 overflow-hidden group hover:border-indigo-300 transition-colors duration-200">
                        <Image
                          src="/testprofile.png"
                          alt="Profile"
                          width={256}
                          height={320}
                          className="object-cover w-full h-full"
                        />
                        {/* Hover Overlay with Change Photo - COMMENTED OUT */}
                        {/*
                       <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                           <button className="bg-white text-gray-800 px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-gray-100 transition-colors">
                              <Camera size={18} />
                              Change Photo
                            </button>
                        </div>
                        */}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Section */}
                <div className="lg:col-span-3">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    Account Information
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Name Field */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                        />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                        New Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="password"
                          className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Leave blank to keep current password"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Leave blank if you don't want to change your password
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                      <button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                      >
                        <Save size={18} />
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => router.push("/dashboard")}
                        className="flex-1 sm:flex-initial bg-gray-100 text-gray-700 font-semibold py-4 px-6 rounded-xl hover:bg-gray-200 transition-colors duration-200 border border-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Spacing */}
        <div className="h-8"></div>
      </div>
    </DashboardLayout>
  );
}
