import { useEffect, useState } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'
import { NAV_ITEMS } from '@/data/site'
import Logo from './Logo'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('hero')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      // scrollspy
      const offset = window.scrollY + window.innerHeight * 0.35
      let current: string = NAV_ITEMS[0].id
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id)
        if (el && el.offsetTop <= offset) current = item.id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 sm:px-8">
      <nav
        className="glass flex w-full items-center justify-between rounded-[20px] transition-all duration-300"
        style={{
          maxWidth: 1400,
          marginTop: scrolled ? 8 : 16,
          height: scrolled ? 58 : 68,
          paddingInline: scrolled ? 18 : 24,
        }}
      >
        {/* Logo */}
        <button onClick={() => go('hero')} className="flex items-center gap-3">
          <Logo size={scrolled ? 34 : 38} />
          <span className="flex flex-col leading-none">
            <span className="text-[16px] font-bold tracking-wide text-ink">智启新质</span>
            <span className="mt-1 text-[9px] font-semibold tracking-[0.22em] text-muted">
              AI PRODUCTIVITY LAB
            </span>
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className={`relative rounded-lg px-3.5 py-2 text-[14.5px] font-medium transition-colors ${
                active === item.id ? 'text-brand' : 'text-body hover:text-ink'
              }`}
            >
              {item.label}
              {active === item.id && (
                <span className="absolute inset-x-3 -bottom-0.5 h-[2.5px] rounded-full bg-gradient-to-r from-brand to-cyan" />
              )}
            </button>
          ))}
        </div>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => go('understand')}
            className="btn btn-primary hidden !px-5 !py-2.5 !text-[14px] sm:inline-flex"
          >
            进入展馆
            <ArrowRight size={16} />
          </button>
          <button
            className="rounded-xl p-2 text-ink lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="菜单"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="glass absolute top-[76px] w-full max-w-[1400px] rounded-[20px] p-3 lg:hidden">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className={`block w-full rounded-xl px-4 py-3 text-left text-[15px] font-medium ${
                active === item.id ? 'bg-brand/10 text-brand' : 'text-body'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => go('understand')}
            className="btn btn-primary mt-2 w-full justify-center"
          >
            进入展馆 <ArrowRight size={16} />
          </button>
        </div>
      )}
    </header>
  )
}
