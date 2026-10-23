import { useState } from "react";
import BrandMark from "../../components/BrandMark.jsx";
import Icon from "../../components/Icon.jsx";
import ProgressBar from "../../components/ProgressBar.jsx";
import { certifications, studyModes, todayFocus } from "./homeData.js";

function Header() {
  return (
    <header className="flex items-center justify-between gap-6 py-5">
      <BrandMark />
      <nav className="hidden items-center gap-2 text-sm font-bold text-ink/60 md:flex" aria-label="Main navigation">
        <a className="rounded-full bg-study-aqua px-4 py-2 text-ink" href="#dashboard">Dashboard</a>
        <a className="rounded-full px-4 py-2 transition hover:bg-study-aqua" href="#certifications">Certifications</a>
        <a className="rounded-full px-4 py-2 transition hover:bg-study-aqua" href="#progress">Progress</a>
      </nav>
      <button className="grid size-10 place-items-center rounded-full border border-ink/10 bg-white text-ink transition hover:border-study-teal hover:text-study-teal" type="button" aria-label="Toggle dark mode">
        <Icon name="moon" size={18} />
      </button>
    </header>
  );
}

function Hero({ onStart }) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-study-aqua px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
      <div className="relative z-10 max-w-2xl">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/75 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-study-teal">
          <span className="size-2 rounded-full bg-study-orange" />
          Your study space
        </p>
        <h1 className="max-w-xl text-4xl font-black leading-[0.98] tracking-[-0.05em] text-ink sm:text-5xl lg:text-6xl">
          Build confidence, one question at a time.
        </h1>
        <p className="mt-5 max-w-lg text-base leading-7 text-ink/70 sm:text-lg">
          Practice with purpose, understand every answer, and keep your certification goals moving forward.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-full bg-study-teal px-5 py-3.5 text-sm font-extrabold text-white shadow-[0_10px_22px_rgba(46,196,182,0.24)] transition hover:-translate-y-0.5 hover:bg-ink" onClick={onStart} type="button">
            Continue studying
            <Icon name="arrow" size={18} />
          </button>
          <a className="rounded-full px-5 py-3.5 text-sm font-extrabold text-ink transition hover:bg-white/70" href="#certifications">View certifications</a>
        </div>
      </div>
      <div className="pointer-events-none absolute -right-12 -top-16 size-64 rounded-full border-[26px] border-study-orange/30 sm:-right-8 sm:-top-24 sm:size-96" />
      <div className="pointer-events-none absolute -bottom-28 right-20 size-56 rounded-full bg-study-peach/70 sm:right-48" />
    </section>
  );
}

function SnapshotCard({ onStart }) {
  return (
    <section className="grid gap-5 rounded-[1.5rem] border border-ink/10 bg-white p-5 shadow-[0_16px_40px_rgba(24,49,61,0.06)] sm:grid-cols-[1fr_auto] sm:p-6" id="progress">
      <div>
        <div className="mb-5 flex items-start justify-between gap-5">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink/50">Continue where you left off</p>
            <h2 className="mt-2 text-xl font-black tracking-tight text-ink">SQL (Basic)</h2>
          </div>
          <span className="rounded-full bg-study-peach px-3 py-1 text-xs font-extrabold text-ink">Ready to start</span>
        </div>
        <ProgressBar label="Overall readiness" value={0} />
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-ink/60">
          <span><strong className="text-ink">0</strong> questions practiced</span>
          <span><strong className="text-ink">0</strong> domains reviewed</span>
        </div>
      </div>
      <div className="flex items-end sm:justify-end">
        <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-study-orange px-5 py-3 text-sm font-extrabold text-ink transition hover:-translate-y-0.5 hover:bg-study-peach sm:w-auto" onClick={onStart} type="button">
          Start session
          <Icon name="arrow" size={17} />
        </button>
      </div>
    </section>
  );
}

function StudyModeCard({ mode, onSelect }) {
  const iconTone = {
    teal: "bg-study-aqua text-study-teal",
    orange: "bg-study-peach text-ink",
    aqua: "bg-study-aqua text-ink",
  }[mode.tone];

  return (
    <button className="group flex min-h-52 flex-col rounded-[1.5rem] border border-ink/10 bg-white p-5 text-left transition hover:-translate-y-1 hover:border-study-teal/50 hover:shadow-[0_16px_36px_rgba(24,49,61,0.08)]" onClick={() => onSelect(mode.title)} type="button">
      <span className={`grid size-11 place-items-center rounded-2xl ${iconTone}`}><Icon name={mode.icon} size={21} /></span>
      <span className="mt-6 text-lg font-black tracking-tight text-ink">{mode.title}</span>
      <span className="mt-2 flex-1 text-sm leading-6 text-ink/60">{mode.description}</span>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-extrabold text-study-teal transition group-hover:gap-2.5">
        {mode.action}
        <Icon name="arrow" size={16} />
      </span>
    </button>
  );
}

