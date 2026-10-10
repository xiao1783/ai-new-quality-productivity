import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Info, RotateCcw, Scale } from 'lucide-react'
import SocialPanel from './SocialPanel'
import TakeawayNote from '../ui/TakeawayNote'
import SourceNote from '../ui/SourceNote'
import { DIVIDEND_DEFAULTS, dividendModel } from '@/data/socialData'
import { PALETTE } from '@/data/site'
import { useLanguage } from '@/i18n/LanguageContext'

const CHANNEL_COLORS = ['#0F5BFB', '#13BFAF', '#8B5CF6']

/** 数字补间（与 ProductivitySimulator 同款实现） */
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

export default function EfficiencySocial() {
  const { lang, t, ta } = useLanguage()
  const [total, setTotal] = useState(DIVIDEND_DEFAULTS.total)
  const [channels, setChannels] = useState<[number, number, number]>([
    DIVIDEND_DEFAULTS.jobs,
    DIVIDEND_DEFAULTS.wages,
    DIVIDEND_DEFAULTS.publicGoods,
  ])
  const result = dividendModel(total, channels)
  const indexVal = useTween(result.index)

  const setChannel = (i: number, v: number) =>
    setChannels((prev) => prev.map((c, k) => (k === i ? v : c)) as [number, number, number])

  const reset = () => {
    setTotal(DIVIDEND_DEFAULTS.total)
    setChannels([DIVIDEND_DEFAULTS.jobs, DIVIDEND_DEFAULTS.wages, DIVIDEND_DEFAULTS.publicGoods])
  }

  return (
    <SocialPanel
      title={t('sv.e.title')}
      desc={t('sv.e.desc')}
      tag="concept"
      action={
        <button className="btn btn-ghost !py-2 !text-[12.5px]" onClick={reset}>
          <RotateCcw size={14} /> {t('c.reset')}
        </button>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        {/* 滑块 */}
        <div className="space-y-6">
          <div>
            <div className="mb-2.5 flex items-center justify-between">
              <label className="text-[14px] font-semibold text-ink">{ta('sv.e.sliders')[0]}</label>
              <span className="rounded-lg bg-teal/10 px-2.5 py-0.5 text-[13px] font-bold text-teal">{total}</span>
            </div>
            <input
              type="range"
              min={50}
              max={200}
              value={total}
              className="slider"
              aria-label={ta('sv.e.sliders')[0]}
              onChange={(e) => setTotal(Number(e.target.value))}
              style={{ background: `linear-gradient(to right, ${PALETTE.teal} ${((total - 50) / 150) * 100}%, #E2E8F0 ${((total - 50) / 150) * 100}%)` }}
            />
          </div>

          {channels.map((v, i) => (
            <div key={i}>
              <div className="mb-2.5 flex items-center justify-between">
                <label className="text-[14px] font-semibold text-ink">{ta('sv.e.channels')[i]}</label>
                <span className="rounded-lg px-2.5 py-0.5 text-[13px] font-bold" style={{ background: `${CHANNEL_COLORS[i]}14`, color: CHANNEL_COLORS[i] }}>
                  {(result.shares[i] * 100).toFixed(0)}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={v}
                className="slider"
                aria-label={ta('sv.e.channels')[i]}
                onChange={(e) => setChannel(i, Number(e.target.value))}
                style={{ background: `linear-gradient(to right, ${CHANNEL_COLORS[i]} ${v}%, #E2E8F0 ${v}%)` }}
              />
            </div>
          ))}

          <p className="flex items-start gap-2 text-[12px] leading-relaxed text-muted">
            <Info size={14} className="mt-0.5 shrink-0" /> {t('sv.e.note')}
          </p>
        </div>

        {/* 分配结果 */}
        <div>
          <div className="rounded-2xl border border-line/70 bg-canvas/60 p-5">
            <p className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.16em] text-muted">
              <Scale size={13} /> {lang === 'en' ? 'SOCIAL DEVELOPMENT INDEX' : '社会发展指数'}
            </p>
            <p className="mt-2 text-[46px] font-black leading-none text-gradient">{Math.round(indexVal)}</p>
            <p className="mt-2 text-[12px] text-muted">
              {lang === 'en'
                ? `Balanced allocation bonus: ${(result.balance * 100).toFixed(0)}% — broader sharing raises the social return of growth.`
                : `分配均衡度 ${(result.balance * 100).toFixed(0)}% —— 红利覆盖越广，增长的社会回报越高。`}
            </p>

            {/* 堆叠分配条 */}
            <div className="mt-5 flex h-9 w-full overflow-hidden rounded-xl bg-slate-100">
              {result.shares.map((s, i) => (
                <motion.div
                  key={i}
                  className="flex items-center justify-center text-[11.5px] font-bold text-white"
                  animate={{ width: `${s * 100}%` }}
                  transition={{ duration: 0.3 }}
                  style={{ background: CHANNEL_COLORS[i] }}
                >
                  {s > 0.12 ? `${(s * 100).toFixed(0)}%` : ''}
                </motion.div>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
              {ta('sv.e.channels').map((name, i) => (
                <span key={name} className="flex items-center gap-1.5 text-[12px] font-semibold text-body">
                  <i className="h-2.5 w-2.5 rounded-sm" style={{ background: CHANNEL_COLORS[i] }} />
                  {name}
                </span>
              ))}
            </div>
          </div>

          {/* 真实锚点 */}
          <div className="mt-4 rounded-2xl border border-brand/20 bg-brand/[0.05] p-5">
            <p className="text-[12.5px] font-bold text-brand">{lang === 'en' ? 'Real anchor' : '真实锚点'}</p>
            <p className="mt-2 text-[14px] font-semibold leading-relaxed text-ink">
              {lang === 'en'
                ? 'WEF projects a net +78 million jobs globally by 2030 — growth is already reshaping employment, not only output.'
                : 'WEF 预测到 2030 年全球净增 7,800 万个岗位——效率红利正在重塑就业，而不只是增加产出。'}
            </p>
            <SourceNote className="mt-2">
              World Economic Forum, Future of Jobs Report 2025 (Jan 2025), 2025–2030 outlook
            </SourceNote>
          </div>
        </div>
      </div>

      <TakeawayNote className="mt-4" accent={PALETTE.teal}>
        {t('sv.e.tk')}
      </TakeawayNote>
    </SocialPanel>
  )
}
