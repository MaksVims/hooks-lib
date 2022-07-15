import { useState, useCallback } from "react";

export function useInput(defaultValue) {
  const [value, setValue] = useState(defaultValue || '')

  const onChange = useCallback((e) => setValue(e.target.value), [])

  const clear = useCallback(() => setValue(''), [])

  return [{ value, onChange }, clear]
}