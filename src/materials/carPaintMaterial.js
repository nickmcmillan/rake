import React, { useMemo } from 'react'
import * as THREE from 'three'

/**
 * @author mrdoob / http://mrdoob.com/
 */

export const flakesTexture = (width = 512, height = 512) => {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const context = canvas.getContext('2d')
  context.fillStyle = 'rgb(127,127,255)'
  context.fillRect(0, 0, width, height)

  for (let i = 0; i < 4000; i++) {
    const x = Math.random() * width
    const y = Math.random() * height
    const r = Math.random() * 3 + 3

    let nx = Math.random() * 2 - 1
    let ny = Math.random() * 2 - 1
    let nz = 1.5

    const l = Math.sqrt(nx * nx + ny * ny + nz * nz)

    nx /= l
    ny /= l
    nz /= l

    context.fillStyle = 'rgb(' + (nx * 127 + 127) + ',' + (ny * 127 + 127) + ',' + nz * 255 + ')'
    context.beginPath()
    context.arc(x, y, r, 0, Math.PI * 2)
    context.fill()
  }

  return canvas
}

export const CarPaintMaterial = ({ color, attach }) => {
  const flakes = useMemo(() => flakesTexture(512, 512), [])

  return (
    <meshPhysicalMaterial
      attach={attach}
      clearcoat={1.0}
      clearcoatRoughness={0.1}
      metalness={0.9}
      roughness={0.5}
      color={color}
      normalScale-x={0.15}
      normalScale-y={0.15}>
      <canvasTexture
        attach="normalMap"
        args={[flakes]}
        wrapS={THREE.RepeatWrapping}
        wrapT={THREE.RepeatWrapping}
        repeat-x={10}
        repeat-y={6}
        anisotropy={16}
      />
    </meshPhysicalMaterial>
  )
}
