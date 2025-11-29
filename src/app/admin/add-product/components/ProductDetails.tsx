'use client'

import Inputfield from "@/components/Inputfield";
import { useState } from "react";
import ToggleCategory from "@/app/admin/components/ToggleCategory";
import ToggleTargetGroup from "@/app/admin/components/ToggleTargetGroup";
import TextareaAutosize from "react-textarea-autosize";


export default function ProductDetails() {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [availability, setAvailability] = useState("Available"); // single string now

    return (
        <div className="card flex flex-col gap-2 w-full">
            <p className="text-xl">Product Details</p>

            <form className="flex flex-col gap-2 pt-2 border-t border-border-light dark:border-border-dark">
                <label>Product Name:</label>
                <Inputfield
                    type="text"
                    placeholder="Product Name"
                    className="w-full p-2"
                    value={name}
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setName(e.target.value)
                    }
                />

                <div className="w-full flex gap-2">
                    <div className="w-2/3 md:w-full max-w-md">
                        <label className="text-lg">Category</label>
                        <ToggleCategory />
                    </div>

                    <div className="w-1/3 md:w-full max-w-md">
                        <label className="text-lg">Group</label>
                        <ToggleTargetGroup />
                    </div>
                </div>

                <div className={'flex items-start justify-between gap-2'}>
                    <div className={' w-full max-w-[200px]'}>
                        <label className={'text-lg'}>Price (MKW):</label>
                        <Inputfield
                            type="text" // better than "number" if formatting
                            placeholder="1,500"
                            className="w-full p-2"
                            value={price}
                            required
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                const raw = e.target.value.replace(/,/g, ""); // strip commas
                                if (!isNaN(Number(raw))) {
                                    setPrice(Number(raw).toLocaleString()); // format with commas
                                } else {
                                    setPrice(e.target.value); // fallback
                                }
                            }}
                        />
                    </div>

                    <div className={'pr-2'}>
                        <label className={'text-lg'}>Availability</label>
                        <div className={'flex flex-col sm:flex-row sm:mt-2 sm:gap-2'}>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        name="availability"
                                        value="Available"
                                        checked={availability === "Available"}
                                        className={'text-xs'}
                                        onChange={(e) => setAvailability(e.target.value)}
                                    />
                                    Available
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        name="availability"
                                        value="Sold Out"
                                        checked={availability === "Sold Out"}
                                        className={'text-xs'}
                                        onChange={(e) => setAvailability(e.target.value)}
                                    />
                                    Sold Out
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <TextareaAutosize
                        minRows={5}
                        maxRows={10}
                        placeholder={'describe the product here...'}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border border-border-light dark:border-border-dark rounded"
                    />
                </div>
            </form>
        </div>
    );
}