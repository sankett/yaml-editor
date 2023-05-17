import './globals.css'
import { Inter, Montserrat } from 'next/font/google'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'YAML Editor',
  description: 'This is YAML Editor demo',
}
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" class="light">
      <body className={montserrat.className}>
      <Header />
        {children}
      </body>
    </html>
  )
}
