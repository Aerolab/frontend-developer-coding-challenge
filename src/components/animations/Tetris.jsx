"use client"
import { useEffect, useRef, useState } from "react"
import lottie from "lottie-web"
import animationData from "./lotties/tetris2_lottie.json"

export default function Tetris() {
  const animationContainer = useRef(null)
  const [isAnimationVisible, setIsAnimationVisible] = useState(true)

  useEffect(() => {
    const animationInstance = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: animationData,
    })

    // Hide from DOM when animation finish
    animationInstance.addEventListener("complete", () => {
      setIsAnimationVisible(false)
    })

    return () => {
      animationInstance.removeEventListener("complete", () => setIsAnimationVisible(false))
      animationInstance.destroy()
    }
  }, [])

  return (
    isAnimationVisible && (
      <div ref={animationContainer} className="lottie w-60 absolute -top-[84px] sm:left-1/2"></div>
    )
  )
}
