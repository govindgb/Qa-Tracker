import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import User from '@/models/userModel';
import { getTokenFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    // Verify admin access
    const tokenData = await getTokenFromRequest(request);
    if (tokenData.role !== 'admin') {
      return NextResponse.json(
        { error: 'Access denied. Admin role required.' },
        { status: 403 }
      );
    }

    // Get all testers
    const testers = await User.find(
      { role: 'tester' },
      { password: 0 } // Exclude password field
    ).sort({ createdAt: -1 });

    return NextResponse.json({
      message: 'Testers retrieved successfully',
      testers
    });

  } catch (error: any) {
    console.error('Get users error:', error);
    
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