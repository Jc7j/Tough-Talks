import { NextRequest, NextResponse } from 'next/server'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

// @TODO not working.
export function middleware(req: NextRequest) {
  const { isAuthenticated } = getKindeServerSession()
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/'))
  }
}
