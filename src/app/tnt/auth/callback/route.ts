import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/admin'

    if (code) {
        let response = NextResponse.redirect(new URL(next, origin))
        const cookieStore = await cookies()

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
            {
                cookies: {
                    getAll() {
                        return cookieStore.getAll()
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value, options }) => {
                            cookieStore.set(name, value, options)
                            response.cookies.set(name, value, options)
                        })
                    },
                },
            }
        )

        // 1. Exchange the code for a session
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error && data.user) {
            const userEmail = data.user.email?.toLowerCase()

            // 2. CHECK: Is this email in your authorized 'admins' table?
            const { data: adminRecord } = await supabase
                .from('admins')
                .select('email')
                .eq('email', userEmail)
                .single();

            if (!adminRecord) {
                // 3. UNAUTHORIZED: Not an admin.
                // Sign them out immediately so their session is destroyed
                response = NextResponse.redirect(
                    new URL('/tnt/auth/login?error=not_authorized', origin)
                )
                await supabase.auth.signOut()

                // Optional: You could also delete the newly created user from auth.users
                // using a Service Role key if you want to keep the auth table clean.

                return response
            }

            // 4. AUTHORIZED: Redirect to admin with the session cookie included.
            return response
        }
    }

    return NextResponse.redirect(new URL('/tnt/auth/login?error=auth_failed', origin))
}
