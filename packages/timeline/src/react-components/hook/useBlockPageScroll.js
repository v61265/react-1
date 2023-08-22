import { useEffect, useRef, useState } from 'react'

/**
 * Used for nested scroll container to simulate normal scroll behavior.
 * 1. When the wrapper (most parent element) is scrolling through, fixed the wrapper and block page scrolling.
 *    (set css body {overflow: hidden;})
 * 2. When the scroll container scroll to the end or to the top. Remove fixed to the wrapper and enable page scrolling.
 * 3. Set scrollDirectionLock to prevent non-related scrolling causing fix of the wrapper.
 *    Think the nested scroll container as a normal element to better understand the lock mechanism.
 *    The lock should always lock one way, either down or up, depending on the position of the wrapper relative to window.
 * @param {number} headerHeight
 * @param {HTMLElement} scrollContainer
 * @returns
 */
export default function useBlockPageScroll(headerHeight, scrollContainer) {
  const wrapperRef = useRef(null)
  const lastScrollPositionRef = useRef(0)
  const [isFixedMode, setIsFixedMode] = useState(false)
  const scrollDirectionLockRef = useRef('')

  useEffect(() => {
    if (wrapperRef.current) {
      const timelineTop = wrapperRef.current.getBoundingClientRect().top
      // initialize the scrollDirectionLock depend on the window location relative to wrapper
      if (timelineTop - headerHeight >= 0) {
        // prevent scroll up trigger fix behavior
        scrollDirectionLockRef.current = 'up'
      } else {
        // prevent scroll down trigger fix behavior
        scrollDirectionLockRef.current = 'down'
      }
    }
  }, [headerHeight])

  useEffect(() => {
    if (wrapperRef.current) {
      lastScrollPositionRef.current = window.scrollY

      const onScroll = () => {
        const rect = wrapperRef.current.getBoundingClientRect()

        const currentScrollPosition = window.scrollY
        let scrollinDown
        if (currentScrollPosition > lastScrollPositionRef.current) {
          scrollinDown = true
        } else if (currentScrollPosition < lastScrollPositionRef.current) {
          scrollinDown = false
        }

        lastScrollPositionRef.current = currentScrollPosition

        if (typeof scrollinDown !== 'undefined') {
          if (
            scrollinDown &&
            rect.top < headerHeight &&
            scrollDirectionLockRef.current !== 'down'
          ) {
            setIsFixedMode(true)
          } else if (
            !scrollinDown &&
            rect.top > headerHeight &&
            scrollDirectionLockRef.current !== 'up'
          ) {
            setIsFixedMode(true)
          }
        }
      }

      window.addEventListener('scroll', onScroll)

      return () => {
        window.removeEventListener('scroll', onScroll)
      }
    }
  }, [headerHeight])

  useEffect(() => {
    if (isFixedMode && scrollContainer && wrapperRef.current) {
      const onScroll = () => {
        if (scrollContainer.scrollTop === 0) {
          setIsFixedMode(false)
          scrollDirectionLockRef.current = 'up'
          // UX optimization, scroll the page to the top of wrapper to behave like we just finish scroll container and keep scroll up to next part.
          setTimeout(() => {
            window.scroll(
              0,
              window.scrollY +
                wrapperRef.current.getBoundingClientRect().top -
                80
            )
          }, 0)
        } else if (
          scrollContainer.scrollTop +
            scrollContainer.getBoundingClientRect().height ===
          scrollContainer.scrollHeight
        ) {
          setIsFixedMode(false)
          scrollDirectionLockRef.current = 'down'
          // UX optimization, scroll the page to the top of wrapper to behave like we just finish scroll container and keep scroll down to next part.
          // If the wrapper is larger than 100vh, scroll window to fit the bottom of the wrapper.
          setTimeout(() => {
            window.scroll(
              0,
              window.scrollY +
                wrapperRef.current.getBoundingClientRect().top -
                80
            )
          }, 0)
        }
      }

      scrollContainer.addEventListener('scroll', onScroll)

      return () => {
        scrollContainer.removeEventListener('scroll', onScroll)
      }
    }
  }, [isFixedMode, scrollContainer])

  return { wrapperRef, isFixedMode }
}
