import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { zh, en, type Dict } from './dict'

export type Lang = 'zh' | 'en'

const dicts: Record<Lang, Dict> = { zh, en }

interface LanguageValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: keyof Dict) => string
  /** 取字符串数组（图表分类、标签组等） */
  ta: (key: keyof Dict) => string[]
}

const LanguageContext = createContext<LanguageValue>({
  lang: 'zh',
  setLang: () => {},
  t: (key) => {
    const v = zh[key]
    return (Array.isArray(v) ? v[0] : v) as string
  },
  ta: (key) => {
    const v = zh[key]
    const arr = (Array.isArray(v) ? v : [v]) as readonly (string | readonly string[])[]
    const first = arr[0]
    if (Array.isArray(first)) return [...first] as string[]
    return arr.map((item) => item as string)
  },
})

const STORAGE_KEY = 'site-lang'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === 'en' ? 'en' : 'zh'
  })

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
  }, [lang])

  const setLang = (next: Lang) => {
    setLangState(next)
    localStorage.setItem(STORAGE_KEY, next)
  }

  const value: LanguageValue = {
    lang,
    setLang,
    t: (key) => {
      const v = dicts[lang][key] ?? zh[key]
      const resolved = (Array.isArray(v) ? v[0] : v) as string
      return resolved
    },
    ta: (key) => {
      const v = dicts[lang][key] ?? zh[key]
      const arr = (Array.isArray(v) ? v : [v]) as readonly (string | readonly string[])[]
      const first = arr[0]
      if (Array.isArray(first)) return [...first] as string[]
      return arr.map((item) => item as string)
    },
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return useContext(LanguageContext)
}
