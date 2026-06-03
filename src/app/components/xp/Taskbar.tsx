"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

import StartButton from "./StartButton"
import StartMenu from "./StartMenu"

export default function Taskbar() {
  const pathname = usePathname()

  const [isOpen, setIsOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] =
    useState(false)

  useEffect(() => {
    const token =
      localStorage.getItem("token")

    setIsAuthenticated(!!token)
  }, [pathname])

  if (!isAuthenticated) return null

  function handleStartClick() {
  const token = localStorage.getItem("token")

  if (!token) {
    return
  }

  setIsOpen(prev => !prev)
}

  return (
    <>
      <StartMenu isOpen={isOpen} />

      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,

          width: "100%",
          height: "40px",

          background:
            "linear-gradient(to bottom, #3c81f3 0%, #245edb 45%, #1941a5 100%)",

          borderTop: "1px solid #7aa7ff",

          display: "flex",
          alignItems: "center",

          zIndex: 99999,
        }}
      >
        <StartButton
          onClick={() =>

            handleStartClick()
          }
        />
      </div>
    </>
  )
}