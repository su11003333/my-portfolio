// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '我的作品集 | 全端工程師',
  description: '展示我的技能、經驗和創意項目的專業作品集網站',
  keywords: ['全端工程師', '作品集', 'React', 'Next.js', 'TypeScript', 'Web開發'],
  authors: [{ name: '您的姓名' }],
  creator: '您的姓名',
  openGraph: {
    title: '我的作品集 | 全端工程師',
    description: '展示我的技能、經驗和創意項目的專業作品集網站',
    type: 'website',
    locale: 'zh_TW',
  },
  twitter: {
    card: 'summary_large_image',
    title: '我的作品集 | 全端工程師',
    description: '展示我的技能、經驗和創意項目的專業作品集網站',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#8B5CF6" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}