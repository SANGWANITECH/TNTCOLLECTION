import {NextResponse} from "next/server";
import {createClient} from "@/utils/supabase/server";

export async function POST (req: Request) {
    const { email, token } = await req.json()
    const supabase = await createClient();

    const { data, error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: "email",
    });

    if (error) {
        return NextResponse.json({ ok: false, error: error.message },{status:400});
    }

    return NextResponse.json({ ok: true, user: data.user });
}