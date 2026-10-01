import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Database,
  Eye,
  BarChart3,
  Sparkles,
  GitBranch,
  Cog,
  Undo2,
  RefreshCw,
  Play,
  RotateCcw,
  ScanEye,
  BrainCircuit,
  Bot,
} from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

const NODES = [
  { icon: Database, zh: '数据', en: 'Data', detail: '通过传感器、业务系统、互联网等持续形成数据资源。', tags: ['传感器', '业务系统', '互联网'] },
  { icon: Eye, zh: '感知', en: 'Perception', detail: '让机器具备看、听、识别的能力，将物理世界转为可计算信号。', tags: ['计算机视觉', '语音识别', '传感器融合'] },
  { icon: BarChart3, zh: '分析', en: 'Analysis', detail: '从海量数据中挖掘规律、识别模式，形成结构化洞察。', tags: ['机器学习', '数据挖掘', '模式识别'] },
  { icon: Sparkles, zh: '预测', en: 'Prediction', detail: '基于规律推演未来趋势，提前识别需求、风险与设备状态。', tags: ['需求预测', '风险预测', '设备预测'] },
  { icon: GitBranch, zh: '决策', en: 'Decision', detail: '在多目标约束下生成并选择最优方案，完成资源配置与调度。', tags: ['资源配置', '智能调度', '自动优化'] },
  { icon: Cog, zh: '执行', en: 'Execution', detail: '通过机器人与自动化系统将决策落地为真实生产动作。', tags: ['机器人', '自动化系统', '智能控制'] },
  { icon: Undo2, zh: '反馈', en: 'Feedback', detail: '实时回传执行结果与现场状态，形成闭环数据。', tags: ['实时回传', '结果追踪', '状态监控'] },
  { icon: RefreshCw, zh: '优化', en: 'Optimization', detail: '依据反馈持续迭代模型与参数，让系统越用越聪明。', tags: ['模型迭代', '参数调优', '持续进化'] },
]

const R = 250
const CC = 300
const pos = (i: number) => {
  const a = ((-90 + i * 45) * Math.PI) / 180
  return { x: CC + R * Math.cos(a), y: CC + R * Math.sin(a) }
}

function arcPath(i: number) {
  const a = pos(i)
  const b = pos((i + 1) % 8)
  return `M ${a.x} ${a.y} A ${R} ${R} 0 0 1 ${b.x} ${b.y}`
}

/* ---------- 三大能力动态 SVG ---------- */
function PerceptionArt() {
  return (
    <svg viewBox="0 0 260 150" className="h-36 w-full">
      <defs>
        <linearGradient id="p-g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2563EB" />
          <stop offset="1" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      <path d="M40 75 Q130 20 220 75 Q130 130 40 75 Z" fill="none" stroke="url(#p-g)" strokeWidth="2.4" />
      <circle cx="130" cy="75" r="17" fill="#EFF4FF" stroke="#2563EB" strokeWidth="2" />
      <circle cx="130" cy="75" r="7" fill="#2563EB" />
      <motion.g
        animate={{ y: [-35, 35, -35], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <line x1="52" y1="75" x2="208" y2="75" stroke="#06B6D4" strokeWidth="2" />
      </motion.g>
      {[0, 1, 2].map((i) => (
        <motion.path
          key={i}
          d={`M${224 + i * 10} 62 q6 13 0 26`}
          fill="none" stroke="#14B8A6" strokeWidth="2" strokeLinecap="round"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.25 }}
        />
      ))}
    </svg>
  )
}

