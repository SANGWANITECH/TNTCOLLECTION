'use client'

import { useState } from "react"
import { ChevronDown, ChevronUp, User, Check } from "lucide-react"
import { useTargetGroups } from "@/app/admin/hooks/useTargetGroups";

export default function ToggleTargetGroup() {
    const { tabs, selectedTargetGroup, setSelectedTargetGroup } = useTargetGroups()
    const [open, setOpen] = useState(false)

    return (
        <div className="card w-full p-2 rounded-xl relative">
            {/* Header */}
            <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setOpen(prev => !prev)}
            >
                <p className="flex gap-2 items-center font-medium">
                    <User className="w-4 h-4" />
                    <span className="text-sm">{selectedTargetGroup || "Groups"}</span>
                </p>
                {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>

            {/* Dropdown */}
            {open && (
                <div className="card flex flex-col gap-1 mt-2 absolute left-0 right-0 top-8 z-20
                        bg-card dark:bg-card rounded-xl shadow-xl p-2
                        lg:static lg:shadow-none lg:p-0 lg:bg-transparent">
                    {tabs.map(tab => {
                        const isActive = selectedTargetGroup === tab.id
                        return (
                            <label
                                key={tab.id}
                                className={`card flex items-center justify-between w-full p-2 rounded-lg cursor-pointer transition border
                  ${isActive
                                    ? "bg-primary/20 border-primary text-primary"
                                    : "border-gray-500/20 hover:bg-gray-200/20 dark:hover:bg-gray-700/30"}
                `}
                                onClick={() => {
                                    setSelectedTargetGroup(tab.id)
                                    setOpen(false)
                                }}
                            >
                                <span className="text-sm">{tab.label}</span>
                                {isActive && <Check className="w-4 h-4" />}
                            </label>
                        )
                    })}
                </div>
            )}
        </div>
    )
}