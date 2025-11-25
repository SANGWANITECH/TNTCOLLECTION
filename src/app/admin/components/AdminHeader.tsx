import { Menu, UserRoundIcon } from "lucide-react";
import {ModeToggle} from "@/components/theme-toggle";

export default function AdminHeader() {
    return (
        <div>
            <div>
                <Menu/>
                <h1>T&T</h1>
            </div>

            <div>
                <ModeToggle />
                <UserRoundIcon/>
            </div>
        </div>
    )
}