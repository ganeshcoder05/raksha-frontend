export default function Landing({ showAuth, howRef }) {
  return (
    <div>
      <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-14 px-[5vw] pt-16 pb-20 items-center">
        <div>
          <div className="flex items-center gap-2 text-xs text-urgent font-mono uppercase tracking-wider mb-4">
            <span className="w-4 h-px bg-urgent"></span>
            Emergency response, coordinated
          </div>
          <h1 className="font-display font-bold leading-[1.05] tracking-tight text-[clamp(36px,4.6vw,58px)]">
            One tap sends help.<br />
            <span className="text-urgent">Every second counted.</span>
          </h1>
          <p className="mt-5 text-[17px] text-muted max-w-[480px] leading-relaxed">
            Raksha connects women in distress to nearby verified volunteers and support teams
            in real time — replacing manual phone calls with a single, panic-friendly alert.
          </p>
          <div className="flex gap-3.5 mt-8">
            <button
              onClick={() => showAuth('user')}
              className="bg-urgent text-white px-6 py-3.5 rounded-[10px] font-semibold text-[15px] hover:bg-[#F0455F] hover:-translate-y-px transition"
            >
              Get protected — sign up
            </button>
            <button
              onClick={() => showAuth('volunteer')}
              className="bg-transparent border border-border px-6 py-3.5 rounded-[10px] font-semibold text-[15px] hover:border-[#3A4150] transition"
            >
              Become a volunteer
            </button>
          </div>
          <div className="flex gap-9 mt-12 pt-7 border-t border-border">
            <Stat value="<15s" label="alert delivery target" />
            <Stat value="3 roles" label="user · volunteer · admin" />
            <Stat value="24/7" label="coordination window" />
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-[280px] h-[560px] bg-surface border border-border rounded-[34px] p-3.5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] flex flex-col">
            <div className="bg-bg rounded-[22px] flex-1 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute w-[220px] h-[220px] flex items-center justify-center">
                <div className="ring"></div>
                <div className="ring ring-2"></div>
                <div className="ring ring-3"></div>
                <div className="w-[92px] h-[92px] rounded-full bg-urgent text-white flex items-center justify-center font-bold text-base font-display z-10 shadow-[0_0_0_6px_rgba(230,57,80,0.15)]">
                  SOS
                </div>
              </div>
              <div className="mt-[210px] text-center text-xs text-muted z-10">
                <b className="text-text block text-[13px] mb-1">Alert radiating</b>
                3 volunteers notified nearby
              </div>
            </div>
          </div>
        </div>
      </div>

      <section ref={howRef} className="px-[5vw] py-16">
        <div className="flex items-end justify-between mb-9 flex-wrap gap-4">
          <h2 className="text-[28px] font-semibold">How an alert moves</h2>
          <p className="text-muted text-sm max-w-[420px]">
            From tap to resolution — the path an emergency request takes through the platform.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <StepCard idx="01 — TRIGGER" title="SOS tapped"
            desc="User's live location, profile, and emergency contacts are packaged into an alert instantly. No forms, no calls." />
          <StepCard idx="02 — ROUTE" title="Nearby responders notified"
            desc="Verified volunteers and support teams within range receive the alert and can accept or decline." />
          <StepCard idx="03 — RESOLVE" title="Response tracked"
            desc="Admin and trusted contacts see status update live until the incident is marked closed." />
        </div>
      </section>

      <footer className="px-[5vw] py-8 border-t border-border flex justify-between text-xs text-muted flex-wrap gap-2">
        <div>Raksha — Women Safety & Emergency Assistance Platform</div>
        <div className="font-mono">Phase 1 · Web-only · No law-enforcement integration yet</div>
        <div>Created by @GaneshCoder</div>
      </footer>
    </div>
  )
}

function Stat({ value, label }) {
  return (
    <div>
      <b className="font-display text-[22px] block">{value}</b>
      <span className="text-xs text-muted block mt-1">{label}</span>
    </div>
  )
}

function StepCard({ idx, title, desc }) {
  return (
    <div className="bg-surface border border-border rounded-2xl p-6">
      <div className="font-mono text-xs text-urgent mb-3.5">{idx}</div>
      <h3 className="text-[17px] mb-2.5">{title}</h3>
      <p className="text-sm text-muted leading-relaxed">{desc}</p>
    </div>
  )
}
