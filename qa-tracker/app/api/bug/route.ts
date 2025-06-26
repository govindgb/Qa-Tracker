import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import Bug from '@/models/bug';
import User from '@/models/userModel';
import { bugSchema } from '@/lib/validations';
import { getTokenFromRequest } from '@/lib/auth';

// Create bug report
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    console.log('Full request body:', body);
    
    const bugData = body.testing_report;
    console.log('Bug data to save:', bugData);
    
    if (!bugData) {
      return NextResponse.json(
        { error: 'testing_report is required in request body' },
        { status: 400 }
      );
    }
    
    // Validate required fields;
    // if (!bugData.user_id || !bugData.project_name || !bugData.userName) {
    //   return NextResponse.json(
    //     { error: 'Missing required fields: user_id, project_name, or userName' },
    //     { status: 400 }
    //   );
    // }
    
    const bug = await Bug.create({
      user_id: "sdfghj",
      project_name: bugData.project_name,
      userName: bugData.userName.trim(),
      feedback: bugData.feedback,
      status: bugData.status,
      bugDetails: bugData.bugDetails || [],
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

// Get bugs
// export async function GET(request: NextRequest) {
//   try {
//     await connectDB();
//     const tokenData = await getTokenFromRequest(request);
//     const { searchParams } = new URL(request.url);
//     const userId = searchParams.get('userId');
    
//     let bugs;
    
//     if (tokenData.role === 'admin') {
//       if (userId) {
//         bugs = await Bug.find({ userId }).sort({ createdAt: -1 });
//       } else {
//         bugs = await Bug.find({}).sort({ createdAt: -1 });
//       }
//     } else if (tokenData.role === 'user') {
//       bugs = await Bug.find({ userId: tokenData.userId }).sort({ createdAt: -1 });
//     } else {
//       return NextResponse.json(
//         { error: 'Access denied' },
//         { status: 403 }
//       );
//     }
    
//     return NextResponse.json({
//       message: 'Bugs retrieved successfully',
//       bugs,
//     });
//   } catch (error: any) {
//     console.error('Get bugs error:', error);
    
//     if (error.message === 'No token provided' || error.message === 'Invalid token') {
//       return NextResponse.json(
//         { error: 'Unauthorized' },
//         { status: 401 }
//       );
//     }
    
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }
// Get bug by ID
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    // Validate ID is provided
    if (!id) {
      return NextResponse.json(
        { error: 'Bug ID is required as query parameter' },
        { status: 400 }
      );
    }
    
    console.log('Fetching bug with ID:', id);
    
    // Find bug by ID
    const bug = await Bug.findById(id);
    
    if (!bug) {
      return NextResponse.json(
        { error: 'Bug not found' },
        { status: 404 }
      );
    }
    
    console.log('Bug found:', bug);
    
    return NextResponse.json({
      message: 'successfully fectched the data by Id',
      bug,
    });
  } catch (error: any) {
    console.error('Get bug error:', error);
    
    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return NextResponse.json(
        { error: 'Invalid bug ID format' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
// Update bug by ID
export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    console.log('Update request body:', body);
    
    // Extract the testing_report data
    const bugData = body.testing_report;
    console.log('Bug data to update:', bugData);
    
    if (!bugData) {
      return NextResponse.json(
        { error: 'testing_report is required in request body' },
        { status: 400 }
      );
    }
    
    const { id, status, project_name, userName, feedback, bugDetails } = bugData;
    
    // Validate required fields
    if (!id) {
      return NextResponse.json(
        { error: 'Bug ID is required in testing_report' },
        { status: 400 }
      );
    }
    
    if (!status) {
      return NextResponse.json(
        { error: 'Status is required in testing_report' },
        { status: 400 }
      );
    }
    
    // Validate status value (including your "sucess" value)
    const validStatuses = ["pending", "in-progress", "resolved", "rejected", "completed", "sucess"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
        { status: 400 }
      );
    }
    
    // Prepare update object - only include fields that are provided
    const updateData: any = { status };
    
    if (project_name) updateData.project_name = project_name;
    if (userName) updateData.userName = userName.trim();
    if (feedback) updateData.feedback = feedback;
    if (bugDetails && Array.isArray(bugDetails)) updateData.bugDetails = bugDetails;
    
    console.log('Data to update:', updateData);
    
    // Find and update the bug
    const updatedBug = await Bug.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedBug) {
      return NextResponse.json(
        { error: 'Bug not found' },
        { status: 404 }
      );
    }
    
    console.log('Bug updated successfully:', updatedBug);
    
    return NextResponse.json(
      {
        message: 'Bug updated successfully',
        bug: updatedBug,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Update bug error:', error);
    
    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return NextResponse.json(
        { error: 'Invalid bug ID format' },
        { status: 400 }
      );
    }
    
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