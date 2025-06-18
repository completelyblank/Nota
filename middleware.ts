// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // This will attach the user session to the request
  await supabase.auth.getSession();

  return res;
}

// ✅ This is required to apply middleware only to specific routes
export const config = {
  matcher: ['/dashboard/:path*'],
};
