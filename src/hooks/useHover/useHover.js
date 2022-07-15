import { useState, useEffect } from 'react'

export function useHover(target) {
  const [isHover, setIsHover] = useState(false)

  useEffect(() => {
    if (!target.current) return

    const on = () => setIsHover(true)
    const off = () => setIsHover(false)
    
    const element = target.current
    element.addEventListener('pointermove', on)
    element.addEventListener('pointerenter', on)
    element.addEventListener('pointerleave', off)

    return () => {
      element.removeEventListener('pointermove', on)
      element.removeEventListener('pointerenter', on)
      element.removeEventListener('pointerleave', off)
    }

  }, [target])

  return isHover
}