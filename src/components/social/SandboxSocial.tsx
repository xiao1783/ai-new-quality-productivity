import { motion } from 'framer-motion'
import { HeartHandshake } from 'lucide-react'
import { socialKpis, SOCIAL_KPI_COLORS } from '@/data/socialData'
import { useLanguage } from '@/i18n/LanguageContext'

/**
 * 沙盘社会效益联动块（无独立卡片外壳，嵌入 AISandbox 现有 KPI 卡内）。
 * 由同一渗透水平 level（0–1）派生 3 个社会效益读数。
 */
export default function SandboxSocial({ level }: { level: number }) {
  const { lang, t, ta } = useLanguage()
  const scores = socialKpis(level)

  return (
    <div className="mt-5 border-t border-dashed border-line pt-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-teal/10 px-2.5 py-1 text-[10.5px] font-bold tracking-[0.16em] text-teal">
          <HeartHandshake size={13} />
          {lang === 'en' ? 'SOCIAL BENEFIT · LINKED' : '社会效益 · 同模型联动'}
        </span>
        <span className="rounded-lg border border-amber-300/60 bg-amber-50 px-2 py-0.5 text-[10.5px] font-semibold text-amber-600">
          {lang === 'en' ? 'CONCEPT · NOT A STATISTIC' : '概念推演 · 非统计口径'}
        </span>
      </div>

      <div className="mt-3.5 space-y-3">
        {ta('sv.sb.kpis').map((name, i) => (
          <div key={name} className="rounded-2xl border border-line/70 bg-canvas-2/60 p-3.5">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-[12.5px] font-semibold text-body">{name}</span>
              <span className="text-[21px] font-bold leading-none" style={{ color: SOCIAL_KPI_COLORS[i] }}>
                {scores[i]}
                <span className="ml-1 text-[11px] font-bold text-muted">/100</span>
              </span>
            </div>
            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <motion.i
                className="block h-full rounded-full"
                style={{ background: SOCIAL_KPI_COLORS[i] }}
                animate={{ width: `${scores[i]}%` }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-3 text-[11px] leading-relaxed text-muted">{t('sv.sb.note')}</p>
    </div>
  )
}
