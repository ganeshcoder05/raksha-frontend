import { useEffect, useState } from 'react'
import api from '../api.js'
import { getSocket } from '../socket.js'

export default function VolunteerDashboard({ session, onLogout }) {
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    loadAlerts()

    const socket = getSocket()
    if (!socket) return

    function handleNewAlert(alert) {
      setAlerts((prev) => [alert, ...prev])
    }

    socket.on('alert:new', handleNewAlert)
    return () => socket.off('alert:new', handleNewAlert)
  }, [])

  async function loadAlerts() {
    try {
      const { data } = await api.get('/api/alerts/incoming')
      setAlerts(data.alerts)
    } catch (err) {
      console.error('Failed to load incoming alerts', err)
    }
  }

  async function acceptAlert(id) {
    try {
      await api.post(`/api/alerts/${id}/accept`)
      setAlerts((prev) => prev.filter((a) => (a._id || a.id) !== id))
    } catch (err) {
      console.error('Failed to accept alert', err)
    }
  }

  async function declineAlert(id) {
    try {
      await api.post(`/api/alerts/${id}/decline`)
      setAlerts((prev) => prev.filter((a) => (a._id || a.id) !== id))
    } catch (err) {
      console.error('Failed to decline alert', err)
    }
  }

  return (
    <div className="max-w-[1200px] mx-auto px-[5vw] py-9">
      <div className="flex justify-between items-center mb-7 flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-display">Volunteer console{session?.name ? `, ${session.name}` : ''}</h2>
          <div className="text-muted text-[13px] mt-1">
            Status:{' '}
            <b className={session?.verified ? 'text-active' : 'text-safe'}>
              {session?.verified ? 'Verified responder' : 'Pending verification'}
            </b>
          </div>
        </div>
        <button onClick={onLogout} className="text-[13px] text-muted border border-border px-4 py-2 rounded-lg hover:text-text">
          Sign out
        </button>
      </div>

      {!session?.verified && (
        <div className="bg-safe/10 border border-safe/30 text-safe text-sm rounded-xl p-4 mb-6">
          Your account is awaiting admin verification. You won't receive alerts until an admin approves you.
        </div>
      )}

      <div className="bg-surface border border-border rounded-2xl p-6">
        <h3 className="text-[15px] mb-4 flex items-center justify-between">
          Incoming alerts <span className="text-[11px] text-muted font-mono font-normal">live via socket</span>
        </h3>

        {alerts.length === 0 ? (
          <div className="text-muted text-sm py-5 text-center">
            No active alerts right now. You'll be notified instantly when one comes in nearby.
          </div>
        ) : (
          alerts.map((alert) => {
            const id = alert._id || alert.id
            return (
              <div key={id} className="bg-surfaceRaised border border-border rounded-xl p-4.5 mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <b>New emergency alert</b>
                    <div className="text-[13px] text-muted mt-1.5">
                      {alert.address || alert.user?.name || 'Unknown location'}
                    </div>
                  </div>
                  <span className="text-[11px] px-2.5 py-1 rounded-full font-mono bg-urgent/15 text-urgent">live</span>
                </div>
                <div className="flex gap-2 mt-3.5">
                  <button
                    onClick={() => acceptAlert(id)}
                    className="px-4 py-2 rounded-lg text-[13px] font-semibold bg-active text-[#0B1512]"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => declineAlert(id)}
                    className="px-4 py-2 rounded-lg text-[13px] font-semibold bg-transparent border border-border text-muted"
                  >
                    Decline
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
