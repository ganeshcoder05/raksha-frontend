import { useEffect, useRef, useState } from 'react'
import Topbar from './components/Topbar.jsx'
import Landing from './components/Landing.jsx'
import Auth from './components/Auth.jsx'
import UserDashboard from './components/UserDashboard.jsx'
import VolunteerDashboard from './components/VolunteerDashboard.jsx'
import AdminDashboard from './components/AdminDashboard.jsx'
import { connectSocket, disconnectSocket } from './socket.js'

export default function App() {
  const [view, setView] = useState('landing')
  const [authRole, setAuthRole] = useState('user')
  const [session, setSession] = useState(null) // { token, role, name, id }
  const howRef = useRef(null);
  //token

  // Restore session on page load if a token was saved.
  useEffect(() => {
    const token = localStorage.getItem('raksha_token')
    const userRaw = localStorage.getItem('raksha_user')
    if (token && userRaw) {
      const user = JSON.parse(userRaw)
      setSession({ token, ...user })
      connectSocket(token)
      setView(user.role)
    }
  }, [])

  function goTo(id) {
    if (id === 'landing-how') {
      setView('landing')
      setTimeout(() => howRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
      return
    }
    setView(id)
    window.scrollTo(0, 0)
  }

  function showAuth(role) {
    setAuthRole(role)
    setView('auth')
  }

  function handleLogin(token, user) {
    localStorage.setItem('raksha_token', token)
    localStorage.setItem('raksha_user', JSON.stringify(user))
    setSession({ token, ...user })
    connectSocket(token)
    setView(user.role)
  }

  function handleLogout() {
    localStorage.removeItem('raksha_token')
    localStorage.removeItem('raksha_user')
    disconnectSocket()
    setSession(null)
    setView('landing')
  }

  return (
    <div>
      <Topbar view={view} role={session?.role} goTo={goTo} />

      {view === 'landing' && <Landing showAuth={showAuth} howRef={howRef} />}
      {view === 'auth' && <Auth initialRole={authRole} onLogin={handleLogin} goTo={goTo} />}
      {view === 'user' && <UserDashboard session={session} onLogout={handleLogout} />}
      {view === 'volunteer' && <VolunteerDashboard session={session} onLogout={handleLogout} />}
      {view === 'admin' && <AdminDashboard session={session} onLogout={handleLogout} />}
    </div>
  )
}
