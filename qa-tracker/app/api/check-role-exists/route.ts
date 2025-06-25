import { NextResponse } from 'next/server'
import { connectToDB } from '@/lib/mongoose'
import User from '@/models/user'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const role = searchParams.get('role')

  await connectToDB()
  const user = await User.findOne({ role })

  return NextResponse.json({ exists: !!user })
}
