import { forwardRef } from 'react'

const ShimmerButton = forwardRef(
  (
    {
      shimmerColor = '#ffffff',
      shimmerSize = '0.05em',
      shimmerDuration = '3s',
      borderRadius = '100px',
      background = 'rgba(0, 0, 0, 1)',
      className = '',
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        style={{
          '--spread': '90deg',
          '--shimmer-color': shimmerColor,
          '--radius': borderRadius,
          '--speed': shimmerDuration,
          '--cut': shimmerSize,
          '--bg': background,
        }}
        className={[
          'group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 text-white [background:var(--bg)] [border-radius:var(--radius)]',
          'transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px',
          className,
        ].filter(Boolean).join(' ')}
        ref={ref}
        {...props}
      >
        {/* spark container */}
        <div className="absolute inset-0 overflow-visible [container-type:size]" style={{ zIndex: -30, filter: 'blur(2px)' }}>
          {/* spark */}
          <div
            className="absolute inset-0 h-[100cqh] [aspect-ratio:1] [border-radius:0] [mask:none]"
            style={{ animation: 'shimmer-slide var(--speed) ease-in-out infinite alternate' }}
          >
            {/* spark before */}
            <div
              className="absolute -inset-full w-auto rotate-0 [translate:0_0]"
              style={{
                animation: 'spin-around calc(var(--speed) * 2) infinite linear',
                background: 'conic-gradient(from calc(270deg - (var(--spread) * 0.5)), transparent 0, var(--shimmer-color) var(--spread), transparent var(--spread))',
              }}
            />
          </div>
        </div>
        {children}

        {/* Highlight */}
        <div
          className={[
            'inset-0 absolute size-full',
            'rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f]',
            'transform-gpu transition-all duration-300 ease-in-out',
            'group-hover:shadow-[inset_0_-6px_10px_#ffffff3f]',
            'group-active:shadow-[inset_0_-10px_10px_#ffffff3f]',
          ].join(' ')}
        />

        {/* backdrop */}
        <div className="absolute -z-20 [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]" />
      </button>
    )
  },
)

ShimmerButton.displayName = 'ShimmerButton'

export { ShimmerButton }
