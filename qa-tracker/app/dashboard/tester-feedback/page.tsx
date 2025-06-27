'use client';

import React, { useState } from 'react';
import { Form, Input, Button, Radio, Upload, Tag, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import DashboardLayout from "@/app/layouts/DashboardLayout";

const { TextArea } = Input;

const TesterFeedback = () => {
  // Simulated pre-filled data (can come from props or API)
  const initialData = {
    title: 'Login Button UI Issue',
    description: 'On clicking the login button, it overlaps with the footer in smaller screen sizes.',
    tags: ['UI', 'Bug', 'Mobile'],
  };

  const [fileList, setFileList] = useState<any[]>([]);

  const onFinish = (values: any) => {
    const finalData = {
      ...values,
      title: initialData.title,
      description: initialData.description,
      tags: initialData.tags,
      image: fileList?.[0]?.originFileObj || null,
    };
    console.log('Submitted Feedback:', finalData);
    message.success('Feedback submitted successfully!');
  };

  return (
    <DashboardLayout>
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 mt-10">
      <h2 className="text-2xl font-bold text-center mb-8">Submit Tester Feedback</h2>
      <Form layout="vertical" onFinish={onFinish}>
        {/* Disabled Title */}
        <Form.Item label="Title">
          <Input value={initialData.title} disabled />
        </Form.Item>

        {/* Disabled Description */}
        <Form.Item label="Description">
          <TextArea value={initialData.description} disabled rows={4} />
        </Form.Item>

        {/* Disabled Tags */}
        <Form.Item label="Tags">
          <div className="flex flex-wrap gap-2">
            {initialData.tags.map(tag => (
              <Tag key={tag} color="blue">{tag}</Tag>
            ))}
          </div>
        </Form.Item>

        {/* Editable Test Status */}
        <Form.Item
          label="Test Status"
          name="status"
          rules={[{ required: true, message: 'Please select a status' }]}
        >
          <Radio.Group className="flex gap-8">
            <Radio value="success">✅ Success</Radio>
            <Radio value="failed">❌ Failed</Radio>
          </Radio.Group>
        </Form.Item>

        {/* Upload */}
        <Form.Item label="Upload Screenshot / Image">
          <Upload
            beforeUpload={() => false}
            fileList={fileList}
            onChange={({ fileList }) => setFileList(fileList)}
            maxCount={1}
            accept="image/*"
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
          <p className="text-xs text-gray-500 mt-1">Only image files (JPG, PNG) are allowed. Max 1 file.</p>
        </Form.Item>

        {/* Submit */}
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Submit Feedback
          </Button>
        </Form.Item>
      </Form>
    </div>
    </DashboardLayout>
  );
};

export default TesterFeedback;
