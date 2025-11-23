import { createBrowserClient } from '@supabase/ssr'

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
)

export default async function TestPage() {
  const { data, error } = await supabase.from('test_items').select('*')

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <h1>Test Items</h1>
      <ul>
        {data?.map(item => (
          <li key={item.id}>{item.name} ({item.created_at})</li>
        ))}
      </ul>
    </div>
  )
}