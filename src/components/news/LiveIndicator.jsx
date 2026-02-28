export default function LiveIndicator() {
  return (
    <div className="flex items-center gap-2">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-neon-red opacity-75" style={{ animation: 'live-pulse 1.5s ease-in-out infinite' }} />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-red" />
      </span>
      <span className="font-heading text-xs font-semibold text-neon-red tracking-wider">LIVE</span>
    </div>
  )
}
