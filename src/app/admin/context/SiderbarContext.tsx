import { createContext, useContext } from "react";

interface ContextTypes {
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SidebarContext = createContext<ContextTypes | undefined>(undefined);

export const useSidebarContext = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebarContext must be used within the SidebarProvider!");
    }
    return context;
};