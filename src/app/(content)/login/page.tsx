"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function submit(e: React.FormEvent){
    e.preventDefault()
    setLoading(true)
    try{
      const res = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type':'application/json'}, body: JSON.stringify({ email, password }) })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Invalid')
      router.push('/admin')
  }catch{ alert('Login failed') }finally{ setLoading(false) }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h1 className="text-xl font-semibold mb-4">Admin Login</h1>
      <form onSubmit={submit} className="space-y-3">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full border px-3 py-2 rounded" />
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="w-full border px-3 py-2 rounded" />
        <button disabled={loading} className="w-full bg-amber-600 text-white py-2 rounded">{loading ? '...' : 'Login'}</button>
      </form>
    </div>
  )
}
