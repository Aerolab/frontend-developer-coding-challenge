"use client"
import { useEffect, useRef } from "react"
import lottie from "lottie-web"
import animationData from "./lotties/Loading_gameboy.json"

export default function LoadingGameboy() {
  const animationContainer = useRef(null)

  useEffect(() => {
    const animationInstance = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData,
    })
    animationInstance.setSpeed(1.5)

    return () => animationInstance.destroy()
  }, [])

  return <div ref={animationContainer} className="lottie w-52 flex items-center mt-20"></div>
}
