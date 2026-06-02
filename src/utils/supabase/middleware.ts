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
      getAll: () => request.cookies.getAll(),
      setAll: (cookies) => {
        cookies.forEach(({ name, value }) => request.cookies.set(name, value))
        supabaseResponse = NextResponse.next({ request })
        cookies.forEach(({ name, value }) =>
          supabaseResponse.cookies.set(name, value)
        )
      },
    },
  }
)

// ALWAYS use real user, not claims
const {
  data: { user },
} = await supabase.auth.getUser()

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
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/tnt/auth/login'
      return NextResponse.redirect(url)
    }

    const email = user.email?.toLowerCase()

    const { data: admin } = await supabase
      .from('admins')
      .select('email')
      .eq('email', email)
      .single()

    if (!admin) {
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