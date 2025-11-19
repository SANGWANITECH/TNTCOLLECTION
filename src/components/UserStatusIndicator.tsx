'use client'

import { User } from "lucide-react";
import { NextPage } from "next";
import Link from "next/link";



const UserStatusIndicator:NextPage = () => {
    const isLoggedIn = false


    return(
        <div className="relative">
            {isLoggedIn ?(
            <div>
                <User className="w-4 h-4"/>
                <div className="absolute h-2 w-2 rounded-full bg-green-500 top-[-4px] right-[-4px]"/>
            </div>):(
                <Link href={'/auth/login'}>
                    <User className="w-4 h-4"/>
                </Link>
            )}

        </div>
    )
}

export default UserStatusIndicator;