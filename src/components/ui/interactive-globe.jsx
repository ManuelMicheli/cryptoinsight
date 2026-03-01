"use client"

import { useRef, useEffect, useCallback, useState } from "react"

/**
 * Interactive 3D Globe — canvas-based, no external deps.
 *
 * Props:
 *  - className, size            — layout
 *  - dotColor, arcColor         — base style (dotColor uses "ALPHA" placeholder)
 *  - autoRotateSpeed            — radians / frame
 *  - markers[]                  — { lat, lng, label?, color?, id? }
 *  - connections[]              — { from: [lat,lng], to: [lat,lng], color? }
 *  - onMarkerClick(id)          — optional callback
 *  - selectedMarkerId           — highlight one marker
 *  - initialRotation            — [rotY, rotX]  starting orientation
 */

/* ─── math helpers ─── */
function latLngToXYZ(lat, lng, r) {
  const phi = ((90 - lat) * Math.PI) / 180
  const theta = ((lng + 180) * Math.PI) / 180
  return [
    -(r * Math.sin(phi) * Math.cos(theta)),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  ]
}

function rotateY(x, y, z, a) {
  const c = Math.cos(a), s = Math.sin(a)
  return [x * c + z * s, y, -x * s + z * c]
}

function rotateX(x, y, z, a) {
  const c = Math.cos(a), s = Math.sin(a)
  return [x, y * c - z * s, y * s + z * c]
}

function project(x, y, z, cx, cy, fov) {
  const scale = fov / (fov + z)
  return [x * scale + cx, y * scale + cy, z]
}

