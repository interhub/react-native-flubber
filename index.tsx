import React, {useContext, useEffect, useRef, useState} from 'react'
import {useAnimatedProps, useSharedValue} from 'react-native-reanimated'

const flubber = require('flubber')

export type FlubberConfig = {
    //from 0 to 1
    step?: number
    //start path index to show
    initialIndex?: number
    //on change frame from 0 to 1
    onChange?: (path: string, frame: number,) => void
}

export const useFlubber = (paths: string[], config?: FlubberConfig) => {
    const step = config?.step || 0.01
    const initialIndex = config?.initialIndex || 0
    const [currentIndex, setFlubberIndex] = useState(initialIndex)
    const initialPath = paths[initialIndex]
    const [currentPath, setCurrentPath] = useState(initialPath)
    const sharedPathValue = useSharedValue(initialPath)

    const animatedProps = useAnimatedProps(() => ({
        d: sharedPathValue.value,
    }))

    const setNativePathProps = (path: string, frame: number) => {
        sharedPathValue.value = path
        if (config?.onChange)
            config?.onChange(path, frame)
    }

    useEffect(() => {
        let requestAnimationId: any
        const startPath = currentPath
        const endPath = paths[currentIndex]
        if (!startPath || !endPath) return
        const interpolator = flubber.interpolate(startPath, endPath)
        setNativePathProps(startPath, 0)
        if (startPath === endPath) return
        const setFrame = (val: number) => {
            if (val >= 1 || val < 0) {
                const newPathState = paths[currentIndex]
                setNativePathProps(newPathState, 1)
                if (!newPathState) return
                setCurrentPath(newPathState)
                return
            }
            const newPath = interpolator(val)
            setNativePathProps(newPath, val)
            const nextValue = val + step
            requestAnimationId = requestAnimationFrame(() => setFrame(nextValue))
        }
        setFrame(0)
        return () => {
            cancelAnimationFrame(requestAnimationId)
        }
    }, [currentIndex])

    return {animatedProps, setFlubberIndex, sharedPathValue, currentIndex}
}
