'use client'

import { NextPage } from "next";
import InputField from "../Inputfield";
import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { Truck, Tag } from "lucide-react";
import { Button } from "../ui/button";
import {useRouter} from "next/navigation";

const OrderSummary: NextPage = () => {
        const [discount, setDiscount] = useState('');

        const { cartItems, setSubtotal, shippingCost } = useCart();
        const router = useRouter();

        const subtotal = cartItems.reduce(
            (acc, item) => acc + item.price * item.quantity, 0
        );

        useEffect(() => {
            setSubtotal(subtotal);
        }, [subtotal, setSubtotal]);

        if(!cartItems.length) {
            return null;
        }


    return (
        <div className={'relative w-full sm:max-w-[600px] lg:max-w-[500px] xl:max-w-[600px] mx-auto lg:mt-20'}>
            <div className={' sticky top-20'}>
                <div className="card">
                    <h5 className="text-h5 p-2">Order Summary</h5>
                    <div className="border-b p-2 border-border-light dark:border-border-dark">
                        <p className="text-sm">Discount Code</p>
                        <div className="flex items-center gap-1">
                            <InputField
                                type="text"
                                placeholder="Enter Code"
                                className="px-2 flex-1"
                                required
                                value={discount}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDiscount(e.target.value)}
                            />
                            <Button
                                className="card"
                            >
                                <Tag className="w-4 h4"/>
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 p-2">
                        <p className="text-sm flex justify-between items-center">
                            Subtotal
                            <span>${subtotal.toFixed(2)}</span>
                        </p>
                        <div className="border-b border-border-light dark:border-border-dark pb-2">
                            <div className="text-sm flex justify-between items-center  pb-2">
                                <div className="flex items-center gap-1">
                                    <Truck className="w-4 h-4"/>
                                    Shipping
                                </div>
                                <span>${(shippingCost).toFixed(2)}</span>
                            </div>
                            <p className="text-xs text-text-secondary">Free shipping on orders over $100</p>
                        </div>

                        <div className="flex flex-col gap-10">
                            <p className="flex justify-between items-center text-sm">
                                Total
                                <span>${(shippingCost + subtotal).toFixed(2)}</span>
                            </p>
                            <Button
                                variant={'primary'}
                                className="text-sm"
                                onClick={() => router.push("/tnt/cart/checkout")}
                            >
                                Proceed To Checkout
                            </Button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="text-xs text-text-secondary text-center">
                        <div className={'flex items-center gap-1 justify-center'}>
                            <span className={'h-2 w-2 bg-green-500 rounded-full inline-block'}></span>
                            Secure checkout
                        </div>
                        <p>Your payment information is encrypted and secure</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderSummary;