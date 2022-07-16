import { useRef, useCallback } from 'react';

export function useDebounce(callback: (...args: any[]) => void, delay: number) {
  const timerID = useRef<NodeJS.Timeout>()

  return useCallback((...args: any[]) => {
    if (timerID.current) {
      clearTimeout(timerID.current)
    }

    timerID.current = setTimeout(() => {
      callback.apply(null, args)
    }, delay);

  }, [callback, delay])
}