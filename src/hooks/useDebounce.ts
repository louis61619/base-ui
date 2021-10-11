import { useState, useEffect } from 'react'

// 這個函數的作用是延遲數值更新
const useDebounce = (value: any, dalay: number) => {
  const [debounceValue, setDebounceValue] = useState(value)
  useEffect(() => {
    // 延遲更新debounce中的值
    const handler = setTimeout(() => {
      setDebounceValue(value)
    }, dalay)

    // 會在下次effect執行時清除
    return () => {
      clearTimeout(handler)
    }
  }, [value, dalay])
  return debounceValue
}

export default useDebounce
