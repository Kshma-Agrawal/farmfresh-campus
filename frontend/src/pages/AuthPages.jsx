import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon, GoogleIcon } from '../components/UI'

// ── SPLASH ────────────────────────────────────────────────────────
export function SplashPage() {
  const navigate = useNavigate()
  return (
    <div className="splash-screen screen no-nav">
      <div />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <div style={{ width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: '2px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 110, height: 110, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 54 }}>
            🌿
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'white', fontWeight: 700 }}>Fresh Farm</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em' }}>CAMPUS</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, width: '100%' }}>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.85)', lineHeight: 1.5, textAlign: 'center', maxWidth: 260 }}>
          Fresh produce delivered straight from local farms to your door
        </p>
        <button className="btn" style={{ background: 'white', color: 'var(--green-dark)', fontWeight: 700, maxWidth: 320 }} onClick={() => navigate('/select-role')}>
          Get Started
        </button>
      </div>
    </div>
  )
}

// ── SELECT ROLE ───────────────────────────────────────────────────
export function SelectRolePage() {
  const navigate = useNavigate()
  const [role, setRole] = useState('consumer')

  return (
    <div className="screen no-nav" style={{ padding: '48px 24px 32px' }}>
      <div className="auth-logo">
        <div className="auth-logo-circle"><Icon name="leaf" size={36} color="white" /></div>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--green-dark)' }}>Fresh Farm Campus</div>
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Select your role</h2>
      <p style={{ fontSize: 14, color: 'var(--text-light)', marginBottom: 28 }}>Choose how you want to use the app.</p>

      {[
        { id: 'consumer', title: 'Consumer', desc: 'Browse and order fresh produce.' },
        { id: 'farmer', title: 'Farmer', desc: 'Sell your farm produce.' },
      ].map(r => (
        <div key={r.id} className={`role-card ${role === r.id ? 'selected' : ''}`} onClick={() => setRole(r.id)}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>{r.title}</div>
            <div style={{ fontSize: 13, color: 'var(--text-light)', marginTop: 2 }}>{r.desc}</div>
          </div>
          <div className={`radio ${role === r.id ? 'checked' : ''}`} />
        </div>
      ))}

      <button className="btn btn-primary mt-24" onClick={() => navigate('/login')}>Continue</button>
    </div>
  )
}

// ── LOGIN ─────────────────────────────────────────────────────────
export function LoginPage() {
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)

  return (
    <div className="auth-page screen no-nav">
      <div className="auth-logo">
        <div className="auth-logo-circle"><Icon name="leaf" size={36} color="white" /></div>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--green-dark)' }}>Fresh Farm Campus</div>
        <div style={{ fontSize: 11, color: 'var(--text-light)' }}>Campus</div>
      </div>

      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Welcome</h2>
      <p style={{ fontSize: 14, color: 'var(--text-light)', marginBottom: 24 }}>Login to continue</p>

      <div className="input-wrap">
        <span className="input-icon"><Icon name="phone" size={16} /></span>
        <input className="input-field" placeholder="Phone number" type="tel" />
      </div>
      <div className="input-wrap">
        <span className="input-icon"><Icon name="lock" size={16} /></span>
        <input className="input-field" placeholder="Password" type={showPass ? 'text' : 'password'} style={{ paddingRight: 42 }} />
        <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: 'var(--text-light)' }}
          onClick={() => setShowPass(!showPass)}>
          <Icon name={showPass ? 'eyeOff' : 'eye'} size={16} />
        </span>
      </div>

      <div style={{ textAlign: 'right', marginBottom: 20 }}>
        <span style={{ fontSize: 13, color: 'var(--green-main)', fontWeight: 600, cursor: 'pointer' }}
          onClick={() => navigate('/forgot-password')}>Forgot Password?</span>
      </div>

      <button className="btn btn-primary" onClick={() => navigate('/enable-location')}>Login</button>

      <div className="divider">
        <div className="divider-line" /><span className="divider-text">Or</span><div className="divider-line" />
      </div>

      <button className="google-btn"><GoogleIcon /> Continue with Google</button>

      <div className="auth-footer">
        New here? <a onClick={() => navigate('/create-account')}>Create a Profile</a>
      </div>
    </div>
  )
}

