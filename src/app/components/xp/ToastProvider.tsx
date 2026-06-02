"use client"

import {
  useState,
} from "react"

import XPToast from "./XPToast"

import {
  ToastContext,
} from "@/hooks/useToast"

interface Toast {
  id: number
  message: string
  type:
    | "success"
    | "error"
}

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [toasts, setToasts] =
    useState<Toast[]>([])

  function showToast(
    message: string,
    type:
      | "success"
      | "error" = "success"
  ) {
     console.log(
        "SHOW TOAST:",
        message,
        type
    )
    const id =
      Date.now()

    setToasts(prev => [
      ...prev,
      {
        id,
        message,
        type,
      },
    ])

    setTimeout(() => {
      setToasts(prev =>
        prev.filter(
          toast =>
            toast.id !== id
        )
      )
    }, 3000)
  }

  return (
    <ToastContext.Provider
      value={{
        showToast,
      }}
    >
      {children}

      <div
        style={{
          position: "fixed",
          bottom: "60px",
          right: "20px",
          display: "flex",
          flexDirection:
            "column",
          gap: "8px",
          zIndex: 99999,
        }}
      >
        {toasts.map(
          toast => (
            <XPToast
              key={toast.id}
              message={
                toast.message
              }
              type={
                toast.type
              }
            />
          )
        )}
      </div>
    </ToastContext.Provider>
  )
}