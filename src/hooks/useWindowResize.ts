/*
 * packages/frontend/src/hooks/useWindowResize.ts
 * Description: https://usehooks.com/useWindowSize/
 */
import { useState, useEffect } from 'react'
import { debounce } from 'lodash'

const useWindowResize = (delay = 500): Record<string, string | number | undefined> => {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState<Record<string, string | number | undefined>>({
    width: undefined,
    height: undefined
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    const debouncer = debounce(handleResize, delay)

    // Add event listener
    window.addEventListener('resize', debouncer)

    // Call handler right away so state gets updated with initial window size
    handleResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', debouncer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Empty array ensures that effect is only run on mount

  return windowSize
}

export default useWindowResize
