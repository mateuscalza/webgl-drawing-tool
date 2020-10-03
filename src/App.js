import React, { useState } from 'react'
import styled from 'styled-components'
import { useKey } from 'react-use'
import Panel from './components/panel/panel'
import Board from './components/board/board'
import prevented from './utils/prevented'
import generateLayer from './utils/generateLayer'

const Wrapper = styled.div`
  display: flex;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  perspective: 70px;
`

function App() {
  const [activeLayerIndex, setActiveLayerIndex] = useState(0)
  const [layers, setLayers] = useState([])

  const handleTranslate = (x = 0, y = 0) =>
    setLayers(oldLayers => {
      const newLayers = oldLayers.slice(0)

      const currentLayer = newLayers[activeLayerIndex]
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
      newLayers[activeLayerIndex] = {
        ...currentLayer,
        rotation: currentLayer.rotation + rotation,
      }

      return newLayers
    })

  const handleAdd = type => {
    setLayers(oldLayers => [...oldLayers, generateLayer(type)])
    console.log('type', type)
  }

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

  return (
    <Wrapper>
      <Board layers={layers} />
      <Panel
        layers={layers}
        onChangeLayers={setLayers}
        onAdd={handleAdd}
        onTranslate={handleTranslate}
        onRotate={handleRotate}
        activeLayerIndex={activeLayerIndex}
        onChangeActiveLayerIndex={setActiveLayerIndex}
      />
    </Wrapper>
  )
}

export default App
