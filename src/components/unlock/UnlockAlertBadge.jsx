export default function UnlockAlertBadge({ percentSupply }) {
  let colorClass, pulseClass
  if (percentSupply > 5) {
    colorClass = 'bg-neon-red text-white'
    pulseClass = 'animate-glow-pulse'
  } else if (percentSupply >= 2) {
    colorClass = 'bg-neon-amber text-black'
    pulseClass = 'animate-glow-pulse'
  } else {
    colorClass = 'bg-neon-green/80 text-black'
    pulseClass = ''
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${colorClass} ${pulseClass}`}>
      {percentSupply.toFixed(1)}%
    </span>
  )
}
