import * as d3 from 'd3'
import React, { useEffect, useMemo, useRef } from 'react'
import { useMeasure } from 'react-use'
import styled from 'styled-components'
import * as THREE from 'three'
import layerToObject from '../../utils/layerToObject'

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

export default function Board({ layers, position, isPerspectiveMode, onPositionChange }) {
  const boardRef = useRef()
  const [wrapperRef, { width, height }] = useMeasure()
  const camera = useMemo(() => {
    if (!width || !height) {
      return null
    }
    return new THREE.PerspectiveCamera(90, width / height, 0.01, 100)
  }, [width, height])
  const scene = useMemo(() => {
    const currentScene = new THREE.Scene()

    if (layers.length) {
      const objects = layers.map((layer, index) => layerToObject(layer, index, isPerspectiveMode))
      currentScene.add(...objects)
    }

    return currentScene
  }, [layers, isPerspectiveMode])
  const renderer = useMemo(() => new THREE.WebGLRenderer({ antialias: true }), [])
  const zoom = useMemo(() => {
    const d3Zoom = d3.zoom().scaleExtent([0, 3])
    const d3View = d3.select(renderer.domElement)
    d3View.call(d3Zoom)
    return d3Zoom
  }, [renderer])

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
    camera.position.set(position.x, position.y, position.z)
    camera.rotation.set(0, isPerspectiveMode ? 0.7 : 0, 0)

    renderer.render(scene, camera)
  }, [renderer, camera, scene, position, isPerspectiveMode])

  // Move camera on zoom
  useEffect(() => {
    zoom.on('zoom', event => {
      const newZ = event.transform.k
      if (newZ !== camera.position.z) {
        onPositionChange(({ x, y }) => ({ x, y, z: newZ }))
      } else {
        const { movementX, movementY } = event.sourceEvent
        const vFOV = (camera.fov * Math.PI) / 180
        const scaleHeight = 2 * Math.tan(vFOV / 2) * camera.position.z
        const currentScale = height / scaleHeight
        const x = camera.position.x - movementX / currentScale
        const y = camera.position.y + movementY / currentScale
        onPositionChange(({ z }) => ({ x, y, z }))
      }
    })
    return () => zoom.on('zoom', null)
  }, [zoom, camera, height, width, onPositionChange])

  return (
    <Wrapper ref={wrapperRef}>
      <div className='board' style={{ width, height }} ref={boardRef} />
    </Wrapper>
  )
}
