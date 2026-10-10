import type { ReactNode } from 'react'
import { HeartHandshake } from 'lucide-react'
import { useLanguage } from '@/i18n/LanguageContext'

interface SocialPanelProps {
  /** 面板标题 */
  title: ReactNode
  /** 标题下描述 */
  desc?: ReactNode
  children: ReactNode
  className?: string
  /** 概念模型 / 教学模拟 标签，不传则不显示 */
  tag?: 'concept' | 'simulation'
  /** 右上角自定义操作区 */
  action?: ReactNode
}

/**
 * 「社会发展视角」统一外壳。
 * 嵌入各展区内部，与展区原有视觉区分（teal 徽章 + 左侧 teal 竖条）。
 */
export default function SocialPanel({ title, desc, children, className = '', tag, action }: SocialPanelProps) {
  const { lang } = useLanguage()
  return (
    <div className={`card relative overflow-hidden p-6 sm:p-7 ${className}`}>
      <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-teal to-cyan" aria-hidden />
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-teal/10 px-2.5 py-1 text-[10.5px] font-bold tracking-[0.18em] text-teal">
            <HeartHandshake size={13} />
            {lang === 'en' ? 'SOCIAL IMPACT' : '社会发展视角'}
          </span>
          <h3 className="mt-3 text-[19px] font-bold leading-snug text-ink sm:text-[21px]">{title}</h3>
          {desc && <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-muted">{desc}</p>}
        </div>
        <div className="flex items-center gap-2">
          {tag && (
            <span className="rounded-lg border border-amber-300/60 bg-amber-50 px-2.5 py-1 text-[10.5px] font-semibold text-amber-600">
              {tag === 'simulation'
                ? lang === 'en'
                  ? 'TEACHING SIMULATION'
                  : '教学模拟'
                : lang === 'en'
                  ? 'CONCEPT MODEL · NOT A STATISTIC'
                  : '概念模型 · 非统计口径'}
            </span>
          )}
          {action}
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </div>
  )
}
