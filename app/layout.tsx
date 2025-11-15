import './globals.css'
import type { Metadata } from 'next'
import './globals.css'
import Navbar from './components/Navbar'

export const metadata: Metadata = {
  title: 'Jahnavi Singh | Data Analyst & Data Scientist | ML, NLP & AI',
  description: 'Data Analyst & aspiring Data Scientist with 3.5 years of experience specializing in Machine Learning, NLP, and AI. Deployed 20+ ML models achieving 90% accuracy. Expert in Python, SQL, TensorFlow, PyTorch, AWS, and Azure. Currently at Blue Cross Blue Shield working on healthcare analytics and predictive modeling.',
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
