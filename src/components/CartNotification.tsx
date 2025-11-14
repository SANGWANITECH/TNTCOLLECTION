'use client'

import { useCart } from "@/context/CartContext";
import { NextPage } from "next";

const CartNotificatiion: NextPage = () => {
    const { cartCount } = useCart();

    if (cartCount === 0) return null;
    return(
        <div className="absolute mt-2 -top-1 -right-3 bg-black dark:bg-gray-100 dark:text-black text-white text-xs rounded-full px-1.5 py-0.5 animate-pulse">
            {cartCount}
        </div>
    )
}

export default CartNotificatiion;