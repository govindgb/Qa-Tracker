"use client";

import { useState, useEffect } from "react";
import { NextPage } from "next";
import axios from "axios";

interface Bug {
  _id: string;
  projectName: string;
  userName: string;
  status: "pending" | "in-progress" | "resolved" | "rejected";
}

const ProjectStatusPage: NextPage = () => {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [editingBugId, setEditingBugId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");

  useEffect(() => {
    // Fetch bugs from the API
    const fetchBugs = async () => {
      try {
        const response = await axios.get("/api/bug");
        setBugs(response.data.bugs);
      } catch (error) {
        console.error("Failed to fetch bugs:", error);
      }
    };

    fetchBugs();
  }, []);

  const handleEdit = (bugId: string, currentStatus: string) => {
    setEditingBugId(bugId);
    setNewStatus(currentStatus);
  };

  const handleSave = async (bugId: string) => {
    try {
      if (!newStatus) {
        alert("Please select a valid status.");
        return;
      }
  
      await axios.put(`/api/bug/${bugId}`, { status: newStatus });
      setBugs((prev) =>
        prev.map((bug) =>
          bug._id === bugId ? { ...bug, status: newStatus as Bug["status"] } : bug
        )
      );
      setEditingBugId(null);
      setNewStatus("");
    } catch (error) {
      console.error("Failed to update bug status:", error);
      alert("Failed to update bug status. Please try again.");
    }
  };

  const handleCancel = () => {
    setEditingBugId(null);
    setNewStatus("");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h1 className="text-2xl font-bold mb-4">Project Status</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">
              Project Name
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Username
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Bug Status
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {bugs.map((bug) => (
            <tr key={bug._id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                {bug.projectName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {bug.userName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {editingBugId === bug._id ? (
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                ) : (
                  bug.status
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {editingBugId === bug._id ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleSave(bug._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEdit(bug._id, bug.status)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectStatusPage;
