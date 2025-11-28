'use client'

import Inputfield from "@/components/Inputfield";
import {useState} from "react";
import ToggleCategory from "@/app/admin/components/ToggleCategory";
import ToggleTargetGroup from "@/app/admin/components/ToggleTargetGroup";

export default function ProductDetails() {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");

    return (
        <div className="card flex flex-col gap-2 w-full max-w-sm">
            <p className={'text-lg'}>Product Details</p>

            <form className={'border-t border-border-light dark:border-border-dark'}>
                <label>
                    Product Name:
                </label>
                <Inputfield
                    type={'text'}
                    placeholder={'Product Name'}
                    className={'w-full p-2'}
                    value={name}
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setName(e.target.value)}}
                />
                <div className="w-full flex xl:flex-col gap-2 xl:max-w-xs">
                    <div className="w-2/3 md:w-full max-w-md">
                        <label className={'text-lg'}>Category</label>
                        <ToggleCategory />
                    </div>

                    <div className="w-1/3 md:w-full max-w-md">
                        <label className={'text-lg'}>Group</label>
                        <ToggleTargetGroup />
                    </div>
                </div>

                <div>
                    <label>
                        Price (MKW):
                    </label>
                    <Inputfield
                        type={'text'}
                        placeholder={'1,500'}
                        className={'w-full p-2'}
                        value={name}
                        required
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setName(e.target.value)}}
                    />
                </div>
            </form>
        </div>
    )
}