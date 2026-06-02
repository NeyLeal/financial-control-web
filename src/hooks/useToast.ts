import {
  createContext,
  useContext,
} from "react"

interface ToastContextType {
  showToast: (
    message: string,
    type?:
      | "success"
      | "error"
  ) => void
}

export const ToastContext =
  createContext(
    {} as ToastContextType
  )

export function useToast() {
  return useContext(
    ToastContext
  )
}