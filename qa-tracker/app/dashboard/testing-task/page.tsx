"use client";

import React from "react";
import { Table, Tag, Button } from "antd";
import { useRouter } from "next/navigation";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import DashboardLayout from "@/app/layouts/DashboardLayout";

interface Post {
  key: string;
  title: string;
  description: string;
  tags: string[];
}

const data: Post[] = [
  {
    key: "1",
    title: "First Blog Post",
    description: "This is a detailed explanation about the first blog post.",
    tags: ["react", "nextjs"],
  },
  {
    key: "2",
    title: "Second Blog Post",
    description: "Insights into Ant Design and Tailwind integration.",
    tags: ["antd", "tailwind", "ui"],
  },
  {
    key: "3",
    title: "Third Blog Post",
    description: "Dummy data for testing the UI layout.",
    tags: ["dummy", "testing"],
  },
];

const PostTable = () => {
  const router = useRouter();

  const handleEdit = (record: Post) => {
    console.log("Edit clicked for:", record);
    // router.push(`/edit/${record.key}`);
  };

  const columns = [
    {
      title: <span className="text-gray-700 font-semibold">Title</span>,
      dataIndex: "title",
      key: "title",
      render: (text: string) => (
        <span className="font-semibold text-gray-900">{text}</span>
      ),
    },
    {
      title: <span className="text-gray-700 font-semibold">Description</span>,
      dataIndex: "description",
      key: "description",
      responsive: ["md"],
      render: (text: string) => (
        <p className="text-gray-600 line-clamp-2 max-w-md">{text}</p>
      ),
    },
    {
      title: <span className="text-gray-700 font-semibold">Tags</span>,
      key: "tags",
      dataIndex: "tags",
      render: (tags: string[]) => (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium"
            >
              {tag.toUpperCase()}
            </span>
          ))}
        </div>
      ),
    },
    {
      title: <span className="text-gray-700 font-semibold">Actions</span>,
      key: "action",
      render: (_: any, record: Post) => (
        <Button
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
          type="link"
          className="text-indigo-600 font-medium hover:underline"
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="min-h-[calc(100vh-64px)] bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto mt-10">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6 sm:p-8">
            {/* Header with Add Button */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Bug Reports</h2>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-6 py-2 rounded-xl shadow-md hover:from-indigo-700 hover:to-purple-700 transition"
                onClick={() => router.push("/tester-feedback")}
              >
                Add New Test
              </Button>
            </div>

            {/* Table */}
            <Table
              columns={columns}
              dataSource={data}
              pagination={{ pageSize: 5 }}
              rowKey="key"
              className="custom-ant-table"
              bordered
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PostTable;
