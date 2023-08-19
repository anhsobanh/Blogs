// import './globals.css'
'use client'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.css'
import BasicExample from './app.header'
import Footer from './app.footer'
import Container from 'react-bootstrap/Container';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BasicExample />
        <Container style={{ minHeight: 'calc(100vh - 106px)' }}>
          {children}
        </Container>
        <Footer />
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light" />
      </body>
    </html>
  )
}