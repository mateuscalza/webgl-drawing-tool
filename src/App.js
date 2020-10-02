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
      width: 0.1,
      height: 0.1,
      color: '#badc58',
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
