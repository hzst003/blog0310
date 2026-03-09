import type { Metadata } from "next"
import Link from "next/link"
import { Geist, Geist_Mono } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"

import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Blog",
  description: "Next.js + MDX 博客示例",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <header className="border-b bg-background/80 backdrop-blur">
              <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
                <div className="flex items-center gap-4 text-sm">
                  <Link href="/" className="font-semibold tracking-tight">
                    零代码工作平台
                  </Link>
                  <nav className="flex items-center gap-3 text-xs text-muted-foreground">
                    <Link
                      href="/"
                      className="hover:text-foreground hover:underline underline-offset-4"
                    >
                      首页
                    </Link>
                    <Link
                      href="/blog"
                      className="hover:text-foreground hover:underline underline-offset-4"
                    >
                      博客
                    </Link>
                    <Link
                      href="/about"
                      className="hover:text-foreground hover:underline underline-offset-4"
                    >
                      关于
                    </Link>
                    <Link
                      href="/contact"
                      className="hover:text-foreground hover:underline underline-offset-4"
                    >
                      联系我
                    </Link>
                  </nav>
                </div>
                <ModeToggle />
              </div>
            </header>

            <main className="flex-1 px-4">
              <div className="mx-auto max-w-5xl">{children}</div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

