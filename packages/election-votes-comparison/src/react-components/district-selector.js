import React, { useEffect, useState } from 'react' // eslint-disable-line
import styled from 'styled-components'
import { CloseIcon } from './icons'

const Container = styled.div`
  > div {
    padding: 8px 12px;
    border: 2px solid black;
  }

  > div:first-child {
    display: inline-block;
    background-color: #f58439;
    color: white;
  }

  > div:last-child {
    cursor: pointer;
    border-left: none;
    width: 210px;
    background-color: white;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
  }
`

const Triangle = styled.div`
  border-style: solid;
  border-width: 15px 9px 0 9px;
  border-color: black transparent transparent transparent;
`

/**
 *  @callback OnSelect
 *  @param {number|undefined} districtNumber
 */

/**
 *  @param {Object} props
 *  @param {string} [props.className]
 *  @param {number[]} [props.options=[]]
 *  @param {number} props.defaultValue
 *  @param {OnSelect} [props.onSelect]
 */
export default function Selector({
  className,
  options = [],
  defaultValue,
  onSelect,
}) {
  const [toOpenLightBox, setToOpenLightBox] = useState(false)
  return (
    <>
      <Container className={className}>
        <div>移動至</div>
        <div onClick={() => setToOpenLightBox(true)}>
          <span>
            第{defaultValue < 10 ? `0${defaultValue}` : defaultValue}選舉區
          </span>
          <Triangle />
        </div>
      </Container>
      {toOpenLightBox ? (
        <Picker
          options={options}
          onSelect={(selected) => {
            if (typeof selected === 'number') {
              onSelect(selected)
            }
            setToOpenLightBox(false)
          }}
        />
      ) : null}
    </>
  )
}

const LightBoxContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.66);
  display: flex;
`

const LightBoxBody = styled.div`
  margin: auto;

  width: 288px;
  padding: 16px;
  background-color: white;

  > div:first-child {
    display: flex;
    justify-content: space-between;
    align-items: center;

    svg {
      cursor: pointer;
    }
  }

  > div:last-child {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 25px;
  }
`

const StyledOption = styled.div`
  cursor: pointer;
  border: 1px solid #d6610c;
  border-radius: 32px;
  width: 51px;
  height: 32px;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  line-height: 150%;
  color: #d6610c;
  padding: 2px;
`

function Picker({ options, onSelect }) {
  useEffect(() => {
    // TODO lock scroll
  }, [])

  const optionsJsx = options.map((o) => {
    return (
      <StyledOption onClick={() => onSelect(o)}>
        {o < 10 ? `0${o}` : o}
      </StyledOption>
    )
  })

  return (
    <LightBoxContainer>
      <LightBoxBody>
        <div>
          <span>請選擇選區</span>
          <div onClick={() => onSelect()}>
            <CloseIcon />
          </div>
        </div>
        <div>{optionsJsx}</div>
      </LightBoxBody>
    </LightBoxContainer>
  )
}
