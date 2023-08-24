import { useContext } from 'react'
import styled from 'styled-components'
import icons from './icons'
import { TagsContext } from './useTags'

const Wrapper = styled.div`
  pointer-events: none;
  padding-bottom: 4px;
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  z-index: 10;

  @media (min-width: 768px) {
    left: 170px;
  }
`

const LevelControl = styled.div`
  pointer-events: auto;
  margin: 0 0 16px 14px;
  width: 36px;
  height: 84px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (min-width: 768px) {
    margin: 0;
  }
`

const LevelControlTopButton = styled.button`
  cursor: pointer;
  width: 36px;
  height: 36px;
  top: 0;
`

const LevelControlBottomButton = styled.button`
  cursor: pointer;
  width: 36px;
  height: 36px;
  bottom: 0;
`

const MobileTagsControl = styled.div`
  pointer-events: auto;
  padding-left: 8px;
  padding: 0 0 8px 8px;
  display: flex;
  @media (min-width: 768px) {
    display: none;
  }
`

const PcTagsControl = styled.div`
  display: none;
  @media (min-width: 768px) {
    pointer-events: none;
    display: block;
    margin-left: 24px;
    position: absolute;
    top: 20px;
    height: calc(100% - 20px);
  }
`

const Tag = styled.div`
  pointer-events: auto;
  cursor: pointer;
  border-radius: 4px;
  max-width: 96px;
  height: 20px;
  margin: 2px 4px 2px 0;
  padding: 0 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (min-width: 768px) {
    max-width: fit-content;
    margin-bottom: 4px;
  }
  ${({ selected }) =>
    selected
      ? `
      background: #000;
    `
      : `
      background: #fff;
    `}
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
  @media (min-width: 768px) {
    max-width: unset;
  }
  ${({ selected }) =>
    selected
      ? `
    color: #fff;
  `
      : `
    color: #000;
  `}
`

const TagPrefix = styled.span`
  color: #000;
`

export default function TimelineControl({
  maxLevel,
  level,
  updateLevel,
  selectedTags,
  headerHeight,
  allTags,
}) {
  const { addTag, removeTag } = useContext(TagsContext)
  const disableNarrowDown = level === 1
  const disableScaleUp = level === maxLevel

  return (
    <>
      <Wrapper headerHeight={headerHeight}>
        <LevelControl>
          <LevelControlTopButton
            onClick={() => {
              if (disableNarrowDown) {
                return
              }
              updateLevel(level - 1)
            }}
          >
            {disableNarrowDown ? <icons.PlusDisabled /> : <icons.Plus />}
          </LevelControlTopButton>
          <LevelControlBottomButton
            onClick={() => {
              if (disableScaleUp) {
                return
              }
              updateLevel(level + 1)
            }}
          >
            {disableScaleUp ? <icons.MinusDisabled /> : <icons.Minus />}
          </LevelControlBottomButton>
        </LevelControl>
        {selectedTags?.length > 0 && (
          <MobileTagsControl selected={true}>
            {selectedTags.map((tag) => (
              <Tag key={tag} selected={true}>
                <TagButton
                  onClick={() => {
                    removeTag(tag)
                  }}
                >
                  <icons.Close />
                </TagButton>
                <TagName selected={true}>{tag.slice(0, 4)}</TagName>
              </Tag>
            ))}
          </MobileTagsControl>
        )}
      </Wrapper>
      <PcTagsControl headerHeight={headerHeight}>
        {allTags.map((tag) => {
          const selected = selectedTags.includes(tag)
          return (
            <Tag
              key={tag}
              selected={selected}
              onClick={() => {
                if (selected) {
                  removeTag(tag)
                } else {
                  addTag(tag)
                }
              }}
            >
              {selected ? (
                <TagButton>
                  <icons.Close />
                </TagButton>
              ) : (
                <TagPrefix>#</TagPrefix>
              )}
              <TagName selected={selected}>{tag}</TagName>
            </Tag>
          )
        })}
      </PcTagsControl>
    </>
  )
}
