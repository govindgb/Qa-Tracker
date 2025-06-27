'use client';

import React, { useState } from 'react';
import { Form, Input, Button, Radio, Upload, Tag, message, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import DashboardLayout from '@/app/layouts/DashboardLayout';

const { TextArea } = Input;

const TesterFeedback = () => {
  const [fileList, setFileList] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [feedback, setFeedback] = useState('');

  const lastHistory = {
    date: '2025-06-25T11:30:00Z',
    feedback: 'Bug still exists on mobile view but slightly improved.',
    image: 'https://picsum.photos/id/1018/300/180',
    status: 'failed',
  };

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
    <DashboardLayout>
      <div className="min-h-[calc(100vh-64px)] bg-gray-50 p-6">
        <div className="max-w-5xl mx-auto mt-2">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 transition-all duration-500">
            <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">
              Submit Tester Feedback
            </h2>

            <div
              className={`grid gap-10 transition-all duration-500 ${
                showHistory ? 'lg:grid-cols-[1.4fr_1fr]' : 'grid-cols-1'
              }`}
            >
              {/* === Feedback Form === */}
              <div className="w-full">
                <Form layout="vertical" onFinish={onFinish} className="space-y-6">
                  {/* Title */}
                  <Form.Item label="Title">
                    <Input
                      value={initialData.title}
                      disabled
                      className="pl-4 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none text-gray-900 bg-gray-100"
                    />
                  </Form.Item>

                  {/* Description */}
                  <Form.Item label="Description">
                    <TextArea
                      value={initialData.description}
                      disabled
                      rows={4}
                      className="pl-4 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none text-gray-900 bg-gray-100"
                    />
                  </Form.Item>

                  {/* Tags */}
                  <Form.Item label="Tags">
                    <div className="flex flex-wrap gap-2">
                      {initialData.tags.map(tag => (
                        <span
                          key={tag}
                          className="bg-indigo-100 text-indigo-700 px-5 py-2 rounded-full text-base font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Form.Item>
                  <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  FeedBack
                </label>
                <textarea
                  rows={5}
                  className="w-full pl-4 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                  placeholder="Describe the bug in detail"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </div>

                  {/* Test Status */}
                  <Form.Item
                    label="Test Status"
                    name="status"
                    rules={[{ required: true, message: 'Please select a status' }]}
                  >
                    <Radio.Group className="flex gap-6 text-base">
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
                      <Button icon={<UploadOutlined />} className="text-base">
                        Click to Upload
                      </Button>
                    </Upload>
                    <p className="text-sm text-gray-500 mt-2">
                      Only image files (JPG, PNG) allowed. Max 1 file.
                    </p>
                  </Form.Item>

                  {/* Submit Button */}
                  <Form.Item>
                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-md"
                      >
                        Submit Task
                      </Button>
                      <Button
                        type="default"
                        onClick={() => setShowHistory(!showHistory)}
                        className="flex-1 sm:flex-initial bg-gray-100 text-gray-700 font-semibold py-4 px-6 rounded-xl hover:bg-gray-200 transition-all duration-200 border border-gray-300"
                      >
                        {showHistory ? 'Hide History' : 'Check History'}
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
              </div>

              {/* === History Panel === */}
              {showHistory && (
                <div className="w-full bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-md h-fit">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Previous Test History</h3>
                  <p className="text-base text-gray-700 mb-1">
                    <span className="font-semibold">Date:</span>{' '}
                    {dayjs(lastHistory.date).format('MMM D, YYYY h:mm A')}
                  </p>
                  <p className="text-base text-gray-700 mb-1">
                    <span className="font-semibold">Feedback:</span> {lastHistory.feedback}
                  </p>
                  <p className="text-base text-gray-700 mb-4">
                    <span className="font-semibold">Status:</span>{' '}
                    <Tag
                      color={lastHistory.status === 'success' ? 'green' : 'red'}
                      className="text-base px-3 py-1 rounded-full"
                    >
                      {lastHistory.status.toUpperCase()}
                    </Tag>
                  </p>
                  <div className="mt-3">
                    <span className="font-semibold text-gray-700 block mb-2 text-base">
                      Uploaded Image:
                    </span>
                    <Image
                      src={lastHistory.image}
                      alt="Previous feedback screenshot"
                      width={300}
                      height={180}
                      className="rounded-xl shadow-md object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TesterFeedback;
