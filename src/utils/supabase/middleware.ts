import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )

          supabaseResponse = NextResponse.next({
            request,
          })

          cookiesToSet.forEach(({ name, value }) =>
            supabaseResponse.cookies.set(name, value)
          )
        },
      },
    }
  )

  // Don't put logic before this
  const { data } = await supabase.auth.getClaims()

  const user = data?.claims

  // Redirect "/" -> "/tnt"
  if (request.nextUrl.pathname === '/') {
    const url = request.nextUrl.clone()
    url.pathname = '/tnt'
    return NextResponse.redirect(url, 308)
  }

  // Not signed in
  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/tnt/auth') &&
    !request.nextUrl.pathname.startsWith('/login')
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/tnt/auth/login'
    return NextResponse.redirect(url)
  }

  // Protect admin routes
  if (user && request.nextUrl.pathname.startsWith('/admin')) {
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser()

    const email = authUser?.email?.toLowerCase()

    if (!email) {
      const url = request.nextUrl.clone()
      url.pathname = '/tnt/auth/login'
      return NextResponse.redirect(url)
    }

    const { data: adminRecord } = await supabase
      .from('admins')
      .select('email')
      .eq('email', email)
      .single()

    if (!adminRecord) {
      await supabase.auth.signOut()

      const url = request.nextUrl.clone()
      url.pathname = '/tnt/auth/login'
      url.searchParams.set('error', 'not_authorized')

      return NextResponse.redirect(url)
    }
  }

  // Signed in user visiting login page
  if (user && request.nextUrl.pathname.startsWith('/tnt/auth')) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}