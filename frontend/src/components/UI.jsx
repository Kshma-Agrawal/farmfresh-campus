import { useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'

// ── ICON ─────────────────────────────────────────────────────────
const PATHS = {
  home: <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></>,
  search: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
  cart: <><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 001.97 1.61h9.72a2 2 0 001.97-1.61L23 6H6"/></>,
  user: <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
  bell: <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></>,
  chevronRight: <polyline points="9,18 15,12 9,6"/>,
  chevronLeft: <polyline points="15,18 9,12 15,6"/>,
  chevronDown: <polyline points="6,9 12,15 18,9"/>,
  mapPin: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></>,
  phone: <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.8 19.79 19.79 0 01.21.21 2 2 0 012.22 0H5.27a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>,
  lock: <><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></>,
  eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
  eyeOff: <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></>,
  mail: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
  star: <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>,
  check: <polyline points="20,6 9,17 4,12"/>,
  x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
  plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
  minus: <line x1="5" y1="12" x2="19" y2="12"/>,
  trash: <><polyline points="3,6 5,6 21,6"/><path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2"/></>,
  edit: <><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
  package: <><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27,6.96 12,12.01 20.73,6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></>,
  tag: <><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></>,
  creditCard: <><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></>,
  truck: <><rect x="1" y="3" width="15" height="13"/><polygon points="16,8 20,8 23,11 23,16 16,16 16,8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></>,
  messageCircle: <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></>,
  logout: <><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
  navigation: <polygon points="3,11 22,2 13,21 11,13"/>,
  filter: <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"/>,
  leaf: <><path d="M2 22c1.25-1.25 2.5-2.5 3.75-3.75"/><path d="M18 2a7 7 0 00-7 7 7 7 0 00-7 7"/></>,
}

export function Icon({ name, size = 18, color = 'currentColor', strokeWidth = 2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {PATHS[name]}
    </svg>
  )
}

// ── GOOGLE ICON ───────────────────────────────────────────────────
export function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  )
}

// ── STARS ─────────────────────────────────────────────────────────
export function Stars({ rating, size = 12 }) {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ color: i <= Math.floor(rating) ? '#ffc107' : '#e0e0e0', fontSize: size }}>★</span>
      ))}
      <span style={{ fontSize: size - 1, color: '#888', marginLeft: 2 }}>{rating}</span>
    </span>
  )
}

// ── QTY CONTROL ───────────────────────────────────────────────────
export function QtyControl({ qty, onAdd, onRemove, stopPropagation = true }) {
  const wrap = (fn) => (e) => { if (stopPropagation) e.stopPropagation(); fn() }
  if (qty === 0) {
    return (
      <button className="add-btn" onClick={wrap(onAdd)}>
        <span style={{ fontSize: 16, fontWeight: 400, lineHeight: 1 }}>+</span> Add
      </button>
    )
  }
  return (
    <div className="qty-control" onClick={e => stopPropagation && e.stopPropagation()}>
      <button className="qty-btn" onClick={wrap(onRemove)}>−</button>
      <span className="qty-num">{qty}</span>
      <button className="qty-btn" onClick={wrap(onAdd)}>+</button>
    </div>
  )
}

// ── TOP NAV ───────────────────────────────────────────────────────
export function TopNav({ showLocation = true, location = 'Gurgaon, Haryana' }) {
  const navigate = useNavigate()
  return (
    <div className="top-nav">
      <div className="logo-area">
        <div className="logo-circle">
          {/* Leaf/plant SVG matching Figma logo */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C7 2 3 6 3 11c0 3.5 2 6.5 5 8l1-2c-2-1.2-3.5-3.5-3.5-6C5.5 7.4 8.4 4.5 12 4.5c3.6 0 6.5 2.9 6.5 6.5 0 2.5-1.5 4.8-3.5 6l1 2c3-1.5 5-4.5 5-8 0-5-4-9-9-9z" fill="white"/>
            <path d="M12 8v8M9 13l3 3 3-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <div className="logo-text">Fresh Farms</div>
          <div className="logo-sub">Campus</div>
        </div>
      </div>
      {showLocation && (
        <div className="location-pill" onClick={() => navigate('/location')}>
          <Icon name="mapPin" size={13} color="var(--green-main)" />
          <span>{location}</span>
          <Icon name="chevronDown" size={13} color="var(--green-main)" />
        </div>
      )}
      <button className="icon-btn" onClick={() => navigate('/notifications')}>
        <Icon name="bell" size={20} />
      </button>
    </div>
  )
}

// ── BOTTOM NAV ────────────────────────────────────────────────────
export function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const { cartCount } = useCart()

  const items = [
    { key: '/home', icon: 'home', label: 'Home' },
    { key: '/search', icon: 'search', label: 'Search' },
    { key: '/cart', icon: 'cart', label: 'Cart' },
    { key: '/profile', icon: 'user', label: 'Profile' },
  ]

  const active = items.find(i => i.key === location.pathname)?.key || '/home'

  return (
    <nav className="bottom-nav">
      {items.map(item => (
        <button key={item.key}
          className={`nav-item ${active === item.key ? 'active' : ''}`}
          onClick={() => navigate(item.key)}>
          <span className="nav-icon">
            <Icon name={item.icon} size={24} />
            {item.key === '/cart' && cartCount > 0 && <span className="badge">{cartCount}</span>}
          </span>
          <span>{item.label}</span>
          {active === item.key && <div className="nav-active-dot" />}
        </button>
      ))}
    </nav>
  )
}

// ── PAGE HEADER ───────────────────────────────────────────────────
export function PageHeader({ title, onBack, right }) {
  const navigate = useNavigate()
  const handleBack = onBack || (() => navigate(-1))
  return (
    <div className="page-header">
      <button className="back-btn" onClick={handleBack}>
        <Icon name="chevronLeft" size={20} />
      </button>
      <span style={{ flex: 1, fontSize: 16, fontWeight: 700 }}>{title}</span>
      {right}
    </div>
  )
}
