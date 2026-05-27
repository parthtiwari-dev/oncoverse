interface OncoMarkProps {
  className?: string
}

export function OncoMark({ className = '' }: OncoMarkProps) {
  return (
    <span
      aria-hidden="true"
      className={`relative grid place-items-center rounded-full border border-onco-healthy/35 bg-onco-healthy/8 shadow-[0_0_24px_rgba(110,231,183,0.12)] ${className}`}
    >
      <span className="absolute h-[68%] w-[68%] rounded-full border border-onco-healthy/45" />
      <span className="absolute h-[38%] w-[38%] rounded-full border border-onco-nerve/45" />
      <span className="h-[14%] w-[14%] rounded-full bg-onco-tumor/85 shadow-[0_0_14px_rgba(249,115,22,0.42)]" />
    </span>
  )
}
