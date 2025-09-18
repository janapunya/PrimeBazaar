import React, { useState } from 'react'



export default function Curt() {
  const [items, setItems] = useState([
    {
      id: 1,
      title: 'One Science',
      price: 500,
      qty: 1,
      img: 'https://ik.imagekit.io/punya/Primebazaar/604929c6-b9f2-4679-90e5-007b78315445_YFrHDz2xo',
      discount: 10,
      productDetails: 'black T-shirt',
      email: 'punyabrata900@gmail.com'
    }
  ])

  const format = (n) => {
    return n.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })
  }

  const changeQty = (id, delta) => {
    setItems(prev => prev.map(it => it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it))
  }

  const setQty = (id, value) => {
    const v = parseInt(value || '0', 10)
    if (isNaN(v)) return
    setItems(prev => prev.map(it => it.id === id ? { ...it, qty: Math.max(1, v) } : it))
  }

  const removeItem = (id) => {
    setItems(prev => prev.filter(it => it.id !== id))
  }

  const subtotal = (it) => it.price * it.qty
  const itemsCount = items.reduce((s, it) => s + it.qty, 0)
  const total = items.reduce((s, it) => s + subtotal(it), 0)

  const placeOrder = () => {
    if (items.length === 0) {
      alert('Your cart is empty.')
      return
    }
    const summary = items.map(it => `${it.title} × ${it.qty} = ${format(subtotal(it))}`).join('\n')
    alert(`Order placed!\n\nItems:\n${summary}\n\nTotal: ${format(total)}`)

    setItems([])
  }

  return (
    <div className="min-h-screen p-4 bg-gray-50 flex items-start justify-center">
      <div className="w-full max-w-6xl">
        <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product list (takes 2 columns on large screens) */}
          <div className="lg:col-span-2 space-y-4">
            {items.length === 0 ? (
              <div className="p-6 bg-white rounded-lg shadow text-center">Your cart is empty.</div>
            ) : (
              items.map(item => (
                <div key={item.id} className="flex gap-4 items-center p-4 bg-white rounded-lg shadow sm:flex-row flex-col">
                  <img src={item.img} alt={item.title} className="w-28 h-28 object-cover rounded-md flex-shrink-0" />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-medium truncate">{item.title}</h3>
                      <div className="text-sm font-semibold">{format(item.price)}</div>
                    </div>

                    <p className="text-sm text-gray-500 mt-1">Subtotal: <span className="font-medium">{format(subtotal(item))}</span></p>

                    <div className="mt-3 flex items-center gap-3">
                      {/* Quantity controls */}
                      <div className="inline-flex items-center border rounded-md overflow-hidden">
                        <button aria-label="decrease" onClick={() => changeQty(item.id, -1)} className="px-3 py-1 text-lg leading-none">−</button>
                        <input
                          aria-label="quantity"
                          className="w-14 text-center py-1 outline-none"
                          value={item.qty}
                          onChange={(e) => setQty(item.id, e.target.value)}
                        />
                        <button aria-label="increase" onClick={() => changeQty(item.id, +1)} className="px-3 py-1 text-lg leading-none">+</button>
                      </div>

                      <button onClick={() => removeItem(item.id)} className="text-sm px-3 py-1 rounded-md hover:bg-gray-100">Remove</button>

                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <aside className="bg-white rounded-lg shadow p-4 sticky top-6">
            <h4 className="text-lg font-medium">Order Summary</h4>

            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Items</span>
                <span>{itemsCount}</span>
              </div>

              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span>{items.length ? 'Calculated at checkout' : '-'}</span>
              </div>

              <div className="flex justify-between text-base font-semibold border-t pt-3 mt-3">
                <span>Total</span>
                <span>{format(total)}</span>
              </div>
            </div>

            <button
              onClick={placeOrder}
              disabled={items.length === 0}
              className={`mt-4 w-full py-2 rounded-md text-white font-medium ${items.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
              Place Order
            </button>

            <button
              onClick={() => setItems([])}
              disabled={items.length === 0}
              className="mt-3 w-full py-2 rounded-md border border-gray-200 text-sm">
              Clear Cart
            </button>

            <div className="mt-4 text-xs text-gray-500">
              Tip: Increase quantity using + and − buttons or type directly into the quantity box.
            </div>
          </aside>
        </div>

        {/* Mobile sticky footer summary */}
        <div className="fixed left-0 right-0 bottom-0 p-3 bg-white border-t lg:hidden">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">{itemsCount} item(s)</div>
              <div className="font-semibold">{format(total)}</div>
            </div>
            <button
              onClick={placeOrder}
              disabled={items.length === 0}
              className={`ml-4 px-4 py-2 rounded-md text-white font-medium ${items.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
