import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"

import Taskbar from "./components/xp/Taskbar"
import StartMenu from "./components/xp/StartMenu"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Financial Control XP",
  description: "Retro financial system",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          overflow: "hidden",
          position: "relative",
          background:
            "linear-gradient(to bottom, #6ea2e8 0%, #4f7dbd 100%)",
        }}
      >
        {children}
        <Taskbar />
      </body>
    </html>
  )
}