'use client';

import React, { useState } from 'react';
import { Form, Input, Button, Radio, Upload, Tag, message, Image } from 'antd';
import { UploadOutlined, HistoryOutlined, CloseOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { TextArea } = Input;

const TesterFeedback = () => {
  const [fileList, setFileList] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(true); // history visible by default

  // Simulated last history data
  const lastHistory = {
    date: '2025-06-25T11:30:00Z',
    feedback: 'Bug still exists on mobile view but slightly improved.',
    image: 'https://picsum.photos/id/1018/300/180',
    status: 'failed',
  };

  // Simulated read-only bug details
  const initialData = {
    title: 'Login Button UI Issue',
    description: 'On clicking the login button, it overlaps with the footer in smaller screen sizes.',
    tags: ['UI', 'Bug', 'Mobile'],
  };

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
    <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-8 mt-10">
      <h2 className="text-2xl font-bold text-center mb-8">Submit Tester Feedback</h2>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-10 relative">
        {/* === Left Side: History or Button === */}
        <div className="w-full">
          {showHistory ? (
            <div className="bg-gray-50 p-6 rounded-xl border shadow-sm relative h-fit">
              {/* Cut button */}
              <button
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                onClick={() => setShowHistory(false)}
              >
                <CloseOutlined />
              </button>
              <h3 className="text-lg font-semibold mb-4">Previous Test History</h3>
              <p>
                <span className="font-medium">Date:</span>{' '}
                {dayjs(lastHistory.date).format('MMM D, YYYY h:mm A')}
              </p>
              <p>
                <span className="font-medium">Feedback:</span> {lastHistory.feedback}
              </p>
              <p>
                <span className="font-medium">Status:</span>{' '}
                <Tag color={lastHistory.status === 'success' ? 'green' : 'red'}>
                  {lastHistory.status.toUpperCase()}
                </Tag>
              </p>
              <div className="mt-3">
                <span className="font-medium block mb-1">Uploaded Image:</span>
                <Image
                  src={lastHistory.image}
                  alt="Previous feedback screenshot"
                  width={300}
                  height={180}
                  className="rounded-lg"
                />
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-start mt-2">
              <Button
                icon={<HistoryOutlined />}
                onClick={() => setShowHistory(true)}
                type="dashed"
              >
                Check History
              </Button>
            </div>
          )}
        </div>

        {/* === Right Side: Feedback Form === */}
        <div className="w-full max-w-xl">
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item label="Title">
              <Input value={initialData.title} disabled />
            </Form.Item>

            <Form.Item label="Description">
              <TextArea value={initialData.description} disabled rows={4} />
            </Form.Item>

            <Form.Item label="Tags">
              <div className="flex flex-wrap gap-2">
                {initialData.tags.map(tag => (
                  <Tag key={tag} color="blue">{tag}</Tag>
                ))}
              </div>
            </Form.Item>

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

            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full">
                Submit Feedback
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default TesterFeedback;
