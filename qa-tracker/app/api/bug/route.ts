import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import Bug from '@/models/bug';
import User from '@/models/userModel';
import { bugSchema } from '@/lib/validations';
import { getTokenFromRequest } from '@/lib/auth';
 
export async function POST(request: NextRequest) {
  try {
    await connectDB();
 
    // Verify user access
    const tokenData = await getTokenFromRequest(request);
    if (tokenData.role !== 'user') {
      return NextResponse.json(
        { error: 'Access denied. User role required.' },
        { status: 403 }
      );
    }
 
    const body = await request.json();
    const validatedData = bugSchema.parse(body);
 
    // Get user details
    const user = await User.findById(tokenData.userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
 
    // Create bug report
        const bug = await Bug.create({
            ...validatedData,
            userId: user._id,
            userName: user.name,
            userEmail: user.email,
            bug: Array.isArray(validatedData.bug)
              ? validatedData.bug.map((b: any) => ({
                  bugTitle: b.bugTitle,
                  description: b.description,
                  priority: b.priority,
                }))
              : [], // Default to an empty array if validatedData.bug is not an array
          });
 
    return NextResponse.json(
      {
        message: 'Bug report submitted successfully',
        bug,
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
 
    console.error('Create bug error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
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
 