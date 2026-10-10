import { useState } from 'react'
import { motion } from 'framer-motion'
import { Accessibility, Briefcase, HeartPulse, Leaf, Sprout, Wifi, type LucideIcon } from 'lucide-react'
import SocialPanel from './SocialPanel'
import MiniStatBars from './MiniStatBars'
import CountUp from '../ui/CountUp'
import SourceNote from '../ui/SourceNote'
import TakeawayNote from '../ui/TakeawayNote'
import { HERO_DOMAINS, type HeroDomainId } from '@/data/socialData'
import { useLanguage } from '@/i18n/LanguageContext'

const ICONS: Record<HeroDomainId, LucideIcon> = {
  jobs: Briefcase,
  medical: HeartPulse,
  elderly: Accessibility,
  inclusion: Wifi,
  food: Sprout,
  green: Leaf,
}

const BAR_COLORS: Record<HeroDomainId, string[]> = {
  jobs: ['#93C5FD', '#FCA5A5', '#0F5BFB'],
  medical: ['#CBD5E1', '#06B6D4'],
  elderly: ['#8B5CF6', '#CBD5E1'],
  inclusion: ['#93C5FD', '#BFDBFE', '#2563EB', '#13BFAF'],
  food: ['#257CF4', '#13BFAF'],
  green: ['#CBD5E1', '#10B981'],
}

export default function HeroSocial() {
  const { lang, t, ta } = useLanguage()
  const [activeId, setActiveId] = useState<HeroDomainId>('jobs')
  const domain = HERO_DOMAINS.find((d) => d.id === activeId)!
  const Icon = ICONS[domain.id]

  return (
    <SocialPanel title={t('sv.h.title')} desc={t('sv.h.desc')}>
      {/* 领域切换 */}
      <div className="overflow-x-auto pb-1">
        <div className="flex min-w-max gap-2">
          {HERO_DOMAINS.map((d, i) => {
            const DIcon = ICONS[d.id]
            const active = d.id === activeId
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => setActiveId(d.id)}
                className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold transition ${active ? 'text-white' : 'bg-canvas-2 text-body hover:text-teal'}`}
              >
                {active && (
                  <motion.span
                    layoutId="heroSocialChip"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal to-cyan shadow-[0_7px_16px_rgba(19,191,175,.25)]"
                    transition={{ duration: 0.22 }}
                  />
                )}
                <DIcon size={15} className="relative z-10" />
                <span className="relative z-10 whitespace-nowrap">{ta('sv.h.domains')[i]}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-5 grid gap-6 rounded-2xl border border-line/70 bg-canvas/60 p-5 sm:p-6 lg:grid-cols-[0.9fr_1.1fr]">
        {/* 大数 */}
        <div key={domain.id} className="flex flex-col justify-center">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: `${domain.color}16`, color: domain.color }}>
              <Icon size={23} />
            </span>
            <p className="text-[20px] font-black leading-none text-ink">
              <CountUp
                key={lang + domain.id}
                end={domain.big.value}
                decimals={domain.big.decimals}
                suffix={lang === 'en' ? domain.big.suffixEn : domain.big.suffixZh}
              />
            </p>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            key={`note-${lang}-${domain.id}`}
            className="mt-4 text-[13.5px] leading-relaxed text-body"
          >
            {lang === 'en' ? domain.noteEn : domain.noteZh}
          </motion.p>
        </div>

        {/* 迷你条形 */}
        <MiniStatBars
          labelsZh={domain.bars.labelsZh}
          labelsEn={domain.bars.labelsEn}
          values={domain.bars.values}
          unitZh={domain.bars.unitZh}
          unitEn={domain.bars.unitEn}
          colors={BAR_COLORS[domain.id]}
          color={domain.color}
          height={Math.max(90, domain.bars.values.length * 36 + 20)}
        />
      </div>

      <TakeawayNote className="mt-4" accent={domain.color}>
        {ta('sv.h.tks')[HERO_DOMAINS.findIndex((d) => d.id === activeId)]}
      </TakeawayNote>
      <SourceNote>{lang === 'en' ? domain.source.sourceEn : domain.source.source}</SourceNote>
    </SocialPanel>
  )
}
