import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const uri = request.nextUrl.pathname?.split('/api')?.[1];
  const search = request.nextUrl.search;
  const host = request.headers.get('apiurl');
  console.log(uri, request.headers.get('apiurl'));
  let url = `${host + uri + search}`;
  if (request.nextUrl.pathname === '/api/broadcast') {
    url = request.nextUrl.search?.split('apiurl=')?.[1];
    url = decodeURIComponent(url)
    console.log(url)
  }
  return NextResponse.rewrite(new URL(url, request.url));
}

export const config = {
  matcher: '/api/:path*',
};
