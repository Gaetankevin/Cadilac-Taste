"use client"
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { RestaurantTable } from '../../../types'

export default function AdminTables(){
  const router = useRouter()
  const [list, setList] = useState<RestaurantTable[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [form, setForm] = useState({ number: '', isAvailable: true })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingValues, setEditingValues] = useState({ number: '', isAvailable: true })

  const load = useCallback(async ()=>{
    try{
      const res = await fetch('/api/admin/tables')
      if (res.status === 401) { router.push('/login'); return }
      if (res.ok) setList(await res.json())
      else console.error('Failed to load tables', res.status)
    }finally{ setLoading(false) }
  }, [router])

  useEffect(()=>{ void load() }, [load])

  async function create(){
    if (!form.number.trim()){ alert('Le numéro est requis'); return }
    const payload = { number: Number(form.number), isAvailable: form.isAvailable }
    const res = await fetch('/api/admin/tables', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) })
    if (res.ok){ setForm({ number: '', isAvailable: true }); setShowCreateModal(false); await load() }
    else { const txt = await res.text(); alert('Erreur création: '+txt) }
  }

  function startEdit(t: RestaurantTable){
    setEditingId(t.id)
    setEditingValues({ number: String(t.number), isAvailable: t.isAvailable })
  }

  async function saveEdit(){
    if (editingId == null) return
    const body = { id: editingId, number: Number(editingValues.number), isAvailable: editingValues.isAvailable }
    const res = await fetch('/api/admin/tables', { method: 'PATCH', headers: {'Content-Type':'application/json'}, body: JSON.stringify(body) })
    if (res.ok){ setEditingId(null); setEditingValues({ number: '', isAvailable: true }); await load() }
    else { const txt = await res.text(); alert('Erreur update: '+txt) }
  }

  async function remove(id:number){
    if (!confirm('Supprimer la table ?')) return
    const res = await fetch('/api/admin/tables', { method: 'DELETE', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ id }) })
    if (res.ok) await load()
    else { const txt = await res.text(); alert('Erreur suppression: '+txt) }
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Tables</h2>

      <div className="mb-6 flex items-center justify-between">
        <div />
        <button onClick={()=>setShowCreateModal(true)} className="bg-amber-600 text-white px-4 py-2 rounded">Créer une table</button>
      </div>

      {loading ? <div>Chargement...</div> : (
        <div className="grid gap-2">
          {list.map(t => (
            <div key={t.id} className="p-3 border rounded flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div className="flex-1">
                {editingId === t.id ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <input className="border px-2 py-1" value={editingValues.number} onChange={e=>setEditingValues(ev=>({ ...ev, number: e.target.value }))} />
                    <label className="flex items-center gap-2"><input type="checkbox" checked={editingValues.isAvailable} onChange={e=>setEditingValues(ev=>({ ...ev, isAvailable: e.target.checked }))} /> Disponible</label>
                  </div>
                ) : (
                  <div>
                    <div className="font-semibold">Table #{t.number} {t.isAvailable ? <span className="text-sm text-green-600">(disponible)</span> : <span className="text-sm text-red-600">(occupée)</span>}</div>
                    <div className="text-sm text-gray-600">ID: {t.id}</div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                {editingId === t.id ? (
                  <>
                    <button onClick={()=>void saveEdit()} className="bg-green-600 text-white px-3 py-1 rounded">Save</button>
                    <button onClick={()=>{ setEditingId(null); setEditingValues({ number: '', isAvailable: true }) }} className="px-3 py-1">Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={()=>startEdit(t)} className="px-3 py-1 border rounded">Edit</button>
                    <button onClick={()=>remove(t.id)} className="px-3 py-1 text-red-600">Delete</button>
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
          <div className="relative bg-white dark:bg-gray-800 rounded shadow-lg p-6 w-full max-w-md z-10">
            <h3 className="text-lg font-semibold mb-4">Créer une table</h3>
            <div className="grid gap-2">
              <input className="border px-3 py-2" value={form.number} onChange={e=>setForm(s=>({ ...s, number: e.target.value }))} placeholder="Numéro de table *" />
              <label className="flex items-center gap-2"><input type="checkbox" checked={form.isAvailable} onChange={e=>setForm(s=>({ ...s, isAvailable: e.target.checked }))} /> Disponible</label>
              <div className="flex justify-end gap-2 mt-2">
                <button className="px-3 py-2" onClick={()=>setShowCreateModal(false)}>Annuler</button>
                <button onClick={async ()=>{ await create() }} className="bg-amber-600 text-white px-4 py-2 rounded">Créer</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
