import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/admin'

    if (code) {
        const supabase = await createClient()

        // 1. Exchange the code for a session
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error && data.user) {
            const userEmail = data.user.email;

            // 2. CHECK: Is this email in your authorized 'admins' table?
            const { data: adminRecord } = await supabase
                .from('admins')
                .select('email')
                .eq('email', userEmail)
                .single();

            if (!adminRecord) {
                // 3. UNAUTHORIZED: Not an admin.
                // Sign them out immediately so their session is destroyed
                await supabase.auth.signOut();

                // Optional: You could also delete the newly created user from auth.users
                // using a Service Role key if you want to keep the auth table clean.

                return NextResponse.redirect(`${origin}/tnt/auth/login?error=not_authorized`)
            }

            // 4. AUTHORIZED: Redirect to admin
            return NextResponse.redirect(`${origin}${next}`)
        }
    }

    return NextResponse.redirect(`${origin}/tnt/auth/login?error=auth_failed`)
}
