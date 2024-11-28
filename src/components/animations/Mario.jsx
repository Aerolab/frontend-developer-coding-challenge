"use client"
import { useEffect, useRef, useState } from "react"
import lottie from "lottie-web"
import animationData from "./lotties/mario.json"

export default function Mario({ positionX }) {
  const animationContainer = useRef(null)
  const [lastPositionX, setLastPositionX] = useState(positionX)
  const [rotationY, setRotationY] = useState(0) // 0deg (derecha), 180deg (izquierda)

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

  // To make Mario face the direction of the mouse movement
  useEffect(() => {
    if (positionX > lastPositionX) {
      setRotationY(0)
    } else if (positionX < lastPositionX) {
      setRotationY(180)
    }
    setLastPositionX(positionX)
  }, [positionX, lastPositionX])

  return (
    <div
      ref={animationContainer}
      className="lottie w-40"
      style={{
        position: "absolute",
        left: positionX - 42,
        transform: `rotateY(${rotationY}deg)`,
        pointerEvents: "none",
      }}
    ></div>
  )
}
