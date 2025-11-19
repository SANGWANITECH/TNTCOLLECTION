'use client'

import { User } from "lucide-react";
import { NextPage } from "next";
import Link from "next/link";
import {createClient} from "@/utils/supabase/client";
import {useEffect, useState} from "react";

const UserStatusIndicator:NextPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        supabase.auth.getSession().then(({data: {session} }) => {
            setIsLoggedIn(!!session)
        });

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsLoggedIn(!!session)
        })

        return () => listener.subscription.unsubscribe()
    }, [supabase]);


    return(
        <div className="relative">
            {isLoggedIn ?(
            <Link href={'/admin'}>
                <User className="w-4 h-4"/>
                <div className="absolute h-2 w-2 rounded-full bg-green-500 top-[-4px] right-[-4px]"/>
            </Link>):(
                <Link href={'/auth/login'}>
                    <User className="w-4 h-4"/>
                </Link>
            )}

        </div>
    )
}

export default UserStatusIndicator;