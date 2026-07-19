import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getUsersCollection } from '@/lib/mongodb';
import { sendOTPEmail } from '@/lib/email';

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    // Validation
    if (!name?.trim() || name.trim().length < 2) {
      return NextResponse.json({ error: 'Name must be at least 2 characters' }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email' }, { status: 400 });
    }
    if (!password || password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }

    const users = await getUsersCollection();

    // Check if email already exists
    const existing = await users.findOne({ email: email.toLowerCase() });
    if (existing) {
      if (existing.isVerified) {
        return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 });
      }
      // Re-send OTP for unverified user
      const otp = generateOTP();
      await users.updateOne(
        { email: email.toLowerCase() },
        {
          $set: {
            name: name.trim(),
            password: await bcrypt.hash(password, 12),
            otp,
            otpExpiry: new Date(Date.now() + 10 * 60 * 1000),
            updatedAt: new Date(),
          },
        }
      );
      await sendOTPEmail(email.toLowerCase(), otp, name.trim());
      return NextResponse.json({ success: true, message: 'OTP resent to your email' });
    }

    // Create new user
    const otp = generateOTP();
    const hashedPassword = await bcrypt.hash(password, 12);

    await users.insertOne({
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
      isVerified: false,
      otp,
      otpExpiry: new Date(Date.now() + 10 * 60 * 1000),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Send OTP email
    await sendOTPEmail(email.toLowerCase(), otp, name.trim());

    return NextResponse.json({ success: true, message: 'OTP sent to your email' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Registration failed';
    console.error('Register error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}