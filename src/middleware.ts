import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const uri = request.nextUrl.pathname?.split('/api')?.[1];
  const search = request.nextUrl.search;
  const host = request.headers.get('apiurl');
  console.log(uri, request.headers.get('apiurl'));
  return NextResponse.rewrite(new URL(`${host + uri + search}`, request.url));
}

export const config = {
  matcher: '/api/:path*',
};
