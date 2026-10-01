import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Factory,
  HeartPulse,
  Zap,
  Sprout,
  TrafficCone,
  Atom,
  Landmark,
  GraduationCap,
  Check,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import { INDUSTRIES } from '@/data/industryData'
import { EXPLORER_TABS } from './IndustryScenes'

const ICONS: Record<string, LucideIcon> = {
  Factory,
  HeartPulse,
  Zap,
  Sprout,
  TrafficCone,
  Atom,
  Landmark,
  GraduationCap,
}

const CC = 320
const R = 252
const npos = (deg: number) => {
  const a = (deg * Math.PI) / 180
  return { x: CC + R * Math.cos(a), y: CC + R * Math.sin(a) }
}

export default function Industry() {
  const [sel, setSel] = useState(INDUSTRIES[0].id)
  const [tab, setTab] = useState(EXPLORER_TABS[0].id)
  const current = INDUSTRIES.find((i) => i.id === sel)!
  const ActiveScene = EXPLORER_TABS.find((t) => t.id === tab)!.Scene

  return (
    <section id="industry" className="section-pad bg-canvas-2">
      <div className="container-x">
        <SectionHeading
          index="03"
          en="INDUSTRY"
          title="AI 正在进入真实产业"
          subtitle="从一个智能核心出发，人工智能正在向制造、医疗、能源、农业、交通等领域释放价值。点击产业节点查看。"
        />

        <div className="mt-12 grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          {/* 产业地图 */}
          <Reveal>
            <div className="card p-3 sm:p-6">
              <svg viewBox="0 0 640 640" className="w-full">
                <circle cx={CC} cy={CC} r={R} fill="none" stroke="#E2E8F0" strokeDasharray="3 8" />
                <circle cx={CC} cy={CC} r="120" fill="#2563EB" opacity="0.05" />

                {INDUSTRIES.map((ind) => {
                  const p = npos(ind.angle)
                  const active = sel === ind.id
                  return (
                    <line
                      key={ind.id}
                      x1={CC}
                      y1={CC}
                      x2={p.x}
                      y2={p.y}
                      stroke={active ? ind.color : '#D7DEE9'}
                      strokeWidth={active ? 2.2 : 1.2}
                      className={active ? 'flow-line' : ''}
                    />
                  )
                })}

                {/* 中心 */}
                <circle cx={CC} cy={CC} r="62" fill="url(#map-g)" />
                <defs>
                  <linearGradient id="map-g" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#2563EB" />
                    <stop offset="1" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
                <text x={CC} y={CC - 6} textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700">Artificial</text>
                <text x={CC} y={CC + 14} textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700">Intelligence</text>

                {INDUSTRIES.map((ind) => {
                  const p = npos(ind.angle)
                  const Icon = ICONS[ind.icon]
                  const active = sel === ind.id
                  return (
                    <g
                      key={ind.id}
                      transform={`translate(${p.x},${p.y}) scale(${active ? 1.12 : 1})`}
                      style={{ cursor: 'pointer', transition: 'transform .25s' }}
                      onClick={() => setSel(ind.id)}
                      onMouseEnter={() => setSel(ind.id)}
                    >
                      <circle r="42" fill="#fff" stroke={active ? ind.color : '#E2E8F0'} strokeWidth={active ? 2.4 : 1.4} />
                      <Icon size={21} color={ind.color} />
                      <g transform="translate(0,30)">
                        <text textAnchor="middle" fill="#0F172A" fontSize="12.5" fontWeight="700">{ind.name}</text>
                      </g>
                    </g>
                  )
                })}
              </svg>
            </div>
          </Reveal>

          {/* 详情面板 */}
          <Reveal delay={0.1}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35 }}
                className="card h-full p-8"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: `${current.color}16`, color: current.color }}>
                    {(() => {
                      const I = ICONS[current.icon]
                      return <I size={26} />
                    })()}
                  </span>
                  <div>
                    <h3 className="text-[24px] font-bold text-ink">{current.name}</h3>
                    <p className="text-[12px] font-semibold tracking-widest text-muted">{current.en}</p>
                  </div>
                </div>
                <p className="mt-5 text-[15px] leading-[1.8] text-body">{current.desc}</p>

                <div className="mt-7">
                  <p className="text-[12.5px] font-bold tracking-[0.18em] text-muted">AI 应用</p>
                  <div className="mt-3 grid grid-cols-2 gap-2.5">
                    {current.applications.map((a) => (
                      <span key={a} className="flex items-center gap-2 rounded-xl bg-brand/7 px-3 py-2.5 text-[13px] font-medium text-ink">
                        <Check size={14} className="text-brand" /> {a}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-[12.5px] font-bold tracking-[0.18em] text-muted">产生价值</p>
                  <div className="mt-3 space-y-2.5">
                    {current.values.map((v) => (
                      <div key={v} className="flex items-center gap-2.5 text-[14px] text-body">
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-teal/12 text-teal">
                          <Sparkles size={13} />
                        </span>
                        {v}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>

        {/* Industry Explorer */}
        <Reveal className="mt-20">
          <h3 className="text-[26px] font-bold text-ink">产业案例可视化 · Industry Explorer</h3>
          <p className="mt-2 text-[15px] text-body">切换标签，查看 AI 在不同产业中的典型工作方式。</p>
        </Reveal>

        <Reveal className="mt-7">
          <div className="card p-5 sm:p-8">
            <div className="flex flex-wrap gap-2">
              {EXPLORER_TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`rounded-xl px-5 py-2.5 text-[14px] font-semibold transition-all ${
                    tab === t.id
                      ? 'bg-gradient-to-r from-brand to-cyan text-white shadow-[0_8px_20px_rgba(37,99,235,0.28)]'
                      : 'bg-canvas-2 text-body hover:text-ink'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="mt-6">
              <ActiveScene />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
