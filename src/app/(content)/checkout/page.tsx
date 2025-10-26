"use client"
import { useState } from 'react'
import { useCart } from '@/lib/cart'
import { useRouter } from 'next/navigation'

export default function CheckoutPage(){
  const { items, total, clear } = useCart()
  const [tableNumber, setTableNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function submit(){
    if (!tableNumber) return alert('Veuillez entrer un numéro de table')
    setLoading(true)
    const payload = { tableNumber: Number(tableNumber), items: items.map(i=>({ menuItemId: i.menuItem.id, quantity: i.quantity, price: i.menuItem.price })) }
    try{
      const res = await fetch('/api/orders', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(payload) })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Erreur')
      clear()
      router.push(`/order/${json.order.id}`)
    }catch(e: unknown){
  const msg = typeof e === 'object' && e && 'message' in e ? (e as { message?: string }).message : String(e)
      alert(msg || 'Erreur')
    }finally{ setLoading(false) }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Finaliser la commande</h1>
      {items.length === 0 ? (
        <div>Ton panier est vide.</div>
      ) : (
        <div className="space-y-4">
          <div>
            {items.map(it=> (
              <div key={it.menuItem.id} className="flex justify-between">{it.menuItem.name} x{it.quantity} <span>{Math.round(Number(it.menuItem.price)*it.quantity)} FCFA</span></div>
            ))}
          </div>
          <div className="font-bold">Total: {Math.round(total)} FCFA</div>

          <div className="mt-4">
            <label className="block mb-2">Numéro de table</label>
            <input value={tableNumber} onChange={e=>setTableNumber(e.target.value)} className="border px-3 py-2 rounded w-40" />
          </div>

          <div className="mt-4">
            <button onClick={submit} disabled={loading} className="bg-amber-600 text-white px-4 py-2 rounded">{loading ? 'Envoi...' : 'Confirmer la commande'}</button>
          </div>
        </div>
      )}
    </div>
  )
}
