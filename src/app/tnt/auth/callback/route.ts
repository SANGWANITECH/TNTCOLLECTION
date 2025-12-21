import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server' // Ensure this points to your server client file

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')

    // 1. Check if we have the 'next' param (in case you want dynamic redirects later)
    // 2. Default to '/admin' if no 'next' is provided
    const next = searchParams.get('next') ?? '/admin'

    if (code) {
        const supabase = await createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            // SUCCESS: Redirect to /admin
            return NextResponse.redirect(`${origin}${next}`)
        }
    }

    // FAIL: Return the user to the login page with an error message
    return NextResponse.redirect(`${origin}/tnt/auth/login?error=auth_failed`)
}
