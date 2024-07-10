import { useEffect } from "react"

const useInfiniteScroll = (callback?: () => void) => {
  useEffect(() => {
    if (!callback) return

    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY
      const threshold = document.body.offsetHeight - 100

      if (scrollPosition >= threshold) {
        callback()
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [callback])
}

export default useInfiniteScroll
