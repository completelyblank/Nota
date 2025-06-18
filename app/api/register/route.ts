// app/api/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { signUpWithEmail } from '../../lib/auth';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function POST(req: NextRequest) {
  const { email, password, name, role } = await req.json();

  try {
    // Register user (e.g., with Supabase or another auth system)
    const data = await signUpWithEmail(email, password);
    const user = data?.user;

    if (!user?.id) {
      throw new Error('User signup failed');
    }

    // Store user details in your own DB (excluding raw password)
    await sql`
      INSERT INTO users (id, email, name, password, role)
      VALUES (${user.id}, ${email}, ${name}, ${password}, ${role})
    `;

    // Return only safe fields
    return NextResponse.json({ id: user.id, email, name, role });
  } catch (err: any) {
    console.error('Registration error:', err);
    return NextResponse.json({ error: 'Registration failed: ' + err.message }, { status: 500 });
  }
}
