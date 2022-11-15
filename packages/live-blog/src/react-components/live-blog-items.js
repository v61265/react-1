import styled from 'styled-components'
import LiveBlogItem from './live-blog-item'
import LiveBlogItemExternal from './live-blog-item-external'

const Wrapper = styled.div`
  margin-top: 29px;

  @media (max-width: 768px) {
    margin-top: 18px;

    > div:first-child > div {
      margin-top: unset;
    }
  }
`

export default function LiveBlogItems({
  pinedArticles,
  articles,
  fetchImageBaseUrl,
}) {
  return (
    <Wrapper>
      {pinedArticles.map((article) =>
        article.type !== 'external' ? (
          <LiveBlogItem
            key={article.id}
            pined
            article={article}
            fetchImageBaseUrl={fetchImageBaseUrl}
          />
        ) : (
          <LiveBlogItemExternal
            key={article.id}
            pined
            article={article}
            fetchImageBaseUrl={fetchImageBaseUrl}
          />
        )
      )}
      {articles.map((article) =>
        article.type !== 'external' ? (
          <LiveBlogItem
            key={article.id}
            article={article}
            fetchImageBaseUrl={fetchImageBaseUrl}
          />
        ) : (
          <LiveBlogItemExternal
            key={article.id}
            article={article}
            fetchImageBaseUrl={fetchImageBaseUrl}
          />
        )
      )}
    </Wrapper>
  )
}
