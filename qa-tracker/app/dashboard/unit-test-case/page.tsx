// components/PostForm.tsx
'use client';

import React, { useState } from 'react';
import { Input, Button, Form, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import DashboardLayout from "@/app/layouts/DashboardLayout";

const { TextArea } = Input;

const PostForm = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleClose = (removedTag: string) => {
    setTags(tags.filter(tag => tag !== removedTag));
  };

  const handleInputConfirm = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
    }
    setInputValue('');
  };

  const onFinish = (values: any) => {
    const data = { ...values, tags };
    console.log('Submitted:', data);
    // send to backend
  };

  return (
    <DashboardLayout>
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Create a Post</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Title is required' }]}>
          <Input placeholder="Enter title" />
        </Form.Item>

        <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Description is required' }]}>
          <TextArea rows={4} placeholder="Enter description" />
        </Form.Item>

        <Form.Item label="Tags">
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map(tag => (
              <Tag key={tag} closable onClose={() => handleClose(tag)}>{tag}</Tag>
            ))}
          </div>
          <Input
            placeholder="Add tag and press Enter"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onPressEnter={handleInputConfirm}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
    </DashboardLayout >
  );
};

export default PostForm;
