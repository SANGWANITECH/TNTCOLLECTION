'use client'

import { NextPage } from "next";
import { useCart } from "@/context/CartContext";
import { ShoppingCartIcon, Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import GoBackButton from "../GoBackButton";
import Image from "next/image";



const CartProducts: NextPage = () => {
    const { cartItems, cartCount, addToCart, decreaseQuantity,removeFromCart } = useCart();


    if(cartItems.length === 0){
        return(
            <div className="flex flex-col items-center mt-21 gap-4 mx-auto">
                <ShoppingCartIcon className="w-10 h-10"/>
                <h4 className="text-h4">Your cart is empty</h4>
                <p className="text-sm">Looks like you haven&apos;t added any items to your cart yet.</p>
                <div>
                    <Link href={'/tnt'}>
                        <GoBackButton />
                    </Link>

                </div>
            </div>
        )
    }

    return(
        <div className={'flex-1 w-full flex flex-col gap-9 sm:max-w-[600px] mx-auto xl:max-w-full'}>
            <div className="flex justify-between items-center">
                <h3 className="text-h3">Shopping Cart</h3>
                <p>
                    {cartCount} {cartCount > 1 ?(<>Items</>):(<>Item</>)}
                </p>
            </div>
            <div>
            {/* Mapping Products  */}
            <div className="flex flex-col gap-4 ">
                {cartItems.map((cartItem)=>
                    <div key={cartItem.id} className="card flex flex-col gap-2 sm:flex-row sm:justify-between  w-full   sm:items-center sm:gap-8">

                        {/* 1st section: Image */}
                        <div className="relative w-full max-w-[50px] h-[60px]">
                            <Image 
                            src={ `https://ovapnnyjvmiqnoqgdarc.supabase.co/storage/v1/object/public/products/${cartItem.image}`}
                            alt={cartItem.title}
                            fill
                            />
                        </div>

                        {/* 2nd section: description */}
                        <div className="flex flex-col gap-2 items-start flex-1">
                            <p className="font-semibold text-sm line-clamp-2">
                                {cartItem.title}
                            </p>
                            <p className="text-sm w-fit bg-gray-100 rounded-full dark:bg-background-color-dark px-2 border border-border-light dark:border-border-dark]">
                                {cartItem.category}
                            </p>
                        </div>

                        {/* 3rd section: quantity changer */}
                        <div className="flex justify-between items-center sm:flex-col sm:items-start">
                            <div className="flex gap-2 items-center">
                                <p className="text-sm">
                                    Qty:
                                </p>

                                <div className="flex border w-[80px] justify-around items-center rounded-lg border-border-light dark:border-border-dark">
                                    <button 
                                    disabled = {cartItem.quantity===1}
                                    className="hover:bg-gray-200 rounded-lg cursor-pointer dark:hover:bg-gray-800">
                                        <Minus className="w-4 h-4" 
                                            onClick={() => decreaseQuantity(cartItem.id)}
                                        />
                                    </button>

                                    {cartItem.quantity}
                                    <button className="hover:bg-gray-200 rounded-lg cursor-pointer dark:hover:bg-gray-800">
                                        <Plus className="w-4 h-4 " onClick={()=>
                                            addToCart({
                                            id:cartItem.id,
                                            title:cartItem.title,
                                            price: cartItem.price,
                                            image: cartItem.image,
                                            quantity:cartItem.quantity,
                                            category:cartItem.category,
                                            })
                                        }/>
                                    </button>
                                </div>
                            </div>
                            {/*final card section */}
                            <div className="flex justify-between items-center flex-col gap-2 sm:items-start">
                                <p className="font-semibold text-sm">MK{cartItem.price * cartItem.quantity}</p>
                                <button 
                                onClick={()=>removeFromCart(cartItem.id)}
                                className="text-red-500 dark:text-red-400 text-sm flex items-center gap-1 cursor-pointer">
                                    <Trash2 className="w-3 h-3"/>
                                    Remove
                                </button>
                            </div>
                        </div>

                    </div>
                )}
            </div>

            </div>
        </div>
    )
}

export default CartProducts;