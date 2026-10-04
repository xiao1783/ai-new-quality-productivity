import { Lightbulb } from 'lucide-react'
import { useLanguage } from '@/i18n/LanguageContext'

/**
 * 图表下方的「这一图说明什么」观点层。
 * 与数据来源（SourceNote）配合，构成 数据 → 结论 → 新质生产力 的闭环。
 */
export default function TakeawayNote({
  children,
  accent = '#0F5BFB',
  className = '',
}: {
  children: React.ReactNode
  accent?: string
  className?: string
}) {
  const { lang } = useLanguage()
  return (
    <div className={`mt-4 rounded-2xl border px-4 py-3 ${className}`} style={{ borderColor: `${accent}26`, background: `${accent}0A` }}>
      <p className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.16em]" style={{ color: accent }}>
        <Lightbulb size={12} /> {lang === 'en' ? 'WHAT THIS SHOWS' : '这一图说明什么'}
      </p>
      <p className="mt-1.5 text-[13px] font-semibold leading-relaxed text-ink">{children}</p>
    </div>
  )
}
