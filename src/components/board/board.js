import React, { useRef } from 'react'
import styled from 'styled-components'
import { useMeasure } from 'react-use'

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
  const canvasRef = useRef()
  const [wrapperRef, { width, height }] = useMeasure()

  return (
    <Wrapper ref={wrapperRef}>
      <canvas width={width} height={height} ref={canvasRef} />
    </Wrapper>
  )
}
