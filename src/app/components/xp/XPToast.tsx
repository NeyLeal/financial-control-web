"use client"

interface XPToastProps {
  message: string
  type?: "success" | "error"
}

export default function XPToast({
  message,
  type = "success",
}: XPToastProps) {
  return (
    <div
      style={{
        minWidth: "280px",
        background: "#ece9d8",
        border:
          "2px solid #0a246a",
        boxShadow:
          "2px 2px 0px black",
        padding: "12px",
        fontWeight: "bold",
        color:
          type === "success"
            ? "green"
            : "red",
      }}
    >
      {message}
    </div>
  )
}