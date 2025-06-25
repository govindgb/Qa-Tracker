import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import Bug from '@/models/bug';
import User from '@/models/userModel';
import { bugSchema } from '@/lib/validations';
import { getTokenFromRequest } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    // Verify tester access
    const tokenData = await getTokenFromRequest(request);
    if (tokenData.role !== 'tester') {
      return NextResponse.json(
        { error: 'Access denied. Tester role required.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validatedData = bugSchema.parse(body);

    // Get tester details
    const tester = await User.findById(tokenData.userId);
    if (!tester) {
      return NextResponse.json(
        { error: 'Tester not found' },
        { status: 404 }
      );
    }

    // Create bug report
    const bug = await Bug.create({
      ...validatedData,
      testerId: tester._id,
      testerName: tester.name,
      testerEmail: tester.email
    });

    return NextResponse.json({
      message: 'Bug report submitted successfully',
      bug
    }, { status: 201 });

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
    const testerId = searchParams.get('testerId');

    let bugs;

    if (tokenData.role === 'admin') {
      // Admin can see all bugs or filter by tester
      if (testerId) {
        bugs = await Bug.find({ testerId }).sort({ createdAt: -1 });
      } else {
        bugs = await Bug.find({}).sort({ createdAt: -1 });
      }
    } else if (tokenData.role === 'tester') {
      // Tester can only see their own bugs
      bugs = await Bug.find({ testerId: tokenData.userId }).sort({ createdAt: -1 });
    } else {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      message: 'Bugs retrieved successfully',
      bugs
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