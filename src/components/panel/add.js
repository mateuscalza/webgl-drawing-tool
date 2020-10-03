import React from 'react'
import styled from 'styled-components'
import rect from '../../icons/rect.svg'
import circle from '../../icons/circle.svg'
import triangle from '../../icons/triangle.svg'

const Wrapper = styled.aside`
  display: flex;
  flex-direction: row;

  button {
    img {
      width: 32px;
      height: 32px;
      object-fit: contain;
    }
  }
`

export default function Add({ onAdd }) {
  return (
    <Wrapper>
      <button onClick={() => onAdd('rect')}>
        <img alt='Add rect' src={rect} />
      </button>

      <button onClick={() => onAdd('circle')}>
        <img alt='Add circle' src={circle} />
      </button>

      <button onClick={() => onAdd('triangle')}>
        <img alt='Add triangle' src={triangle} />
      </button>
    </Wrapper>
  )
}
