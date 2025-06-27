"use client";

import React, { useEffect, useState } from "react";
import { Select, Typography, Input, Button, message } from "antd";
import DashboardLayout from "@/app/layouts/DashboardLayout";

const { Title, Text } = Typography;

export default function AddTagsPage() {
    const [tags, setTags] = useState<string[]>([]);
    const [options, setOptions] = useState<string[]>([]);
    const [newProject, setNewProject] = useState("");

    useEffect(() => {
        const storedTags = localStorage.getItem("projectTags");
        if (storedTags) {
            const parsed = JSON.parse(storedTags);
            setTags(parsed);
            setOptions(parsed);
        }
    }, []);

    const handleChange = (newTags: string[]) => {
        setTags(newTags);
        const uniqueOptions = Array.from(new Set([...options, ...newTags]));
        setOptions(uniqueOptions);
        localStorage.setItem("projectTags", JSON.stringify(uniqueOptions));
    };

    const handleAddProject = () => {
        const trimmed = newProject.trim();
        if (!trimmed) return;
        if (options.includes(trimmed)) {
            message.warning("Project already exists.");
            return;
        }
        const updatedOptions = [...options, trimmed];
        const updatedTags = [...tags, trimmed];
        setOptions(updatedOptions);
        setTags(updatedTags);
        localStorage.setItem("projectTags", JSON.stringify(updatedOptions));
        setNewProject("");
        message.success("New project added!");
    };

    return (
        <DashboardLayout>
            <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 px-6 flex justify-center items-start">
                <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-gray-200 p-12">
                    {/* Centered heading */}
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-600">
                            Project Tags
                        </h1>
                        <p className="text-gray-600 text-lg mt-3">
                            Add, manage, and reuse project names in QA reports.
                        </p>
                    </div>


                    {/* New Project Input */}
                    <div className="mb-10">
                        <label className="block text-lg font-medium text-gray-700 mb-3">
                            Add New Project Name
                        </label>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Input
                                placeholder="e.g. Onboarding Platform, QA Dashboard"
                                value={newProject}
                                onChange={(e) => setNewProject(e.target.value)}
                                size="large"
                                className="flex-1 rounded-xl border-gray-300 shadow-sm focus:border-purple-600 focus:ring-purple-600"
                            />
                            <Button
                                size="large"
                                className="bg-purple-700 hover:bg-blue-700 text-white font-semibold px-8 py-2 rounded-xl transition-all duration-200"
                                type="primary"
                                onClick={handleAddProject}
                            >
                                Add +
                            </Button>

                        </div>
                    </div>

                    {/* Existing Tags Selector */}
                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-3">
                            Select or Add from Existing Projects
                        </label>
                        <Select
                            mode="tags"
                            style={{ width: "100%" }}
                            placeholder="Search or type to create project tags"
                            value={tags}
                            onChange={handleChange}
                            tokenSeparators={[","]}
                            size="large"
                            className="rounded-xl shadow-sm"
                            options={options.map((tag) => ({
                                label: tag,
                                value: tag,
                            }))}
                        />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
