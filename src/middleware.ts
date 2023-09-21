import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const path=req.nextUrl.pathname;  
  const ispathpublic=path === '/login' || path === '/signup'
  const token=req.cookies.get('token')?.value || ''
  if(token && ispathpublic){
   return NextResponse.redirect(new URL('/',req.nextUrl))
  }
 else if(!token && !ispathpublic){
   return NextResponse.redirect(new URL('/login',req.nextUrl))
 } 
}
export const config = {
  matcher: ['/login','/signup','/profile/:path*','/'],
}