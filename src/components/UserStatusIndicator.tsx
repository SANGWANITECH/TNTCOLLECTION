'use client'

import { User } from "lucide-react";
import { NextPage } from "next";
import Link from "next/link";

const UserStatusIndicator: NextPage = () => {
  return (
    <div className="relative">
      <Link href="/admin">
        <User className="w-4 h-4" />
      </Link>
    </div>
  );
};

export default UserStatusIndicator;
