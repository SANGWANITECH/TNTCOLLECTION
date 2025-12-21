'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { Search, Loader2 } from 'lucide-react'

export default function SearchInput() {
    const [query, setQuery] = useState('')
    const [suggestions, setSuggestions] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const supabase = createClient()
    const router = useRouter()
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setShowDropdown(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Suggestion Logic (Triggers while typing)
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (query.length < 2) {
                setSuggestions([])
                return
            }
            setLoading(true)

            // Search titles using ilike for suggestions
            const { data } = await supabase
                .from('products')
                .select('id, name, price')
                .ilike('name', `%${query}%`)
                .limit(5)

            setSuggestions(data || [])
            setLoading(false)
            setShowDropdown(true)
        }

        const debounce = setTimeout(fetchSuggestions, 300)
        return () => clearTimeout(debounce)
    }, [query])

    const handleSearch = (e?: React.FormEvent) => {
        e?.preventDefault()
        if (!query.trim()) return
        setShowDropdown(false)
        router.push(`/tnt/search?q=${encodeURIComponent(query)}`)
    }

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <form onSubmit={handleSearch} className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.length > 1 && setShowDropdown(true)}
                    placeholder="Search products..."
                    className="w-full px-3 py-2 pl-10 rounded-lg border border-border-light dark:border-border-dark bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                {loading && <Loader2 className="absolute right-3 top-2.5 w-4 h-4 animate-spin text-muted-foreground" />}
            </form>

            {/* Suggestions Dropdown */}
            {showDropdown && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border-light dark:border-border-dark rounded-lg shadow-xl overflow-hidden z-[100]">
                    {suggestions.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                router.push(`/tnt/search`)
                                setShowDropdown(false)
                            }}
                            className="w-full text-left px-4 py-3 hover:bg-accent/10 flex justify-between items-center border-b last:border-0 border-border-light dark:border-border-dark"
                        >
                            <span className="text-sm font-medium truncate">{item.name}</span>
                            <span className="text-xs text-muted-foreground">MKW {item.price.toLocaleString()}</span>
                        </button>
                    ))}
                    <button
                        onClick={() => handleSearch()}
                        className="w-full py-2 bg-accent/5 text-accent text-xs font-semibold hover:bg-accent/10"
                    >
                        See all results for "{query}"
                    </button>
                </div>
            )}
        </div>
    )
}
