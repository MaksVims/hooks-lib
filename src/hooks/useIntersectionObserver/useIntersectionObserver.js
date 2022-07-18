import { useRef, useEffect } from 'react';

export function useIntersectionObserver({ target, callback, options, canRun, isLoad }) {
  const observer = useRef()

  useEffect(() => {
    if (!target.current || isLoad) return

    const cb = function (entries) {
      if (entries[0].isIntersecting && canRun) {
        callback()
      }
    }

    observer.current = new IntersectionObserver(cb, options)
    observer.current.observe(target.current)

    return () => {
      observer.current?.disconnect()
    }
  }, [callback, canRun, isLoad, options, target])
}