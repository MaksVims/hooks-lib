import { useRef, useCallback } from 'react';

export function useDebounce(callback, delay) {
  const timerID = useRef()

  return useCallback((...args) => {
    if (timerID.current) {
      clearTimeout(timerID.current)
    }

    timerID.current = setTimeout(() => {
      callback.apply(null, args)
    }, delay);

  }, [callback, delay])
}