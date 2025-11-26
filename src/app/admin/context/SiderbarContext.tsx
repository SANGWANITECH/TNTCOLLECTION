'use client'

import {useContext, createContext} from "react";

interface ContextTypes {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (isSidebarOpen: boolean) => void;
}

export const SidebarContext = createContext<ContextTypes>({isSidebarOpen: false});

export const useSidebarContext = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebarContext must be used within the sidebarProvider!');
    }
    return context;
}