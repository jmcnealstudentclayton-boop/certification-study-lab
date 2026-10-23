import { useState } from "react";
import BrandMark from "../../components/BrandMark.jsx";
import Icon from "../../components/Icon.jsx";
import SqlEditor from "../../components/ui/SqlEditor.jsx";
import SqlQuestionPrompt from "../../components/ui/SqlQuestionPrompt.jsx";
import { evaluateSqlQuery } from "../../features/study-session/evaluateSqlQuery.js";
import { getResultPreview } from "../../features/study-session/resultPreviewData.js";

function PageHeader({ certification, onBack }) {
  return (
    <header className="flex items-center justify-between gap-5 py-5">
      <BrandMark />
      <div className="flex items-center gap-3">
        <span className="hidden text-sm font-bold text-ink/50 sm:block">{certification.name}</span>
        <button className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-extrabold text-ink/65 transition hover:bg-study-aqua hover:text-ink" onClick={onBack} type="button">
          <Icon name="close" size={17} />
          Exit session
        </button>
      </div>
    </header>
  );
}

function SchemaTable({ schema }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white">
      {schema.map((table) => (
        <div key={table.name}>
          <div className="flex items-center justify-between gap-3 border-b border-ink/10 bg-study-aqua px-4 py-3">
            <span className="font-mono text-sm font-black tracking-wide text-ink">{table.name}</span>
            <span className="text-xs font-extrabold uppercase tracking-[0.12em] text-study-teal">Table schema</span>
          </div>
          <div className="divide-y divide-ink/10">
            {table.columns.map((column) => (
              <div className="flex items-center justify-between gap-4 px-4 py-2.5 text-sm" key={column.name}>
                <span className="font-mono font-bold text-ink">{column.name}</span>
                <span className="font-mono text-xs font-semibold text-ink/50">{column.type}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Feedback({ result, question }) {
  if (!result) return null;

  const isCorrect = result.isCorrect;

  return (
    <section className={`mt-6 rounded-[1.35rem] border p-5 sm:p-6 ${isCorrect ? "border-study-teal/35 bg-study-aqua" : "border-study-orange/40 bg-study-peach/45"}`} aria-live="polite" aria-labelledby="feedback-title">
      <div className="flex items-start gap-3">
        <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${isCorrect ? "bg-study-teal text-white" : "bg-study-orange text-ink"}`}><Icon name={isCorrect ? "check" : "info"} size={20} /></span>
        <div>
          <h2 className="font-black text-ink" id="feedback-title">{isCorrect ? "Nice work." : "Not quite yet."}</h2>
          <p className="mt-1 text-sm leading-6 text-ink/70">{result.message}</p>
          {!isCorrect && result.issues?.length > 0 && <ul className="mt-4 space-y-3">
            {result.issues.map((issue) => (
              <li className="rounded-xl bg-white/65 p-3 text-sm leading-6 text-ink/75" key={issue.requirement}>
                <strong className="block text-ink">{issue.requirement}</strong>
                {issue.why}
              </li>
            ))}
          </ul>}
        </div>
      </div>
      <div className="mt-5 border-t border-ink/10 pt-5">
        <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink/50">Why this works</h3>
        <p className="mt-2 text-sm leading-6 text-ink/70">{question.explanation}</p>
        <pre className="mt-4 overflow-x-auto rounded-xl bg-ink p-4 font-mono text-xs leading-6 text-white"><code>{question.solutionQuery}</code></pre>
      </div>
    </section>
  );
}

function ResultPreview({ question, result }) {
  const preview = getResultPreview(question.id);

  if (!preview) return null;

  return (
    <section className="overflow-hidden rounded-2xl border border-ink/10 bg-white" aria-labelledby="result-preview-title">
      <div className="flex items-start justify-between gap-3 border-b border-ink/10 bg-study-aqua px-4 py-3">
        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.12em] text-ink/65" id="result-preview-title">Expected result</h2>
          <p className="mt-1 text-xs font-medium text-ink/55">Sample rows for a correct query</p>
        </div>
        <span className={`mt-0.5 rounded-full px-2.5 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.1em] ${result?.isCorrect ? "bg-study-teal text-white" : "bg-white text-ink/55"}`}>{result?.isCorrect ? "Matched" : "Preview"}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left font-mono text-xs">
          <thead className="bg-ink text-white"><tr>{preview.columns.map((column) => <th className="whitespace-nowrap px-3 py-2.5 font-semibold" key={column}>{column}</th>)}</tr></thead>
          <tbody className="divide-y divide-ink/10">
            {preview.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((value, cellIndex) => <td className={`whitespace-nowrap px-3 py-2.5 ${value === "NULL" ? "text-ink/40" : "text-ink/70"}`} key={`${rowIndex}-${cellIndex}`}>{value}</td>)}</tr>)}
          </tbody>
        </table>
      </div>
      <p className="border-t border-ink/10 px-4 py-3 text-xs leading-5 text-ink/55">This is a fixed practice-data preview. Your SQL is checked locally for the required structure; it is not run against a database.</p>
    </section>
  );
}

function SessionComplete({ certification, onBack }) {
  return (
    <main className="grid min-h-[70vh] place-items-center pb-16 pt-5 sm:pt-8">
      <section className="max-w-xl rounded-[2rem] bg-study-aqua p-7 text-center sm:p-10">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-study-teal text-white"><Icon name="check" size={28} /></span>
        <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.14em] text-study-teal">Session complete</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">You completed all {certification.questions.length} practice questions.</h1>
        <p className="mt-4 text-sm leading-6 text-ink/65">Review the explanations any time, then come back for another pass as the question bank grows.</p>
        <button className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-extrabold text-white transition hover:bg-study-teal" onClick={onBack} type="button">Back to certification <Icon name="arrow" size={17} /></button>
      </section>
    </main>
  );
}

export default function StudyPage({ certification, completedQuestionIds, onBack, onCompleteQuestion }) {
  const [questionIndex, setQuestionIndex] = useState(() => certification.questions.findIndex((item) => !completedQuestionIds.includes(item.id)) || 0);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const question = certification.questions[questionIndex];

  function handleSubmit(event) {
    event.preventDefault();
    setResult(evaluateSqlQuery(query, question));
  }

  function handleTryAgain() {
    setQuery("");
    setResult(null);
  }

  function handleAdvance() {
    onCompleteQuestion(certification.id, question.id);
    if (questionIndex === certification.questions.length - 1) {
      setIsComplete(true);
      return;
    }

    setQuestionIndex((currentIndex) => currentIndex + 1);
    setQuery("");
    setResult(null);
  }

  return (
    <div className="min-h-screen bg-white text-ink">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <PageHeader certification={certification} onBack={onBack} />
        {isComplete ? <SessionComplete certification={certification} onBack={onBack} /> : <main className="pb-16 pt-5 sm:pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-study-teal">Practice session</p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">{certification.name} queries</h1>
            </div>
            <div className="rounded-full bg-study-aqua px-4 py-2 text-sm font-extrabold text-ink">Question {questionIndex + 1} of {certification.questions.length}</div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:items-start">
            <section className="rounded-[1.5rem] border border-ink/10 bg-white p-5 shadow-[0_16px_40px_rgba(24,49,61,0.06)] sm:p-7" aria-labelledby="question-title">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full bg-study-peach px-3 py-1 text-xs font-extrabold uppercase tracking-[0.12em] text-ink">{question.difficulty}</span>
                <span className="font-mono text-xs font-bold text-ink/45">{question.dialect}</span>
              </div>
              <SqlQuestionPrompt prompt={question.prompt} schema={question.schema} />
              <div className="mt-6 rounded-2xl bg-study-aqua/60 p-4 text-sm font-semibold leading-6 text-ink/70">Write the query below, then submit it to check the required structure. You can use line breaks and capitalization however you prefer.</div>

              <form className="mt-6" onSubmit={handleSubmit}>
                <label className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink/50" htmlFor="sql-answer">Your SQL query</label>
                <SqlEditor id="sql-answer" onChange={setQuery} placeholder={'SELECT *\nFROM CITY_STATS\nWHERE ...'} value={query} />
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs font-semibold text-ink/45">No code is sent anywhere. Evaluation runs locally.</p>
                  <button className="inline-flex items-center gap-2 rounded-full bg-study-teal px-5 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-ink" type="submit">Check query <Icon name="arrow" size={17} /></button>
                </div>
              </form>
              <Feedback question={question} result={result} />
              {result?.isCorrect && <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-study-teal px-4 py-2 text-sm font-extrabold text-white transition hover:bg-ink" onClick={handleAdvance} type="button">{questionIndex === certification.questions.length - 1 ? "Finish session" : "Next question"} <Icon name="arrow" size={16} /></button>}
              {result && !result.isCorrect && <button className="mt-4 rounded-full px-4 py-2 text-sm font-extrabold text-study-teal transition hover:bg-study-aqua" onClick={handleTryAgain} type="button">Try the question again</button>}
            </section>

            <aside className="space-y-5 lg:sticky lg:top-5">
              <section aria-labelledby="schema-title">
                <div className="mb-3 flex items-end justify-between gap-3"><h2 className="text-sm font-black uppercase tracking-[0.12em] text-ink/65" id="schema-title">Available schema</h2><span className="text-xs font-bold text-ink/40">Reference</span></div>
                <SchemaTable schema={question.schema} />
              </section>
              <ResultPreview question={question} result={result} />
              <section className="rounded-[1.35rem] border border-ink/10 bg-study-peach/45 p-5" aria-labelledby="hint-title">
                <div className="flex items-center gap-2"><Icon name="spark" size={18} /><h2 className="font-black text-ink" id="hint-title">Think about</h2></div>
                <ul className="mt-4 space-y-3 text-sm font-semibold leading-6 text-ink/70">
                  <li>Which columns or expression should appear in the result?</li>
                  <li>Which table relationships or filters are required?</li>
                  <li>Does the wording require ordering, grouping, or a row limit?</li>
                </ul>
              </section>
            </aside>
          </div>
        </main>}
      </div>
    </div>
  );
}
