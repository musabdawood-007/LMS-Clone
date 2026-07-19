import { NextRequest, NextResponse } from 'next/server';
import { getUsersCollection } from '@/lib/mongodb';
import { sendOTPEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 });

    const users = await getUsersCollection();
    const user = await users.findOne({ email: email.toLowerCase() });
    if (!user) return NextResponse.json({ error: 'No account found with this email' }, { status: 404 });

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await users.updateOne(
      { email: email.toLowerCase() },
      { $set: { otp, otpExpiry, updatedAt: new Date() } }
    );

    await sendOTPEmail(email, otp, user.name);
    return NextResponse.json({ success: true, message: 'OTP sent to your email' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to send reset code';
    console.error('Forgot password error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}