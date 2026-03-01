import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BottomNav, PageHeader, TopNav, Icon } from '../components/UI'
import { useCart } from '../context/CartContext'

// ── CART ──────────────────────────────────────────────────────────
export function CartPage() {
  const navigate = useNavigate()
  const { cart, addToCart, removeFromCart, removeAllOfItem, cartTotal } = useCart()
  const [removeModal, setRemoveModal] = useState(null)
  const tax = Math.round(cartTotal * 0.05)
  const total = cartTotal + tax

  if (cart.length === 0) return (
    <div className="screen">
      <TopNav />
      <PageHeader title="Cart" />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 16, opacity: 0.3 }}>🛒</div>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Your cart is fresh and empty</h3>
        <p style={{ fontSize: 14, color: 'var(--text-light)' }}>Looks like you haven't added any farm-fresh goodness yet.</p>
        <button className="btn btn-primary mt-24" style={{ maxWidth: 240 }} onClick={() => navigate('/browse')}>Browse Products</button>
        <button className="btn btn-outline mt-8" style={{ maxWidth: 240 }} onClick={() => navigate('/home')}>Back to home</button>
      </div>
      <BottomNav />
    </div>
  )

  return (
    <div className="screen">
      <TopNav />
      <PageHeader title="Cart" />

      {cart.map(item => (
        <div key={item.id} className="cart-item">
          <div className="cart-item-img"><span style={{ fontSize: 32 }}>{item.emoji}</span></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{item.name}</div>
            <div style={{ fontSize: 13, color: 'var(--text-light)', marginTop: 2 }}>₹{item.price}/{item.unit}</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
              <div className="qty-control">
                <button className="qty-btn" onClick={() => removeFromCart(item.id)}>−</button>
                <span className="qty-num">{item.qty}</span>
                <button className="qty-btn" onClick={() => addToCart(item)}>+</button>
              </div>
              <button style={{ fontSize: 12, color: 'var(--red)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3, border: 'none', background: 'none', fontFamily: 'var(--font)' }}
                onClick={() => setRemoveModal(item)}>
                <Icon name="trash" size={12} color="var(--red)" /> Remove
              </button>
            </div>
          </div>
          <div style={{ fontWeight: 700, fontSize: 15, flexShrink: 0 }}>₹{item.price * item.qty}</div>
        </div>
      ))}

      {/* Promo */}
      <div style={{ display: 'flex', gap: 8, padding: 16 }}>
        <input style={{ flex: 1, padding: '12px 14px', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', fontFamily: 'var(--font)', fontSize: 14, outline: 'none' }}
          placeholder="Enter Promo Code" />
        <button className="btn btn-primary btn-sm" style={{ width: 'auto' }}>Apply</button>
      </div>

      {/* Summary */}
      <div className="order-summary-box">
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Order Summary</div>
        <div className="summary-row"><span>Subtotal</span><span>₹{cartTotal}</span></div>
        <div className="summary-row"><span>Tax (5%)</span><span>₹{tax}</span></div>
        <div className="summary-row total"><span>Total</span><span>₹{total}</span></div>
      </div>

      <div style={{ padding: 16 }}>
        <button className="btn btn-primary" onClick={() => navigate('/address')}>Proceed to Checkout</button>
      </div>

      {/* Remove Modal */}
      {removeModal && (
        <div className="modal-overlay" onClick={() => setRemoveModal(null)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="modal-handle" />
            <div style={{ fontSize: 17, fontWeight: 700, textAlign: 'center', marginBottom: 20 }}>Remove item from cart?</div>
            <div style={{ width: 80, height: 80, borderRadius: 12, background: 'var(--green-light)', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36 }}>
              {removeModal.emoji}
            </div>
            <div style={{ textAlign: 'center', fontSize: 14, color: 'var(--text-light)', marginBottom: 20 }}>{removeModal.name}</div>
            <button className="btn btn-red" onClick={() => { removeAllOfItem(removeModal.id); setRemoveModal(null) }}>
              <Icon name="trash" size={16} color="white" /> Remove
            </button>
            <button className="btn btn-outline mt-8" onClick={() => setRemoveModal(null)}>Cancel</button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  )
}

// ── ADDRESS ───────────────────────────────────────────────────────
export function AddressPage() {
  const navigate = useNavigate()
  const [saveDefault, setSaveDefault] = useState(false)

  return (
    <div className="screen">
      <PageHeader title="Add Delivery Address" />
      <div style={{ padding: 16 }}>
        <div style={{ width: '100%', height: 180, background: 'linear-gradient(135deg, #c8e6c9, #a5d6a7)', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, marginBottom: 20 }}>
          📍
        </div>
      </div>
      <div style={{ padding: '0 16px' }}>
        {[
          { label: 'Full Name', ph: 'Enter your full name', icon: 'user' },
          { label: 'Phone number', ph: 'Phone number', icon: 'phone' },
          { label: 'Address Line', ph: 'Flat, House no., Building', icon: null },
          { label: 'Colony, Street, Sector', ph: 'Colony, Street, Sector', icon: null },
          { label: '6-Digit Pincode', ph: '6-digit Pincode', icon: null },
        ].map((f, i) => (
          <div key={i}>
            {f.label && <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-mid)', display: 'block', marginBottom: 5, marginTop: 12 }}>{f.label}</label>}
            <div className="input-wrap" style={{ marginBottom: 0 }}>
              {f.icon && <span className="input-icon"><Icon name={f.icon} size={16} /></span>}
              <input className={`input-field ${!f.icon ? 'no-icon' : ''}`} placeholder={f.ph} />
            </div>
          </div>
        ))}

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', margin: '16px 0' }}
          onClick={() => setSaveDefault(!saveDefault)}>
          <div className={`checkbox ${saveDefault ? 'checked' : ''}`}>
            {saveDefault && <Icon name="check" size={12} color="white" />}
          </div>
          <span style={{ fontSize: 13 }}>Save as default delivery address</span>
        </div>

        <button className="btn btn-primary mb-16" onClick={() => navigate('/checkout')}>Save Address</button>
      </div>
    </div>
  )
}

// ── CHECKOUT ──────────────────────────────────────────────────────
export function CheckoutPage() {
  const navigate = useNavigate()
  const { cart, cartTotal } = useCart()
  const [delivery, setDelivery] = useState('fast')
  const [slot, setSlot] = useState('10:00 - 12:00')
  const tax = Math.round(cartTotal * 0.05)
  const deliveryFee = delivery === 'fast' ? 60 : 30
  const total = cartTotal + tax + deliveryFee
  const slots = ['10:00 - 12:00', '12:00 - 14:00', '14:00 - 16:00', '16:00 - 18:00', '18:00 - 20:00']

  return (
    <div className="screen">
      <PageHeader title="Checkout" />

      <div className="checkout-section">
        <div className="checkout-section-title">Delivery Address</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
          <div style={{ fontSize: 14, flex: 1 }}>123 Campus Lane, Block B, Gurugram, Haryana, 122018</div>
          <button style={{ fontSize: 13, color: 'var(--green-main)', fontWeight: 600, cursor: 'pointer', border: 'none', background: 'none', flexShrink: 0 }}
            onClick={() => navigate('/address')}>Change</button>
        </div>
      </div>

      <div className="checkout-section">
        <div className="checkout-section-title">Contact Information</div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 14 }}>Kshma Agrawal<br />78701 24825</div>
          <button style={{ fontSize: 13, color: 'var(--green-main)', fontWeight: 600, cursor: 'pointer', border: 'none', background: 'none' }}>Change</button>
        </div>
      </div>

      <div className="checkout-section">
        <div className="checkout-section-title">Delivery Options</div>
        <div style={{ display: 'flex', gap: 10 }}>
          {[{ id: 'fast', name: 'Fast Delivery', price: '₹60', time: '45-60 mins' }, { id: 'scheduled', name: 'Scheduled', price: 'Free & ₹30', time: 'Pick a slot' }].map(o => (
            <div key={o.id} className={`delivery-option ${delivery === o.id ? 'selected' : ''}`} onClick={() => setDelivery(o.id)}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{o.name}</div>
              <div style={{ fontSize: 12, color: 'var(--green-main)', marginTop: 2 }}>{o.price}</div>
              <div style={{ fontSize: 11, color: 'var(--text-light)' }}>{o.time}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 12, marginBottom: 8 }}>AVAILABLE SLOTS TODAY</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {slots.map(s => (
            <div key={s} className={`time-slot ${slot === s ? 'selected' : ''}`} onClick={() => setSlot(s)}>{s}</div>
          ))}
        </div>
      </div>

      <div className="checkout-section">
        <div className="checkout-section-title">Payment Method</div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 14 }}>Cash on Delivery</div>
          <button style={{ fontSize: 13, color: 'var(--green-main)', fontWeight: 600, cursor: 'pointer', border: 'none', background: 'none' }}
            onClick={() => navigate('/payment')}>Change</button>
        </div>
      </div>

      <div className="checkout-section">
        <div className="summary-row"><span>Subtotal</span><span>₹{cartTotal}</span></div>
        <div className="summary-row"><span>Tax</span><span>₹{tax}</span></div>
        <div className="summary-row"><span>Delivery</span><span>₹{deliveryFee}</span></div>
        <div className="summary-row total"><span>Total</span><span style={{ color: 'var(--green-dark)' }}>₹{total}</span></div>
      </div>

      <div style={{ padding: 16 }}>
        <button className="btn btn-primary" onClick={() => navigate('/payment')}>Place Order</button>
      </div>
    </div>
  )
}

// ── PAYMENT ───────────────────────────────────────────────────────
export function PaymentPage() {
  const navigate = useNavigate()
  const { cartTotal, clearCart } = useCart()
  const [selected, setSelected] = useState('cod')
  const total = cartTotal + 60

  const methods = [
    { id: 'cod', name: 'Cash on Delivery (COD)', desc: 'Pay when your order arrives', icon: '💵' },
    { id: 'upi', name: 'UPI (PhonePe/Google Pay)', desc: 'Fast and secure digital payment', icon: '📱' },
    { id: 'card', name: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay', icon: '💳' },
    { id: 'netbanking', name: 'Net Banking', desc: 'All major banks supported', icon: '🏦' },
  ]

  return (
    <div className="screen">
      <PageHeader title="Payment Method" />

      <div style={{ padding: '16px 16px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 15, color: 'var(--text-light)' }}>Total:</span>
        <span style={{ fontSize: 22, fontWeight: 700, color: 'var(--green-dark)' }}>₹{total}.50</span>
      </div>
      <p style={{ padding: '0 16px 12px', fontSize: 13, fontWeight: 700, color: 'var(--text-mid)' }}>Choose Payment Option</p>

      {methods.map(m => (
        <div key={m.id} className="payment-option" onClick={() => setSelected(m.id)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="payment-icon">{m.icon}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{m.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 2 }}>{m.desc}</div>
            </div>
          </div>
          <div className={`radio-outer ${selected === m.id ? 'selected' : ''}`}>
            {selected === m.id && <div className="radio-inner" />}
          </div>
        </div>
      ))}

      <div style={{ padding: 16 }}>
        <p style={{ fontSize: 12, color: 'var(--text-light)', textAlign: 'center', marginBottom: 12 }}>
          Your payment details are encrypted and secure.
        </p>
        <button className="btn btn-primary" onClick={() => { clearCart(); navigate('/order-confirm') }}>
          Confirm Payment Method
        </button>
      </div>
    </div>
  )
}

// ── ORDER CONFIRMATION ────────────────────────────────────────────
export function OrderConfirmPage() {
  const navigate = useNavigate()
  return (
    <div className="screen">
      <PageHeader title="Order Confirmation" onBack={() => navigate('/home')} />

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 24px 24px', textAlign: 'center' }}>
        <div style={{ width: 90, height: 90, borderRadius: '50%', background: 'var(--green-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, animation: 'popIn 0.5s ease' }}>
          <Icon name="check" size={40} color="white" strokeWidth={3} />
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--green-dark)' }}>
          Order Placed Successfully!
        </div>
        <div style={{ fontSize: 14, color: 'var(--text-light)', marginTop: 8 }}>
          Your Fresh Campus favorites are on their way to you
        </div>
      </div>

      <div style={{ margin: '0 16px 16px', background: 'var(--green-light)', borderRadius: 'var(--radius)', height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64 }}>
        🥗
      </div>

      <div style={{ margin: '0 16px', background: 'var(--bg)', borderRadius: 'var(--radius)', padding: 16 }}>
        {[
          { label: 'Order ID', val: '#FFC-89291' },
          { label: 'Amounts Paid', val: '₹42.59', green: true },
          { label: 'Delivery Address', val: '123 University Hall, Campus Exit' },
          { label: 'Estimated Arrival', val: 'Today, 5:30 PM', green: true },
        ].map(r => (
          <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
            <span style={{ color: 'var(--text-light)' }}>{r.label}</span>
            <span style={{ fontWeight: 600, color: r.green ? 'var(--green-main)' : 'var(--text-dark)', textAlign: 'right', maxWidth: 200 }}>{r.val}</span>
          </div>
        ))}
      </div>

      <div style={{ padding: 16, display: 'flex', gap: 10 }}>
        <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => navigate('/orders')}>Track Your Order</button>
        <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => navigate('/home')}>Continue Shopping</button>
      </div>
    </div>
  )
}
