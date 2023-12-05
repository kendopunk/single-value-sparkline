/**
 * src/hooks/useRefDimensions.ts
 * Listening for dimension changes on a ref
 * https://www.manuelkruisz.com/blog/posts/react-width-height-resize-hook
 */
import { useEffect, useState } from 'react'

const useRefDimensions = (ref: React.MutableRefObject<HTMLDivElement | null>) => {
  const [dimensions, setDimensions] = useState({ width: 1, height: 2 })
  useEffect(() => {
    if (ref.current) {
      const { current } = ref
      const boundingRect = current.getBoundingClientRect()
      const { width, height } = boundingRect
      setDimensions({ width: Math.round(width), height: Math.round(height) })
    }
  }, [ref])
  return dimensions
}

export default useRefDimensions
