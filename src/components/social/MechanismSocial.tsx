import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SocialPanel from './SocialPanel'
import MiniStatBars from './MiniStatBars'
import CountUp from '../ui/CountUp'
import SourceNote from '../ui/SourceNote'
import TakeawayNote from '../ui/TakeawayNote'
import { NODE_ANCHORS, type LoopNodeId } from '@/data/socialData'
import { useLanguage } from '@/i18n/LanguageContext'

export default function MechanismSocial() {
  const { lang, t, ta } = useLanguage()
  const [sel, setSel] = useState<LoopNodeId>('data')
  const idx = NODE_ANCHORS.findIndex((a) => a.node === sel)
  const anchor = NODE_ANCHORS[idx]

  return (
    <SocialPanel title={t('sv.m.title')} desc={t('sv.m.desc')}>
      {/* 八节点选择 */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
        {NODE_ANCHORS.map((a, i) => {
          const active = a.node === sel
          return (
            <button
              key={a.node}
              type="button"
              onClick={() => setSel(a.node)}
              className={`relative rounded-xl px-2 py-2.5 text-[12.5px] font-bold transition ${active ? 'text-white' : 'bg-canvas-2 text-body hover:text-teal'}`}
            >
              {active && (
                <motion.span
                  layoutId="mechSocialNode"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal to-cyan shadow-[0_6px_14px_rgba(19,191,175,.28)]"
                  transition={{ duration: 0.2 }}
                />
              )}
              <span className="relative z-10 whitespace-nowrap">{ta('sv.m.nodes')[i]}</span>
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={lang + sel}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
          className="mt-5 grid gap-6 rounded-2xl border border-line/70 bg-canvas/60 p-5 sm:p-6 lg:grid-cols-[0.9fr_1.1fr]"
        >
          {/* 社会效益描述 + 大数 */}
          <div className="flex flex-col justify-center">
            <p className="text-[11px] font-bold tracking-[0.2em] text-teal">
              {ta('sv.m.nodes')[idx]} · {lang === 'en' ? 'SOCIAL OUTCOME' : '社会效益'}
            </p>
            <p className="mt-3 text-[15.5px] font-semibold leading-relaxed text-ink">{ta('sv.m.benefits')[idx]}</p>
            <p className="mt-4 text-[30px] font-black leading-none text-ink">
              <CountUp
                end={anchor.big.value}
                decimals={anchor.big.decimals}
                suffix={lang === 'en' ? anchor.big.suffixEn : anchor.big.suffixZh}
              />
            </p>
            <p className="mt-2.5 text-[12.5px] leading-relaxed text-muted">{lang === 'en' ? anchor.labelEn : anchor.labelZh}</p>
          </div>

          {/* 锚点图 */}
          <MiniStatBars
            labelsZh={anchor.bars.labelsZh}
            labelsEn={anchor.bars.labelsEn}
            values={anchor.bars.values}
            unitZh={anchor.bars.unitZh}
            unitEn={anchor.bars.unitEn}
            color="#13BFAF"
            height={anchor.bars.values.length * 40 + 16}
          />
        </motion.div>
      </AnimatePresence>

      <TakeawayNote className="mt-4" accent="#13BFAF">
        {t('sv.m.tk')}
      </TakeawayNote>
      <SourceNote>{lang === 'en' ? anchor.source.sourceEn : anchor.source.source}</SourceNote>
    </SocialPanel>
  )
}