function CertificationCard({ certification, onOpenCertification }) {
  const accent = certification.accent === "orange" ? "bg-study-orange" : "bg-study-teal";

  return (
    <article className="rounded-[1.5rem] border border-ink/10 bg-white p-5 transition hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(24,49,61,0.08)]">
      <div className="flex items-start justify-between gap-4">
        <span className={`grid size-11 place-items-center rounded-2xl text-white ${accent}`}><Icon name="target" size={21} /></span>
        {certification.available ? (
          <button className="grid size-9 place-items-center rounded-full text-ink/40 transition hover:bg-study-aqua hover:text-study-teal" onClick={() => onOpenCertification(certification.id)} type="button" aria-label={`Open ${certification.name}`}>
            <Icon name="chevron" size={18} />
          </button>
        ) : <span className="rounded-full bg-study-peach px-3 py-1 text-xs font-extrabold text-ink">Coming next</span>}
      </div>
      <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.12em] text-ink/45">{certification.provider}</p>
      <h3 className="mt-2 text-xl font-black tracking-tight text-ink">{certification.name}</h3>
      <p className="mt-2 min-h-12 text-sm leading-6 text-ink/60">{certification.description}</p>
      <div className="mt-5"><ProgressBar label="Progress" value={certification.progress} tone={certification.accent} /></div>
      <p className="mt-4 text-xs font-bold text-ink/45">{certification.questions ? `${certification.questions} practice question available` : "Content plan in progress"}</p>
    </article>
  );
}

export default function HomePage({ onOpenCertification }) {
  const [notice, setNotice] = useState("");

  function handleStart() {
    onOpenCertification("hackerrank-sql-basic");
  }

  function handleModeSelect(mode) {
    if (mode === "Practice test") {
      onOpenCertification("hackerrank-sql-basic");
      return;
    }

    setNotice(`${mode} will be available as the SQL study track grows.`);
  }

  return (
    <div className="min-h-screen bg-white text-ink">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <Header />
        <main className="pb-16 pt-5 sm:pt-8" id="dashboard">
          <Hero onStart={handleStart} />
          {notice && <div className="mt-5 flex items-center gap-2 rounded-2xl border border-study-teal/25 bg-study-aqua px-4 py-3 text-sm font-bold text-ink" role="status"><Icon name="check" size={18} />{notice}</div>}
          <div className="mt-8"><SnapshotCard onStart={handleStart} /></div>
          <section className="mt-12" aria-labelledby="study-modes-title">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div><p className="text-xs font-extrabold uppercase tracking-[0.14em] text-study-teal">Choose your pace</p><h2 className="mt-2 text-2xl font-black tracking-tight text-ink" id="study-modes-title">How do you want to study?</h2></div>
              <span className="hidden text-sm font-semibold text-ink/50 sm:block">Short sessions count.</span>
            </div>
            <div className="grid gap-4 md:grid-cols-3">{studyModes.map((mode) => <StudyModeCard key={mode.id} mode={mode} onSelect={handleModeSelect} />)}</div>
          </section>
          <section className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]" id="certifications">
            <div>
              <div className="mb-5 flex items-end justify-between gap-4"><div><p className="text-xs font-extrabold uppercase tracking-[0.14em] text-study-orange">Keep building</p><h2 className="mt-2 text-2xl font-black tracking-tight text-ink">Your certifications</h2></div><button className="text-sm font-extrabold text-study-teal hover:text-ink" type="button">Manage all</button></div>
              <div className="grid gap-4 md:grid-cols-2">{certifications.map((certification) => <CertificationCard key={certification.id} certification={certification} onOpenCertification={onOpenCertification} />)}</div>
            </div>
            <aside className="rounded-[1.5rem] bg-study-peach p-6" aria-labelledby="focus-title">
              <span className="grid size-11 place-items-center rounded-2xl bg-white text-study-orange"><Icon name="spark" size={21} /></span>
              <p className="mt-8 text-xs font-extrabold uppercase tracking-[0.14em] text-ink/55">Today's focus</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-ink" id="focus-title">{todayFocus.domain}</h2>
              <p className="mt-2 text-sm leading-6 text-ink/65">{todayFocus.detail}.</p>
              <div className="mt-6"><ProgressBar label="Domain confidence" value={todayFocus.progress} tone="orange" /></div>
              <button className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-3 text-sm font-extrabold text-white transition hover:bg-study-teal" onClick={() => setNotice("Your focused review is ready to begin.")} type="button">Start focused review <Icon name="arrow" size={16} /></button>
            </aside>
          </section>
        </main>
        <footer className="flex flex-col gap-2 border-t border-ink/10 py-6 text-xs font-semibold text-ink/45 sm:flex-row sm:items-center sm:justify-between"><span>Certification Study Lab · Unofficial study aid</span><span>Built for steady progress.</span></footer>
      </div>
    </div>
  );
}
