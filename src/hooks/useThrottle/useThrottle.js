import { useRef, useCallback } from 'react';

export function useThrottle(callback, delay) {
  const throttleRef = useRef(false)
  const lastCallingArgs = useRef(null)

  return useCallback((...args) => {
    if (throttleRef.current) {
      lastCallingArgs.current = args
      return
    } else {
      throttleRef.current = true
      callback(...args)

      setTimeout(() => {
        if (!lastCallingArgs.current) {
          throttleRef.current = false
          return
        }
        callback(...lastCallingArgs.current)
        lastCallingArgs.current = null
        throttleRef.current = true
        setTimeout(() => {
          throttleRef.current = false
        }, delay);
      }, delay);
    }
  }, [callback, delay])
}