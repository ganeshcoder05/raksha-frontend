import { useEffect, useState } from 'react'
import api from '../api.js'

export default function AdminDashboard({ onLogout }) {
  const [pending, setPending] = useState([])
  const [stats, setStats] = useState(null)
  const [incidents, setIncidents] = useState([])

  useEffect(() => {
    loadAll()
  }, [])

  async function loadAll() {
    try {
      const [pendingRes, statsRes, incidentsRes] = await Promise.all([
        api.get('/api/admin/volunteers/pending'),
        api.get('/api/admin/stats'),
        api.get('/api/admin/incidents'),
      ])
      setPending(pendingRes.data.volunteers)
      setStats(statsRes.data)
      setIncidents(incidentsRes.data.alerts)
    } catch (err) {
      console.error('Failed to load admin data', err)
    }
  }

  async function verifyVolunteer(id) {
    try {
      await api.patch(`/api/admin/volunteers/${id}/verify`)
      setPending((prev) => prev.filter((v) => v._id !== id))
    } catch (err) {
      console.error('Failed to verify volunteer', err)
    }
  }

  return (
    <div className="max-w-[1200px] mx-auto px-[5vw] py-9">
      <div className="flex justify-between items-center mb-7 flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-display">Admin overview</h2>
          <div className="text-muted text-[13px] mt-1">Coordination view — monitoring only, not a dispatch override.</div>
        </div>
        <button onClick={onLogout} className="text-[13px] text-muted border border-border px-4 py-2 rounded-lg hover:text-text">
          Sign out
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-8">
        <Kpi value={stats?.totalUsers ?? '—'} label="Registered users" />
        <Kpi value={stats?.verifiedVolunteers ?? '—'} label="Verified volunteers" />
        <Kpi value={stats?.totalAlerts ?? '—'} label="Total alerts" />
        <Kpi value={stats?.successRate != null ? `${stats.successRate}%` : '—'} label="Successful assistance rate" />
      </div>

      <div className="grid md:grid-cols-[1fr_1.6fr] gap-5">
        <div className="bg-surface border border-border rounded-2xl p-6">
          <h3 className="text-[15px] mb-4 flex items-center justify-between">
            Volunteer verification queue <span className="text-[11px] text-muted font-mono font-normal">{pending.length} pending</span>
          </h3>
          {pending.length === 0 && <div className="text-muted text-sm py-3">No pending volunteers.</div>}
          {pending.map((p, i) => (
            <div key={p._id} className={`flex justify-between items-center py-3.5 ${i < pending.length - 1 ? 'border-b border-border' : ''}`}>
              <div className="text-sm">
                {p.name}
                <span className="font-mono text-[11px] text-muted block mt-0.5">{p.phone}</span>
              </div>
              <button
                onClick={() => verifyVolunteer(p._id)}
                className="px-4 py-2 rounded-lg text-[13px] font-semibold bg-active text-[#0B1512]"
              >
                Verify
              </button>
            </div>
          ))}
        </div>

        <div className="bg-surface border border-border rounded-2xl p-6">
          <h3 className="text-[15px] mb-4 flex items-center justify-between">
            Live incident monitor <span className="text-[11px] text-muted font-mono font-normal">coordination only</span>
          </h3>
          {incidents.length === 0 && <div className="text-muted text-sm py-3">No live incidents.</div>}
          {incidents.map((a, i) => (
            <div key={a._id} className={`flex justify-between items-center py-3 text-sm ${i < incidents.length - 1 ? 'border-b border-border' : ''}`}>
              <span>{a.address || 'Unknown'} — {a.user?.name}</span>
              <StatusTag status={a.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Kpi({ value, label }) {
  return (
    <div
      className="
        bg-surface
        border
        border-border
        rounded-xl
        min-h-[110px]
        flex
        flex-col
        items-center
        justify-center
        text-center
        hover:border-urgent/40
        transition
      "
    >
      <b className="font-display text-4xl">
        {value}
      </b>

      <span className="text-xs text-muted mt-3">
        {label}
      </span>
    </div>
  )
}

function StatusTag({ status }) {
  const styles = {
    live: 'bg-urgent/15 text-urgent',
    accepted: 'bg-safe/10 text-safe',
    resolved: 'bg-active/10 text-active',
  }
  return (
    <span className={`text-[11px] px-2.5 py-1 rounded-full font-mono ${styles[status] || 'bg-border text-muted'}`}>
      {status}
    </span>
  )
}
