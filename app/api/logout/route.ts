// app/api/logout/route.ts
import { NextResponse } from 'next/server';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const supabase = createServerActionClient({ cookies });
  await supabase.auth.signOut();


  // Get the origin from the request to construct a full absolute URL
  const origin = new URL(request.url).origin;
  return NextResponse.redirect(`${origin}/login`);
}
