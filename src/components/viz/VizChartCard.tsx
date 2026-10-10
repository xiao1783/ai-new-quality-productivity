import type { ReactNode } from 'react'
import SourceNote from '../ui/SourceNote'
import TakeawayNote from '../ui/TakeawayNote'
import { useLanguage } from '@/i18n/LanguageContext'

/**
 * 扩展展区 9 张图卡的统一外壳：标题 / 副标题 / 口径标签 / 内容 / 观点层 / 来源。
 * 视觉延续 .card 体系；tag 明确「概念模型 · 非统计口径」或「教学模拟」。
 */
export default function VizChartCard({
  title,
  sub,
  tag,
  accent = '#0F5BFB',
  className = '',
  children,
  takeaway,
  source,
}: {
  title: string
  sub?: string
  tag?: 'concept' | 'simulation'
  accent?: string
  className?: string
  children: ReactNode
  takeaway?: ReactNode
  source?: ReactNode
}) {
  const { lang } = useLanguage()
  return (
    <div className={`card h-full p-6 ${className}`}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h4 className="text-[16px] font-bold text-ink">{title}</h4>
          {sub && <p className="mt-1 text-[12.5px] text-muted">{sub}</p>}
        </div>
        {tag && (
          <span className="shrink-0 rounded-lg border border-amber-300/60 bg-amber-50 px-2 py-1 text-[10.5px] font-semibold text-amber-600">
            {tag === 'concept'
              ? lang === 'en'
                ? 'CONCEPT · NOT A STATISTIC'
                : '概念模型 · 非统计口径'
              : lang === 'en'
                ? 'TEACHING SIMULATION'
                : '教学模拟'}
          </span>
        )}
      </div>
      {children}
      {takeaway && <TakeawayNote accent={accent}>{takeaway}</TakeawayNote>}
      {source && <SourceNote>{source}</SourceNote>}
    </div>
  )
}
