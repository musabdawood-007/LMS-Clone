import { NextRequest, NextResponse } from 'next/server';
import { getUsersCollection } from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 });
    }

    const users = await getUsersCollection();
    const user = await users.findOne({ email: email.toLowerCase() });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (user.isVerified) {
      return NextResponse.json({ error: 'Account is already verified' }, { status: 400 });
    }

    if (!user.otp || user.otp !== otp) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
    }

    if (!user.otpExpiry || new Date() > user.otpExpiry) {
      return NextResponse.json({ error: 'OTP has expired. Please request a new one.' }, { status: 400 });
    }

    // Verify account
    await users.updateOne(
      { email: email.toLowerCase() },
      {
        $set: { isVerified: true, updatedAt: new Date() },
        $unset: { otp: '', otpExpiry: '' },
      }
    );

    return NextResponse.json({ success: true, message: 'Account verified successfully!' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Verification failed';
    console.error('Verify OTP error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}