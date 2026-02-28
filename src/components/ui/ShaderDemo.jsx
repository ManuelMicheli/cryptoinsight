"use client"

import { useState } from "react"
import { MeshGradient, DotOrbit } from "@paper-design/shaders-react"

export default function ShaderDemo() {
  const [speed] = useState(1.0)
  const [intensity] = useState(1.5)

  return (
    <div className="w-full h-full absolute inset-0">
      <MeshGradient
        className="w-full h-full absolute inset-0"
        colors={["#000000", "#0a0a0f", "#0d1f2d", "#00f0ff"]}
        speed={speed * 0.5}
        backgroundColor="#0a0a0f"
      />
      <div className="w-full h-full absolute inset-0 opacity-40">
        <DotOrbit
          className="w-full h-full"
          dotColor="#00f0ff"
          orbitColor="#8b5cf6"
          speed={speed * 1.5}
          intensity={intensity * 0.8}
        />
      </div>
    </div>
  )
}
