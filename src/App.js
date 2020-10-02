import React, { useState } from 'react'
import styled from 'styled-components'
import Panel from './components/panel/panel'
import Board from './components/board/board'

const Wrapper = styled.div`
  display: flex;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  perspective: 100px;
`

function App() {
  const [layers, setLayers] = useState([
    {
      type: 'rect',
      width: 0.5,
      height: 0.5,
      color: '#686de0',
    },
    {
      type: 'rect',
      width: 0.4,
      height: 0.4,
      color: '#badc58',
    },
    {
      type: 'triangle',
      width: 0.3,
      height: 0.3,
      color: 'orange',
    },
  ])

  return (
    <Wrapper>
      <Board layers={layers} />
      <Panel />
    </Wrapper>
  )
}

export default App
