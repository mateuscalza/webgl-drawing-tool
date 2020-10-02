import React, { useMemo } from 'react'
import styled from 'styled-components'
import { ReactSortable } from 'react-sortablejs'

const Wrapper = styled.section`
  width: 100%;
  margin-bottom: 10px;

  .layer {
    background-color: #555;
    color: #fff;
    width: 100%;
    padding: 5px;
    margin: 0 0 5px;

    span {
      margin-left: 5px;
    }
  }
`

export default function Layers({
  layers,
  onChangeLayers,
  activeLayerIndex,
  onChangeActiveLayerIndex,
}) {
  const reverseLayers = useMemo(() => layers.slice(0).reverse(), [layers])

  return (
    <Wrapper>
      <ReactSortable
        list={reverseLayers}
        setList={newLayers => onChangeLayers(newLayers.reverse())}
      >
        {reverseLayers.map((item, index) => (
          <div key={index} className='layer'>
            <input
              type='radio'
              name='active-layer'
              checked={layers.length - 1 - index === activeLayerIndex}
              onClick={() => onChangeActiveLayerIndex(layers.length - 1 - index)}
            />
            <span>{item.type}</span>
          </div>
        ))}
      </ReactSortable>
    </Wrapper>
  )
}
