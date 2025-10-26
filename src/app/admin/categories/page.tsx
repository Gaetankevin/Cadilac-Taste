"use client"
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { Category } from '../../../types'

type EditorValues = { name: string; description: string; imageUrl: string; isAvailable: boolean }

export default function AdminCategories(){
  const router = useRouter()
  const [list, setList] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ name: '', description: '', imageUrl: '', isAvailable: true })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingValues, setEditingValues] = useState<EditorValues>({ name: '', description: '', imageUrl: '', isAvailable: true })
  const [showCreateModal, setShowCreateModal] = useState(false)

  const load = useCallback(async ()=>{
    try{
      const res = await fetch('/api/admin/categories')
      if (res.status === 401) {
        // not logged in as admin -> redirect to login (global login page at /login)
        router.push('/login')
        return
      }
      if (res.ok) {
        setList(await res.json())
      } else {
        console.error('Admin categories fetch failed', res.status)
      }
    }finally{
      setLoading(false)
    }
  }, [router])

  useEffect(()=>{ void load() }, [])

  async function create(){
    const payload = { name: form.name, description: form.description || null, imageUrl: form.imageUrl || null, isAvailable: form.isAvailable }
    const res = await fetch('/api/admin/categories', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) })
    if (res.ok){ setForm({ name: '', description: '', imageUrl: '', isAvailable: true }); await load() }
    else {
      const txt = await res.text()
      alert('Erreur création: ' + txt)
    }
  }

  function startEdit(c: Category){
    setEditingId(c.id)
    setEditingValues({ name: c.name, description: c.description ?? '', imageUrl: c.imageUrl ?? '', isAvailable: c.isAvailable })
  }

  async function saveEdit(){
    if (editingId == null) return
    const body: Record<string, unknown> = { id: editingId, ...editingValues }
    const res = await fetch('/api/admin/categories', { method: 'PATCH', headers: {'Content-Type':'application/json'}, body: JSON.stringify(body) })
    if (res.ok){ setEditingId(null); setEditingValues({ name: '', description: '', imageUrl: '', isAvailable: true }); await load() }
    else alert('Erreur update')
  }

  async function remove(id:number){
    if (!confirm('Supprimer ?')) return
    const res = await fetch('/api/admin/categories', { method: 'DELETE', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ id }) })
    if (res.ok) await load()
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Categories</h2>

      <div className="mb-6 flex items-center justify-between">
        <div />
        <button onClick={()=>setShowCreateModal(true)} className="bg-amber-600 text-white px-4 py-2 rounded">Créer une catégorie</button>
      </div>

      {loading ? <div>Chargement...</div> : (
        <div className="grid gap-2">
          {list.map(c => (
            <div key={c.id} className="p-3 border rounded flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div className="flex-1">
                {editingId === c.id ? (
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                    <input className="border px-2 py-1" value={editingValues.name} onChange={e=>setEditingValues(ev=>({ ...ev, name: e.target.value }))} />
                    <input className="border px-2 py-1" value={editingValues.imageUrl} onChange={e=>setEditingValues(ev=>({ ...ev, imageUrl: e.target.value }))} />
                    <label className="flex items-center gap-2"><input type="checkbox" checked={editingValues.isAvailable} onChange={e=>setEditingValues(ev=>({ ...ev, isAvailable: e.target.checked }))} /> Disponible</label>
                    <textarea className="border p-2 md:col-span-4" value={editingValues.description} onChange={e=>setEditingValues(ev=>({ ...ev, description: e.target.value }))} />
                  </div>
                ) : (
                  <div>
                    <div className="font-semibold">{c.name} {c.isAvailable ? <span className="text-sm text-green-600">(disponible)</span> : <span className="text-sm text-red-600">(indisponible)</span>}</div>
                    {c.description && <div className="text-sm text-gray-600">{c.description}</div>}
                    {c.imageUrl && <div className="text-sm text-gray-500">Image: {c.imageUrl}</div>}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                {editingId === c.id ? (
                  <>
                    <button onClick={()=>void saveEdit()} className="bg-green-600 text-white px-3 py-1 rounded">Save</button>
                    <button onClick={()=>{ setEditingId(null); setEditingValues({ name: '', description: '', imageUrl: '', isAvailable: true }) }} className="px-3 py-1">Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={()=>startEdit(c)} className="px-3 py-1 border rounded">Edit</button>
                    <button onClick={()=>remove(c.id)} className="px-3 py-1 text-red-600">Delete</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Create modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={()=>setShowCreateModal(false)} />
          <div className="relative bg-white dark:bg-gray-800 rounded shadow-lg p-6 w-full max-w-xl z-10">
            <h3 className="text-lg font-semibold mb-4">Créer une catégorie</h3>
            <div className="grid gap-2">
              <input className="border px-3 py-2" value={form.name} onChange={e=>setForm(s=>({ ...s, name: e.target.value }))} placeholder="Nom *" />
              <input className="border px-3 py-2" value={form.imageUrl} onChange={e=>setForm(s=>({ ...s, imageUrl: e.target.value }))} placeholder="Image URL" />
              <textarea className="border p-2" value={form.description} onChange={e=>setForm(s=>({ ...s, description: e.target.value }))} placeholder="Description (optionnel)" />
              <label className="flex items-center gap-2"><input type="checkbox" checked={form.isAvailable} onChange={e=>setForm(s=>({ ...s, isAvailable: e.target.checked }))} /> Disponible</label>
              <div className="flex justify-end gap-2 mt-2">
                <button className="px-3 py-2" onClick={()=>setShowCreateModal(false)}>Annuler</button>
                <button onClick={async ()=>{ if (!form.name.trim()){ alert('Le nom est requis'); return } await create(); setShowCreateModal(false) }} className="bg-amber-600 text-white px-4 py-2 rounded">Créer</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
