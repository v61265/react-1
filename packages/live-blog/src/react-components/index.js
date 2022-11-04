import DataLoader from '../data-loader'
import LiveBlogContainr from './live-blog-container'
import { JumbotronContainer } from './jumbotron'
import { createGlobalStyle } from 'styled-components'
import { useState, useEffect } from 'react'

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #fff1db;
  }
`

export default function LiveBlog({
  initialLiveblog,
  fetchLiveblogUrl = '',
  fetchImageBaseUrl = 'https://editools-gcs-dev.readr.tw',
}) {
  const [liveblog, setLiveblog] = useState(initialLiveblog)

  let dataLoader = new DataLoader()

  useEffect(() => {
    if (fetchLiveblogUrl) {
      const handleError = (errMsg, errObj) => {
        console.log(errMsg, errObj)
      }

      const handleData = (data) => {
        setLiveblog(data)
      }

      dataLoader.addEventListener('error', handleError)
      dataLoader.addEventListener('data', handleData)

      // after register event listener
      // start to load data periodically
      dataLoader.loadDataPeriodically(fetchLiveblogUrl)

      return () => {
        dataLoader.removeEventListener('error', handleError)
        dataLoader.removeEventListener('data', handleData)
        dataLoader = null
      }
    }
  }, [fetchLiveblogUrl, initialLiveblog])

  return (
    <>
      <div id="light-box-root" />
      <GlobalStyles />
      {liveblog?.heroImage && (
        <JumbotronContainer
          image={{
            name: liveblog.heroImage.name,
            url: fetchImageBaseUrl + liveblog.heroImage.imageFile.url,
          }}
        />
      )}
      <LiveBlogContainr
        liveblog={liveblog}
        fetchImageBaseUrl={fetchImageBaseUrl}
      />
    </>
  )
}
