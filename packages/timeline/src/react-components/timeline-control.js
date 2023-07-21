import { useContext } from 'react'
import styled from 'styled-components'
import icons from './icons'
import { TagsContext } from './useTags'

const Wrapper = styled.div`
  pointer-events: none;
  padding-bottom: 4px;
  display: flex;
  flex-direction: column;
  ${({ stickyStrategy }) => {
    switch (stickyStrategy) {
      case 'absolute':
        return `
          position: absolute;
          bottom: 0;
        `
      case 'fixed':
        return `
          position: fixed;
          bottom: 0;
        `
      case 'absolute-top':
        return `
          position: absolute;
          top: calc(100vh - 70px - 20px - 84px);
        `
      case 'absolute-bottom':
      default:
        return `
        position: absolute;
        bottom: 0;

      `
    }
  }}
  z-index: 1000;
`

const LevelControl = styled.div`
  pointer-events: auto;
  margin: 0 0 16px 14px;
  width: 36px;
  height: 84px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const LevelControlTopButton = styled.button`
  cursor: pointer;
  width: 36px;
  height: 36px;
  top: 0;
  z-index: 100;
`

const LevelControlBottomButton = styled.button`
  cursor: pointer;
  width: 36px;
  height: 36px;
  bottom: 0;
  z-index: 100;
`

const TagsControl = styled.div`
  pointer-events: auto;
  padding-left: 8px;
  padding: 0 0 8px 8px;
  display: flex;
`

const Tag = styled.div`
  background: #000;
  border-radius: 4px;
  max-width: 96px;
  height: 20px;
  margin: 2px 4px 2px 0;
  padding: 0 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const TagButton = styled.button`
  height: 16px;
  width: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const TagName = styled.span`
  font-size: 16px;
  line-height: 20px;
  max-width: 68px;
  color: #fff;
  text-wrap: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 4px;
`

export default function TimelineControl({
  maxLevel,
  level,
  updateLevel,
  stickyStrategy,
  tags,
}) {
  const { removeTag } = useContext(TagsContext)
  return (
    <Wrapper stickyStrategy={stickyStrategy}>
      <LevelControl>
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
      {tags?.length > 0 && (
        <TagsControl>
          {tags.map((tag) => (
            <Tag key={tag}>
              <TagButton
                onClick={() => {
                  removeTag(tag)
                }}
              >
                <icons.Close />
              </TagButton>
              <TagName>{tag.slice(0, 4)}</TagName>
            </Tag>
          ))}
        </TagsControl>
      )}
    </Wrapper>
  )
}
