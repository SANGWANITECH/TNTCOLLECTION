import { createClient } from '@/utils/supabase/server'
import ProductCard from '@/components/ProductCard' // Use your existing card component

export default async function SearchResultPage({
                                                   params,
                                               }: {
    params: Promise<{ query: string }>
}) {
    // In Next.js 15, params is a Promise
    const { query } = await params;
    const decodedQuery = decodeURIComponent(query);
    const supabase = await createClient();

    // Search using the 'fts' (Full Text Search) column created earlier
    const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .textSearch('fts', decodedQuery, {
            type: 'websearch',
            config: 'english'
        })
        .order('created_at', { ascending: false }); // Change this to false for descending

    if (error) {
        return <div className="p-20 text-center">Error fetching results.</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-20 min-h-screen">
            <div className="mb-10">
                <h1 className="text-lg md:text-3xl font-bold font-heading">
                    Search results for: <span className="text-accent">"{decodedQuery}"</span>
                </h1>
                <p className="text-muted-foreground mt-2">
                    Found {products?.length || 0} products
                </p>
            </div>

            {products && products.length > 0 ? (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-border-dark rounded-xl">
                    <p className="text-xl font-medium">No matches found.</p>
                    <p className="text-muted-foreground">Try checking for typos or use broader terms.</p>
                </div>
            )}
        </div>
    );
}
