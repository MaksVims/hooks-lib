import { useState, useCallback } from 'react';

interface inputProps<T> {
  value: string,
  onChange: (e: React.ChangeEvent<T>) => void,
}

type returnedValues<T> = [inputProps<T>, () => void]

export function useInput<T extends { value: string }>(defaultValue: string): returnedValues<T> {
  const [value, setValue] = useState<string>(defaultValue || '')

  const onChange = useCallback(
    (e: React.ChangeEvent<T>) => {
      setValue(e.target.value)
    }, [])

  const clear = useCallback(() => setValue(''), [])

  return [{ value, onChange }, clear]
}