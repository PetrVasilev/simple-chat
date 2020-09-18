import { useEffect } from 'react'

const useOutsideClick = (ref, cb) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                cb()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
        // eslint-disable-next-line
    }, [ref])
}

export default useOutsideClick
