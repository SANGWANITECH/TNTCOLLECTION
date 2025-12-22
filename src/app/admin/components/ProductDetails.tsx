'use client'

import Inputfield from "@/components/Inputfield";
import TextareaAutosize from "react-textarea-autosize";
import AddProductCategory from "@/app/admin/components/AddProductCategory";
import AddProductTargetGroup from "@/app/admin/components/AddProductTargetGroup";
import { useAddProduct } from "@/app/admin/context/AddProductContext";


export default function ProductDetails() {
    const { selectedCategory, setSelectedCategory, selectedTargetGroup, setSelectedTargetGroup, setAvailability, availability, setName, setPrice, setDescription, price, name, description} = useAddProduct();

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
                        <AddProductCategory
                            selectedCategory={selectedCategory}
                            onCategoryChange={setSelectedCategory}
                        />
                    </div>

                    <div className="w-1/3 md:w-full max-w-md">
                        <label className="text-lg">Group</label>
                        <AddProductTargetGroup
                            selectedTargetGroup={selectedTargetGroup}
                            onTargetGroupChange={setSelectedTargetGroup}
                        />
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
                                        value="available"
                                        checked={availability} // true means Available
                                        onChange={() => setAvailability(true)}
                                    />
                                    Available
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        name="availability"
                                        value="sold-out"
                                        checked={!availability} // false means Sold Out
                                        onChange={() => setAvailability(false)}
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