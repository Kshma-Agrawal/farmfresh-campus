import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TopNav, BottomNav, PageHeader, Icon, Stars, QtyControl } from '../components/UI'
import { useCart } from '../context/CartContext'
import { PRODUCTS, FARMERS, CATEGORIES } from '../data'

// ── HOME ──────────────────────────────────────────────────────────
export function HomePage() {
  const navigate = useNavigate()
  const { cart, addToCart, removeFromCart } = useCart()
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQ, setSearchQ] = useState('')

  const filtered = PRODUCTS.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory
    const matchQ = !searchQ || p.name.toLowerCase().includes(searchQ.toLowerCase())
    return matchCat && matchQ
  })

  const getQty = (id) => cart.find(i => i.id === id)?.qty || 0

  return (
    <div className="screen">
      <TopNav />

      <div className="home-greeting">
        <h2>Good Morning, Kshma</h2>
        <p>Fresh produce delivered today.</p>
      </div>

      <div className="search-wrap">
        <div className="search-inner">
          <span className="search-icon-pos"><Icon name="search" size={17} /></span>
          <input placeholder="Search vegetables, fruits..."
            value={searchQ} onChange={e => setSearchQ(e.target.value)} />
        </div>
      </div>

      {!searchQ && (
        <>
          <div className="section">
            <div className="section-header">
              <span className="section-title">Categories</span>
              <button className="see-all">See All</button>
            </div>
            <div className="h-scroll">
              {CATEGORIES.map(c => (
                <span key={c} className={`chip ${activeCategory === c ? 'chip-active' : 'chip-inactive'}`}
                  onClick={() => setActiveCategory(c)}>{c}</span>
              ))}
            </div>
          </div>

          <div className="section">
            <div className="section-header">
              <span className="section-title">Nearby Farmers</span>
              <button className="see-all" onClick={() => navigate('/farmers')}>See All</button>
            </div>
            <div className="h-scroll">
              {FARMERS.slice(0, 4).map(f => (
                <div key={f.id} className="farmer-card-h" onClick={() => navigate(`/farmer/${f.id}`)}>
                  <div className="farmer-card-avatar">{f.emoji}</div>
                  <div className="farmer-card-name">{f.name}</div>
                  <div className="farmer-card-meta">
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Icon name="mapPin" size={11} color="var(--text-light)" />{f.dist}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <span style={{ color: '#ffc107', fontSize: 13 }}>★</span>{f.rating}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="section">
        <div className="section-header">
          <span className="section-title">{searchQ ? `Results for "${searchQ}"` : 'Best Selling'}</span>
          {!searchQ && <button className="see-all" onClick={() => navigate('/browse')}>See All</button>}
        </div>
        <div className="product-grid">
          {filtered.map(p => {
            const qty = getQty(p.id)
            return (
              <div key={p.id} className="product-card" onClick={() => navigate(`/product/${p.id}`)}>
                <div className="product-img">
                  <span className="product-img-emoji">{p.emoji}</span>
                </div>
                <div className="product-info">
                  <div className="product-name">{p.name}</div>
                  <div className="product-farmer-name">{p.farmer}</div>
                  <div className="product-footer">
                    <span className="product-price">₹{p.price}/{p.unit}</span>
                    <QtyControl qty={qty} onAdd={() => addToCart(p)} onRemove={() => removeFromCart(p.id)} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}

// ── SEARCH ────────────────────────────────────────────────────────
export function SearchPage() {
  const navigate = useNavigate()
  const { cart, addToCart, removeFromCart } = useCart()
  const [q, setQ] = useState('')
  const results = q ? PRODUCTS.filter(p => p.name.toLowerCase().includes(q.toLowerCase())) : []
  const getQty = (id) => cart.find(i => i.id === id)?.qty || 0

  return (
    <div className="screen">
      <TopNav />
      <div style={{ padding: '16px 16px 8px' }}>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }}>
            <Icon name="search" size={16} />
          </span>
          <input autoFocus style={{ width: '100%', padding: '12px 12px 12px 42px', borderRadius: 12, border: '1.5px solid var(--border)', background: 'var(--bg)', fontFamily: 'var(--font)', fontSize: 14, outline: 'none' }}
            placeholder="Search vegetables, fruits, farmers..."
            value={q} onChange={e => setQ(e.target.value)} />
        </div>
      </div>

      {!q && (
        <div style={{ padding: 16 }}>
          <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: 'var(--text-mid)' }}>Popular Searches</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['Tomatoes', 'Spinach', 'Carrots', 'Mangoes', 'Milk', 'Onions', 'Potatoes', 'Cucumbers'].map(t => (
              <span key={t} className="chip chip-inactive" onClick={() => setQ(t)}>{t}</span>
            ))}
          </div>
        </div>
      )}

      {results.map(p => {
        const qty = getQty(p.id)
        return (
          <div key={p.id} className="product-list-item" onClick={() => navigate(`/product/${p.id}`)}>
            <div className="product-list-img"><span style={{ fontSize: 40 }}>{p.emoji}</span></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{p.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 2 }}>{p.farmer}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--green-dark)' }}>₹{p.price}/{p.unit}</span>
                <QtyControl qty={qty} onAdd={() => addToCart(p)} onRemove={() => removeFromCart(p.id)} />
              </div>
            </div>
          </div>
        )
      })}

      {q && results.length === 0 && (
        <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-light)' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
          <p style={{ fontWeight: 600 }}>No results found</p>
          <p style={{ fontSize: 13, marginTop: 4 }}>Try a different keyword</p>
        </div>
      )}

      <BottomNav />
    </div>
  )
}

// ── BROWSE PRODUCE ────────────────────────────────────────────────
export function BrowseProducePage() {
  const navigate = useNavigate()
  const { cart, addToCart, removeFromCart } = useCart()
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQ, setSearchQ] = useState('')
  const filtered = PRODUCTS.filter(p => (activeCategory === 'All' || p.category === activeCategory) &&
    (!searchQ || p.name.toLowerCase().includes(searchQ.toLowerCase())))
  const getQty = (id) => cart.find(i => i.id === id)?.qty || 0

  return (
    <div className="screen">
      <TopNav />
      <PageHeader title="Browse Produce" />
      <div style={{ padding: '12px 16px 8px' }}>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }}>
            <Icon name="search" size={16} /></span>
          <input style={{ width: '100%', padding: '12px 12px 12px 42px', borderRadius: 12, border: '1.5px solid var(--border)', background: 'var(--bg)', fontFamily: 'var(--font)', fontSize: 14, outline: 'none' }}
            placeholder="Search Fresh Produce" value={searchQ} onChange={e => setSearchQ(e.target.value)} />
        </div>
      </div>
      <div style={{ padding: '8px 16px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 13, fontWeight: 600 }}>Sort by: Popularity</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--green-main)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
          <Icon name="filter" size={12} /> Filter
        </span>
      </div>
      <div className="h-scroll" style={{ paddingBottom: 12 }}>
        {CATEGORIES.map(c => (
          <span key={c} className={`chip ${activeCategory === c ? 'chip-active' : 'chip-inactive'}`}
            onClick={() => setActiveCategory(c)}>{c}</span>
        ))}
      </div>
      {filtered.map(p => {
        const qty = getQty(p.id)
        return (
          <div key={p.id} className="product-list-item" onClick={() => navigate(`/product/${p.id}`)}>
            <div className="product-list-img"><span style={{ fontSize: 40 }}>{p.emoji}</span></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{p.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 2 }}>{p.farmer}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--green-dark)' }}>₹{p.price}/{p.unit}</span>
                <QtyControl qty={qty} onAdd={() => addToCart(p)} onRemove={() => removeFromCart(p.id)} />
              </div>
            </div>
          </div>
        )
      })}
      <BottomNav />
    </div>
  )
}

