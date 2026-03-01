export default function RegulationHotBadge({ lastUpdated }) {
  if (!lastUpdated) return null

  const updatedDate = new Date(lastUpdated)
  const now = new Date()
  const diffMs = now - updatedDate
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays > 30) return null

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-neon-amber/15 text-neon-amber border border-neon-amber/25 animate-glow-pulse">
      <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 2L3 14h9l-1 10 10-12h-9l1-10z" />
      </svg>
      NEW
    </span>
  )
}
