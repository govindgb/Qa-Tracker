import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Bug from "@/models/bug";

// GET: List all projects
export async function GET() {
  await connectDB();
  const projects = await Bug.find({}, "project_name userName status createdAt updatedAt").sort({ createdAt: -1 });
  return NextResponse.json({ projects });
}

// POST: Create new project
export async function POST(request: NextRequest) {
  await connectDB();
  const data = await request.json();
  const project = await Bug.create(data);
  return NextResponse.json({ project }, { status: 201 });
}

// PUT: Update project status
export async function PUT(request: NextRequest) {
  await connectDB();
  const { _id, status } = await request.json();
  const updated = await Bug.findByIdAndUpdate(_id, { status }, { new: true });
  return NextResponse.json({ updated });
}