// ── BROWSE FARMERS ────────────────────────────────────────────────
export function BrowseFarmersPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('All')
  const [search, setSearch] = useState('')
  const filtered = FARMERS.filter(f => !search || f.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="screen">
      <TopNav />
      <PageHeader title="Browse Farmer" />
      <div style={{ padding: '12px 16px 8px' }}>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }}>
            <Icon name="search" size={16} /></span>
          <input style={{ width: '100%', padding: '12px 12px 12px 42px', borderRadius: 12, border: '1.5px solid var(--border)', background: 'var(--bg)', fontFamily: 'var(--font)', fontSize: 14, outline: 'none' }}
            placeholder="Search farmer by name or produce" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>
      <div className="h-scroll" style={{ padding: '8px 16px 12px' }}>
        {['All', 'Nearby', 'Organic', 'Premium'].map(t => (
          <span key={t} className={`chip ${activeTab === t ? 'chip-active' : 'chip-inactive'}`}
            onClick={() => setActiveTab(t)}>{t}</span>
        ))}
      </div>
      {filtered.map(f => (
        <div key={f.id} className="farmer-list-item" onClick={() => navigate(`/farmer/${f.id}`)}>
          <div className="farmer-avatar"><span style={{ fontSize: 30 }}>{f.emoji}</span></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 600 }}>{f.name}</div>
            <Stars rating={f.rating} size={12} />
            <div style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 3, lineHeight: 1.4 }}>{f.desc}</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
              {f.tags.map(t => <span key={t} className="tag tag-green">{t}</span>)}
            </div>
          </div>
          <button className="btn btn-sm btn-icon" onClick={e => { e.stopPropagation(); navigate(`/farmer/${f.id}`) }}>
            View More
          </button>
        </div>
      ))}
      <BottomNav />
    </div>
  )
}
