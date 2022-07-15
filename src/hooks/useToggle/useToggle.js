import { useState, useCallback } from 'react'

export function useToggle(defaultValue = false) {
  const [state, setState] = useState(defaultValue)

  const toggleState = useCallback((newState) => {
    setState(prevState => newState ? newState : !prevState)
  }, [])

  return [state, toggleState]
}