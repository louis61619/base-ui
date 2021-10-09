import { useEffect, RefObject } from 'react'

const useClickOutSide = (ref: RefObject<HTMLElement>, handler: Function) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
        return
      }
      handler()
    }

    window.addEventListener('click', listener)

    return () => {
      window.removeEventListener('click', listener)
    }
  }, [ref, handler])
}

export default useClickOutSide
