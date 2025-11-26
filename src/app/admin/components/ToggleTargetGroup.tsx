'use client'

import { useFilterCategory } from "@/app/admin/context/FilterCategoryContext";

export default function ToggleTargetGroup() {
    const {
        products,
        selectedTargetGroup,
        setSelectedTargetGroup,

    } = useFilterCategory();

    // Unique target groups
    const targetGroups = Array.from(new Set(products.map(p => p.target_group)));

    return (
        <div>
            <select
                value={selectedTargetGroup}
                onChange={(e) => setSelectedTargetGroup(e.target.value)}
                className={'card w-full dark:bg-white  bg-background-color-dark dark:text-text-primary text-white'}
            >
                <option value="" className={'card'}>All </option>
                {targetGroups.map((group) => (
                    <option key={group} value={group} className={'card'}>
                        {group}
                    </option>
                ))}
            </select>
        </div>
    );
}