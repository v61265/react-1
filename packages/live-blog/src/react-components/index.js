import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

import { JumbotronContainer } from './jumbotron'
import LiveBlogContainr from './live-blog-container'
import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #fff1db;
  }
`

export default function LiveBlog({
  initialLiveblog,
  fetchLiveblogUrl,
  fetchImageBaseUrl,
}) {
  const [liveblog, setLiveblog] = useState(initialLiveblog)
  const intervalIdRef = useRef()

  useEffect(() => {
    const fetchLiveblog = async (url) => {
      try {
        const response = await axios.get(url)

        if (response?.data) {
          setLiveblog(response.data)
        }
      } catch (error) {
        console.error('Fetching liveblog with error', error)
      }
    }

    if (fetchLiveblogUrl) {
      if (!initialLiveblog) {
        fetchLiveblog(fetchLiveblogUrl)
      }
      intervalIdRef.current = setInterval(() => {
        fetchLiveblog(fetchLiveblogUrl)
      }, 60000)
    }

    return () => {
      clearInterval(intervalIdRef.current)
    }
  }, [fetchLiveblogUrl, initialLiveblog])

  if (!fetchLiveblogUrl) return <p>Please asign liveblog slug name</p>

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
