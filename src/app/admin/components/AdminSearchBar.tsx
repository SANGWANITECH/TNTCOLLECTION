'use client'
import { NextPage } from "next";
import { Search } from "lucide-react";
import InputField from "@/components/Inputfield";
import { useState } from "react";

const AdminSearchBar: NextPage = () => {

    const [search, setSearch] = useState('');

    const handleSearch = (e:React.FormEvent) =>{
        e.preventDefault();

        alert(`The form is submitted! ${search}`);
    }
    return(
        <div className={'w-full '}>
            <form onSubmit={handleSearch}>
                <div className="flex items-center">
                    <Search
                        onClick={handleSearch}
                        className="z-10 w-5 h-5"/>
                    <InputField
                        required = {false}
                        type="search"
                        value={search}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                        placeholder="search products..."
                        className="ml-[-28px] w-full pl-[28px]"
                    />
                </div>
            </form>
        </div>
    )
}

export default AdminSearchBar;