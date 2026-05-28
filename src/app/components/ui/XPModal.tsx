type XPModalProps = {
  title: string
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function XPModal({
  title,
  isOpen,
  onClose,
  children,
}: XPModalProps) {
  if (!isOpen) return null

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,

        background: "rgba(0,0,0,0.4)",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        zIndex: 999999,
      }}
    >
      <div
        style={{
          width: "500px",

          background: "#ECE9D8",

          border: "1px solid #0831d9",

          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",

          boxShadow: "6px 6px 0px #000",

          overflow: "hidden",
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
          }}
        >
          <span>{title}</span>

          <button
            onClick={onClose}
            style={{
              width: "22px",
              height: "22px",

              background: "#ff3b3b",

              border: "1px solid #7f0000",

              color: "white",
              fontWeight: "bold",

              cursor: "pointer",
            }}
          >
            X
          </button>
        </div>

        <div
          style={{
            padding: "20px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}