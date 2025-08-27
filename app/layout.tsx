import type React from "react"
import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: "Nutrein - Seu Portal de Fitness e Saúde",
  description:
    "Seu portal completo para fitness, saúde e bem-estar. Conecte-se com profissionais, descubra exercícios e converse com nossa IA especializada.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans ${dmSans.variable} antialiased`}>{children}</body>
    </html>
  )
}
