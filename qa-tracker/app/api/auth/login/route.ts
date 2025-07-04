import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import User from '@/models/userModel';
import { loginSchema } from '@/lib/validations';
import { comparePassword, generateToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { AppError } from '@/lib/errors';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const validatedData = loginSchema.parse(body);

    // Find user
    const user = await User.findOne({ email: validatedData.email });
    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    // Check password
    const isValidPassword = await comparePassword(validatedData.password, user.password);
    if (!isValidPassword) {
      throw new AppError('Invalid email or password', 401);
    }

    // Generate token
    const token = generateToken({
      userId: user._id,
      email: user.email,
      role: user.role
    });

    // Return user data (without password) and token
    const { password, ...userWithoutPassword } = user.toObject();

    const cookieStore = await cookies();
    cookieStore.set('auth_token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24, // 1 day in seconds
      path: '/',
    });

    return NextResponse.json({
      message: 'Login successful',
      user: userWithoutPassword
    });

  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    if (error instanceof AppError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}