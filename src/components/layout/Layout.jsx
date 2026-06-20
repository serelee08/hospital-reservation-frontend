import Header from './Header'
import Footer from './Footer'
import './Layout.css'

function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </>
  )
}

export default Layout