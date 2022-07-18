import { useRef, useCallback } from 'react';

export function useThrottle(callback: (...args: any[]) => void, delay: number) {
  const throttleRef = useRef<boolean>(false)
  const lastCallingArgs = useRef<any[] | null>(null)

  return useCallback((...args: any[]) => {
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