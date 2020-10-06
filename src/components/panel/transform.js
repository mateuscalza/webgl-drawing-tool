import React from 'react'
import styled from 'styled-components'
import arrowDown from '../../icons/arrowDown.svg'
import arrowLeft from '../../icons/arrowLeft.svg'
import arrowRight from '../../icons/arrowRight.svg'
import arrowUp from '../../icons/arrowUp.svg'
import rotateLeft from '../../icons/rotateLeft.svg'
import rotateRight from '../../icons/rotateRight.svg'

const Wrapper = styled.div`
  width: 100%;

  > .columns {
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .inputs {
    padding: 10px;
  }

  .control {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #333;
    border-radius: 6px;
    margin: 6px;
    border: none;
    box-shadow: inset 0 4px 0 rgba(0, 0, 0, 0.5);
    height: 32px;

    span {
      color: #fff;
      font-size: 13px;
      font-weight: 500;
      padding: 0 5px;
    }

    input {
      color: #fff;
      border: none;
      background: transparent;
      text-align: right;
    }
  }
`

export default function Transform({
  onTranslate,
  onRotate,
  onUpdate,
  translateFactor = 0.01,
  rotateFactor = 0.05,
  activeLayerIndex,
  layers,
}) {
  return (
    <Wrapper>
      <div className='columns'>
        <div className='rows'>
          <div className='columns'>
            <button onClick={() => onRotate(rotateFactor)}>
              <img alt='Rotate left' src={rotateLeft} />
            </button>

            <button onClick={() => onTranslate(0, translateFactor)}>
              <img alt='Translate up' src={arrowUp} />
            </button>

            <button onClick={() => onRotate(-rotateFactor)}>
              <img alt='Rotate right' src={rotateRight} />
            </button>
          </div>

          <div className='columns'>
            <button onClick={() => onTranslate(-translateFactor, 0)}>
              <img alt='Translate left' src={arrowLeft} />
            </button>
            <button onClick={() => onTranslate(0, -translateFactor)}>
              <img alt='Translate down' src={arrowDown} />
            </button>
            <button onClick={() => onTranslate(translateFactor, 0)}>
              <img alt='Translate right' src={arrowRight} />
            </button>
          </div>
        </div>

        <div className='rows inputs'>
          <label className='control'>
            <span>Color</span>{' '}
            <input
              type='color'
              value={layers[activeLayerIndex].color}
              onChange={event => onUpdate({ color: event.target.value })}
            />
          </label>

          {layers[activeLayerIndex].type === 'circle' ? (
            <label className='control'>
              <span>Radius</span>{' '}
              <input
                type='number'
                step={0.01}
                min={0}
                max={5}
                value={layers[activeLayerIndex].radius || 0}
                onChange={event => onUpdate({ radius: event.target.value })}
              />
            </label>
          ) : (
            <>
              <label className='control'>
                <span>Width</span>{' '}
                <input
                  type='number'
                  step={0.01}
                  min={0}
                  max={5}
                  value={layers[activeLayerIndex].width || 0}
                  onChange={event => onUpdate({ width: event.target.value })}
                />
              </label>

              <label className='control'>
                <span>Height</span>{' '}
                <input
                  type='number'
                  step={0.01}
                  min={0}
                  max={5}
                  value={layers[activeLayerIndex].height || 0}
                  onChange={event => onUpdate({ height: event.target.value })}
                />
              </label>
            </>
          )}
        </div>
      </div>
    </Wrapper>
  )
}
