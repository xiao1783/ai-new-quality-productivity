import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  Repeat,
  Workflow,
  Unplug,
  TrendingUp,
  Database,
  Brain,
  RefreshCw,
  Network,
  Rocket,
  Cpu,
  Zap,
  BadgeCheck,
  ArrowRight,
  Factory,
} from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

const TRADITIONAL = [
  { icon: User, t: '人工经验' },
  { icon: Repeat, t: '重复劳动' },
  { icon: Workflow, t: '固定流程' },
  { icon: Unplug, t: '信息孤岛' },
  { icon: TrendingUp, t: '线性增长' },
]

const AI_DRIVEN = [
  { icon: Database, t: '数据驱动' },
  { icon: Brain, t: '智能决策' },
  { icon: RefreshCw, t: '自主优化' },
  { icon: Network, t: '实时协同' },
  { icon: Rocket, t: '创新增长' },
]

/* ---------- 微型动态图表 ---------- */
function MiniSpark() {
  return (
    <svg viewBox="0 0 120 44" className="h-11 w-full">
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2563EB" stopOpacity="0.28" />
          <stop offset="1" stopColor="#2563EB" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d="M2 36 L20 30 L38 32 L56 20 L74 22 L92 10 L118 6"
        fill="none"
        stroke="#2563EB"
        strokeWidth="2.4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: 'easeInOut' }}
      />
      <motion.path
        d="M2 36 L20 30 L38 32 L56 20 L74 22 L92 10 L118 6 L118 44 L2 44 Z"
        fill="url(#spark-fill)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, duration: 0.8 }}
      />
    </svg>
  )
}

function MiniBars() {
  const h = [14, 22, 18, 30, 26, 38]
  return (
    <svg viewBox="0 0 120 44" className="h-11 w-full">
      {h.map((v, i) => (
        <motion.rect
          key={i}
          x={8 + i * 19}
          y={42 - v}
          width="11"
          rx="3"
          fill={i === h.length - 1 ? '#06B6D4' : '#3B82F6'}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.09, duration: 0.5, ease: 'easeOut' }}
          style={{ transformOrigin: 'bottom' }}
        />
      ))}
    </svg>
  )
}

function MiniRing() {
  return (
    <div className="flex h-11 items-center justify-center">
      <svg viewBox="0 0 48 48" className="h-11 w-11 -rotate-90">
        <circle cx="24" cy="24" r="19" fill="none" stroke="#E2E8F0" strokeWidth="5" />
        <motion.circle
          cx="24"
          cy="24"
          r="19"
          fill="none"
          stroke="#14B8A6"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={2 * Math.PI * 19}
          initial={{ strokeDashoffset: 2 * Math.PI * 19 }}
          whileInView={{ strokeDashoffset: 2 * Math.PI * 19 * 0.16 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </svg>
      <span className="absolute text-[11px] font-bold text-teal">84%</span>
    </div>
  )
}

const FEATURES = [
  {
    icon: Cpu,
    title: '高科技',
    desc: '以人工智能、数据与算力为核心，技术密度显著提升。',
    chart: <MiniSpark />,
    color: '#2563EB',
  },
  {
    icon: Zap,
    title: '高效能',
    desc: '智能决策与自动化协同，让全要素生产率持续提高。',
    chart: <MiniBars />,
    color: '#06B6D4',
  },
  {
    icon: BadgeCheck,
    title: '高质量',
    desc: '从规模扩张转向创新驱动，发展更可持续、更可靠。',
    chart: <MiniRing />,
    color: '#14B8A6',
  },
]

export default function Understand() {
  const [on, setOn] = useState(false)

  return (
    <section id="understand" className="section-pad relative bg-canvas-2">
      <div className="container-x">
        <SectionHeading
          index="01"
          en="UNDERSTAND"
          title="什么是新质生产力？"
          subtitle="它并不是简单的「机器变快了」，而是技术、生产要素与产业结构共同发生改变。"
        />

        {/* 对比 */}
        <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-[1fr_auto_1fr]">
          {/* 传统 */}
          <Reveal>
            <div
              className={`card h-full p-8 transition-all duration-500 ${
                on ? 'opacity-55 grayscale' : ''
              }`}
            >
              <p className="text-[13px] font-bold tracking-[0.2em] text-muted">TRADITIONAL</p>
              <h3 className="mt-2 text-[22px] font-bold text-ink">传统生产模式</h3>
              <div className="mt-6 space-y-3.5">
                {TRADITIONAL.map((k) => (
                  <div key={k.t} className="flex items-center gap-3 text-[15px] text-body">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-muted">
                      <k.icon size={16} />
                    </span>
                    {k.t}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* 中间 AI 转换 */}
          <div className="flex items-center justify-center">
            <motion.button
              onClick={() => setOn((v) => !v)}
              whileTap={{ scale: 0.94 }}
              className="relative flex h-24 w-24 flex-col items-center justify-center rounded-full text-white shadow-[0_12px_30px_rgba(37,99,235,0.35)]"
              style={{ background: 'linear-gradient(135deg,#2563EB,#06B6D4)' }}
              aria-label="触发 AI 转换"
            >
              {on && (
                <span className="pulse-ring absolute inset-0 rounded-full border-2 border-brand" />
              )}
              <Brain size={26} />
              <span className="mt-1 text-[12px] font-bold">AI</span>
            </motion.button>
          </div>

          {/* AI 驱动 */}
          <Reveal delay={0.1}>
            <div
              className={`card h-full p-8 transition-all duration-500 ${
                on ? 'border-brand/40 shadow-[0_18px_50px_rgba(37,99,235,0.14)]' : ''
              }`}
            >
              <p className="text-[13px] font-bold tracking-[0.2em] text-brand">AI POWERED</p>
              <h3 className="mt-2 text-[22px] font-bold text-ink">AI 驱动生产模式</h3>
              <div className="mt-6 space-y-3.5">
                {AI_DRIVEN.map((k, i) => (
                  <motion.div
                    key={k.t}
                    className="flex items-center gap-3 text-[15px] text-body"
                    animate={on ? { x: [10, 0], opacity: [0.4, 1] } : {}}
                    transition={{ delay: i * 0.08 }}
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10 text-brand">
                      <k.icon size={16} />
                    </span>
                    {k.t}
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* 转换示意 */}
        <Reveal className="mt-6">
          <button
            onClick={() => setOn((v) => !v)}
            className="mx-auto flex items-center gap-3 text-[13.5px] font-medium text-brand"
          >
            <Factory size={17} className={on ? 'text-muted' : 'text-ink'} />
            <ArrowRight size={16} />
            <span className="rounded-lg bg-brand/10 px-2.5 py-1">AI</span>
            <ArrowRight size={16} />
            <span className={on ? 'font-bold text-brand' : 'text-muted'}>智能工厂</span>
            <span className="text-muted">（点击 AI 节点查看转换）</span>
          </button>
        </Reveal>

        {/* 三特征 */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1}>
              <div className="card card-hover flex h-full flex-col p-7">
                <div className="flex items-center justify-between">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{ background: `${f.color}16`, color: f.color }}
                  >
                    <f.icon size={23} />
                  </span>
                </div>
                <h4 className="mt-5 text-[19px] font-bold text-ink">{f.title}</h4>
                <p className="mt-2 flex-1 text-[14px] leading-relaxed text-body">{f.desc}</p>
                <div className="mt-5">{f.chart}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
