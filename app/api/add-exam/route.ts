import { NextRequest, NextResponse } from 'next/server';
import { addExam } from '../../lib/data';

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    await addExam(body);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json({ success: false, error: 'Failed to add exam' }, { status: 500 });
  }
}
