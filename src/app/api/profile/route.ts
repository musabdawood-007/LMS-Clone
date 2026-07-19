import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { jwtVerify } from 'jose';

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret');
    const { payload } = await jwtVerify(token, secret);
    const userId = payload.userId as string;

    const db = await getDb();
    const profile = await db.collection('student_profiles').findOne({ userId });
    if (!profile) return NextResponse.json({ profile: null, needsOnboarding: true });

    return NextResponse.json({ profile, needsOnboarding: false });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch profile';
    console.error('Profile GET error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret');
    const { payload } = await jwtVerify(token, secret);
    const userId = payload.userId as string;

    const body = await req.json();
    const { departmentId, departmentName, programId, programName, currentSemester, semesterType, rollNumber } = body;

    if (!departmentId || !programId || !currentSemester || !semesterType) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const db = await getDb();
    const result = await db.collection('student_profiles').updateOne(
      { userId },
      {
        $set: {
          userId,
          departmentId,
          departmentName: departmentName || departmentId,
          programId,
          programName: programName || programId,
          currentSemester: parseInt(currentSemester),
          semesterType,
          rollNumber: rollNumber || '',
          updatedAt: new Date(),
        },
        $setOnInsert: {
          createdAt: new Date(),
        },
      },
      { upsert: true },
    );

    await db.collection('student_profiles').createIndex({ userId: 1 }, { unique: true });

    return NextResponse.json({ success: true, message: 'Profile saved' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to save profile';
    console.error('Profile POST error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}