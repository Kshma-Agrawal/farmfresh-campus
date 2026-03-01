import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BottomNav, TopNav, PageHeader, Icon, Stars } from '../components/UI'
import { ORDERS, ADDRESSES } from '../data'

// ── PROFILE ───────────────────────────────────────────────────────
export function ProfilePage() {
  const navigate = useNavigate()

  const menuItems = [
    { icon: 'edit', title: 'Edit Profile', sub: 'Update your personal info', path: '/edit-profile' },
    { icon: 'mapPin', title: 'Saved Addresses', sub: 'Manage delivery addresses', path: '/saved-addresses' },
    { icon: 'package', title: 'My Orders', sub: 'View order history', path: '/orders' },
    { icon: 'tag', title: 'Coupons', sub: 'Your saved coupons', path: '/coupons' },
    { icon: 'creditCard', title: 'Payment Settings', sub: 'Manage payment methods', path: '/payment-settings' },
    { icon: 'bell', title: 'Notifications', sub: 'Manage alerts', path: '/notifications' },
    { icon: 'settings', title: 'Settings', sub: 'App preferences', path: '/settings' },
  ]

  return (
    <div className="screen">
      <TopNav />
      <div style={{ padding: '16px 16px 4px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 16, fontWeight: 700 }}>My Profile</span>
      </div>

      {/* Hero */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--green-light)', marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, border: '3px solid var(--green-main)' }}>
          👩
        </div>
        <div style={{ fontSize: 18, fontWeight: 700 }}>Kshma Agrawal</div>
        <div style={{ fontSize: 13, color: 'var(--text-light)', marginTop: 4 }}>+91 87555 00001</div>
      </div>

      {menuItems.map(item => (
        <div key={item.path} className="profile-menu-item" onClick={() => navigate(item.path)}>
          <div className="profile-menu-icon"><Icon name={item.icon} size={18} /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{item.title}</div>
            <div style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 1 }}>{item.sub}</div>
          </div>
          <Icon name="chevronRight" size={16} color="var(--text-light)" />
        </div>
      ))}

      <div className="profile-menu-item" onClick={() => navigate('/splash')}>
        <div className="profile-menu-icon" style={{ background: '#ffebee', color: 'var(--red)' }}>
          <Icon name="logout" size={18} color="var(--red)" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--red)' }}>Logout</div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}

// ── EDIT PROFILE ──────────────────────────────────────────────────
export function EditProfilePage() {
  const navigate = useNavigate()
  return (
    <div className="screen">
      <PageHeader title="Edit Profile" />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 0 16px' }}>
        <div style={{ position: 'relative' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, border: '3px solid var(--green-main)' }}>👩</div>
          <div style={{ position: 'absolute', bottom: 0, right: 0, width: 28, height: 28, borderRadius: '50%', background: 'var(--green-main)', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Icon name="edit" size={12} color="white" />
          </div>
        </div>
        <div style={{ fontSize: 16, fontWeight: 700, marginTop: 8 }}>Kshma Agrawal</div>
      </div>
      <div style={{ padding: '0 16px' }}>
        {[
          { label: 'Name', val: 'Kshma Agrawal', icon: 'user' },
          { label: 'Phone', val: '+91 7830124625', icon: 'phone' },
          { label: 'Email', val: 'kshmaagrawal@example.com', icon: 'mail' },
          { label: 'Location', val: 'Mathura', icon: 'mapPin' },
          { label: 'State', val: 'Uttar Pradesh', icon: 'mapPin' },
        ].map((f, i) => (
          <div key={i}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-mid)', display: 'block', marginBottom: 4, marginTop: 12 }}>{f.label}</label>
            <div className="input-wrap" style={{ marginBottom: 0 }}>
              <span className="input-icon"><Icon name={f.icon} size={16} /></span>
              <input className="input-field" defaultValue={f.val} />
            </div>
          </div>
        ))}
        <button className="btn btn-primary mt-24 mb-16">Save Changes</button>
      </div>
    </div>
  )
}

// ── SAVED ADDRESSES ───────────────────────────────────────────────
export function SavedAddressesPage() {
  const navigate = useNavigate()
  return (
    <div className="screen">
      <PageHeader title="Saved Addresses" />
      {ADDRESSES.map(a => (
        <div key={a.id} className="address-item">
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--green-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
            {a.icon}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 700 }}>{a.label}</span>
              {a.current && <span style={{ fontSize: 11, color: 'var(--green-main)', fontWeight: 500 }}>Current Address</span>}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-mid)', marginTop: 3, lineHeight: 1.4 }}>{a.address}</div>
            <div style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 3 }}>{a.phone}</div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <button className="address-action-btn edit-btn-sm"><Icon name="edit" size={14} /></button>
            <button className="address-action-btn delete-btn-sm"><Icon name="trash" size={14} color="var(--red)" /></button>
          </div>
        </div>
      ))}
      <div style={{ padding: 16 }}>
        <button className="btn btn-outline" onClick={() => navigate('/address')}>+ Add New Address</button>
      </div>
    </div>
  )
}