function CognitionArt() {
  const nodes = [
    { x: 60, y: 75 }, { x: 120, y: 45 }, { x: 120, y: 105 }, { x: 180, y: 75 }, { x: 210, y: 35 },
  ]
  const edges = [[0, 1], [0, 2], [1, 3], [2, 3], [1, 4], [3, 4]]
  return (
    <svg viewBox="0 0 260 150" className="h-36 w-full">
      {edges.map(([a, b], i) => (
        <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke="#CBD5E1" strokeWidth="1.8" />
      ))}
      {edges.map(([a, b], i) => (
        <motion.circle
          key={`d-${i}`} r="3" fill="#06B6D4"
          animate={{ x: [nodes[a].x, nodes[b].x], y: [nodes[a].y, nodes[b].y] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.3, ease: 'linear' }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.circle
          key={i} cx={n.x} cy={n.y} r={i === 0 ? 9 : 7}
          fill={i === 0 ? '#2563EB' : '#fff'} stroke="#2563EB" strokeWidth="2"
          animate={{ scale: [1, 1.18, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </svg>
  )
}

function ActionArt() {
  return (
    <svg viewBox="0 0 260 150" className="h-36 w-full">
      <motion.g
        style={{ transformBox: 'fill-box', transformOrigin: '70px 75px' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
      >
        <g stroke="#2563EB" strokeWidth="6" strokeLinecap="round">
          {[0, 60, 120, 180, 240, 300].map((d) => {
            const a = (d * Math.PI) / 180
            return <line key={d} x1={70 + 22 * Math.cos(a)} y1={75 + 22 * Math.sin(a)} x2={70 + 34 * Math.cos(a)} y2={75 + 34 * Math.sin(a)} />
          })}
        </g>
        <circle cx="70" cy="75" r="20" fill="#EFF4FF" stroke="#2563EB" strokeWidth="2.4" />
      </motion.g>
      <rect x="140" y="40" width="90" height="70" rx="10" fill="#fff" stroke="#E2E8F0" strokeWidth="1.6" />
      {[0, 1, 2].map((i) => (
        <motion.rect
          key={i} x="152" y={52 + i * 18} width={72 - i * 6} height="9" rx="4.5"
          fill={['#2563EB', '#06B6D4', '#14B8A6'][i]}
          style={{ transformOrigin: '152px center' }}
          animate={{ scaleX: [0.55, 1, 0.55] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
    </svg>
  )
}

const CAPABILITIES = [
  {
    no: '01', icon: ScanEye, title: '感知生产力', color: '#2563EB',
    verbs: ['看', '听', '识别', '检测'],
    tech: ['Computer Vision', 'Speech', 'Sensor Fusion'],
    art: <PerceptionArt />,
  },
  {
    no: '02', icon: BrainCircuit, title: '认知生产力', color: '#06B6D4',
    verbs: ['理解', '分析', '推理', '预测'],
    tech: ['Machine Learning', 'LLM', 'Knowledge Graph'],
    art: <CognitionArt />,
  },
  {
    no: '03', icon: Bot, title: '行动生产力', color: '#14B8A6',
    verbs: ['规划', '控制', '执行', '优化'],
    tech: ['Robot', 'Agent', 'Automation'],
    art: <ActionArt />,
  },
]

export default function Mechanism() {
  const [activeStep, setActiveStep] = useState(-1)
  const [selected, setSelected] = useState(0)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  const play = () => {
    stop()
    setActiveStep(0)
    let i = 0
    timer.current = setInterval(() => {
      i += 1
      if (i >= NODES.length) {
        stop()
        return
      }
      setActiveStep(i)
      setSelected(i)
    }, 750)
  }
  const stop = () => {
    if (timer.current) clearInterval(timer.current)
    timer.current = null
  }
  useEffect(() => stop, [])

  return (
    <section id="mechanism" className="section-pad bg-canvas">
      <div className="container-x">
        <SectionHeading
          index="02"
          en="MECHANISM"
          title="AI 如何转化为生产力？"
          subtitle="数据经过感知、分析、预测、决策、执行，再由反馈与优化形成不断进化的智能生产闭环。"
        />

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          {/* 闭环图 */}
          <Reveal>
            <div className="card relative p-4 sm:p-8">
              <svg viewBox="0 0 600 600" className="w-full">
                <defs>
                  <linearGradient id="node-g" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#2563EB" />
                    <stop offset="1" stopColor="#06B6D4" />
                  </linearGradient>
                  <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M0 0 L10 5 L0 10 z" fill="#94A3B8" />
                  </marker>
                </defs>

                <circle cx={CC} cy={CC} r={R} fill="none" stroke="#EEF2F7" strokeWidth="1.4" />
                {NODES.map((_, i) => (
                  <path
                    key={i}
                    d={arcPath(i)}
                    fill="none"
                    stroke={activeStep >= i ? '#06B6D4' : '#CBD5E1'}
                    strokeWidth={activeStep >= i ? 2.2 : 1.4}
                    markerEnd="url(#arrow)"
                    className={activeStep >= i ? 'flow-line' : ''}
                  />
                ))}

                {/* 中心 */}
                <circle cx={CC} cy={CC} r="86" fill="#F8FAFC" stroke="#E2E8F0" />
                <text x={CC} y={CC - 8} textAnchor="middle" fill="#0F172A" fontSize="17" fontWeight="700">智能生产闭环</text>
                <text x={CC} y={CC + 16} textAnchor="middle" fill="#94A3B8" fontSize="11" fontWeight="600" letterSpacing="1.5">CLOSED LOOP</text>

                {/* 节点 */}
                {NODES.map((n, i) => {
                  const p = pos(i)
                  const lit = activeStep === i || activeStep >= NODES.length - 1 && i <= activeStep
                  const isActive = activeStep === i
                  return (
                    <g
                      key={n.en}
                      transform={`translate(${p.x},${p.y})`}
                      style={{ cursor: 'pointer' }}
                      onMouseEnter={() => setSelected(i)}
                      onClick={() => setSelected(i)}
                    >
                      {isActive && <circle r="46" fill="#2563EB" opacity="0.12" />}
                      <circle r="38" fill={lit ? 'url(#node-g)' : '#fff'} stroke={lit ? 'transparent' : '#CBD5E1'} strokeWidth="1.6" />
                      <n.icon size={19} color={lit ? '#fff' : '#475569'} x={-9.5} y={-20} />
                      <text y="12" textAnchor="middle" fill={lit ? '#fff' : '#0F172A'} fontSize="13" fontWeight="700">{n.zh}</text>
                    </g>
                  )
                })}
              </svg>

              <div className="mt-2 flex justify-center gap-3">
                <button className="btn btn-primary !py-2.5 !text-[14px]" onClick={play}>
                  <Play size={15} /> 播放 AI 决策流程
                </button>
                <button className="btn btn-ghost !py-2.5 !text-[14px]" onClick={() => { stop(); setActiveStep(-1) }}>
                  <RotateCcw size={15} /> 重置
                </button>
              </div>
            </div>
          </Reveal>

          {/* 详情面板 */}
          <Reveal delay={0.1}>
            <div className="card h-full p-8">
              <p className="text-[12px] font-bold tracking-[0.24em] text-brand">
                STEP {String(selected + 1).padStart(2, '0')} / 08
              </p>
              <div className="mt-4 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                  {(() => {
                    const I = NODES[selected].icon
                    return <I size={22} />
                  })()}
                </span>
                <div>
                  <h3 className="text-[22px] font-bold text-ink">{NODES[selected].zh}</h3>
                  <p className="text-[12px] font-semibold tracking-widest text-muted">{NODES[selected].en}</p>
                </div>
              </div>
              <p className="mt-5 text-[15px] leading-[1.8] text-body">{NODES[selected].detail}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {NODES[selected].tags.map((t) => (
                  <span key={t} className="rounded-lg bg-canvas-2 px-3 py-1.5 text-[12.5px] font-medium text-body">
                    {t}
                  </span>
                ))}
              </div>
              <p className="mt-8 text-[12.5px] text-muted">提示：将鼠标移到圆环节点上查看各环节说明。</p>
            </div>
          </Reveal>
        </div>

        {/* 三大核心生产力 */}
        <Reveal className="mt-20">
          <h3 className="text-center text-[26px] font-bold text-ink">
            AI 将三种能力，转化为新的生产力
          </h3>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.no} delay={i * 0.1}>
              <div className="card card-hover h-full overflow-hidden">
                <div className="p-7 pb-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-bold tracking-[0.2em] text-muted">{c.no}</span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${c.color}16`, color: c.color }}>
                      <c.icon size={20} />
                    </span>
                  </div>
                  <h4 className="mt-4 text-[20px] font-bold text-ink">{c.title}</h4>
                  <p className="mt-2 text-[13px] text-muted">机器可以：</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {c.verbs.map((v) => (
                      <span key={v} className="rounded-lg px-2.5 py-1 text-[13px] font-semibold" style={{ background: `${c.color}12`, color: c.color }}>
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
                {c.art}
                <div className="px-7 pb-6 pt-2">
                  <p className="text-[11.5px] font-semibold tracking-wide text-muted">{c.tech.join(' · ')}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
