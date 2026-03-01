import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../components/UI'

// ── ENABLE LOCATION ───────────────────────────────────────────────
export function EnableLocationPage() {
  const navigate = useNavigate()
  return (
    <div className="screen no-nav">
      <div className="location-screen">
        <div className="location-icon-wrap">
          <Icon name="mapPin" size={48} color="var(--green-main)" />
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Enable Location</h2>
        <p style={{ fontSize: 14, color: 'var(--text-light)', marginBottom: 4 }}>Find the freshest produce nearby.</p>
        <p style={{ fontSize: 13, color: 'var(--text-light)', lineHeight: 1.6, marginBottom: 28 }}>
          Enable location services so we can connect you with Fresh produce from farmers
          in your immediate area and show delivery times.
        </p>
        <button className="btn btn-primary" style={{ maxWidth: 280 }} onClick={() => navigate('/detecting-location')}>
          Allow Location
        </button>
        <span style={{ color: 'var(--green-main)', fontSize: 13, fontWeight: 600, cursor: 'pointer', marginTop: 16 }}
          onClick={() => navigate('/manual-location')}>
          Enter Manually
        </span>
      </div>
    </div>
  )
}

// ── DETECTING LOCATION ────────────────────────────────────────────
export function DetectingLocationPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => navigate('/location-confirm'), 2500)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="screen no-nav">
      <div className="location-screen">
        <div className="detecting-ring">
          <Icon name="mapPin" size={48} color="var(--green-main)" />
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Detecting your location...</h2>
        <p style={{ fontSize: 14, color: 'var(--text-light)', lineHeight: 1.6 }}>
          We're finding the nearest Fresh Farm Campus to bring you local organic produce.
        </p>
      </div>
    </div>
  )
}

// ── LOCATION CONFIRM ──────────────────────────────────────────────
export function LocationConfirmPage() {
  const navigate = useNavigate()
  return (
    <div className="screen no-nav">
      <div className="location-screen">
        <div className="location-icon-wrap">
          <Icon name="mapPin" size={48} color="var(--green-main)" />
        </div>
        <p style={{ fontSize: 13, color: 'var(--green-main)', fontWeight: 600 }}>Location Detected</p>
        <p style={{ fontSize: 13, color: 'var(--text-light)', marginTop: 4 }}>We found your current location</p>

        <div style={{ background: 'var(--green-pale)', borderRadius: 'var(--radius)', padding: '14px 20px', margin: '20px 0', textAlign: 'left', width: '100%' }}>
          <div style={{ fontWeight: 700, fontSize: 16 }}>Gurugram, Haryana</div>
          <div style={{ fontSize: 13, color: 'var(--text-light)', marginTop: 4 }}>Sector 34, Gurugram Block A</div>
        </div>

        <button className="btn btn-primary" style={{ maxWidth: 280 }} onClick={() => navigate('/home')}>
          Confirm Location
        </button>
        <span style={{ color: 'var(--green-main)', fontSize: 13, fontWeight: 600, cursor: 'pointer', marginTop: 16 }}
          onClick={() => navigate('/manual-location')}>
          Change Location
        </span>
      </div>
    </div>
  )
}

// ── MANUAL LOCATION ───────────────────────────────────────────────
export function ManualLocationPage() {
  const navigate = useNavigate()
  const locations = [
    { name: 'DLF Cyber City', sub: 'Sector 24, Gurugram, Haryana' },
    { name: 'MG Road', sub: 'Sector 34, Gurugram, Haryana' },
    { name: 'Sohna Road', sub: 'Sector 34, Gurugram, Haryana' },
  ]

  return (
    <div className="screen no-nav">
      <div style={{ padding: '20px 16px 12px' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Enter Delivery Location</h2>
        <div style={{ position: 'relative', marginBottom: 16 }}>
          <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }}>
            <Icon name="search" size={16} />
          </span>
          <input style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: 12, border: '1.5px solid var(--border)', background: 'var(--bg)', fontFamily: 'var(--font)', fontSize: 14, outline: 'none' }}
            placeholder="Search city, area or pincode" />
        </div>
        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-mid)', marginBottom: 8 }}>Nearby Locations</p>
      </div>

      {locations.map((l, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: '1px solid var(--border)', cursor: 'pointer' }}
          onClick={() => navigate('/home')}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--green-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--green-main)', flexShrink: 0 }}>
            <Icon name="mapPin" size={16} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{l.name}</div>
            <div style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 2 }}>{l.sub}</div>
          </div>
          <Icon name="chevronRight" size={16} color="var(--text-light)" />
        </div>
      ))}

      <div style={{ padding: '16px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
        onClick={() => navigate('/detecting-location')}>
        <Icon name="navigation" size={16} color="var(--green-main)" />
        <span style={{ fontSize: 14, color: 'var(--green-main)', fontWeight: 600 }}>Use Current Location</span>
      </div>

      <div style={{ padding: '0 16px 16px' }}>
        <button className="btn btn-primary" onClick={() => navigate('/home')}>Confirm Location</button>
      </div>
    </div>
  )
}
