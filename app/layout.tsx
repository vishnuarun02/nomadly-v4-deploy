import type React from "react"
import "@/app/globals.css"
import { IBM_Plex_Serif } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-serif",
})

export const metadata = {
  title: "Nomadly - AI-Powered Travel Recommendations",
  description: "Discover your perfect journey with Nomadly's intelligent travel assistant",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={ibmPlexSerif.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'