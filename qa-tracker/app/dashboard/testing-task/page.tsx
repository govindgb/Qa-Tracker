'use client';

import React from 'react';
import { Table, Tag, Button, Space } from 'antd';
import { useRouter } from 'next/navigation';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import DashboardLayout from "@/app/layouts/DashboardLayout";

interface Post {
  key: string;
  title: string;
  description: string;
  tags: string[];
}

const data: Post[] = [
  {
    key: '1',
    title: 'First Blog Post',
    description: 'This is a detailed explanation about the first blog post.',
    tags: ['react', 'nextjs'],
  },
  {
    key: '2',
    title: 'Second Blog Post',
    description: 'Insights into Ant Design and Tailwind integration.',
    tags: ['antd', 'tailwind', 'ui'],
  },
  {
    key: '3',
    title: 'Third Blog Post',
    description: 'Dummy data for testing the UI layout.',
    tags: ['dummy', 'testing'],
  },
];

const PostTable = () => {
  const router = useRouter();

  const handleEdit = (record: Post) => {
    console.log('Edit clicked for:', record);
    // You can navigate to a dynamic route like `/edit/${record.key}` if needed
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <span className="font-medium">{text}</span>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      responsive: ['md'],
      render: (text: string) => (
        <p className="line-clamp-2 text-gray-600">{text}</p>
      ),
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags: string[]) => (
        <>
          {tags.map((tag) => (
            <Tag key={tag} color="blue">
              {tag.toUpperCase()}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_: any, record: Post) => (
        <Button
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
          type="link"
          className="text-blue-600"
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <DashboardLayout>
    <div className="max-w-5xl mx-auto mt-10 p-4 bg-white rounded-2xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => router.push('/tester-feedback')}
        >
          Add New Test
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
        bordered
        rowKey="key"
      />
    </div>
    </DashboardLayout>
  );
};

export default PostTable;
