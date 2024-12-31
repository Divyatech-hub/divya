import { Inter } from 'next/font/google'
import './globals.css'

//components
import Header from '@/components/Header';
import Footer from '@/components/Footer';

//theme provider 
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '<Div>ya Lakshmi',
  description: 'My Personal Website :)',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <Header />
          {children}
          {/* <Footer /> */}
        </ThemeProvider>
        </body>
    </html>
  )
}
