export default function ScenarioSlider({ label, min, max, step, value, onChange, formatFn }) {
  const percentage = ((value - min) / (max - min)) * 100

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-text-secondary text-xs">{label}</span>
        <span className="text-text-primary text-sm font-heading font-bold">
          {formatFn ? formatFn(value) : value}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(parseFloat(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #8b5cf6 0%, #00f0ff ${percentage}%, rgba(255,255,255,0.06) ${percentage}%)`,
          }}
        />
      </div>
    </div>
  )
}
