import { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import DraftRenderer from './draft-js/draft-renderer'

const Wrapper = styled.div`
  margin-top: 16px;

  @media (max-width: 768px) {
    margin-top: 8px;
  }
`

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  line-height: 34.75px;
  padding: 0 116px;

  @media (max-width: 768px) {
    font-size: 18px;
    line-height: 26px;
    padding: 0;
  }
`

const HeroImageWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  position: relative;

  img {
    width: 100%;
    display: block;
  }
`

const DraftEditorWrapper = styled.div`
  margin-top: 20px;
  overflow: hidden;
  height: ${({ expanded, height }) => (expanded ? 'unset' : `${height}px`)};
  min-height: ${({ expanded, height }) => (expanded ? `${height}px` : 'unset')};
  font-size: 16px;
  line-height: 1.5;
  padding: 0 116px;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 0;
  }
`

const ImgCaption = styled.div`
  color: #999999;
  text-align: left;
  font-size: 9px;
  margin-top: 4px;
`

// 5 lines of normal text
const defaultContentHeight = 87.5

export default function LiveBlogItemContent({
  article,
  expanded,
  fetchImageBaseUrl,
  contentTooShort,
}) {
  const targetRef = useRef()
  const [contentHeight, setContentHeight] = useState(defaultContentHeight)

  let heroImage = {}
  if (article?.heroImage) {
    heroImage = {
      name: article.heroImage.name,
      url: fetchImageBaseUrl + article.heroImage.imageFile.url,
    }
  }

  useEffect(() => {
    // delay to calculate in order to get the real DOM height
    setTimeout(() => {
      if (targetRef.current) {
        /*
        accumulate the height of contentBlocks to render the wrapper with height closest to the spec (5 lines)
        and prevent words got cut vertically
        */
        const contentBlocks = [
          ...targetRef.current.querySelectorAll('[data-block="true"]'),
        ]

        let accumulationHeight = 0
        let lastMarginBottom = 0

        contentBlocks.every((contentBlock) => {
          let height = contentBlock.clientHeight
          const style = getComputedStyle(contentBlock)
          let marginTop = parseInt(style.marginTop)
          if (lastMarginBottom) {
            // prevent double counting margin since margin collapses
            marginTop =
              lastMarginBottom > marginTop ? 0 : lastMarginBottom - marginTop
          }
          let marginBottom = parseInt(style.marginBottom)
          lastMarginBottom = marginBottom

          height += marginTop
          height += marginBottom
          accumulationHeight += height
          return accumulationHeight > defaultContentHeight ? false : true
        })
        setContentHeight(accumulationHeight)
      }
    }, 100)
  }, [])

  useEffect(() => {
    if (!expanded && contentHeight !== defaultContentHeight) {
      const draftContentWrapper = targetRef.current.querySelector(
        '.public-DraftEditor-content > div'
      )

      if (draftContentWrapper.offsetHeight === contentHeight) {
        contentTooShort(true)
      }
    }
  }, [expanded, contentHeight, contentTooShort])

  return (
    <Wrapper>
      <Title>{article.title}</Title>
      <HeroImageWrapper>
        <img
          src={heroImage?.url || article.externalCoverPhoto}
          alt={heroImage?.name}
        />
        {heroImage?.name && <ImgCaption>圖說：{heroImage?.name}</ImgCaption>}
      </HeroImageWrapper>
      <DraftEditorWrapper
        expanded={expanded}
        ref={targetRef}
        height={contentHeight}
      >
        <DraftRenderer rawContentBlock={article.name} />
      </DraftEditorWrapper>
    </Wrapper>
  )
}