// ── ORDERS ────────────────────────────────────────────────────────
export function OrdersPage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('All')
  const filtered = tab === 'All' ? ORDERS : ORDERS.filter(o => o.status === tab.toLowerCase())
  const statusClass = { arrived: 'status-arrived', cancelled: 'status-cancelled', ongoing: 'status-ongoing' }
  const statusLabel = { arrived: 'Arrived', cancelled: 'Cancelled', ongoing: 'Ongoing' }

  return (
    <div className="screen">
      <PageHeader title="My Orders" />
      <div className="tabs">
        {['All', 'Ongoing', 'Completed', 'Cancelled'].map(t => (
          <div key={t} className={`tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>{t}</div>
        ))}
      </div>
      {filtered.map(order => (
        <div key={order.id} style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', cursor: 'pointer' }}
          onClick={() => navigate(`/order/${order.id}`)}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>Order #{order.id}</span>
            <span className={`order-status ${statusClass[order.status]}`}>{statusLabel[order.status]}</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {order.items.slice(0, 3).map((item, i) => (
              <div key={i} style={{ width: 52, height: 52, borderRadius: 8, background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{item.emoji}</div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>₹{order.amount}</div>
              <div style={{ fontSize: 12, color: 'var(--text-light)' }}>{order.date}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: '1px solid var(--border)', background: 'var(--bg)', fontFamily: 'var(--font)' }}
                onClick={e => { e.stopPropagation(); navigate(`/rate/${order.id}`) }}>Rate Order</button>
              <button style={{ padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: 'none', background: 'var(--green-main)', color: 'white', fontFamily: 'var(--font)' }}>Reorder</button>
            </div>
          </div>
        </div>
      ))}
      <BottomNav />
    </div>
  )
}

// ── ORDER DETAIL ──────────────────────────────────────────────────
export function OrderDetailPage() {
  const navigate = useNavigate()
  // In a real app, you'd use useParams() to get the order id
  const order = ORDERS[0]

  return (
    <div className="screen">
      <PageHeader title="Order Summary" />

      <div style={{ background: 'var(--green-pale)', borderRadius: 'var(--radius)', margin: '12px 16px 0', padding: '12px 14px' }}>
        <div style={{ fontSize: 13, fontWeight: 700 }}>Order #{order.id}</div>
        <div style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 2 }}>₹{order.amount} • {order.date}</div>
      </div>

      <div style={{ padding: '16px 16px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 700, fontSize: 15 }}>Ordered Items</span>
        <span style={{ fontSize: 13, color: 'var(--text-light)' }}>{order.items.length} Items</span>
      </div>

      {order.items.map((item, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 48, height: 48, borderRadius: 8, background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{item.emoji}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{item.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 2 }}>{item.qty}</div>
            </div>
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--green-dark)' }}>₹{item.price}</div>
        </div>
      ))}

      {/* Farmer card */}
      <div style={{ margin: 16, background: 'var(--bg)', borderRadius: 'var(--radius)', padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{order.farmer.emoji}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>{order.farmer.name}</div>
          <div style={{ fontSize: 12, color: 'var(--text-light)' }}>{order.farmer.location}</div>
          <Stars rating={order.farmer.rating} size={11} />
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="contact-btn"><Icon name="phone" size={16} /></button>
          <button className="contact-btn"><Icon name="messageCircle" size={16} /></button>
        </div>
      </div>

      <div style={{ padding: 16, display: 'flex', gap: 10 }}>
        <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => navigate('/order-tracking')}>Track Your Order</button>
        <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => navigate('/home')}>Continue Shopping</button>
      </div>
    </div>
  )
}

// ── ORDER TRACKING ────────────────────────────────────────────────
export function OrderTrackingPage() {
  const navigate = useNavigate()
  const steps = [
    { label: 'Order Placed', time: '12:30 PM', done: true },
    { label: 'Packed', time: '12:45 PM', done: true },
    { label: 'Out for Delivery', time: 'Rahul is on his way', done: true },
    { label: 'Delivered', time: 'Pending', done: false },
  ]

  return (
    <div className="screen">
      <PageHeader title="Track Order" />

      {/* Map */}
      <div style={{ width: 'calc(100% - 32px)', height: 220, background: 'linear-gradient(135deg, #b2dfdb, #80cbc4, #4db6ac)', borderRadius: 'var(--radius)', margin: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48 }}>🗺️</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.95)', fontWeight: 600, marginTop: 8 }}>Arriving in 15 mins</div>
        </div>
      </div>

      {/* Delivery partner */}
      <div style={{ background: 'var(--green-pale)', borderRadius: 'var(--radius)', margin: '0 16px', padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700 }}>Rahul Sharma</div>
          <div style={{ fontSize: 12, color: 'var(--text-light)' }}>Your delivery partner</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="contact-btn"><Icon name="phone" size={16} /></button>
          <button className="contact-btn"><Icon name="messageCircle" size={16} /></button>
        </div>
      </div>

      {/* Steps */}
      <div style={{ padding: 16 }}>
        {steps.map((step, i) => (
          <div key={i} className="tracking-step">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className={`step-dot ${step.done ? 'done' : 'pending'}`}>
                {step.done && <Icon name="check" size={11} color="white" strokeWidth={3} />}
              </div>
              {i < steps.length - 1 && <div className={`step-line ${step.done ? 'done' : ''}`} />}
            </div>
            <div style={{ paddingTop: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{step.label}</div>
              <div style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 2 }}>{step.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── RATE EXPERIENCE ───────────────────────────────────────────────
export function RateExperiencePage() {
  const navigate = useNavigate()
  const [overall, setOverall] = useState(0)
  const [itemRatings, setItemRatings] = useState({})
  const [review, setReview] = useState('')
  const order = ORDERS[0]

  return (
    <div className="screen">
      <PageHeader title="Rate Your Experience" />
      <div style={{ padding: 16 }}>
        <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>How was your delivery Experience?</p>
        <p style={{ fontSize: 13, color: 'var(--text-light)', marginBottom: 12 }}>with {order.farmer.name}</p>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {[1, 2, 3, 4, 5].map(i => (
            <span key={i} className="star-btn" onClick={() => setOverall(i)}
              style={{ color: i <= overall ? '#ffc107' : '#e0e0e0' }}>★</span>
          ))}
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
          <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Please tell us about items in your order</p>
          {order.items.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{item.emoji}</div>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{item.name}</span>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                {[1, 2, 3, 4, 5].map(i => (
                  <span key={i} style={{ fontSize: 20, cursor: 'pointer', color: i <= (itemRatings[idx] || 0) ? '#ffc107' : '#e0e0e0' }}
                    onClick={() => setItemRatings(prev => ({ ...prev, [idx]: i }))}>★</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <textarea style={{ width: '100%', padding: 12, border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', fontFamily: 'var(--font)', fontSize: 14, resize: 'none', outline: 'none', marginTop: 16 }}
          rows={3} placeholder="Write your review..." value={review} onChange={e => setReview(e.target.value)} />

        <button className="btn btn-primary mt-16" onClick={() => navigate('/home')}>Submit Review</button>
        <button className="btn btn-outline mt-8" onClick={() => navigate(-1)}>Cancel</button>
      </div>
    </div>
  )
}

// ── COUPONS ───────────────────────────────────────────────────────
export function CouponsPage() {
  const navigate = useNavigate()
  const coupons = [
    { code: 'FRESH20', desc: '20% off on your first order', expiry: 'Expires 31 Mar 2026' },
    { code: 'CAMPUS10', desc: 'Flat ₹10 off on orders above ₹100', expiry: 'Expires 15 Apr 2026' },
    { code: 'VEGGIE50', desc: '₹50 off on vegetable orders above ₹200', expiry: 'Expires 30 Apr 2026' },
  ]
  return (
    <div className="screen">
      <PageHeader title="Coupons" />
      <div style={{ padding: '16px 0 8px' }}>
        {coupons.map((c, i) => (
          <div key={i} className="coupon-card">
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--green-dark)', letterSpacing: '0.05em' }}>{c.code}</div>
            <div style={{ fontSize: 13, color: 'var(--text-mid)', marginTop: 4 }}>{c.desc}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
              <span style={{ fontSize: 11, color: 'var(--text-light)' }}>{c.expiry}</span>
              <button className="btn btn-sm btn-icon">Apply</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── NOTIFICATIONS ─────────────────────────────────────────────────
export function NotificationsPage() {
  const notifs = [
    { text: 'Your order #FFC-12345 has been delivered successfully!', time: '2 mins ago' },
    { text: 'New produce available from Rani Kumari: Fresh Mangoes at ₹120/kg', time: '1 hour ago' },
    { text: 'Exclusive offer: Use FRESH20 for 20% off today only.', time: '3 hours ago' },
    { text: 'Harpal Singh Farm just added Fresh Spinach to the store.', time: 'Yesterday' },
    { text: 'Your order #FFC-12344 is out for delivery.', time: 'Yesterday' },
  ]
  return (
    <div className="screen">
      <PageHeader title="Notifications" />
      {notifs.map((n, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green-main)', flexShrink: 0, marginTop: 6 }} />
          <div>
            <div style={{ fontSize: 14, color: 'var(--text-dark)', lineHeight: 1.5 }}>{n.text}</div>
            <div style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 4 }}>{n.time}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
