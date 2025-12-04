export default async function AdminDashboardPage() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/fetchproducts`);

    const products = await res.json();

    console.log(products);
    return (
        <div>
            Admin Dashboard Page
        </div>
    );
}