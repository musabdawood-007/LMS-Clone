import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getUsersCollection } from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    const { email, otp, newPassword } = await req.json();
    if (!email || !otp || !newPassword) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }
    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    const users = await getUsersCollection();
    const user = await users.findOne({ email: email.toLowerCase() });

    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    if (user.otp !== otp) return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
    if (user.otpExpiry && new Date(user.otpExpiry) < new Date()) {
      return NextResponse.json({ error: 'OTP has expired. Please request a new one.' }, { status: 400 });
    }

    const hashed = await bcrypt.hash(newPassword, 12);
    await users.updateOne(
      { email: email.toLowerCase() },
      { $set: { password: hashed, otp: undefined, otpExpiry: undefined, updatedAt: new Date() } }
    );

    return NextResponse.json({ success: true, message: 'Password reset successfully' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Reset failed';
    console.error('Reset password error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}