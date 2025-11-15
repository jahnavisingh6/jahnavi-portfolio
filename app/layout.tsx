import './globals.css'
import type { Metadata } from 'next'
import './globals.css'
import Navbar from './components/Navbar'

export const metadata: Metadata = {
  title: 'Jahnavi Singh | Data Analyst | 3.5 Years Experience',
  description: 'Data Analyst with 3.5 years of experience in healthcare analytics, machine learning, and data visualization. Managed 1M+ records, deployed 20+ ML models achieving 90% accuracy. Proficient in Python, SQL, Tableau, Power BI, AWS, and Azure. Currently at Blue Cross Blue Shield.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
