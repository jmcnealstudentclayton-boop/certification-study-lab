import BrandMark from "../../components/BrandMark.jsx";
import Icon from "../../components/Icon.jsx";
import ProgressBar from "../../components/ProgressBar.jsx";

function PageHeader({ onBack }) {
  return (
    <header className="flex items-center justify-between gap-5 py-5">
      <BrandMark />
      <button className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-extrabold text-ink/65 transition hover:bg-study-aqua hover:text-ink" onClick={onBack} type="button">
        <Icon name="back" size={17} />
        Dashboard
      </button>
    </header>
  );
}

function CertificationStats({ certification }) {
  const stats = [
    { value: certification.questions.length, label: "draft question" },
    { value: certification.domains.length, label: "study domains" },
    { value: "SQL", label: "query practice mode" },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {stats.map((stat) => (
        <div className="rounded-2xl border border-ink/10 bg-white p-4" key={stat.label}>
          <p className="text-2xl font-black tracking-tight text-ink">{stat.value}</p>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-ink/45">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

function DomainCard({ domain, index }) {
  return (
    <article className="rounded-[1.35rem] border border-ink/10 bg-white p-5 transition hover:-translate-y-0.5 hover:border-study-teal/45 hover:shadow-[0_14px_30px_rgba(24,49,61,0.06)]">
      <div className="flex items-start gap-4">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-study-aqua text-sm font-black text-study-teal">{String(index + 1).padStart(2, "0")}</span>
        <div>
          <h3 className="text-base font-black tracking-tight text-ink">{domain.name}</h3>
          <p className="mt-2 text-sm leading-6 text-ink/60">{domain.description}</p>
        </div>
      </div>
      <ul className="mt-5 space-y-2 border-t border-ink/10 pt-4">
        {domain.objectives.map((objective) => (
          <li className="flex gap-2 text-sm font-semibold leading-5 text-ink/65" key={objective.id}>
            <Icon name="check" size={16} />
            <span>{objective.description}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function CertificationPage({ certification, onBack, onStartStudy }) {
  return (
    <div className="min-h-screen bg-white text-ink">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <PageHeader onBack={onBack} />
        <main className="pb-16 pt-5 sm:pt-8">
          <section className="overflow-hidden rounded-[2rem] bg-study-aqua px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-study-teal">
                  <span>{certification.provider}</span>
                  <span aria-hidden="true">·</span>
                  <span>Unofficial study track</span>
                </div>
                <h1 className="mt-4 max-w-2xl text-4xl font-black leading-[0.98] tracking-[-0.05em] text-ink sm:text-5xl">{certification.name}</h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-ink/70 sm:text-lg">{certification.description}</p>
                <button className="mt-8 inline-flex items-center gap-2 rounded-full bg-study-teal px-5 py-3.5 text-sm font-extrabold text-white shadow-[0_10px_22px_rgba(46,196,182,0.24)] transition hover:-translate-y-0.5 hover:bg-ink" onClick={() => onStartStudy(certification.id)} type="button">
                  Start SQL practice
                  <Icon name="arrow" size={18} />
                </button>
              </div>
              <div className="rounded-[1.5rem] bg-white/75 p-5">
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink/50">Your progress</p>
                <p className="mt-2 text-3xl font-black tracking-tight text-ink">Ready to begin</p>
                <div className="mt-6"><ProgressBar label="Readiness" value={0} /></div>
                <p className="mt-4 text-sm font-semibold leading-6 text-ink/60">Start with one focused query, then build toward a complete practice set.</p>
              </div>
            </div>
          </section>

          <section className="mt-6" aria-label="Certification overview">
            <CertificationStats certification={certification} />
          </section>

          <section className="mt-12" aria-labelledby="domains-title">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-study-orange">Study map</p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-ink" id="domains-title">What you will practice</h2>
              </div>
              <span className="hidden text-sm font-semibold text-ink/50 sm:block">Build the basics first.</span>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {certification.domains.map((domain, index) => <DomainCard domain={domain} index={index} key={domain.id} />)}
            </div>
          </section>

          <aside className="mt-12 rounded-[1.5rem] border border-study-orange/30 bg-study-peach/50 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-study-orange text-ink"><Icon name="info" size={20} /></span>
              <div>
                <h2 className="font-black text-ink">Keep the source distinction clear</h2>
                <p className="mt-1 max-w-3xl text-sm leading-6 text-ink/65">{certification.unofficialNotice} Questions in this track are original practice material inspired by the published topic scope.</p>
              </div>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}
