"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !name) {
      setError("All fields are required.");
      return;
    }

    try {
      await register(email, password, name); // make sure context supports name too
    } catch (err: any) {
      setError("Registration failed.");
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ display: "block", marginBottom: 10, width: "100%" }}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: "block", marginBottom: 10, width: "100%" }}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: "block", marginBottom: 10, width: "100%" }}
        />
        <button type="submit" style={{ width: "100%", padding: 10 }}>Register</button>
        {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
      </form>
    </div>
  );
}
