import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth'; // You should have this
 
export async function GET() {
  try {
    const token = (await cookies()).get('auth_token')?.value;
 
    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }
 
    const payload = verifyToken(token); // Your JWT verification logic
 
    return NextResponse.json({
      authenticated: true,
      user: {
        email: payload.email,
        role: payload.role,
        userId: payload.userId,
      },
    });
  } catch (error) {
    // return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}