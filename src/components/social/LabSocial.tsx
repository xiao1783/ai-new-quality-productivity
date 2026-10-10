import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Factory, Leaf, RotateCcw, ShieldCheck, TimerReset, Users } from 'lucide-react'
import SocialPanel from './SocialPanel'
import TakeawayNote from '../ui/TakeawayNote'
import SourceNote from '../ui/SourceNote'
import { LAB_DEPLOY } from '@/data/socialData'
import { PALETTE } from '@/data/site'
import { useLanguage } from '@/i18n/LanguageContext'

/** 数字补间（与 ProductivitySimulator / EfficiencySocial 同款实现） */
function useTween(target: number) {
  const [val, setVal] = useState(target)
  const from = useRef(target)
  const raf = useRef(0)
  useEffect(() => {
    cancelAnimationFrame(raf.current)
    const startVal = from.current
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - t0) / 480, 1)
      const e = 1 - Math.pow(1 - p, 3)
      setVal(startVal + (target - startVal) * e)
      if (p < 1) raf.current = requestAnimationFrame(tick)
      else from.current = target
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [target])
  return val
}

const OUTPUT_ICONS = [ShieldCheck, TimerReset, Leaf]
const OUTPUT_COLORS = [PALETTE.brand, PALETTE.teal, '#10B981']

export default function LabSocial() {
  const { lang, t, ta } = useLanguage()
  const [lines, setLines] = useState(10)
  const [shifts, setShifts] = useState(2)

  const { defectsPerLine, hoursPerLine, carbonPerLine } = LAB_DEPLOY.coeffs
  const defects = defectsPerLine * lines * shifts
  const hours = Math.round((hoursPerLine * lines * shifts) / 2)
  const carbon = carbonPerLine * lines
  const fte = Math.round(hours / 2000)

  const defectsVal = useTween(defects)
  const hoursVal = useTween(hours)
  const carbonVal = useTween(carbon)
  const values = [defectsVal, hoursVal, carbonVal]

  const unitsZh = ['件', '小时', '吨CO₂e']
  const unitsEn = ['defects', 'hours', 'tCO₂e']

  const reset = () => {
    setLines(10)
    setShifts(2)
  }

  return (
    <SocialPanel
      title={t('sv.lab.title')}
      desc={t('sv.lab.desc')}
      tag="simulation"
      action={
        <button type="button" className="btn btn-ghost !py-2 !text-[12.5px]" onClick={reset}>
          <RotateCcw size={14} /> {t('c.reset')}
        </button>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.35fr]">
        {/* 滑块 */}
        <div className="space-y-7">
          <div>
            <div className="mb-2.5 flex items-center justify-between">
              <label className="flex items-center gap-1.5 text-[14px] font-semibold text-ink">
                <Factory size={15} className="text-brand" />
                {ta('sv.lab.sliders')[0]}
              </label>
              <span className="rounded-lg bg-brand/10 px-2.5 py-0.5 text-[13px] font-bold text-brand">{lines}</span>
            </div>
            <input
              type="range"
              min={LAB_DEPLOY.lineRange[0]}
              max={LAB_DEPLOY.lineRange[1]}
              value={lines}
              className="slider"
              aria-label={ta('sv.lab.sliders')[0]}
              onChange={(e) => setLines(Number(e.target.value))}
              style={{
                background: `linear-gradient(to right, ${PALETTE.brand} ${((lines - LAB_DEPLOY.lineRange[0]) / (LAB_DEPLOY.lineRange[1] - LAB_DEPLOY.lineRange[0])) * 100}%, #E2E8F0 ${((lines - LAB_DEPLOY.lineRange[0]) / (LAB_DEPLOY.lineRange[1] - LAB_DEPLOY.lineRange[0])) * 100}%)`,
              }}
            />
            <div className="mt-1 flex justify-between text-[10.5px] font-semibold text-muted">
              <span>{LAB_DEPLOY.lineRange[0]}</span>
              <span>{LAB_DEPLOY.lineRange[1]}</span>
            </div>
          </div>

          <div>
            <div className="mb-2.5 flex items-center justify-between">
              <label className="flex items-center gap-1.5 text-[14px] font-semibold text-ink">
                <Users size={15} className="text-teal" />
                {ta('sv.lab.sliders')[1]}
              </label>
              <span className="rounded-lg bg-teal/10 px-2.5 py-0.5 text-[13px] font-bold text-teal">
                {shifts} {lang === 'en' ? 'shifts/day' : '班/天'}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={3}
              step={1}
              value={shifts}
              className="slider"
              aria-label={ta('sv.lab.sliders')[1]}
              onChange={(e) => setShifts(Number(e.target.value))}
              style={{ background: `linear-gradient(to right, ${PALETTE.teal} ${((shifts - 1) / 2) * 100}%, #E2E8F0 ${((shifts - 1) / 2) * 100}%)` }}
            />
            <div className="mt-1 flex justify-between text-[10.5px] font-semibold text-muted">
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </div>
          </div>

          <p className="rounded-2xl bg-canvas-2/70 p-4 text-[12px] leading-relaxed text-muted">{t('sv.lab.note')}</p>
        </div>

        {/* 收益读数 */}
        <div className="space-y-4">
          {ta('sv.lab.outputs').map((name, i) => {
            const Icon = OUTPUT_ICONS[i]
            const color = OUTPUT_COLORS[i]
            const ratio = i === 0 ? defects / (defectsPerLine * LAB_DEPLOY.lineRange[1] * 3) : i === 1 ? hours / (hoursPerLine * LAB_DEPLOY.lineRange[1] * 1.5) : carbon / (carbonPerLine * LAB_DEPLOY.lineRange[1])
            return (
              <div key={name} className="rounded-2xl border border-line/70 bg-white/70 p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 text-[13.5px] font-bold text-ink">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl" style={{ background: `${color}15`, color }}>
                      <Icon size={16} />
                    </span>
                    {name}
                  </span>
                  <span className="text-[26px] font-black leading-none" style={{ color }}>
                    {Math.round(values[i]).toLocaleString()}
                    <span className="ml-1 text-[12px] font-bold text-muted">{lang === 'en' ? unitsEn[i] : unitsZh[i]}</span>
                  </span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                  <motion.div className="h-full rounded-full" style={{ background: color }} animate={{ width: `${Math.max(4, ratio * 100)}%` }} transition={{ duration: 0.35 }} />
                </div>
                {i === 1 && (
                  <p className="mt-2 text-[11.5px] font-semibold text-muted">
                    {lang === 'en'
                      ? `≈ ${fte} inspector-years of repetitive work redeployed per year (2,000 h/year each)`
                      : `按每人每年 2,000 工时计，≈ ${fte} 名检验员一年的重复性劳动被释放，可转向更高价值岗位`}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <TakeawayNote className="mt-4" accent={PALETTE.teal}>
        {t('sv.lab.tk')}
      </TakeawayNote>
      <SourceNote>
        {lang === 'en'
          ? 'Teaching simulation only. Assumed coefficients (for standard two-shift operation): 1,200 escaped defects caught, 8,000 labor hours saved per line-year; 60 tCO₂e per line-year (shift-independent). Not a forecast.'
          : '教学模拟，系数为假设值（标准双班制口径）：每条产线每年减少 1,200 件逃逸缺陷、节约 8,000 工时；每条产线每年减碳 60 吨 CO₂e（与班次无关）。不构成任何预测。'}
      </SourceNote>
    </SocialPanel>
  )
}
