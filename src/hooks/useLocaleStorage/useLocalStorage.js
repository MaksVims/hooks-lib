import { useState, useEffect } from 'react';

export function useLocaleStorage(key, initialValue) {
  function getInitialValue() {
    const json = localStorage.getItem(key)
    const result = JSON.parse(json)
    return result
  }

  const [value, setValue] = useState(() => initialValue || getInitialValue())

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  return [value, setValue]
}