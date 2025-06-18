import { NextRequest, NextResponse } from 'next/server';
import { submitAnswer } from '../../lib/data';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Incoming request body:', body);

    const { studentId, teacherId, subject, answer } = body;

    if (!studentId || !teacherId || !subject || !answer) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await submitAnswer({ studentId, teacherId, subject, answer });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('API error in submit-answer:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
