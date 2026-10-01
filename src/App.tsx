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
        <AIJourney />
        <AILab />
      </main>
      <Footer />
    </>
  )
}
