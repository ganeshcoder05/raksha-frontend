export default function Topbar({ view, role, goTo }) {
  const statusLabel = role ? `${role} · signed in` : 'not signed in'

  return (
    <div className="flex items-center justify-between px-[5vw] py-5 border-b border-border sticky top-0 bg-bg/90 backdrop-blur z-50">
      <div className="flex items-center gap-2.5 text-[19px] font-bold font-display">
        <span className="w-2.5 h-2.5 rounded-full bg-urgent shadow-[0_0_0_3px_var(--tw-shadow-color)] shadow-urgentDim"></span>
        Raksha
      </div>
      <div className="hidden md:flex gap-7 text-sm text-muted">
        <span className="cursor-pointer hover:text-text" onClick={() => goTo('landing')}>Overview</span>
        <span className="cursor-pointer hover:text-text" onClick={() => goTo('landing-how')}>How it works</span>
        <span className="cursor-pointer hover:text-text" onClick={() => goTo('auth')}>Sign in</span>
      </div>
      <div className="text-[11px] px-3 py-1.5 rounded-full border border-border text-muted font-mono tracking-wide">
        {statusLabel}
      </div>
    </div>
  )
}