// ── FORGOT PASSWORD ───────────────────────────────────────────────
export function ForgotPasswordPage() {
  const navigate = useNavigate()
  return (
    <div className="auth-page screen no-nav">
      <div className="page-header" style={{ padding: '0 0 20px', border: 'none' }}>
        <button className="back-btn" onClick={() => navigate(-1)}>
          <Icon name="chevronLeft" size={20} />
        </button>
      </div>
      <div className="auth-logo">
        <div className="auth-logo-circle"><Icon name="leaf" size={36} color="white" /></div>
      </div>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Forgot Password</h2>
      <p style={{ fontSize: 14, color: 'var(--text-light)', marginBottom: 24 }}>Enter your phone number registered with us</p>

      <div className="input-wrap">
        <span className="input-icon"><Icon name="phone" size={16} /></span>
        <input className="input-field" placeholder="Enter your phone number" type="tel" />
      </div>

      <button className="btn btn-primary mt-16" onClick={() => navigate('/otp')}>Send OTP</button>

      <div className="auth-footer">
        New here? <a onClick={() => navigate('/create-account')}>Create a Profile</a>
      </div>
    </div>
  )
}

// ── OTP VERIFY ────────────────────────────────────────────────────
export function OTPPage() {
  const navigate = useNavigate()
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()]

  const handleChange = (i, v) => {
    if (!/^\d?$/.test(v)) return
    const next = [...otp]; next[i] = v; setOtp(next)
    if (v && i < 5) refs[i + 1].current.focus()
  }

  return (
    <div className="auth-page screen no-nav">
      <div className="page-header" style={{ padding: '0 0 20px', border: 'none' }}>
        <button className="back-btn" onClick={() => navigate(-1)}>
          <Icon name="chevronLeft" size={20} />
        </button>
      </div>

      <div className="auth-logo">
        <div className="auth-logo-circle"><Icon name="leaf" size={36} color="white" /></div>
      </div>

      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Verify OTP</h2>
      <p style={{ fontSize: 14, color: 'var(--text-light)' }}>Check your phone</p>
      <p style={{ fontSize: 13, color: 'var(--text-light)', marginTop: 8 }}>
        We sent a verification code to<br />
        <strong style={{ color: 'var(--text-dark)' }}>+91 XXXXXXXX78</strong>
      </p>

      <div className="otp-inputs">
        {otp.map((v, i) => (
          <input key={i} ref={refs[i]} className="otp-input" maxLength={1} value={v}
            onChange={e => handleChange(i, e.target.value)}
            onKeyDown={e => e.key === 'Backspace' && !v && i > 0 && refs[i - 1].current.focus()} />
        ))}
      </div>

      <button className="btn btn-primary" onClick={() => navigate('/login')}>Verify</button>

      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <p style={{ fontSize: 13, color: 'var(--text-light)' }}>⏱ Resend in 30s</p>
        <p style={{ fontSize: 13, color: 'var(--green-main)', fontWeight: 600, marginTop: 8, cursor: 'pointer' }}>Resend OTP</p>
      </div>
    </div>
  )
}

// ── CREATE ACCOUNT ────────────────────────────────────────────────
export function CreateAccountPage() {
  const navigate = useNavigate()
  const [agreed, setAgreed] = useState(false)

  return (
    <div className="auth-page screen no-nav" style={{ paddingTop: 24 }}>
      <div className="auth-logo">
        <div className="auth-logo-circle"><Icon name="leaf" size={36} color="white" /></div>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--green-dark)' }}>Create Account</div>
        <div style={{ fontSize: 11, color: 'var(--text-light)' }}>Join Fresh Farm Campus Today</div>
      </div>

      {[
        { icon: 'user', ph: 'Profile' },
        { icon: 'phone', ph: 'Phone number' },
        { icon: 'mail', ph: 'Email (Optional)' },
        { icon: 'lock', ph: 'Password' },
        { icon: 'lock', ph: 'Confirm Password' },
      ].map((f, i) => (
        <div className="input-wrap" key={i}>
          <span className="input-icon"><Icon name={f.icon} size={16} /></span>
          <input className="input-field" placeholder={f.ph} type={f.icon === 'lock' ? 'password' : 'text'} />
        </div>
      ))}

      <div className="checkbox-row" onClick={() => setAgreed(!agreed)}
        style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', margin: '12px 0' }}>
        <div className={`checkbox ${agreed ? 'checked' : ''}`}>
          {agreed && <Icon name="check" size={12} color="white" />}
        </div>
        <span style={{ fontSize: 13, color: 'var(--text-mid)' }}>
          I agree to the <span style={{ color: 'var(--green-main)', fontWeight: 600 }}>Terms & Conditions.</span>
        </span>
      </div>

      <button className="btn btn-primary mt-8" onClick={() => navigate('/login')}>Create Account</button>

      <div className="divider">
        <div className="divider-line" /><span className="divider-text">Or</span><div className="divider-line" />
      </div>

      <button className="google-btn"><GoogleIcon /> Continue with Google</button>

      <div className="auth-footer">
        Already have an account? <a onClick={() => navigate('/login')}>Login</a>
      </div>
    </div>
  )
}
