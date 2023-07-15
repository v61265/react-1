import styled from 'styled-components'
import { Minus, Plus } from './icons'

const LevelControl = styled.div`
  position: fixed;
  left: 14px;
  bottom: 20px;
  width: 36px;
  height: 84px;
  display: flex;
  flex-direction: column;
`

const LevelControlTopButton = styled.button`
  position: absolute;
  cursor: pointer;
  width: 36px;
  height: 36px;
  top: 0;
  z-index: 100;
`

const LevelControlBottomButton = styled.button`
  position: absolute;
  cursor: pointer;
  width: 36px;
  height: 36px;
  bottom: 0;
  z-index: 100;
`

export default function TimelineControl({ maxLevel, level, updateLevel }) {
  return (
    <>
      <LevelControl>
        {level !== 1 && (
          <LevelControlTopButton
            onClick={() => {
              updateLevel(level - 1)
            }}
          >
            <Plus />
          </LevelControlTopButton>
        )}
        {level < maxLevel && (
          <LevelControlBottomButton
            onClick={() => {
              updateLevel(level + 1)
            }}
          >
            <Minus />
          </LevelControlBottomButton>
        )}
      </LevelControl>
    </>
  )
}
