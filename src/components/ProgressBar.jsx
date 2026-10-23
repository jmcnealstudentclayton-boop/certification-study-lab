export default function ProgressBar({ value, label = "Progress", tone = "teal" }) {
  const safeValue = Math.min(100, Math.max(0, value));
  const fillClass = tone === "orange" ? "bg-study-orange" : "bg-study-teal";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4 text-xs font-bold uppercase tracking-[0.12em] text-ink/55">
        <span>{label}</span>
        <span>{safeValue}%</span>
      </div>
      <div
        className="h-2 overflow-hidden rounded-full bg-study-aqua"
        role="progressbar"
        aria-label={label}
        aria-valuemax="100"
        aria-valuemin="0"
        aria-valuenow={safeValue}
      >
        <div className={`h-full rounded-full ${fillClass} transition-[width] duration-500`} style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  );
}
