import { createClient } from '@/utils/supabase/server'

export default async function SearchPage({
                                             searchParams,
                                         }: {
    searchParams: Promise<{ q: string }>
}) {
    const query = (await searchParams).q
    const supabase = await createClient()

    // Use .textSearch for the broad Title + Description match
    const { data: products } = await supabase
        .from('products')
        .select('*')
        .textSearch('fts', query, {
            type: 'websearch',
            config: 'english'
        })

    return (
        <div className="p-8 mt-20">
            <h1 className="text-2xl font-bold mb-6">Results for "{query}"</h1>
            {products && products.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {/* Map your product cards here like in your products page */}
                </div>
            ) : (
                <p>No products found matching your search.</p>
            )}
        </div>
    )
}
