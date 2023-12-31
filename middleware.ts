import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside

export function middleware(request: NextRequest) {  
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/log-in'

  const token = request.cookies.get('token')?.value || ''

  if(isPublicPath && token) {
    return NextResponse.redirect(new URL('/Demandes', request.nextUrl))
  }

  if(!isPublicPath && !token){
    return NextResponse.redirect(new URL('/log-in', request.nextUrl))
  }
 
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/log-in',
    '/users',
    '/users/create',
    '/departement',
    '/Demandes',
    '/Demandes/create'
  ],
}