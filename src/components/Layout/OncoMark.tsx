interface OncoMarkProps {
  className?: string
}

export function OncoMark({ className = '' }: OncoMarkProps) {
  return (
    <span
      aria-hidden="true"
      className={`relative grid place-items-center rounded-full border border-onco-healthy/45 bg-[#07130f] shadow-[0_0_22px_rgba(110,231,183,0.16),inset_0_1px_0_rgba(255,255,255,0.07)] ${className}`}
    >
      <span className="absolute h-[78%] w-[78%] rounded-full border border-onco-healthy/55" />
      <span className="absolute h-[52%] w-[52%] rounded-full border border-onco-healthy/30" />
      <span className="absolute h-[30%] w-[30%] rounded-full border border-onco-nerve/55 bg-onco-nerve/10" />
      <span className="absolute h-px w-[62%] rotate-[-24deg] bg-onco-healthy/35" />
      <span className="h-[13%] w-[13%] rounded-full bg-onco-tumor shadow-[0_0_12px_rgba(249,115,22,0.55)]" />
    </span>
  )
}
