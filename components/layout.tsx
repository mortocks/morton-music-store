import Alert from './alert'
import Footer from './footer'
import Meta from './meta'
import Head from 'next/head'
import Navbar from './navbar';

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />

      <div className="min-h-screen py-24">
        <Navbar />
        <main className="py-8">{children}</main>
      </div>
      <Footer />
    </>
  )
}
