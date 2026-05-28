"use client"

import Link from "next/link"

type StartMenuProps = {
  isOpen: boolean
}

export default function StartMenu({
  isOpen,
}: StartMenuProps) {
  if (!isOpen) return null

  return (
    <div
      style={{
        position: "fixed",
        bottom: "40px",
        left: "0",

        width: "240px",

        background: "#ECE9D8",

        border: "1px solid #0831d9",

        boxShadow: "4px 4px 0px #000",

        zIndex: 9999,

        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "48px",

          background:
            "linear-gradient(to right, #0a246a 0%, #3a6df0 40%, #0a59ff 100%)",

          display: "flex",
          alignItems: "center",

          paddingLeft: "12px",

          color: "white",
          fontWeight: "bold",
          fontSize: "18px",
        }}
      >
        Financial Control
      </div>

      <div
        style={{
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <MenuItem
          href="/dashboard"
          icon="📊"
          label="Dashboard"
        />

        <MenuItem
          href="/transactions"
          icon="💸"
          label="Transações"
        />

        <MenuItem
          href="/categories"
          icon="📁"
          label="Categorias"
        />

        <div
          style={{
            borderTop: "1px solid #aca899",
            marginTop: "8px",
            marginBottom: "8px",
          }}
        />

        <MenuItem
          href="/login"
          icon="⛔"
          label="Logout"
        />
      </div>
    </div>
  )
}

type MenuItemProps = {
  href: string
  icon: string
  label: string
}

function MenuItem({
  href,
  icon,
  label,
}: MenuItemProps) {
  return (
    <Link
      href={href}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",

        padding: "12px",

        textDecoration: "none",
        color: "black",

        fontSize: "18px",
      }}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </Link>
  )
}