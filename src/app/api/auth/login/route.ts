import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getUsersCollection } from '@/lib/mongodb';
import { SignJWT } from 'jose';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const users = await getUsersCollection();
    const user = await users.findOne({ email: email.toLowerCase() });

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    if (!user.isVerified) {
      return NextResponse.json({ error: 'Please verify your email first. Check your inbox for the OTP.' }, { status: 403 });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Generate JWT
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret');
    const token = await new SignJWT({ userId: user._id, email: user.email, name: user.name })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(secret);

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: { id: user._id, name: user.name, email: user.email },
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Login failed';
    console.error('Login error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}