import styled from 'styled-components'
import icons from './icons'

const LevelControl = styled.div`
  left: 14px;
  width: 36px;
  height: 84px;
  display: flex;
  flex-direction: column;
  ${({ stickyStrategy }) => {
    switch (stickyStrategy) {
      case 'fixed':
        return `
            position: fixed;
            bottom: 20px;

          `
      case 'absolute-top':
        return `
            position: absolute;
            top: 440px;
            bottom: unset;
          `

      case 'absolute-bottom':
      default:
        return `
          position: absolute;
          bottom: 20px;

        `
    }
  }}
  
  }}
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

export default function TimelineControl({
  maxLevel,
  level,
  updateLevel,
  stickyStrategy,
}) {
  return (
    <>
      <LevelControl stickyStrategy={stickyStrategy}>
        <LevelControlTopButton
          onClick={() => {
            if (level === 1) {
              return
            }
            updateLevel(level - 1)
          }}
        >
          <icons.Plus />
        </LevelControlTopButton>
        <LevelControlBottomButton
          onClick={() => {
            if (level === maxLevel) {
              return
            }
            updateLevel(level + 1)
          }}
        >
          <icons.Minus />
        </LevelControlBottomButton>
      </LevelControl>
    </>
  )
}
