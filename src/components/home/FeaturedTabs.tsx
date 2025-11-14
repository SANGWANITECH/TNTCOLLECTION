'use client'
import React, { useState } from "react";
import { Funnel, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../ui/button";
import ProductCard from "../ProductCard";

interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    category: string;
    description: string;
}

interface TabData {
    [key: string]: Product[];
}

interface Props {
    tabData: TabData;
}

const tabs = [
    {id:'all',label:'All'},
    { id: 'men', label: 'Men clothes' },
    { id: 'women', label: 'Women clothes' },
    { id: 'electronics', label: 'footwear' },
    { id: "jewelery", label: "bags" },
    { id: "jewelery", label: "kids clothes" },
    { id: "jewelery", label: "Fashion & Accessories" }
]

const FeaturedTabs: React.FC<Props> = ({ tabData }) => {
    const [activeTab, setActiveTab] = useState<string>('all');
    const [dropDown, setDropDown] = useState<boolean>(true);


    return (
        <div className="flex flex-col lg:flex-row lg:justify-center gap-2 m-auto">
            {/* Tabs */}
            <div>
                <div className="card flex flex-col lg:w-[min(400px,20vw)] sticky top-20">
                    <div className="flex items-center justify-between mb-2">
                        <p className="flex gap-2 items-center">
                            <Funnel className="w-4 h-4" />
                            <span>Categories</span>
                        </p>
                        {dropDown
                            ? <ChevronUp className="w-4 h-4" onClick={() => setDropDown(false)} />
                            : <ChevronDown className="w-4 h-4" onClick={() => setDropDown(true)} />}
                    </div>

                    {dropDown && (
                        <div className="flex flex-col gap-1">
                            {tabs.map((tab) => (
                                <Button
                                    key={tab.id}
                                    variant={activeTab === tab.id
                                        ? "primary"
                                        : "default"
                                    }
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full py-2 px-2 text-sm font-medium transition-colors duration-200 flex justify-between
                        ${activeTab === tab.id ? "" : ""}
                    `}
                                >
                                    {tab.label}
                                    {activeTab === tab.id && (
                                        <span className="m-2 p-1 rounded-md bg-background-color text-text-primary dark:bg-background-color-dark dark:text-text-secondary">Active</span>
                                    )}

                                </Button>
                            ))}
                        </div>
                    )}

                </div>
            </div>


            {/* Product Grid */}
            <div className="flex-1 mx-2">
                <div className="grid gap-2 sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
                    {tabData[activeTab]?.map((product) => (
                        <div key={product.id}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>


        </div>
    )
}

export default FeaturedTabs;