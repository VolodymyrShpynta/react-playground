import { useCallback, useEffect, useRef, useState } from 'react'

interface UseResizableOptions {
  /** Starting width in pixels. */
  defaultWidth: number
  /** Minimum allowed width in pixels. */
  minWidth: number
  /** Maximum allowed width in pixels. */
  maxWidth: number
}

/**
 * Manages horizontal drag-to-resize behaviour for a panel.
 *
 * Attach `handleResizeStart` to a drag-handle element's `onMouseDown`.
 * The hook tracks pointer movement via document-level listeners and
 * clamps the resulting width between `minWidth` and `maxWidth`.
 *
 * @returns `width` — current width in pixels
 * @returns `handleResizeStart` — `onMouseDown` handler for the resize grip
 */
export const useResizable = ({ defaultWidth, minWidth, maxWidth }: UseResizableOptions) => {
  const [width, setWidth] = useState(defaultWidth)
  const isResizingRef = useRef(false)
  const startXRef = useRef(0)
  const startWidthRef = useRef(defaultWidth)

  const handleResizeStart = useCallback(
    (e: React.MouseEvent) => {
      isResizingRef.current = true
      startXRef.current = e.clientX
      startWidthRef.current = width
      e.preventDefault()
    },
    [width]
  )

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizingRef.current) return
      const delta = e.clientX - startXRef.current
      const newWidth = Math.min(
        maxWidth,
        Math.max(minWidth, startWidthRef.current + delta)
      )
      setWidth(newWidth)
    }
    const handleMouseUp = () => {
      isResizingRef.current = false
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [maxWidth, minWidth])

  return { width, handleResizeStart }
}
