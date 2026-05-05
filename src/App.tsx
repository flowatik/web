import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import WebDesign from './components/sections/WebDesign'
import Pivot from './components/sections/Pivot'
import Automation from './components/sections/Automation'
import Deployment from './components/sections/Deployment'
import About from './components/sections/About'
import FinalCTA from './components/sections/FinalCTA'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'

function HomePage() {
  return (
    <>
      <div className="scroll-progress" aria-hidden />
      <Navbar />
      <main className="scroll-snap-main">
        <Hero />
        <WebDesign />
        <Pivot />
        <Automation />
        <Deployment />
        <About />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
    </Routes>
  )
}
