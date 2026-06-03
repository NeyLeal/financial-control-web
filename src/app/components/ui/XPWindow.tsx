type XPWindowProps = {
  title: string
  children: React.ReactNode
  width?: string
  height?: string
}

export default function XPWindow({
  title,
  children,
  width = "90%",
  height = "500px",
}: XPWindowProps) {
  return (
    <div
      style={{
        width,
        height,
        background: "#ECE9D8",
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px",
        borderBottomLeftRadius: "3px",
        borderBottomRightRadius: "3px",
        border: "1px solid #0831d9",
        boxShadow: "6px 6px 0px #000",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: "32px",
          background:
            "linear-gradient(to right, #0a246a 0%, #3a6df0 40%, #0a59ff 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: "10px",
          paddingRight: "8px",
          color: "white",
          fontWeight: "bold",
          fontSize: "14px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          🟠
          <span>{title}</span>
        </div>

        <div
          style={{
            display: "flex",
            gap: "4px",
          }}
        >
          <button
            style={{
              width: "22px",
              height: "22px",
              background: "#ECE9D8",
              border: "1px solid #7f9db9",
              fontWeight: "bold",
              cursor: "pointer",
              color: "black",
            }}
          >
            -
          </button>

          <button
            style={{
              width: "22px",
              height: "22px",
              background: "#ECE9D8",
              border: "1px solid #7f9db9",
              fontWeight: "bold",
              cursor: "pointer",
              color: "black",
            }}
          >
            □
          </button>

          <button
            style={{
              width: "22px",
              height: "22px",
              background: "#ff3b3b",
              border: "1px solid #7f0000",
              color: "black",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            X
          </button>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          padding: "16px",
          overflow: "auto",
        }}
      >
        {children}
      </div>
    </div>
  )
}