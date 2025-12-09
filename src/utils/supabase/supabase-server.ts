// supabase-server.ts
import { createClient } from "@supabase/supabase-js";

export const supabaseServer = () => {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY! // server-only, full access
    );
<<<<<<< HEAD
};
=======
};
>>>>>>> f447cb222f019cb166adfe00a6ca6368bd7f217e
