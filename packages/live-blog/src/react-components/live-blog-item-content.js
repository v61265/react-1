import { useEffect } from 'react'
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

const Img = styled.img`
  width: 100%;
  ${({ w, h }) => {
    // set aspect-ratio to prevent cls cause anchor scroll to wrong position
    if (w && h) {
      return `aspect-ratio: ${w} / ${h}`
    } else {
      return `aspect-ratio: 16 / 9`
    }
  }}
`

export default function LiveBlogItemContent({
  article,
  expanded,
  fetchImageBaseUrl,
  contentTooShort,
}) {
  let heroImage
  if (article?.heroImage) {
    heroImage = {
      caption: article.imageCaption || article.heroImage.name,
      url: fetchImageBaseUrl + article.heroImage.imageFile.url,
      width: article.heroImage.imageFile.width,
      height: article.heroImage.imageFile.height,
    }
  }

  const previewArticle = expanded
    ? article.name
    : {
        ...article.name,
        blocks: article.name.blocks.slice(0, 1),
      }

  useEffect(() => {
    if (article.name.blocks.length === 1) {
      contentTooShort(true)
    }
  }, [article])

  return (
    <Wrapper>
      <Title>{article.title}</Title>
      <HeroImageWrapper>
        {(heroImage || article.externalCoverPhoto) && (
          <>
            <Img
              src={heroImage?.url || article.externalCoverPhoto}
              alt={heroImage?.caption}
              w={heroImage?.width}
              h={heroImage?.height}
            />
            {heroImage?.caption && (
              <ImgCaption>圖說：{heroImage?.caption}</ImgCaption>
            )}
          </>
        )}
      </HeroImageWrapper>
      <DraftEditorWrapper>
        <DraftRenderer rawContentBlock={previewArticle} />
      </DraftEditorWrapper>
    </Wrapper>
  )
}
