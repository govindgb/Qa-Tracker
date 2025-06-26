"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface Project {
  _id: string;
  project_name: string;
  userName: string;
  status: "pending" | "in-progress" | "resolved" | "rejected";
  createdAt: string;
  updatedAt: string;
}

export default function ProjectTable() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");

  useEffect(() => {
    axios.get("/api/project").then(res => setProjects(res.data.projects));
  }, []);

  const handleEdit = (id: string, status: string) => {
    setEditingId(id);
    setNewStatus(status);
  };

  const handleSave = async (id: string) => {
    await axios.put("/api/project", { _id: id, status: newStatus });
    setProjects(projects.map(p => p._id === id ? { ...p, status: newStatus as Project["status"], updatedAt: new Date().toISOString() } : p));
    setEditingId(null);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white shadow rounded p-6">
      <h2 className="text-2xl font-bold mb-4">Project List</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Project Name</th>
            <th className="p-2 border">Username</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Created</th>
            <th className="p-2 border">Updated</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(p => (
            <tr key={p._id} className="hover:bg-gray-50">
              <td className="p-2 border">{p.project_name}</td>
              <td className="p-2 border">{p.userName}</td>
              <td className="p-2 border">
                {editingId === p._id ? (
                  <select value={newStatus} onChange={e => setNewStatus(e.target.value)} className="border rounded px-2 py-1">
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                ) : (
                  <span className={`px-2 py-1 rounded ${p.status === "resolved" ? "bg-green-100 text-green-700" : p.status === "rejected" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>
                    {p.status}
                  </span>
                )}
              </td>
              <td className="p-2 border">{new Date(p.createdAt).toLocaleString()}</td>
              <td className="p-2 border">{new Date(p.updatedAt).toLocaleString()}</td>
              <td className="p-2 border">
                {editingId === p._id ? (
                  <button onClick={() => handleSave(p._id)} className="bg-green-500 text-white px-3 py-1 rounded mr-2">Save</button>
                ) : (
                  <button onClick={() => handleEdit(p._id, p.status)} className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                )}
                {editingId === p._id && (
                  <button onClick={() => setEditingId(null)} className="bg-gray-400 text-white px-3 py-1 rounded ml-2">Cancel</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}