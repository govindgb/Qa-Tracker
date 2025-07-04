import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Bug from "@/models/bug";
import { getTokenFromRequest } from "@/lib/auth";
 
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
 
    const tokenData = await getTokenFromRequest(request);
    const body = await request.json();
    const { status, bug: updatedBug } = body;
 
    // Validate status
    const validStatuses = ["pending", "in-progress", "resolved", "rejected"];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }
 
    // Find the bug
    const bug = await Bug.findById(params.id);
    if (!bug) {
      return NextResponse.json({ error: "Bug not found" }, { status: 404 });
    }
 
    // Check permissions
    if (
      tokenData.role === "user" &&
      bug.userId.toString() !== tokenData.userId
    ) {
      return NextResponse.json(
        { error: "Access denied. You can only update your own bugs." },
        { status: 403 }
      );
    }
 
    // Update bug details
    if (status) {
      bug.status = status;
    }
 
    if (updatedBug && Array.isArray(updatedBug)) {
      bug.bug = updatedBug.map((b: any) => ({
        bugTitle: b.bugTitle,
        description: b.description,
        priority: b.priority,
      }));
    }
 
    await bug.save();
 
    return NextResponse.json({
      message: "Bug updated successfully",
      bug,
    });
  } catch (error: any) {
    console.error("Update bug error:", error);
 
    if (
      error.message === "No token provided" ||
      error.message === "Invalid token"
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
 
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}