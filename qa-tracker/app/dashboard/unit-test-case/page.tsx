"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { Plus } from "lucide-react";
import DashboardLayout from "@/app/layouts/DashboardLayout";

export default function PostForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const handleAddTag = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setInputValue("");
    }
  };

  const handleRemoveTag = (removedTag: string) => {
    setTags(tags.filter((tag) => tag !== removedTag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description) {
      message.error("Title and Description are required.");
      return;
    }

    const postData = { title, description, tags };
    console.log("Bug Report Submitted:", postData);
    message.success("Bug report submitted successfully!");
    // Add your backend API call here
  };

  return (
    <DashboardLayout>
      <div className="min-h-[calc(100vh-64px)] bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto mt-20">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Report a Bug
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Title */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Bug Title
                </label>
                <input
                  type="text"
                  className="w-full pl-4 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                  placeholder="Enter a brief title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Description
                </label>
                <textarea
                  rows={5}
                  className="w-full pl-4 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                  placeholder="Describe the bug in detail"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Tags
                </label>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    className="flex-1 pl-4 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-500"
                    placeholder="Enter a tag and press Add"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-xl font-medium transition"
                  >
                    <Plus className="h-4 w-4 inline-block mr-1" />
                    Add
                  </button>
                </div>

                {/* Tags List */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-indigo-100 text-indigo-700 px-5 py-2 rounded-full text-base font-semibold flex items-center gap-3"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="text-indigo-500 hover:text-indigo-700"
                        type="button"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Submit Bug
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
    </DashboardLayout>
  );
}
