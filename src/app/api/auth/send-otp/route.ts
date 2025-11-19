import {NextResponse} from "next/server";
import {createClient} from "@/utils/supabase/server";

export async function POST(req:Request) {
    const { email } = await req.json();
    const supabase = await createClient();

    //ask supabase to send a 6-digit code instead of a magic link
    const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
            shouldCreateUser: false,
        },
    });

    if (error) {
        // Detect the special Supabase error when email doesn't exist
        if (error.message.includes("Signups not allowed")) {
            return NextResponse.json(
                { ok: false, error: "No account found with that email." },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { ok: false, error: error.message },
            { status: 400 }
        );
    }


    return NextResponse.json({ok: true, message: 'Email sent successfully'});
}