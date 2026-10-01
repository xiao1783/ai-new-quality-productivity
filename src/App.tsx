import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Understand from './components/Understand'
import Mechanism from './components/Mechanism'
import Industry from './components/Industry'
import Efficiency from './components/Efficiency'
import Dashboard from './components/Dashboard'
import Future from './components/Future'
import AIJourney from './components/AIJourney'
import AILab from './components/AILab'
import Footer from './components/Footer'

export default function App() {
  const [route, setRoute] = useState(window.location.hash)

  useEffect(() => {
    const onRouteChange = () => setRoute(window.location.hash)
    window.addEventListener('hashchange', onRouteChange)
    return () => window.removeEventListener('hashchange', onRouteChange)
  }, [])

  if (route === '#/ai-experience') {
    return <AIJourney onBack={() => { window.location.hash = ''; window.scrollTo(0, 0) }} />
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Understand />
        <Mechanism />
        <Industry />
        <Efficiency />
        <Dashboard />
        <Future />
        <AILab />
      </main>
      <Footer />
    </>
  )
}
