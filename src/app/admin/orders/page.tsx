"use client"
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Order, OrderItem, OrderStatus } from '../../../types'

function fmtDate(s: string){
  try{ return new Date(s).toLocaleString() }catch{ return s }
}

function fmtCurrency(v?: number | null){
  if (v == null) return '—'
  return v.toLocaleString(undefined, { style: 'currency', currency: 'EUR' })
}

export default function AdminOrders(){
  const router = useRouter()
  const [list, setList] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<Record<number, boolean>>({})

  const load = useCallback(async ()=>{
    try{
      const res = await fetch('/api/admin/orders')
      if (res.status === 401) { router.push('/login'); return }
      if (res.ok) setList(await res.json())
      else console.error('Failed to load orders', res.status)
    }finally{ setLoading(false) }
  }, [router])

  useEffect(()=>{ void load() }, [load])

  async function updateStatus(id:number, status: OrderStatus){
    const res = await fetch('/api/admin/orders', { method: 'PATCH', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ id, status }) })
    if (res.status === 401) { router.push('/login'); return }
    if (res.ok) { await load() }
    else { const txt = await res.text(); alert('Erreur update: '+txt) }
  }

  async function setTotal(id:number, totalStr:string){
    const total = parseFloat(totalStr || '0')
    if (Number.isNaN(total)) { alert('Total invalide'); return }
    const res = await fetch('/api/admin/orders', { method: 'PATCH', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ id, total }) })
    if (res.status === 401) { router.push('/login'); return }
    if (res.ok) { await load() }
    else { const txt = await res.text(); alert('Erreur update: '+txt) }
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Orders</h2>

      <div className="mb-4 flex items-center justify-between">
        <div />
        <button onClick={()=>void load()} className="px-3 py-2 border rounded">Refresh</button>
      </div>

      {loading ? <div>Chargement...</div> : (
        <div className="grid gap-3">
          {list.map(o => (
            <div key={o.id} className="p-3 border rounded bg-white dark:bg-gray-800">
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1">
                  <div className="font-semibold">Order #{o.id} — Table {o.tableNumber}</div>
                  <div className="text-sm text-gray-600">{fmtDate(String(o.createdAt))}</div>
                </div>

                <div className="flex items-center gap-2">
                  <select value={o.status} onChange={e=>void updateStatus(o.id, e.target.value as OrderStatus)} className="border px-2 py-1">
                    <option value="pending">pending</option>
                    <option value="processing">processing</option>
                    <option value="completed">completed</option>
                    <option value="cancelled">cancelled</option>
                  </select>

                  <div className="text-sm">Total: {fmtCurrency(o.total ?? undefined)}</div>

                  <button onClick={()=>setExpanded(s => ({ ...s, [o.id]: !s[o.id] }))} className="px-2 py-1 border rounded">{expanded[o.id] ? 'Hide' : 'Details'}</button>
                </div>
              </div>

              {expanded[o.id] && (
                <div className="mt-3 border-t pt-3">
                  <div className="grid gap-2">
                    <div className="text-sm">Items:</div>
                    <div className="grid gap-1">
                      {(o.orderItems || []).map((it: OrderItem) => (
                        <div key={it.id} className="flex items-center justify-between">
                          <div className="text-sm">MenuItem #{it.menuItemId} × {it.quantity}</div>
                          <div className="text-sm text-gray-600">Subtotal: {fmtCurrency(it.subtotal ?? undefined)}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <label className="text-sm">Set total:</label>
                      <TotalEditor order={o} onSave={setTotal} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function TotalEditor({ order, onSave }: { order: Order, onSave: (id:number, total:string)=>void }){
  const [val, setVal] = useState(order.total ? String(order.total) : '')
  return (
    <div className="flex items-center gap-2">
      <input className="border px-2 py-1" value={val} onChange={e=>setVal(e.target.value)} placeholder="e.g. 12.50" />
      <button onClick={()=>onSave(order.id, val)} className="px-3 py-1 bg-amber-600 text-white rounded">Save</button>
    </div>
  )
}
