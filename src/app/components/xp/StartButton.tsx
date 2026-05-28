type StartButtonProps = {
  onClick: () => void
}

export default function StartButton({
  onClick,
}: StartButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        height: "38px",
        minWidth: "110px",

        background:
          "linear-gradient(to bottom, #48d13d 0%, #1f9e12 45%, #107c10 100%)",

        borderTopRightRadius: "14px",
        borderBottomRightRadius: "14px",

        border: "1px solid #0b5e0b",

        color: "white",
        fontWeight: "bold",
        fontSize: "32px",
        fontStyle: "italic",

        paddingLeft: "18px",
        paddingRight: "24px",

        display: "flex",
        alignItems: "center",

        cursor: "pointer",

        boxShadow:
          "inset 2px 2px 0px rgba(255,255,255,0.4), inset -2px -2px 0px rgba(0,0,0,0.25)",
      }}
    >
      start
    </button>
  )
}