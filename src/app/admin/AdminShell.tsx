"use client"
import Link from 'next/link'

export default function AdminShell({ children }: { children: React.ReactNode }){
  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      <aside className="w-64 bg-white dark:bg-gray-800 border-r p-4">
        <div className="mb-6">
          <h3 className="text-lg font-bold">Admin</h3>
        </div>
        <nav className="flex flex-col gap-2">
          <Link href="/admin" className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Dashboard</Link>
          <Link href="/admin/categories" className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Categories</Link>
          <Link href="/admin/menu-items" className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Menu Items</Link>
          <Link href="/admin/tables" className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Tables</Link>
          <Link href="/admin/orders" className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Orders</Link>
          <form action="/api/admin/logout" method="post" className="mt-4">
            <button type="submit" className="w-full text-left px-3 py-2 rounded text-red-600 hover:bg-red-50">Logout</button>
          </form>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded shadow-sm p-4">
          {children}
        </div>
      </main>
    </div>
  )
}
