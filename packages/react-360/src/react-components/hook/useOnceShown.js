import { useEffect, useState } from 'react'

export default function useOnceShown(ref) {
  const [onceShown, setOnceShown] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setOnceShown(true)
        observer.disconnect()
      }
    })
    if (ref.current) observer.observe(ref.current)
    return () => {
      observer.disconnect()
    }
  }, [ref])

  return onceShown
}
