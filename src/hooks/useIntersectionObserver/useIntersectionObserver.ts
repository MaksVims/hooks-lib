import { useRef, useEffect } from 'react';

export interface intersectionOptions {
  root?: Element,
  rootMargin?: string,
  threshold?: number
}

interface useIntersectionObserverOptions<T extends Element> {
  target: React.RefObject<T>,
  callback: () => void,
  isLoad: boolean,
  canRun?: boolean,
  options?: intersectionOptions,
}

export function useIntersectionObserver<T extends Element>
  ({ target, callback, options, canRun, isLoad }: useIntersectionObserverOptions<T>) {
  const observer = useRef<IntersectionObserver>()

  useEffect(() => {
    if (!target.current || isLoad) return
    
    const cb = function (entries: IntersectionObserverEntry[]) {
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