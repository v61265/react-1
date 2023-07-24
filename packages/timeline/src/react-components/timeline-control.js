import { useContext } from 'react'
import styled from 'styled-components'
import icons from './icons'
import { TagsContext } from './useTags'

const Wrapper = styled.div`
  pointer-events: none;
  padding-bottom: 4px;
  display: flex;
  flex-direction: column;
  ${({ stickyStrategy, headerHeight }) => {
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
          top: calc(100vh - ${headerHeight}px - 20px - 84px);
        `
      case 'absolute-bottom':
      default:
        return `
        position: absolute;
        bottom: 0;

      `
    }
  }}
  z-index: 10;

  @media (min-width: 768px) {
    left: 200px;
  }
  @media (min-width: 1200px) {
      ${({ stickyStrategy }) =>
        stickyStrategy === 'fixed' &&
        `
        left: calc((100vw - 1200px)/2 + 200px);
      `}
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
    margin: 20px 0 0 24px;
    ${({ stickyStrategy, headerHeight }) => {
      switch (stickyStrategy) {
        case 'absolute':
          return `
            position: absolute;
            top: 0px;
            height: calc(100vh - ${headerHeight}px);
          `
        case 'fixed':
          return `
            position: fixed;
            top: ${headerHeight}px;
            height: calc(100vh - ${headerHeight}px);
          `
        case 'absolute-top':
          return `
            position: absolute;
            top: 0;
            height: calc(100vh - ${headerHeight}px);
          `
        case 'absolute-bottom':
        default:
          return `
          position: absolute;
          bottom: 0;
          height: calc(100vh - ${headerHeight}px);

        `
      }
    }}
  }
`

const Tag = styled.div`
  pointer-events: auto;
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
  stickyStrategy,
  selectedTags,
  headerHeight,
  allTags,
}) {
  const { removeTag } = useContext(TagsContext)
  const disableNarrowDown = level === 1
  const disableScaleUp = level === maxLevel
  return (
    <>
      <Wrapper stickyStrategy={stickyStrategy} headerHeight={headerHeight}>
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
      <PcTagsControl
        stickyStrategy={stickyStrategy}
        headerHeight={headerHeight}
      >
        {allTags.map((tag) => {
          const selected = selectedTags.includes(tag)
          return (
            <Tag key={tag} selected={selected}>
              {selected ? (
                <TagButton
                  onClick={() => {
                    removeTag(tag)
                  }}
                >
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
