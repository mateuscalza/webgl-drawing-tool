import React from 'react'
import styled from 'styled-components'
import arrowDown from '../../icons/arrowDown.svg'
import arrowLeft from '../../icons/arrowLeft.svg'
import arrowUp from '../../icons/arrowUp.svg'
import arrowRight from '../../icons/arrowRight.svg'
import rotateLeft from '../../icons/rotateLeft.svg'
import rotateRight from '../../icons/rotateRight.svg'
import zoomIn from '../../icons/zoomIn.svg'
import zoomOut from '../../icons/zoomOut.svg'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  section {
    flex-direction: row;
  }
`

export default function Transform({
  onTranslate,
  onRotate,
  translateFactor = 0.01,
  rotateFactor = 0.05,
}) {
  return (
    <Wrapper>
      <section>
        <button onClick={() => onRotate(rotateFactor)}>
          <img alt='Rotate left' src={rotateLeft} />
        </button>

        <button onClick={() => onTranslate(0, translateFactor)}>
          <img alt='Translate up' src={arrowUp} />
        </button>

        <button onClick={() => onRotate(-rotateFactor)}>
          <img alt='Rotate right' src={rotateRight} />
        </button>
      </section>

      <section>
        <button onClick={() => onTranslate(-translateFactor, 0)}>
          <img alt='Translate left' src={arrowLeft} />
        </button>
        <button onClick={() => onTranslate(0, -translateFactor)}>
          <img alt='Translate down' src={arrowDown} />
        </button>
        <button onClick={() => onTranslate(translateFactor, 0)}>
          <img alt='Translate right' src={arrowRight} />
        </button>
      </section>
    </Wrapper>
  )
}
