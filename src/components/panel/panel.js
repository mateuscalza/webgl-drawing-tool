import React from 'react'
import styled from 'styled-components'
import Add from './add'
import Layers from './layers'
import Transform from './transform'

const Wrapper = styled.aside`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 100%;
  background-color: #444;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.6);
  /* transform-style: preserve-3d;
  transform: rotateY(-1deg); */
  justify-content: space-between;
  align-items: center;
  padding: 30px;
`

export default function Panel({
  layers,
  onChangeLayers,
  onTranslate,
  onRotate,
  onAdd,
  onUpdate,
  activeLayerIndex,
  onChangeActiveLayerIndex,
}) {
  return (
    <Wrapper>
      <Add onAdd={onAdd} />
      <Layers
        layers={layers}
        onChangeLayers={onChangeLayers}
        activeLayerIndex={activeLayerIndex}
        onChangeActiveLayerIndex={onChangeActiveLayerIndex}
      />
      {layers[activeLayerIndex] ? (
        <Transform
          layers={layers}
          activeLayerIndex={activeLayerIndex}
          onTranslate={onTranslate}
          onRotate={onRotate}
          onUpdate={onUpdate}
        />
      ) : (
        <div />
      )}
    </Wrapper>
  )
}
