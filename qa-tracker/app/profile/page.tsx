"use client";

import { useState } from "react";
import DashboardLayout from "@/app/layouts/DashboardLayout";

export default function ProfilePage() {
  const [name, setName] = useState("Tester");
  const [email, setEmail] = useState("tester@example.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
      <div className="max-w-xl mx-auto mt-24 bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}
        {success && <p className="text-green-500 mb-3">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full border px-3 py-2 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password (optional)</label>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-400 text-white py-2 rounded-md hover:bg-blue-500 transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
