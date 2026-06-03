"use client"

export default function XPLoader() {
  return (
    <div
      style={{
        padding: "30px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          marginBottom: "10px",
          fontWeight: "bold",
        }}
      >
        Carregando...
      </div>

      <div
        style={{
          width: "250px",
          height: "20px",
          border: "1px solid #7f9db9",
          margin: "0 auto",
          background: "white",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to right,#2458d4,#3b86ff)",
            animation:
              "pulse 1s infinite",
          }}
        />
      </div>
    </div>
  )
}