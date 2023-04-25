import { useState, useCallback} from "react"
import useEventListener from "./useEventListener"
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect"

const useElementHeight = <T extends HTMLElement = HTMLDivElement> (): [
  (node: T | null) => void,
  number,
] => {
  const [ref, setRef] = useState<T | null>(null)
  const [height, setHeight] = useState<number>(0)

  const handleSize = useCallback(() => {
    setHeight(ref?.offsetHeight || 0)
  }, [ref?.offsetHeight])

  useEventListener('resize', handleSize)

  useIsomorphicLayoutEffect(() => {
    handleSize()
  }, [ref?.offsetHeight])

  return [setRef, height]

}

export default useElementHeight