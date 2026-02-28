export default function SkeletonLoader({ className = '', lines = 1 }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }, (_, i) => (
        <div
          key={i}
          className="animate-shimmer rounded-lg bg-white/5 h-4"
          style={{ width: i === lines - 1 && lines > 1 ? '60%' : '100%' }}
        />
      ))}
    </div>
  )
}
