import { useState } from 'react'
import api from '../api.js'

export default function Auth({ initialRole, onLogin, goTo }) {
  const [role, setRole] = useState(initialRole || 'user')
  const [mode, setMode] = useState('register') // 'register' | 'login'
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    setError('')

    if (!phone || !password || (mode === 'register' && !name)) {
      setError('Please fill in all fields.')
      return
    }

    setLoading(true)
    try {
      const endpoint = mode === 'register' ? '/api/auth/register' : '/api/auth/login'
      const payload =
        mode === 'register' ? { name, phone, password, role } : { phone, password }

      const { data } = await api.post(endpoint, payload)
      onLogin(data.token, data.user)
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-[420px] mx-auto my-16 bg-surface border border-border rounded-2xl p-9">
      <h2 className="text-[22px] mb-1.5 font-display">
        {mode === 'register' ? 'Create your Raksha account' : 'Sign in to Raksha'}
      </h2>
      <p className="text-muted text-[13px] mb-6">
        {mode === 'register' ? 'Choose your role to continue.' : 'Welcome back.'}
      </p>

      {mode === 'register' && (
        <div className="flex gap-2 mb-5">
          {['user', 'volunteer', 'admin'].map((r) => (
            <div
              key={r}
              onClick={() => setRole(r)}
              className={`flex-1 text-center py-2.5 px-1.5 rounded-[9px] border text-xs font-mono cursor-pointer ${
                role === r ? 'border-urgent text-text bg-urgent/10' : 'border-border text-muted'
              }`}
            >
              {r.toUpperCase()}
            </div>
          ))}
        </div>
      )}

      {mode === 'register' && (
        <>
          <label className="block text-xs text-muted mb-1.5 mt-4">Full name</label>
          <input
            type="text"
            placeholder="e.g. Ananya Rao"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-bg border border-border rounded-lg px-3.5 py-2.5 text-text text-sm focus:outline-none focus:border-urgent"
          />
        </>
      )}

      <label className="block text-xs text-muted mb-1.5 mt-4">Phone number</label>
      <input
        type="text"
        placeholder="9999999999"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full bg-bg border border-border rounded-lg px-3.5 py-2.5 text-text text-sm focus:outline-none focus:border-urgent"
      />

      <label className="block text-xs text-muted mb-1.5 mt-4">Password</label>
      <input
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full bg-bg border border-border rounded-lg px-3.5 py-2.5 text-text text-sm focus:outline-none focus:border-urgent"
      />

      {error && <div className="text-urgent text-[13px] mt-3">{error}</div>}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full mt-6 bg-urgent text-white py-3.5 rounded-[9px] font-semibold disabled:opacity-60"
      >
        {loading ? 'Please wait…' : mode === 'register' ? 'Create account' : 'Continue'}
      </button>

      <div className="text-center text-[13px] text-muted mt-4">
        {mode === 'register' ? (
          <>
            Already have an account?{' '}
            <b className="text-urgent cursor-pointer" onClick={() => setMode('login')}>
              Sign in
            </b>
          </>
        ) : (
          <>
            New here?{' '}
            <b className="text-urgent cursor-pointer" onClick={() => setMode('register')}>
              Create an account
            </b>
          </>
        )}
      </div>

      <div className="text-center text-[13px] text-muted mt-2">
        <b className="text-urgent cursor-pointer" onClick={() => goTo('landing')}>
          Back to overview
        </b>
      </div>
    </div>
  )
}
