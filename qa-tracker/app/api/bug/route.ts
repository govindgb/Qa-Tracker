import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import Bug from '@/models/bug';
import User from '@/models/userModel';
import { bugSchema } from '@/lib/validations';
import { getTokenFromRequest } from '@/lib/auth';
 
// Updated API Route
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    // Parse the request body
    const body = await request.json();
    console.log('Full request body:', body);
    
    // Extract the testing_report data
    const bugData = body.testing_report;
    console.log('Bug data to save:', bugData);
    
    if (!bugData) {
      return NextResponse.json(
        { error: 'testing_report is required in request body' },
        { status: 400 }
      );
    }
    
    // Validate required fields
    if (!bugData.user_id || !bugData.project_name || !bugData.userName) {
      return NextResponse.json(
        { error: 'Missing required fields: user_id, project_name, or userName' },
        { status: 400 }
      );
    }
    
    // Create bug report with the exact structure from your payload
    const bug = await Bug.create({
      user_id: bugData.user_id,
      project_name: bugData.project_name,
      userName: bugData.userName.trim(), // Remove extra spaces
      feedback: bugData.feedback,
      status: bugData.status,
      bugDetails: bugData.bugDetails || [], // Use the bugDetails array as-is
    });
    
    console.log('Bug created successfully:', bug);
    
    return NextResponse.json(
      {
        message: 'Bug report submitted successfully',
        bug,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create bug error:', error);
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: Object.values(error.errors).map((err: any) => err.message)
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
export async function GET(request: NextRequest) {
  try {
    await connectDB();
 
    const tokenData = await getTokenFromRequest(request);
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
 
    let bugs;
 
    if (tokenData.role === 'admin') {
      // Admin can see all bugs or filter by user
      if (userId) {
        bugs = await Bug.find({ userId }).sort({ createdAt: -1 });
      } else {
        bugs = await Bug.find({}).sort({ createdAt: -1 });
      }
    } else if (tokenData.role === 'user') {
      // User can only see their own bugs
      bugs = await Bug.find({ userId: tokenData.userId }).sort({ createdAt: -1 });
    } else {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }
 
    return NextResponse.json({
      message: 'Bugs retrieved successfully',
      bugs,
    });
  } catch (error: any) {
    console.error('Get bugs error:', error);
 
    if (error.message === 'No token provided' || error.message === 'Invalid token') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
 
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
 