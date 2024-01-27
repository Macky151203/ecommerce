import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const requestURL = new URL(request.url)
  
  const code = requestURL.searchParams.get('code')

  if (code) {
    const cookiestore=cookies()
    const supabase = createRouteHandlerClient({ cookies:()=>cookiestore })
    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(requestURL.origin)
}