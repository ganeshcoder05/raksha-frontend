import { useEffect, useState } from 'react'
import api from '../api.js'

export default function UserDashboard({ session, onLogout }) {
  const [contacts, setContacts] = useState([])
  const [alerts, setAlerts] = useState([])
  const [sosState, setSosState] = useState('idle') // idle | locating | sending | live | error
  const [sosError, setSosError] = useState('')
  const [newContact, setNewContact] = useState({ name: '', relation: '', phone: '' })
  const [showAddContact, setShowAddContact] = useState(false)

  useEffect(() => {
    loadContacts()
    loadAlerts()
  }, [])

  async function loadContacts() {
    try {
      const { data } = await api.get('/api/contacts')
      setContacts(data.contacts)
    } catch (err) {
      console.error('Failed to load contacts', err)
    }
  }

  async function loadAlerts() {
    try {
      const { data } = await api.get('/api/alerts/me')
      setAlerts(data.alerts)
    } catch (err) {
      console.error('Failed to load alerts', err)
    }
  }

  async function handleAddContact() {
    if (!newContact.name || !newContact.phone) return
    try {
      await api.post('/api/contacts', newContact)
      setNewContact({ name: '', relation: '', phone: '' })
      setShowAddContact(false)
      loadContacts()
    } catch (err) {
      console.error('Failed to add contact', err)
    }
  }

  function triggerSOS() {
    setSosError('')
    setSosState('locating')

    if (!navigator.geolocation) {
      setSosState('error')
      setSosError('This browser does not support location sharing.')
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setSosState('sending')
        try {
          const { latitude, longitude } = position.coords
          const { data } = await api.post('/api/alerts/sos', {
            lng: longitude,
            lat: latitude,
            address: 'Current location',
          })
          setSosState('live')
          setAlerts((prev) => [data.alert, ...prev])
        } catch (err) {
          setSosState('error')
          setSosError(err.response?.data?.error || 'Failed to send alert.')
        }
      },
      () => {
        setSosState('error')
        setSosError('Location permission denied. Enable location access to send an SOS.')
      }
    )
  }

  return (
    <div className="max-w-[1200px] mx-auto px-[5vw] py-9">
      <div className="flex justify-between items-center mb-7 flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-display">Welcome back{session?.name ? `, ${session.name}` : ''}</h2>
          <div className="text-muted text-[13px] mt-1">Your safety profile is active. Add contacts before you need them.</div>
        </div>
        <button onClick={onLogout} className="text-[13px] text-muted border border-border px-4 py-2 rounded-lg hover:text-text">
          Sign out
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-5xl mx-auto">
        <Kpi value={contacts.length} label="Trusted contacts" />
        <Kpi value={alerts.length} label="Past alerts" />
        <Kpi value={session?.verified ? 'Active' : 'Pending'} label="Profile status" />
        <Kpi value={sosState === 'live' ? 'Live' : 'Ready'} label="SOS status" />
      </div>

      <div className="grid md:grid-cols-[1fr_1.6fr] gap-5">
        <div className="bg-surface border border-border rounded-2xl p-9 flex flex-col items-center text-center">
          <button
            onClick={triggerSOS}
            disabled={sosState === 'locating' || sosState === 'sending' || sosState === 'live'}
            className={`w-[150px] h-[150px] rounded-full bg-urgent text-white font-display font-bold text-xl flex items-center justify-center shadow-[0_0_0_8px_rgba(230,57,80,0.12)] transition hover:scale-[1.03] disabled:hover:scale-100 ${sosState === 'live' ? 'sos-live' : ''}`}
          >
            {sosState === 'idle' && <>HOLD<br />FOR SOS</>}
            {sosState === 'locating' && <>LOCATING…</>}
            {sosState === 'sending' && <>SENDING…</>}
            {sosState === 'live' && <>ALERT<br />SENT</>}
            {sosState === 'error' && <>TRY<br />AGAIN</>}
          </button>
          <div className={`mt-4.5 text-[13px] ${sosState === 'live' ? 'text-urgent font-semibold' : 'text-muted'}`}>
            {sosState === 'idle' && 'Tap to send an emergency alert with your live location.'}
            {sosState === 'locating' && 'Getting your location…'}
            {sosState === 'sending' && 'Sending alert to nearby volunteers…'}
            {sosState === 'live' && 'Live location shared. Nearby volunteers notified.'}
            {sosState === 'error' && (sosError || 'Something went wrong.')}
          </div>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-6">
          <h3 className="text-[15px] mb-4 flex items-center justify-between">Trusted emergency contacts</h3>

          {contacts.length === 0 && (
            <div className="text-muted text-sm py-3">No contacts added yet.</div>
          )}
          {contacts.map((c, i) => (
            <div
              key={c._id}
              className={`flex justify-between items-center py-3 text-sm ${i < contacts.length - 1 ? 'border-b border-border' : ''}`}
            >
              <span>{c.name}{c.relation ? ` — ${c.relation}` : ''}</span>
              <span className="font-mono text-muted text-xs">{c.phone}</span>
            </div>
          ))}

          {showAddContact ? (
            <div className="mt-4 space-y-2">
              <input
                placeholder="Name"
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-urgent"
              />
              <input
                placeholder="Relation (optional)"
                value={newContact.relation}
                onChange={(e) => setNewContact({ ...newContact, relation: e.target.value })}
                className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-urgent"
              />
              <input
                placeholder="Phone"
                value={newContact.phone}
                onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-urgent"
              />
              <button onClick={handleAddContact} className="w-full bg-urgent text-white py-2 rounded-lg text-sm font-semibold">
                Save contact
              </button>
            </div>
          ) : (
            <div
              onClick={() => setShowAddContact(true)}
              className="text-[13px] text-urgent border border-dashed border-border rounded-lg py-2.5 mt-3.5 text-center cursor-pointer"
            >
              + Add emergency contact
            </div>
          )}
        </div>
      </div>

      <div className="bg-surface border border-border rounded-2xl p-6 mt-5">
        <h3 className="text-[15px] mb-4">Alert history</h3>
        {alerts.length === 0 && <div className="text-muted text-sm py-3">No alerts yet.</div>}
        {alerts.map((a, i) => (
          <div
            key={a._id}
            className={`flex justify-between items-center py-3 text-sm ${i < alerts.length - 1 ? 'border-b border-border' : ''}`}
          >
            <span>{a.address || 'Unknown location'} — {new Date(a.createdAt).toLocaleString()}</span>
            <StatusTag status={a.status} />
          </div>
        ))}
      </div>
    </div>
  )
}

function Kpi({ value, label }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-4.5 flex flex-col items-center justify-center text-center">
      <b className="font-display text-2xl block">{value}</b>
      <span className="text-xs text-muted">{label}</span>
    </div>
  )
}

function StatusTag({ status }) {
  const styles = {
    live: 'bg-urgent/15 text-urgent',
    accepted: 'bg-safe/10 text-safe',
    resolved: 'bg-active/10 text-active',
    cancelled: 'bg-border text-muted',
  }
  return (
    <span className={`text-[11px] px-2.5 py-1 rounded-full font-mono ${styles[status] || styles.cancelled}`}>
      {status}
    </span>
  )
}
