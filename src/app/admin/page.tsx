import Link from 'next/link'

export default function AdminIndex(){
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/admin/categories" className="p-4 border rounded hover:shadow">Categories</Link>
        <Link href="/admin/menu-items" className="p-4 border rounded hover:shadow">Menu Items</Link>
        <Link href="/admin/tables" className="p-4 border rounded hover:shadow">Tables</Link>
        <Link href="/admin/orders" className="p-4 border rounded hover:shadow">Orders</Link>
      </div>
    </div>
  )
}
