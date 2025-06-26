import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import  connectToDB  from "@/lib/mongoose";
import User from "@/models/userModel"; 

export async function POST(req: NextRequest) {
  try {
    const { userId, name, email, password, profilePic } = await req.json();

    if (!userId || !name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectToDB();

    const updateData: any = { name, email };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    if (profilePic) {
      updateData.profilePic = profilePic; // either base64 or URL
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    return NextResponse.json({ message: "Profile updated", user: updatedUser });
  } catch (err) {
    console.error("Update profile error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
