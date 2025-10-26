"use client"
import { useEffect, useState } from 'react'
import type { MenuItem as MenuItemType, Category } from '../../../types'

type AdminMenuItem = MenuItemType & { price: string | number; categoryId?: number | null }
type EditorValues = { name: string; description: string; price: string; imageUrl: string; categoryId: string; isAvailable: boolean }

export default function AdminMenuItems(){
  const [items, setItems] = useState<AdminMenuItem[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  const [form, setForm] = useState({ name:'', description:'', price:'', imageUrl:'', categoryId: '' as string, isAvailable: true })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingValues, setEditingValues] = useState<EditorValues>({ name:'', description:'', price:'', imageUrl:'', categoryId:'', isAvailable: true })

  async function load(){
    setLoading(true)
    try{
      const [resItems, resCats] = await Promise.all([
        fetch('/api/admin/menu-items'),
        fetch('/api/admin/categories'),
      ])
      if (resItems.ok) setItems(await resItems.json())
      if (resCats.ok) setCategories(await resCats.json())
    }finally{ setLoading(false) }
  }

  useEffect(()=>{ void load() }, [])

  async function createItem(e?: Event){
    e?.preventDefault()
    const payload = {
      name: form.name,
      description: form.description,
      price: form.price,
      imageUrl: form.imageUrl || null,
      categoryId: form.categoryId ? Number(form.categoryId) : undefined,
      isAvailable: form.isAvailable,
    }
    const res = await fetch('/api/admin/menu-items', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) })
    if (res.ok){ setForm({ name:'', description:'', price:'', imageUrl:'', categoryId:'', isAvailable:true }); await load() }
    else {
      const txt = await res.text()
      alert('Erreur création: ' + txt)
    }
  }

  function startEdit(item: MenuItemType){
    setEditingId(item.id)
  setEditingValues({ name: item.name, description: item.description ?? '', price: String(item.price), imageUrl: item.imageUrl ?? '', categoryId: String(item.categoryId ?? ''), isAvailable: item.isAvailable })
  }

  async function saveEdit(){
    if (editingId == null) return
  const body: Record<string, unknown> = { id: editingId }
  Object.assign(body, editingValues)
    const res = await fetch('/api/admin/menu-items', { method: 'PATCH', headers: {'Content-Type':'application/json'}, body: JSON.stringify(body) })
  if (res.ok){ setEditingId(null); setEditingValues({ name:'', description:'', price:'', imageUrl:'', categoryId:'', isAvailable: true }); await load() }
    else alert('Erreur update')
  }

  async function removeItem(id:number){
    if (!confirm('Supprimer cet item ?')) return
    const res = await fetch('/api/admin/menu-items', { method: 'DELETE', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ id }) })
    if (res.ok) await load()
    else alert('Erreur suppression')
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Menu Items</h2>

      <form onSubmit={(e)=>{ e.preventDefault(); void createItem(e.nativeEvent) }} className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-2">
        <input required value={form.name} onChange={e=>setForm(s=>({ ...s, name: e.target.value }))} placeholder="Nom" className="border px-3 py-2" />
        <input required value={form.price} onChange={e=>setForm(s=>({ ...s, price: e.target.value }))} placeholder="Prix" className="border px-3 py-2" />
        <select value={form.categoryId} onChange={e=>setForm(s=>({ ...s, categoryId: e.target.value }))} className="border px-3 py-2">
          <option value="">-- Catégorie --</option>
          {categories.map(c => <option key={c.id} value={String(c.id)}>{c.name}</option>)}
        </select>
        <input value={form.imageUrl} onChange={e=>setForm(s=>({ ...s, imageUrl: e.target.value }))} placeholder="Image URL" className="border px-3 py-2 md:col-span-2" />
        <input value={form.description} onChange={e=>setForm(s=>({ ...s, description: e.target.value }))} placeholder="Description" className="border px-3 py-2 md:col-span-2" />
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2"><input type="checkbox" checked={form.isAvailable} onChange={e=>setForm(s=>({ ...s, isAvailable: e.target.checked }))} /> Disponible</label>
          <button type="submit" className="ml-auto bg-amber-600 text-white px-3 py-2 rounded">Créer</button>
        </div>
      </form>

      {loading ? <div>Chargement...</div> : (
        <div className="grid gap-2">
          {items.map(item => (
            <div key={item.id} className="p-3 border rounded flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div className="flex-1">
                {editingId === item.id ? (
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                    <input className="border px-2 py-1" value={editingValues.name || ''} onChange={e=>setEditingValues(ev=>({ ...ev, name: e.target.value }))} />
                    <input className="border px-2 py-1" value={editingValues.price || ''} onChange={e=>setEditingValues(ev=>({ ...ev, price: e.target.value }))} />
                    <select className="border px-2 py-1" value={editingValues.categoryId || ''} onChange={e=>setEditingValues(ev=>({ ...ev, categoryId: e.target.value }))}>
                      <option value="">-- Cat --</option>
                      {categories.map(c => <option key={c.id} value={String(c.id)}>{c.name}</option>)}
                    </select>
                    <label className="flex items-center gap-2"><input type="checkbox" checked={!!editingValues.isAvailable} onChange={e=>setEditingValues(ev=>({ ...ev, isAvailable: e.target.checked }))} /> Avail</label>
                    <input className="border px-2 py-1 md:col-span-4" value={editingValues.description || ''} onChange={e=>setEditingValues(ev=>({ ...ev, description: e.target.value }))} />
                  </div>
                ) : (
                  <div>
                    <div className="font-semibold">{item.name} <span className="text-sm text-gray-500">({String(item.price)} FCFA)</span></div>
                    <div className="text-sm text-gray-600">{item.description}</div>
                    <div className="text-sm text-gray-500">Cat: {String(item.categoryId ?? '-')}</div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                {editingId === item.id ? (
                  <>
                    <button onClick={()=>void saveEdit()} className="bg-green-600 text-white px-3 py-1 rounded">Save</button>
                    <button onClick={()=>{ setEditingId(null); setEditingValues({ name:'', description:'', price:'', imageUrl:'', categoryId:'', isAvailable: true }) }} className="px-3 py-1">Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={()=>startEdit(item)} className="px-3 py-1 border rounded">Edit</button>
                    <button onClick={()=>void removeItem(item.id)} className="px-3 py-1 text-red-600">Delete</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
