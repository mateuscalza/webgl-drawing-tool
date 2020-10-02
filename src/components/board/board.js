import React, { useEffect, useMemo, useRef } from 'react'
import styled from 'styled-components'
import { useMeasure } from 'react-use'
import * as THREE from 'three'

const Wrapper = styled.main`
  position: relative;
  display: flex;
  flex: 1;
  height: 100%;

  .board {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
  }
`

export default function Board({ layers }) {
  const boardRef = useRef()
  const [wrapperRef, { width, height }] = useMeasure()
  const camera = useMemo(() => {
    if (!width || !height) {
      return null
    }
    const currentCamera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10)
    currentCamera.position.z = 1
    return currentCamera
  }, [width, height])
  const scene = useMemo(() => {
    const currentScene = new THREE.Scene()

    const objects = layers.map((layer, index) => {
      switch (layer.type) {
        case 'rect':
          const mesh = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(layer.width, layer.height),
            new THREE.MeshBasicMaterial({ color: layer.color, transparent: true, opacity: 0.9 }),
          )
          // mesh.position.z = -(layers.length - index)
          return mesh
        default:
          throw new Error('Unknown layer type')
      }
      // const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
      // const material = new THREE.MeshNormalMaterial()
      // const mesh = new THREE.Mesh(geometry, material)
    })

    currentScene.add(...objects)

    return currentScene
  }, [layers])
  const renderer = useMemo(() => new THREE.WebGLRenderer({ antialias: true }), [])

  // Responsive renderer
  useEffect(() => {
    if (!width || !height || !renderer) {
      return
    }

    renderer.setSize(width, height)
  }, [renderer, width, height])

  // Attach to DOM
  useEffect(() => {
    if (!boardRef.current || !renderer) {
      return
    }

    boardRef.current.innerHTML = ''
    boardRef.current.appendChild(renderer.domElement)
  }, [boardRef, renderer])

  // Render
  useEffect(() => {
    if (!camera || !scene || !renderer) {
      return
    }
    renderer.render(scene, camera)
  }, [renderer, camera, scene])

  return (
    <Wrapper ref={wrapperRef}>
      <div className='board' style={{ width, height }} ref={boardRef} />
    </Wrapper>
  )
}
