'use client';

import React, { useState } from 'react';
import { Table, Tag, Select, Image } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import DashboardLayout from "@/app/layouts/DashboardLayout";

const { Option } = Select;

interface Feedback {
  key: string;
  title: string;
  createdBy: string;
  assignedTo: string;
  feedback: string;
  status: 'success' | 'failed';
  image: string;
  updatedAt: string;
}

const dummyData: Feedback[] = [
  {
    key: '1',
    title: 'Login Button Bug',
    createdBy: 'Anjali',
    assignedTo: 'Govind',
    feedback: 'Login button is misaligned on mobile.',
    status: 'failed',
    image: 'https://picsum.photos/id/1011/120/80', // Random image
    updatedAt: '2025-06-26T14:00:00Z',
  },
  {
    key: '2',
    title: 'Dark Mode Toggle',
    createdBy: 'Raj',
    assignedTo: 'Priya',
    feedback: 'Dark mode works correctly.',
    status: 'success',
    image: 'https://picsum.photos/id/1005/120/80',
    updatedAt: '2025-06-25T09:30:00Z',
  },
  {
    key: '3',
    title: 'Chart Bug on Safari',
    createdBy: 'Neha',
    assignedTo: 'Ravi',
    feedback: 'Pie chart doesn’t load on Safari.',
    status: 'failed',
    image: 'https://picsum.photos/id/1012/120/80',
    updatedAt: '2025-06-24T12:45:00Z',
  },
];


const FeedbackTable = () => {
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredData = dummyData.filter((item) =>
    statusFilter === 'all' ? true : item.status === statusFilter
  );

  const columns: ColumnsType<Feedback> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
    },
    {
      title: 'Assigned To',
      dataIndex: 'assignedTo',
      key: 'assignedTo',
    },
    {
      title: 'Feedback',
      dataIndex: 'feedback',
      key: 'feedback',
      responsive: ['md'],
      render: (text) => <p className="line-clamp-2 text-gray-600">{text}</p>,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (src) => <Image src={src} alt="upload" width={80} height={50} />,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'success' ? 'green' : 'red'} className="capitalize">
          {status}
        </Tag>
      ),
    },
    {
      title: 'Last Updated',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date) => dayjs(date).format('MMM D, YYYY h:mm A'),
    },
  ];

  return (
    <DashboardLayout>
    <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-6 mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Tester Feedback Summary</h2>
        <Select
          value={statusFilter}
          onChange={setStatusFilter}
          style={{ width: 180 }}
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
      />
    </div>
    </DashboardLayout>
  );
};

export default FeedbackTable;
