import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import ArrayModel from '@/models/projectNamesModel';
import { AppError } from '@/lib/errors';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const arrays = await ArrayModel.find();
    return NextResponse.json(arrays);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    // Check for duplicate array (deep equality on projectList)
    const exists = await ArrayModel.findOne({ projectList: { $eq: body.projectList } });
    if (exists) {
      return NextResponse.json({ message: 'Data already exists', data: exists }, { status: 200 });
    }

    const newArray = new ArrayModel(body);
    await newArray.save();
    return NextResponse.json(newArray, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { id, ...updateData } = body;
    const updatedArray = await ArrayModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedArray) {
      throw new AppError('Array not found', 404);
    }
    return NextResponse.json(updatedArray);
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    const { id } = await request.json();
    const deletedArray = await ArrayModel.findByIdAndDelete(id);
    if (!deletedArray) {
      throw new AppError('Array not found', 404);
    }
    return NextResponse.json({ message: 'Array deleted successfully' });
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}