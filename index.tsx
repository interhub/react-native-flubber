import React, {useContext, useEffect, useRef, useState} from 'react'

const flubber = require('flubber')

export type FlubberConfig = {
  //from 0 to 1
  step?: number
  //start path index to show
  initialIndex?: number
}

export const useFlubber = (paths: string[], config?: FlubberConfig) => {
  const step = config?.step || 0.01
  const initialIndex = config?.initialIndex || 0
  const [currentIndex, setFlubberIndex] = useState(initialIndex)
  const initialPath = paths[initialIndex]
  const [currentPath, setCurrentPath] = useState(initialPath)
  const pathRef = useRef<any>()

  const setNativePathProps = (path: string) => {
    pathRef?.current?.setNativeProps({
      d: path,
    })
  }

  useEffect(() => {
    let requestAnimationId: any
    const startPath = currentPath
    const endPath = paths[currentIndex]
    if (!startPath || !endPath) return
    const interpolator = flubber.interpolate(startPath, endPath)
    setNativePathProps(startPath)
    if (startPath === endPath) return
    const setFrame = (val: number) => {
      if (val >= 1 || val < 0) {
        const newPathState = paths[currentIndex]
        setNativePathProps(newPathState)
        if (!newPathState) return
        setCurrentPath(newPathState)
        return
      }
      const newPath = interpolator(val)
      setNativePathProps(newPath)
      const nextValue = val + step
      requestAnimationId = requestAnimationFrame(() => setFrame(nextValue))
    }
    setFrame(0)
    return () => {
      cancelAnimationFrame(requestAnimationId)
    }
  }, [currentIndex])

  return {pathRef, setFlubberIndex}
}
