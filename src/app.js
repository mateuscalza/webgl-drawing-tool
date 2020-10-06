import React, { useEffect, useState } from 'react'
import { useKey } from 'react-use'
import styled from 'styled-components'
import Board from './components/board/board'
import Panel from './components/panel/panel'
import generateLayer from './utils/generateLayer'
import prevented from './utils/prevented'

const Wrapper = styled.div`
  display: flex;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  perspective: 70px;
`

function App() {
  const [boardPosition, setBoardPosition] = useState({
    x: 0,
    y: 0,
    z: 1,
  })
  const [layers, setLayers] = useState([])
  const [activeLayerIndex, setActiveLayerIndex] = useState(null)
  const [isPerspectiveMode, setIsPerspectiveMode] = useState(false)

  const handleTranslate = (x = 0, y = 0) =>
    setLayers(oldLayers => {
      const newLayers = oldLayers.slice(0)

      const currentLayer = newLayers[activeLayerIndex]

      if (!currentLayer) {
        return oldLayers
      }

      newLayers[activeLayerIndex] = {
        ...currentLayer,
        x: currentLayer.x + x,
        y: currentLayer.y + y,
      }

      return newLayers
    })

  const handleRotate = (rotation = 0) =>
    setLayers(oldLayers => {
      const newLayers = oldLayers.slice(0)

      const currentLayer = newLayers[activeLayerIndex]

      if (!currentLayer) {
        return oldLayers
      }

      newLayers[activeLayerIndex] = {
        ...currentLayer,
        rotation: currentLayer.rotation + rotation,
      }

      return newLayers
    })

  const handleUpdate = patch =>
    setLayers(oldLayers => {
      const newLayers = oldLayers.slice(0)

      const currentLayer = newLayers[activeLayerIndex]

      if (!currentLayer) {
        return oldLayers
      }

      newLayers[activeLayerIndex] = {
        ...currentLayer,
        ...patch,
      }

      return newLayers
    })

  const handleAdd = type => {
    const newLayerIndex = layers.length
    setLayers(oldLayers => [
      ...oldLayers,
      generateLayer(type, {
        x: boardPosition.x,
        y: boardPosition.y,
      }),
    ])
    setActiveLayerIndex(newLayerIndex)
  }

  // Start with forms on development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      Array.from(Array(15)).forEach(() => {
        const random = Math.random()
        handleAdd(random <= 0.3 ? 'circle' : random > 0.7 ? 'triangle' : 'rect')
      })
    }
  }, [])

  const keyTranslateFactor = 0.005
  const keyRotateFactor = 0.005
  useKey(
    'ArrowUp',
    prevented(() => handleTranslate(0, keyTranslateFactor)),
    {},
    [activeLayerIndex],
  )
  useKey(
    'ArrowDown',
    prevented(() => handleTranslate(0, -keyTranslateFactor)),
    {},
    [activeLayerIndex],
  )
  useKey(
    'ArrowLeft',
    prevented(() => handleTranslate(-keyTranslateFactor, 0)),
    {},
    [activeLayerIndex],
  )
  useKey(
    'ArrowRight',
    prevented(() => handleTranslate(keyTranslateFactor, 0)),
    {},
    [activeLayerIndex],
  )
  useKey(
    'f',
    prevented(() => handleRotate(keyRotateFactor)),
    {},
    [activeLayerIndex],
  )
  useKey(
    'g',
    prevented(() => handleRotate(-keyRotateFactor)),
    {},
    [activeLayerIndex],
  )
  useKey(
    'p',
    prevented(() => setIsPerspectiveMode(old => !old)),
    {},
    [activeLayerIndex],
  )

  return (
    <Wrapper>
      <Board
        layers={layers}
        position={boardPosition}
        onPositionChange={setBoardPosition}
        isPerspectiveMode={isPerspectiveMode}
      />
      <Panel
        layers={layers}
        onChangeLayers={setLayers}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onTranslate={handleTranslate}
        onRotate={handleRotate}
        activeLayerIndex={activeLayerIndex}
        onChangeActiveLayerIndex={setActiveLayerIndex}
      />
    </Wrapper>
  )
}

export default App
