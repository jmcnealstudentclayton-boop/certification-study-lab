import { useRef } from "react";

const keywordPattern = /\b(SELECT|FROM|WHERE|AND|OR|DISTINCT|AS|ORDER|BY|GROUP|LIMIT|INNER|LEFT|RIGHT|FULL|OUTER|JOIN|ON|COUNT|AVG|SUM|MIN|MAX|LIKE|ASC|DESC|NULL|IS|NOT|IN)\b/gi;
const tokenPattern = /(\/\*[\s\S]*?\*\/|--[^\n]*|'(?:''|[^'])*'|\b\d+(?:\.\d+)?\b|<>|<=|>=|=|<|>|\b(?:SELECT|FROM|WHERE|AND|OR|DISTINCT|AS|ORDER|BY|GROUP|LIMIT|INNER|LEFT|RIGHT|FULL|OUTER|JOIN|ON|COUNT|AVG|SUM|MIN|MAX|LIKE|ASC|DESC|NULL|IS|NOT|IN)\b)/gi;

function tokenClass(token) {
  if (token.startsWith("--") || token.startsWith("/*")) return "text-white/40";
  if (token.startsWith("'")) return "text-study-peach";
  if (/^\d/.test(token) || /^(<>|<=|>=|=|<|>)$/.test(token)) return "text-study-orange";
  if (keywordPattern.test(token)) {
    keywordPattern.lastIndex = 0;
    return "text-study-teal";
  }
  keywordPattern.lastIndex = 0;
  return "text-white";
}

function HighlightedSql({ value }) {
  const parts = value.split(tokenPattern);

  return parts.map((part, index) => (
    <span className={tokenClass(part)} key={`${part}-${index}`}>{part}</span>
  ));
}

export default function SqlEditor({ id, onChange, placeholder, value }) {
  const textareaRef = useRef(null);
  const highlightRef = useRef(null);

  function syncScroll(event) {
    if (!highlightRef.current) return;
    highlightRef.current.scrollTop = event.currentTarget.scrollTop;
    highlightRef.current.scrollLeft = event.currentTarget.scrollLeft;
  }

  function handleTab(event) {
    if (event.key !== "Tab") return;

    event.preventDefault();
    const field = event.currentTarget;
    const start = field.selectionStart;
    const end = field.selectionEnd;
    const indentation = "  ";
    const nextValue = `${value.slice(0, start)}${indentation}${value.slice(end)}`;

    onChange(nextValue);
    requestAnimationFrame(() => {
      textareaRef.current?.setSelectionRange(start + indentation.length, start + indentation.length);
    });
  }

  return (
    <div className="relative mt-3 min-h-52 overflow-hidden rounded-2xl border-2 border-ink/10 bg-ink shadow-inner transition focus-within:border-study-orange">
      <pre aria-hidden="true" className="pointer-events-none absolute inset-0 m-0 overflow-auto px-4 py-4 font-mono text-sm leading-7 whitespace-pre-wrap break-words" ref={highlightRef}>
        <code>{value ? <HighlightedSql value={value} /> : <span className="text-white/35">{placeholder}</span>}</code>
      </pre>
      <textarea
        aria-label="Your SQL query"
        className="relative z-10 min-h-52 w-full resize-y bg-transparent px-4 py-4 font-mono text-sm leading-7 text-transparent caret-white outline-none selection:bg-study-teal/50"
        id={id}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleTab}
        onScroll={syncScroll}
        ref={textareaRef}
        spellCheck="false"
        value={value}
      />
    </div>
  );
}