export default function InteractiveGlobe({
  className = "",
  size = 600,
  dotColor = "rgba(245, 158, 11, ALPHA)",
  arcColor = "rgba(245, 158, 11, 0.25)",
  autoRotateSpeed = 0.0015,
  connections = [],
  markers = [],
  onMarkerClick,
  selectedMarkerId,
  initialRotation,
}) {
  const canvasRef = useRef(null)
  const rotYRef = useRef(initialRotation?.[0] ?? 0.3)
  const rotXRef = useRef(initialRotation?.[1] ?? 0.25)
  const dragRef = useRef({ active: false, startX: 0, startY: 0, startRotY: 0, startRotX: 0 })
  const animRef = useRef(0)
  const timeRef = useRef(0)
  const dotsRef = useRef([])
  const projMarkersRef = useRef([])            // screen-space markers (for hit-testing)

  /* Generate fibonacci-sphere points once */
  useEffect(() => {
    const dots = []
    const n = 1200
    const gr = (1 + Math.sqrt(5)) / 2
    for (let i = 0; i < n; i++) {
      const theta = (2 * Math.PI * i) / gr
      const phi = Math.acos(1 - (2 * (i + 0.5)) / n)
      dots.push([
        Math.cos(theta) * Math.sin(phi),
        Math.cos(phi),
        Math.sin(theta) * Math.sin(phi),
      ])
    }
    dotsRef.current = dots
  }, [])

  /* ─── draw loop ─── */
  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    ctx.scale(dpr, dpr)

    const cx = w / 2
    const cy = h / 2
    const radius = Math.min(w, h) * 0.38
    const fov = 600

    if (!dragRef.current.active) rotYRef.current += autoRotateSpeed
    timeRef.current += 0.015
    const time = timeRef.current

    ctx.clearRect(0, 0, w, h)

    /* outer glow */
    const glow = ctx.createRadialGradient(cx, cy, radius * 0.8, cx, cy, radius * 1.5)
    glow.addColorStop(0, "rgba(245, 158, 11, 0.025)")
    glow.addColorStop(1, "rgba(245, 158, 11, 0)")
    ctx.fillStyle = glow
    ctx.fillRect(0, 0, w, h)

    /* outline ring */
    ctx.beginPath()
    ctx.arc(cx, cy, radius, 0, Math.PI * 2)
    ctx.strokeStyle = "rgba(245, 158, 11, 0.06)"
    ctx.lineWidth = 1
    ctx.stroke()

    const ry = rotYRef.current
    const rx = rotXRef.current

    /* dots */
    for (const [dx, dy, dz] of dotsRef.current) {
      let x = dx * radius, y = dy * radius, z = dz * radius
      ;[x, y, z] = rotateX(x, y, z, rx)
      ;[x, y, z] = rotateY(x, y, z, ry)
      if (z > 0) continue
      const [sx, sy] = project(x, y, z, cx, cy, fov)
      const alpha = Math.max(0.08, 1 - (z + radius) / (2 * radius))
      const ds = 1 + alpha * 0.8
      ctx.beginPath()
      ctx.arc(sx, sy, ds, 0, Math.PI * 2)
      ctx.fillStyle = dotColor.replace("ALPHA", alpha.toFixed(2))
      ctx.fill()
    }

    /* arcs / connections */
    for (const conn of connections) {
      const [lat1, lng1] = conn.from
      const [lat2, lng2] = conn.to
      let [x1, y1, z1] = latLngToXYZ(lat1, lng1, radius)
      let [x2, y2, z2] = latLngToXYZ(lat2, lng2, radius)
      ;[x1, y1, z1] = rotateX(x1, y1, z1, rx)
      ;[x1, y1, z1] = rotateY(x1, y1, z1, ry)
      ;[x2, y2, z2] = rotateX(x2, y2, z2, rx)
      ;[x2, y2, z2] = rotateY(x2, y2, z2, ry)
      if (z1 > radius * 0.3 && z2 > radius * 0.3) continue
      const [sx1, sy1] = project(x1, y1, z1, cx, cy, fov)
      const [sx2, sy2] = project(x2, y2, z2, cx, cy, fov)

      /* elevated midpoint for arc */
      const midX = (x1 + x2) / 2
      const midY = (y1 + y2) / 2
      const midZ = (z1 + z2) / 2
      const midLen = Math.sqrt(midX * midX + midY * midY + midZ * midZ) || 1
      const arcH = radius * 1.25
      const [scx, scy] = project(
        (midX / midLen) * arcH,
        (midY / midLen) * arcH,
        (midZ / midLen) * arcH,
        cx, cy, fov,
      )

      ctx.beginPath()
      ctx.moveTo(sx1, sy1)
      ctx.quadraticCurveTo(scx, scy, sx2, sy2)
      ctx.strokeStyle = conn.color || arcColor
      ctx.lineWidth = 1
      ctx.stroke()

      /* traveling dot */
      const t = (Math.sin(time * 1.2 + lat1 * 0.1) + 1) / 2
      const tx = (1 - t) ** 2 * sx1 + 2 * (1 - t) * t * scx + t ** 2 * sx2
      const ty = (1 - t) ** 2 * sy1 + 2 * (1 - t) * t * scy + t ** 2 * sy2
      ctx.beginPath()
      ctx.arc(tx, ty, 1.5, 0, Math.PI * 2)
      ctx.fillStyle = conn.color || arcColor
      ctx.fill()
    }

    /* markers */
    const projArr = []
    for (const m of markers) {
      let [x, y, z] = latLngToXYZ(m.lat, m.lng, radius)
      ;[x, y, z] = rotateX(x, y, z, rx)
      ;[x, y, z] = rotateY(x, y, z, ry)
      if (z > radius * 0.1) continue
      const [sx, sy] = project(x, y, z, cx, cy, fov)
      const color = m.color || "rgba(245, 158, 11, 1)"
      const isSelected = selectedMarkerId && m.id === selectedMarkerId

      /* pulse ring */
      const pulse = Math.sin(time * 2 + m.lat) * 0.5 + 0.5
      ctx.beginPath()
      ctx.arc(sx, sy, (isSelected ? 6 : 4) + pulse * 4, 0, Math.PI * 2)
      ctx.strokeStyle = color.replace(/[\d.]+\)$/, `${(0.2 + pulse * 0.15).toFixed(2)})`)
      ctx.lineWidth = isSelected ? 1.5 : 1
      ctx.stroke()

      /* core dot */
      ctx.beginPath()
      ctx.arc(sx, sy, isSelected ? 4 : 2.5, 0, Math.PI * 2)
      ctx.fillStyle = color
      ctx.fill()

      /* selected glow */
      if (isSelected) {
        ctx.beginPath()
        ctx.arc(sx, sy, 12, 0, Math.PI * 2)
        ctx.strokeStyle = color.replace(/[\d.]+\)$/, "0.15)")
        ctx.lineWidth = 2
        ctx.stroke()
      }

      /* label */
      if (m.label) {
        ctx.font = "10px 'Space Grotesk', system-ui, sans-serif"
        ctx.fillStyle = color.replace(/[\d.]+\)$/, "0.7)")
        ctx.fillText(m.label, sx + 8, sy + 3)
      }

      projArr.push({ id: m.id, sx, sy })
    }
    projMarkersRef.current = projArr

    animRef.current = requestAnimationFrame(draw)
  }, [dotColor, arcColor, autoRotateSpeed, connections, markers, selectedMarkerId])

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animRef.current)
  }, [draw])

  /* ─── pointer events ─── */
  const onPointerDown = useCallback((e) => {
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      startRotY: rotYRef.current,
      startRotX: rotXRef.current,
    }
    e.target.setPointerCapture(e.pointerId)
  }, [])

  const onPointerMove = useCallback((e) => {
    if (!dragRef.current.active) return
    const dx = e.clientX - dragRef.current.startX
    const dy = e.clientY - dragRef.current.startY
    rotYRef.current = dragRef.current.startRotY + dx * 0.005
    rotXRef.current = Math.max(-1, Math.min(1, dragRef.current.startRotX + dy * 0.005))
  }, [])

  const onPointerUp = useCallback((e) => {
    if (!dragRef.current.active) return
    const dx = Math.abs(e.clientX - dragRef.current.startX)
    const dy = Math.abs(e.clientY - dragRef.current.startY)

    /* click (not drag) → hit-test markers */
    if (dx < 4 && dy < 4 && onMarkerClick) {
      const rect = canvasRef.current?.getBoundingClientRect()
      if (rect) {
        const px = e.clientX - rect.left
        const py = e.clientY - rect.top
        for (const pm of projMarkersRef.current) {
          if (Math.hypot(pm.sx - px, pm.sy - py) < 14) {
            onMarkerClick(pm.id)
            break
          }
        }
      }
    }
    dragRef.current.active = false
  }, [onMarkerClick])

  return (
    <canvas
      ref={canvasRef}
      className={`cursor-grab active:cursor-grabbing ${className}`}
      style={{ width: size, height: size }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    />
  )
}
