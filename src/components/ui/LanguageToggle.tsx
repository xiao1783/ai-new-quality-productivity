import { useLanguage } from '@/i18n/LanguageContext'

/** 中英切换按钮：zh 时点击切到英文，en 时切回中文 */
export default function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLanguage()
  const next = lang === 'zh' ? 'en' : 'zh'
  return (
    <button
      type="button"
      onClick={() => setLang(next)}
      aria-label={lang === 'zh' ? 'Switch to English' : '切换为中文'}
      title={lang === 'zh' ? 'Switch to English' : '切换为中文'}
      className={`inline-flex items-center gap-1.5 rounded-xl border border-line bg-white/80 font-bold text-body transition hover:border-brand/40 hover:text-brand ${
        compact ? 'px-2.5 py-1.5 text-[11px]' : 'px-3 py-2 text-[12px]'
      }`}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
      {lang === 'zh' ? 'EN' : '中文'}
    </button>
  )
}
