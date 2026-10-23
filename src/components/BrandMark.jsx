export default function BrandMark() {
  return (
    <div className="flex items-center gap-3" aria-label="Certification Study Lab">
      <div className="grid size-10 place-items-center rounded-2xl bg-study-teal text-white shadow-[0_8px_18px_rgba(46,196,182,0.24)]">
        <span className="text-lg font-black tracking-[-0.08em]">C<span className="text-study-peach">S</span></span>
      </div>
      <div className="leading-tight">
        <p className="text-sm font-extrabold tracking-tight text-ink">Certification</p>
        <p className="text-sm font-extrabold tracking-tight text-ink">Study Lab</p>
      </div>
    </div>
  );
}
