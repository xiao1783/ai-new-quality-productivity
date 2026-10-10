import { useEffect, useState } from 'react'
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react'
import { NAV_ITEMS } from '@/data/site'
import { useLanguage } from '@/i18n/LanguageContext'
import Logo from './Logo'
import LanguageToggle from './ui/LanguageToggle'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('hero')
  const [open, setOpen] = useState(false)
  const { lang, t } = useLanguage()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const marker = window.scrollY + Math.min(window.innerHeight * 0.34, 320)
      let current: string = NAV_ITEMS[0].id
      NAV_ITEMS.forEach((item) => {
        const section = document.getElementById(item.id)
        if (section && section.offsetTop <= marker) current = item.id
      })
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const go = (id: string) => {
    setOpen(false)
    if (id === 'ai-experience') {
      window.location.hash = '/ai-experience'
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 sm:px-8">
      <nav
        className="glass nav-shell flex w-full items-center justify-between rounded-[24px] transition-all duration-300"
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
          <span className="text-[21px] font-black tracking-wide text-ink">智启新质</span>
        </button>

        {/* Desktop links（12 项导航，<2xl 折叠进汉堡菜单以避免拥挤） */}
        <div className="hidden items-center gap-0.5 2xl:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className={`relative rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors ${
                active === item.id ? 'text-brand' : 'text-body hover:text-ink'
              }`}
            >
              {lang === 'en' ? item.en : item.label}
              {active === item.id && (
                <span className="absolute inset-x-3 -bottom-0.5 h-[2.5px] rounded-full bg-gradient-to-r from-brand to-cyan" />
              )}
            </button>
          ))}
        </div>

        {/* CTA + language toggle + mobile menu */}
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <div className="hidden items-center gap-2 2xl:flex">
            <button
              onClick={() => go('ai-experience')}
              className="btn btn-ghost !px-4 !py-2.5 !text-[14px]"
            >
              <Sparkles size={16} />
              {t('nav.journey')}
            </button>
            <button
              onClick={() => go('understand')}
              className="btn btn-primary !px-5 !py-2.5 !text-[14px]"
            >
              {t('nav.enter')}
              <ArrowRight size={16} />
            </button>
          </div>
          <button
            className="rounded-xl p-2 text-ink 2xl:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="菜单"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="glass absolute top-[76px] w-full max-w-[1400px] rounded-[20px] p-3 2xl:hidden">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className={`block w-full rounded-xl px-4 py-3 text-left text-[15px] font-medium ${
                active === item.id ? 'bg-brand/10 text-brand' : 'text-body'
              }`}
            >
              {lang === 'en' ? item.en : item.label}
            </button>
          ))}
          <button
            onClick={() => go('ai-experience')}
            className="btn btn-ghost mt-2 w-full justify-center"
          >
            <Sparkles size={16} /> {t('nav.journey')}
          </button>
          <button
            onClick={() => go('understand')}
            className="btn btn-primary mt-2 w-full justify-center"
          >
            {t('nav.enter')} <ArrowRight size={16} />
          </button>
        </div>
      )}
    </header>
  )
}
