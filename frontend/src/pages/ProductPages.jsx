import { useNavigate, useParams } from 'react-router-dom'
import { TopNav, BottomNav, PageHeader, Icon, Stars, QtyControl } from '../components/UI'
import { useCart } from '../context/CartContext'
import { PRODUCTS, FARMERS } from '../data'

// ── FARMER PROFILE ────────────────────────────────────────────────
export function FarmerProfilePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { cart, addToCart, removeFromCart } = useCart()
  const farmer = FARMERS.find(f => f.id === Number(id))
  const products = PRODUCTS.filter(p => p.farmerId === Number(id))
  const getQty = (pid) => cart.find(i => i.id === pid)?.qty || 0

  if (!farmer) return <div style={{ padding: 40, textAlign: 'center' }}>Farmer not found</div>

  return (
    <div className="screen">
      <TopNav />
      <PageHeader title="Farmer Profile" />

      {/* Hero */}
      <div style={{ background: 'var(--green-pale)', padding: '24px 16px', textAlign: 'center' }}>
        <div style={{ width: 90, height: 90, borderRadius: '50%', margin: '0 auto 12px', background: 'var(--green-light)', border: '3px solid white', boxShadow: 'var(--shadow)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44, overflow: 'hidden' }}>
          {farmer.emoji}
        </div>
        <div style={{ fontSize: 20, fontWeight: 700 }}>{farmer.name}</div>
        <div style={{ fontSize: 13, color: 'var(--text-light)', marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
          <Icon name="mapPin" size={12} /> {farmer.location}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
          <Stars rating={farmer.rating} size={13} />
        </div>
        {farmer.verified && (
          <div className="verified-badge" style={{ marginTop: 8 }}>
            <Icon name="check" size={12} /> Verified Farmer
          </div>
        )}
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
        {[{ num: farmer.products, lbl: 'Products' }, { num: `${farmer.exp}+`, lbl: 'Years Exp.' }, { num: `${farmer.orders}+`, lbl: 'Orders' }].map(s => (
          <div key={s.lbl} style={{ flex: 1, padding: '16px 0', textAlign: 'center', borderRight: '1px solid var(--border)' }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--green-dark)' }}>{s.num}</div>
            <div style={{ fontSize: 11, color: 'var(--text-light)', marginTop: 2 }}>{s.lbl}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '14px 16px 4px' }}>
        <p style={{ fontSize: 13, color: 'var(--text-light)', lineHeight: 1.5 }}>{farmer.specialty}. {farmer.desc}</p>
      </div>

      {/* Products */}
      <div style={{ padding: '16px 16px 8px' }}>
        <div className="section-title">Available Produce</div>
      </div>
      <div className="product-grid" style={{ paddingBottom: 16 }}>
        {products.map(p => {
          const qty = getQty(p.id)
          return (
            <div key={p.id} className="product-card" onClick={() => navigate(`/product/${p.id}`)}>
              <div className="product-img"><span style={{ fontSize: 48 }}>{p.emoji}</span></div>
              <div className="product-info">
                <div className="product-name">{p.name}</div>
                <div className="product-farmer">{p.farmer}</div>
                <div className="product-footer">
                  <span className="product-price">₹{p.price}/{p.unit}</span>
                  <QtyControl qty={qty} onAdd={() => addToCart(p)} onRemove={() => removeFromCart(p.id)} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 10, padding: 16 }}>
        <button className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={() => navigate('/cart')}>Place Order</button>
        <button className="btn btn-outline btn-sm" style={{ flex: 1 }}>Message Farmer</button>
      </div>

      <BottomNav />
    </div>
  )
}

// ── PRODUCT DETAIL ────────────────────────────────────────────────
export function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { cart, addToCart, removeFromCart, cartCount } = useCart()
  const product = PRODUCTS.find(p => p.id === Number(id))
  const qty = cart.find(i => i.id === Number(id))?.qty || 0

  if (!product) return <div style={{ padding: 40, textAlign: 'center' }}>Product not found</div>

  return (
    <div className="screen">
      <TopNav />

      {/* Hero image with back button overlay */}
      <div style={{ position: 'relative' }}>
        <button className="back-btn" style={{ position: 'absolute', top: 12, left: 12, zIndex: 10, background: 'white', boxShadow: 'var(--shadow)' }}
          onClick={() => navigate(-1)}>
          <Icon name="chevronLeft" size={20} />
        </button>
        <div style={{ width: '100%', height: 260, background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80 }}>
          {product.emoji}
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: 20 }}>
        <span style={{ fontSize: 12, color: 'var(--green-main)', fontWeight: 600, background: 'var(--green-light)', padding: '3px 10px', borderRadius: 20 }}>
          In Stock
        </span>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginTop: 8 }}>{product.name}</div>
        <div style={{ fontSize: 14, color: 'var(--text-light)', marginTop: 4 }}>By {product.farmer}</div>
        <div style={{ marginTop: 6 }}><Stars rating={product.rating} size={14} /></div>
        <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--green-dark)', marginTop: 8 }}>₹{product.price}/{product.unit}</div>

        <div style={{ marginTop: 16 }}>
          <div className="section-title">Description</div>
          <p style={{ fontSize: 14, color: 'var(--text-mid)', lineHeight: 1.6, marginTop: 8 }}>{product.desc}</p>
        </div>
      </div>

      {/* Qty row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderTop: '1px solid var(--border)' }}>
        <span style={{ fontSize: 15, fontWeight: 600 }}>Quantity</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button style={{ width: 36, height: 36, borderRadius: 10, border: '2px solid var(--green-main)', background: 'white', color: 'var(--green-main)', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}
            onClick={() => removeFromCart(product.id)}>−</button>
          <span style={{ fontSize: 20, fontWeight: 700, minWidth: 28, textAlign: 'center' }}>{qty}</span>
          <button style={{ width: 36, height: 36, borderRadius: 10, border: '2px solid var(--green-main)', background: 'white', color: 'var(--green-main)', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}
            onClick={() => addToCart(product)}>+</button>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 10, padding: 16 }}>
        <button className="btn" style={{ flex: 1, background: 'white', color: 'var(--green-main)', border: '1.5px solid var(--green-main)' }}
          onClick={() => navigate('/cart')}>
          <Icon name="cart" size={16} /> View Cart {cartCount > 0 ? `(${cartCount})` : ''}
        </button>
        <button className="btn btn-primary" style={{ flex: 1 }}
          onClick={() => { if (qty === 0) addToCart(product); navigate('/cart') }}>
          {qty === 0 ? 'Add to Cart' : 'Buy Now'}
        </button>
      </div>

      <BottomNav />
    </div>
  )
}
