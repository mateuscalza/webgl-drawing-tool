import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.aside`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 100%;
  background-color: #444;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.6);
  transform-style: preserve-3d;
  transform: rotateY(-0.5deg);
  padding: 30px;
`

export default function Panel() {
  return <Wrapper></Wrapper>
}
