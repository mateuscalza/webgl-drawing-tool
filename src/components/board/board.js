import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useMeasure } from 'react-use'
import * as THREE from 'three'

const Wrapper = styled.main`
  position: relative;
  display: flex;
  flex: 1;
  height: 100%;

  canvas {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
  }
`

export default function Board() {
  const boardRef = useRef()
  const [wrapperRef, { width, height }] = useMeasure()

  useEffect(() => {
    if (!width || !height || !boardRef.current) {
      return
    }

    const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10)
    camera.position.z = 1

    const scene = new THREE.Scene()

    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
    const material = new THREE.MeshNormalMaterial()

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    boardRef.current.appendChild(renderer.domElement)
    console.log({ scene, camera })
    renderer.render(scene, camera)
  }, [boardRef, width, height])

  return (
    <Wrapper ref={wrapperRef}>
      <div className='board' style={{ width, height }} ref={boardRef} />
    </Wrapper>
  )
}
