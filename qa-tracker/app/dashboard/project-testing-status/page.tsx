"use client";

import React, { useState } from "react";
import { Table, Tag, Select, Image } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import DashboardLayout from "@/app/layouts/DashboardLayout";

const { Option } = Select;

interface Feedback {
  key: string;
  title: string;
  createdBy: string;
  assignedTo: string;
  feedback: string;
  status: "success" | "failed";
  image: string;
  updatedAt: string;
}

const dummyData: Feedback[] = [
  {
    key: "1",
    title: "Login Button Bug",
    createdBy: "Anjali",
    assignedTo: "Govind",
    feedback: "Login button is misaligned on mobile.",
    status: "failed",
    image: "https://picsum.photos/id/1011/120/80",
    updatedAt: "2025-06-26T14:00:00Z",
  },
  {
    key: "2",
    title: "Dark Mode Toggle",
    createdBy: "Raj",
    assignedTo: "Priya",
    feedback: "Dark mode works correctly.",
    status: "success",
    image: "https://picsum.photos/id/1005/120/80",
    updatedAt: "2025-06-25T09:30:00Z",
  },
  {
    key: "3",
    title: "Chart Bug on Safari",
    createdBy: "Neha",
    assignedTo: "Ravi",
    feedback: "Pie chart doesn’t load on Safari.",
    status: "failed",
    image: "https://picsum.photos/id/1012/120/80",
    updatedAt: "2025-06-24T12:45:00Z",
  },
];

const FeedbackTable = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredData = dummyData.filter((item) =>
    statusFilter === "all" ? true : item.status === statusFilter
  );

  const columns: ColumnsType<Feedback> = [
    {
      title: <span className="text-gray-700 font-semibold text-lg">Title</span>,
      dataIndex: "title",
      key: "title",
      render: (text) => (
        <span className="font-semibold text-gray-900 text-base">{text}</span>
      ),
    },
    {
      title: (
        <span className="text-gray-700 font-semibold text-lg">Created By</span>
      ),
      dataIndex: "createdBy",
      key: "createdBy",
      render: (text) => (
        <span className="text-gray-800 font-medium text-base">{text}</span>
      ),
    },
    {
      title: (
        <span className="text-gray-700 font-semibold text-lg">Assigned To</span>
      ),
      dataIndex: "assignedTo",
      key: "assignedTo",
      render: (text) => (
        <span className="text-gray-800 font-medium text-base">{text}</span>
      ),
    },
    {
      title: (
        <span className="text-gray-700 font-semibold text-lg">Feedback</span>
      ),
      dataIndex: "feedback",
      key: "feedback",
      responsive: ["md"],
      render: (text) => (
        <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 shadow-sm text-base leading-relaxed max-w-md">
          {text}
        </div>
      ),
    },
    {
      title: (
        <span className="text-gray-700 font-semibold text-lg">Image</span>
      ),
      dataIndex: "image",
      key: "image",
      render: (src) => (
        <Image
          src={src}
          alt="upload"
          width={100}
          height={60}
          className="rounded-xl shadow-sm object-cover"
        />
      ),
    },
    {
      title: (
        <span className="text-gray-700 font-semibold text-lg">Status</span>
      ),
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={`${
            status === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          } px-4 py-2 rounded-full text-base font-semibold capitalize`}
        >
          {status}
        </span>
      ),
    },
    {
      title: (
        <span className="text-gray-700 font-semibold text-lg">
          Last Updated
        </span>
      ),
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date) => (
        <span className="text-gray-600 text-base">
          {dayjs(date).format("MMM D, YYYY h:mm A")}
        </span>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="min-h-[calc(100vh-64px)] bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto mt-10">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Tester Feedback Summary
              </h2>
              <Select
                value={statusFilter}
                onChange={setStatusFilter}
                className="w-48 rounded-lg shadow-sm text-base"
                popupClassName="rounded-xl"
              >
                <Option value="all">All Status</Option>
                <Option value="success">✅ Success</Option>
                <Option value="failed">❌ Failed</Option>
              </Select>
            </div>

            <Table
              columns={columns}
              dataSource={filteredData}
              pagination={{ pageSize: 5 }}
              rowKey="key"
              bordered
              className="rounded-xl overflow-hidden"
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FeedbackTable;
