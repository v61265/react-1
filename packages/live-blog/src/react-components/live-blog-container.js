import { useState, useEffect, useRef } from 'react'

import Intro from './intro'
import LiveBlogControl from './live-blog-control'
import LiveBlogItems from './live-blog-items'
import LiveBlogWrapper from './live-blog-wrapper'
import LiveBlogTags from './live-blog-tag'
import { liveblogItemId } from '../utils/anchor-scroll-helper'

const initialShowingCount = 5

export default function LiveBlogContainr({ liveblog, fetchImageBaseUrl }) { // eslint-disable-line
  const liveblogItemsRef = useRef([])
  const [boostedLiveblogItems, setBoostedLiveblogItems] = useState([])
  // showing means rendering non boosted liveblogItems
  const [showingCount, setShowingCount] = useState(initialShowingCount)
  const [showingLiveblogItems, setShowingLiveblogItems] = useState(
    [].concat(liveblog?.liveblog_items?.slice(0, initialShowingCount))
  )
  const [newToOld, setNewToOld] = useState(true)
  const loadingMoreRef = useRef(false)
  const [activeTags, setActiveTags] = useState([])
  const [firstMounted, setFirstMounted] = useState(true)

  //Get Tags
  const tagsArr = liveblog?.liveblog_items.reduce((tags, liveblogItem) => {
    const _tags = Array.isArray(liveblogItem.tags)
      ? liveblogItem.tags.map((tag) => tag?.name)
      : liveblogItem.tags?.name
    if (_tags) {
      return tags.concat(_tags)
    }
    return tags
  }, [])

  const uniqTags = [...new Set(tagsArr)].map((string) => string.slice(0, 4))

  useEffect(() => {
    if (liveblog?.liveblog_items) {
      liveblogItemsRef.current = liveblog.liveblog_items

      const boostedLiveblogItems = liveblogItemsRef.current
        .filter((liveblogItem) =>
          activeTags.length
            ? activeTags.includes(liveblogItem.tags?.name.slice(0, 4)) &&
              liveblogItem.boost
            : liveblogItem.boost
        )
        .sort((a, b) => {
          const tsA = new Date(a.publishTime).getTime()
          const tsB = new Date(b.publishTime).getTime()
          return newToOld ? tsB - tsA : tsA - tsB
        })

      const liveblogItemsToShow = liveblogItemsRef.current
        .filter((liveblogItem) =>
          activeTags.length
            ? activeTags.includes(liveblogItem.tags?.name.slice(0, 4)) &&
              !liveblogItem.boost
            : !liveblogItem.boost
        )
        .sort((a, b) => {
          const tsA = new Date(a.publishTime).getTime()
          const tsB = new Date(b.publishTime).getTime()
          return newToOld ? tsB - tsA : tsA - tsB
        })
      if (document.location.hash && firstMounted) {
        const index = liveblogItemsToShow.findIndex(
          (liveblogItem) =>
            `#${liveblogItemId(liveblogItem.id)}` === document.location.hash
        )
        setShowingCount(Math.ceil((index + 1) / 5) * 5)
        setFirstMounted(false)
      }
      const showingLiveblogItems = liveblogItemsToShow.slice(0, showingCount)

      setBoostedLiveblogItems(boostedLiveblogItems)
      setShowingLiveblogItems(showingLiveblogItems)
      loadingMoreRef.current = false
    }
  }, [liveblog, newToOld, showingCount, firstMounted, activeTags])

  // handle loadmore
  useEffect(() => {
    const loadMore = () => {
      const currentScrollingPoition =
        window.innerHeight + document.documentElement.scrollTop
      // loose comparison to prevent exact match not easy to trigger under some situation
      const reachEnd =
        currentScrollingPoition > document.scrollingElement.scrollHeight - 30
      const somethingLeftToShow =
        liveblogItemsRef.current.length -
          boostedLiveblogItems.length -
          showingLiveblogItems.length >
        0

      if (reachEnd && somethingLeftToShow && !loadingMoreRef.current) {
        loadingMoreRef.current = true
        setShowingCount((showingCount) => showingCount + 5)
      }
    }

    window.addEventListener('scroll', loadMore)
    return () => {
      window.removeEventListener('scroll', loadMore)
    }
  }, [boostedLiveblogItems, showingLiveblogItems])

  return (
    <LiveBlogWrapper>
      <Intro
        intro={{
          title: liveblog?.name,
          description: liveblog?.desc,
          time: liveblog?.updatedAt ? liveblog?.updatedAt : liveblog?.createdAt,
        }}
      />
      <LiveBlogControl
        newToOld={newToOld}
        onChangeOrder={() => {
          setNewToOld((value) => !value)
          setShowingCount(initialShowingCount)
        }}
      />
      <LiveBlogTags
        tags={uniqTags}
        activeTags={activeTags}
        updateActiveTags={(activeTags) => {
          setShowingCount(initialShowingCount)
          setActiveTags(activeTags)
        }}
      />
      <LiveBlogItems
        articles={showingLiveblogItems}
        pinedArticles={boostedLiveblogItems}
        fetchImageBaseUrl={fetchImageBaseUrl}
      />
    </LiveBlogWrapper>
  )
}
