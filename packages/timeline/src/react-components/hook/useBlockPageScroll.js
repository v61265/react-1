import { useEffect, useRef, useState } from 'react'

export default function useBlockPageScroll(headerHeight, scrollContainer) {
  const wrapperRef = useRef(null)
  const lastScrollPositionRef = useRef(0)
  const [isFixedMode, setIsFixedMode] = useState(false)
  const scrollDirectionLockRef = useRef('')

  useEffect(() => {
    if (wrapperRef.current) {
      const timelineTop = wrapperRef.current.getBoundingClientRect().top
      if (timelineTop - headerHeight >= 0) {
        scrollDirectionLockRef.current = 'up'
      } else {
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
