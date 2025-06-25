"use client";
import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useReport } from "@/context/ReportContext";

// Types
interface Bug {
  id: number;
  bugTitle: string;
  description: string;
  priority: string;
}

interface FormData {
  projectName: string;
  userName: string;
  feedback: string;
  bugs: Bug[];
}

const QAMonitorForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    projectName: "",
    userName: "",
    feedback: "",
    bugs: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { submitReport } = useReport();

  const handleInputChange = (field: keyof Omit<FormData, "bugs">, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addBug = () => {
    const newBug: Bug = {
      id: Date.now(),
      bugTitle: "",
      description: "",
      priority: "medium",
    };
    setFormData((prev) => ({ ...prev, bugs: [...prev.bugs, newBug] }));
  };

  const updateBug = (id: number, field: keyof Bug, value: string) => {
    setFormData((prev) => ({
      ...prev,
      bugs: prev.bugs.map((bug) => (bug.id === id ? { ...bug, [field]: value } : bug)),
    }));
  };

  const removeBug = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      bugs: prev.bugs.filter((bug) => bug.id !== id),
    }));
  };

  const isFormValid = () =>
    formData.projectName.trim() !== "" &&
    formData.userName.trim() !== "" &&
    formData.feedback.trim() !== "";

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await submitReport({
        testing_report: {
          project_name: formData.projectName,
          userName: formData.userName,
          feedback: formData.feedback,
          bugDetails: formData.bugs.map((b) => ({
            bugTitle: b.bugTitle,
            description: b.description,
            priority: b.priority,
          })),
        },
      });

      alert("Report submitted successfully!");
      setFormData({ projectName: "", userName: "", feedback: "", bugs: [] });
    } catch (err) {
      alert("Failed to submit report.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">🧪 QA Monitor</h1>
      <p className="text-gray-600 mb-6">Fill in your testing report below.</p>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Project Name *</label>
          <input
            type="text"
            value={formData.projectName}
            onChange={(e) => handleInputChange("projectName", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            placeholder="e.g. Shopping Cart QA"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">User Name *</label>
          <input
            type="text"
            value={formData.userName}
            onChange={(e) => handleInputChange("userName", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            placeholder="e.g. Govind"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1 text-gray-700">Feedback *</label>
        <textarea
          rows={4}
          value={formData.feedback}
          onChange={(e) => handleInputChange("feedback", e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          placeholder="Describe your testing feedback..."
        />
      </div>

      {/* Bugs Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">🐞 Bugs ({formData.bugs.length})</h2>
          <button
            onClick={addBug}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md flex items-center space-x-1"
          >
            <Plus className="h-4 w-4" />
            <span>Add Bug</span>
          </button>
        </div>

        {formData.bugs.length === 0 && (
          <p className="text-gray-500 text-sm">No bugs added yet.</p>
        )}

        {formData.bugs.map((bug, idx) => (
          <div
            key={bug.id}
            className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Bug #{idx + 1}</h3>
              <button
                onClick={() => removeBug(bug.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-3">
              <div>
                <label className="block text-sm mb-1 text-gray-700">Bug Title *</label>
                <input
                  type="text"
                  value={bug.bugTitle}
                  onChange={(e) => updateBug(bug.id, "bugTitle", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="e.g. Button not clickable"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-gray-700">Priority *</label>
                <select
                  value={bug.priority}
                  onChange={(e) => updateBug(bug.id, "priority", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1 text-gray-700">Description *</label>
              <textarea
                rows={2}
                value={bug.description}
                onChange={(e) => updateBug(bug.id, "description", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Bug description..."
              />
            </div>
          </div>
        ))}
      </div>

      {/* Submit & Reset */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() =>
            setFormData({ projectName: "", userName: "", feedback: "", bugs: [] })
          }
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isFormValid() || isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit Report"}
        </button>
      </div>
    </div>
  );
};

export default QAMonitorForm;
