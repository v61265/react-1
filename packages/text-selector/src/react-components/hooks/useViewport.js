import { useEffect, useState } from 'react'

function throttle(func, timeout = 250) {
  let last
  let timer

  return function() {
    const context = this
    const args = arguments
    const now = +new Date()

    if (last && now < last + timeout) {
      clearTimeout(timer)
      timer = setTimeout(function() {
        last = now
        func.apply(context, args)
      }, timeout)
    } else {
      last = now
      func.apply(context, args)
    }
  }
}

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  })
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    const handleResizeWithThrottle = throttle(handleResize, 250)
    // Add event listener
    window.addEventListener('resize', handleResizeWithThrottle)
    // Call handler right away so state gets updated with initial window size
    handleResize()
    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('resize', handleResizeWithThrottle)
    }
  }, []) // Empty array ensures that effect is only run on mount
  return windowSize
}

export default useWindowSize
