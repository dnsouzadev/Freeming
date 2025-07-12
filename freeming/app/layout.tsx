import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import type React from "react"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Freeming - Assista Filmes Online Grátis",
  description:
    "Plataforma gratuita para assistir filmes online. Encontre seus filmes favoritos e assista gratuitamente.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.variable} font-sans bg-gray-900 text-white`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
