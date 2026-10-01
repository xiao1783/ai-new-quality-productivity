import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
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

type LoopNodeId = 'data' | 'perception' | 'analysis' | 'prediction' | 'decision' | 'execution' | 'feedback' | 'optimization'

const NODES = [
  { id: 'data', icon: Database, zh: '数据', en: 'Data', insight: '建立高质量数据基础', detail: '汇聚设备、业务与环境中的多源信息，为后续智能分析提供可靠的数据基础。', tags: ['多源数据', '数据治理', '数据融合'] },
  { id: 'perception', icon: Eye, zh: '感知', en: 'Perception', insight: '理解现实世界状态', detail: '通过视觉、传感器和多模态信息，让 AI 感知真实生产环境的状态变化。', tags: ['计算机视觉', '传感器', '多模态感知'] },
  { id: 'analysis', icon: BarChart3, zh: '分析', en: 'Analysis', insight: '从数据中提取规律', detail: '从海量数据中挖掘规律、识别模式，形成结构化洞察。', tags: ['机器学习', '数据挖掘', '模式识别'] },
  { id: 'prediction', icon: Sparkles, zh: '预测', en: 'Prediction', insight: '判断未来趋势与风险', detail: '基于历史数据与实时状态，预测需求、风险与未来变化趋势。', tags: ['趋势预测', '风险预测', '需求预测'] },
  { id: 'decision', icon: GitBranch, zh: '决策', en: 'Decision', insight: '生成最优行动方案', detail: '综合目标、约束与预测结果，生成更优的资源配置和行动方案。', tags: ['智能调度', '资源优化', '辅助决策'] },
  { id: 'execution', icon: Cog, zh: '执行', en: 'Execution', insight: '将决策转化为行动', detail: '通过自动化设备、机器人和智能系统，将智能决策转化为实际生产行动。', tags: ['机器人', '自动控制', '智能体'] },
  { id: 'feedback', icon: Undo2, zh: '反馈', en: 'Feedback', insight: '采集实际执行结果', detail: '持续采集生产执行结果和环境变化，形成真实运行状态反馈。', tags: ['实时监测', '效果评估', '状态反馈'] },
  { id: 'optimization', icon: RefreshCw, zh: '优化', en: 'Optimization', insight: '基于反馈持续迭代', detail: '结合反馈结果持续调整模型与策略，让整个生产系统不断自我改进。', tags: ['持续学习', '参数优化', '模型迭代'] },
] as const

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

function flowPath(i: number) {
  const before = pos((i + 7) % 8)
  const current = pos(i)
  const after = pos((i + 1) % 8)
  return `M ${before.x} ${before.y} A ${R} ${R} 0 0 1 ${current.x} ${current.y} A ${R} ${R} 0 0 1 ${after.x} ${after.y}`
}

function arrowPos(i: number) {
  const angle = -90 + (i + 0.5) * 45
  const a = (angle * Math.PI) / 180
  return { x: CC + R * Math.cos(a), y: CC + R * Math.sin(a), rotate: angle + 90 }
}

const pause = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms))

function iconMotion(id: LoopNodeId, active: boolean) {
  if (!active) return { x: 0, y: 0, rotate: 0, scale: 1 }
  if (id === 'data') return { y: [0, -3, 0] }
  if (id === 'perception') return { scale: [1, 1.12, 1] }
  if (id === 'analysis') return { y: [2, -3, 0] }
  if (id === 'prediction') return { x: [0, 3, 0], y: [0, -3, 0] }
  if (id === 'decision') return { rotate: [0, 8, 0] }
  if (id === 'execution') return { rotate: [0, 15, 0] }
  if (id === 'feedback') return { x: [0, -4, 0] }
  return { rotate: [0, 40, 0] }
}

/* ---------- 三大能力动态 SVG ---------- */
function PerceptionArt({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 320 190" className="h-[190px] w-full" role="img" aria-label="科技感感知系统">
      <defs>
        <linearGradient id="p-g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2563EB" />
          <stop offset="1" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      <path d="M48 95 Q160 24 272 95 Q160 166 48 95 Z" fill="#F8FBFF" stroke="url(#p-g)" strokeWidth="2.5" />
      <path d="M70 95 Q160 46 250 95 Q160 144 70 95 Z" fill="none" stroke="#BFDBFE" strokeWidth="1.3" strokeDasharray="5 7" />
      <motion.circle cx="160" cy="95" r="31" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2.5" animate={{ scale: active ? [1, 1.1, 1] : 1 }} transition={{ duration: 0.55, ease: 'easeOut' }} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
      <motion.circle cx="160" cy="95" r="13" fill="#2563EB" animate={{ opacity: active ? [0.75, 1, 0.82] : 0.82, scale: active ? [1, 1.18, 1] : 1 }} transition={{ duration: 0.55 }} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
      {[42, 55].map((radius, index) => (
        <motion.circle
          key={radius}
          cx="160"
          cy="95"
          r={radius}
          fill="none"
          stroke="#60A5FA"
          strokeWidth="1.5"
          animate={{ scale: active ? [0.78, 1.18] : 0.92, opacity: active ? [0.45, 0] : 0.12 }}
          transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        />
      ))}
      {[0, 1, 2].map((i) => (
        <motion.path
          key={i}
          d={`M${278 + i * 9} 80 q8 15 0 30`}
          fill="none" stroke="#14B8A6" strokeWidth="2" strokeLinecap="round"
          animate={{ opacity: active ? [0.18, 1, 0.18] : 0.22, x: active ? [0, 3, 0] : 0 }}
          transition={{ duration: 0.55, delay: i * 0.1 }}
        />
      ))}
      <path d="M20 58 H70 M250 132 H300" stroke="#93C5FD" strokeWidth="1.3" strokeDasharray="4 5" />
      <circle cx="20" cy="58" r="4" fill="#60A5FA" /><circle cx="300" cy="132" r="4" fill="#06B6D4" />
      <text x="22" y="48" fill="#64748B" fontSize="9" fontWeight="700">VISUAL</text>
      <text x="268" y="148" fill="#64748B" fontSize="9" fontWeight="700">SENSOR</text>
    </svg>
  )
}

function CognitionArt({ active }: { active: boolean }) {
  const nodes = [
    { x: 48, y: 96, r: 8 }, { x: 105, y: 48, r: 10 }, { x: 105, y: 142, r: 7 },
    { x: 170, y: 95, r: 18 }, { x: 238, y: 48, r: 8 }, { x: 265, y: 128, r: 11 },
  ]
  const edges = [[0, 1], [0, 2], [1, 3], [2, 3], [1, 4], [3, 4], [3, 5], [4, 5]]
  return (
    <svg viewBox="0 0 320 190" className="h-[190px] w-full" role="img" aria-label="知识推理网络">
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
          stroke="#38BDF8" strokeWidth="1.8"
          animate={{ pathLength: active ? [0, 1] : 1, opacity: active ? [0.24, 0.9] : 0.32 }}
          transition={{ duration: 0.32, delay: active ? i * 0.07 : 0 }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.circle
          key={i} cx={n.x} cy={n.y} r={n.r}
          fill={i === 3 ? '#06B6D4' : '#fff'} stroke={i === 3 ? '#0891B2' : '#38BDF8'} strokeWidth="2"
          animate={{ scale: active ? [0.82, i === 3 ? 1.14 : 1.04, 1] : 1, opacity: active ? [0.45, 1] : 0.85 }}
          transition={{ duration: 0.36, delay: active ? i * 0.1 : 0 }}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        />
      ))}
      <motion.circle cx="170" cy="95" r="31" fill="none" stroke="#22D3EE" strokeWidth="1.5" animate={{ scale: active ? [0.7, 1.25] : 0.9, opacity: active ? [0.4, 0] : 0.12 }} transition={{ duration: 0.8 }} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
      <text x="170" y="99" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="800">AI CORE</text>
      <text x="30" y="118" fill="#64748B" fontSize="9" fontWeight="700">INPUT</text>
      <text x="250" y="154" fill="#64748B" fontSize="9" fontWeight="700">INSIGHT</text>
    </svg>
  )
}

function ActionArt({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 320 190" className="h-[190px] w-full" role="img" aria-label="执行控制系统">
      <motion.g
        style={{ transformBox: 'fill-box', transformOrigin: '82px 95px' }}
        animate={{ rotate: active ? [0, 28, 18] : 0 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        <g stroke="#2563EB" strokeWidth="6" strokeLinecap="round">
          {[0, 60, 120, 180, 240, 300].map((d) => {
            const a = (d * Math.PI) / 180
            return <line key={d} x1={82 + 27 * Math.cos(a)} y1={95 + 27 * Math.sin(a)} x2={82 + 42 * Math.cos(a)} y2={95 + 42 * Math.sin(a)} />
          })}
        </g>
        <circle cx="82" cy="95" r="25" fill="#ECFEFF" stroke="#0EA5A8" strokeWidth="2.5" />
        <circle cx="82" cy="95" r="9" fill="#14B8A6" />
      </motion.g>
      <path d="M126 95 H165" stroke="#14B8A6" strokeWidth="2" strokeDasharray="6 6" />
      <motion.circle r="4" fill="#0EA5E9" animate={{ x: active ? [126, 165] : 126, y: 95, opacity: active ? [0, 1, 0] : 0.35 }} transition={{ duration: 0.7, ease: 'easeInOut' }} />
      <rect x="165" y="43" width="125" height="104" rx="14" fill="#fff" stroke="#BFE7E5" strokeWidth="1.8" />
      <text x="180" y="64" fill="#0F766E" fontSize="9" fontWeight="800">TASK CONTROL</text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="180" y={78 + i * 22} width="92" height="9" rx="4.5" fill="#E2E8F0" />
          <motion.rect
            x="180" y={78 + i * 22} width={[68, 82, 58][i]} height="9" rx="4.5"
            fill={['#2563EB', '#06B6D4', '#14B8A6'][i]}
            style={{ transformOrigin: '180px center' }}
            animate={{ scaleX: active ? [0.12, 1] : 0.58 }}
            transition={{ duration: 0.45, delay: active ? i * 0.14 : 0, ease: 'easeOut' }}
          />
        </g>
      ))}
      <text x="52" y="157" fill="#0F766E" fontSize="9" fontWeight="800">EXECUTION CORE</text>
    </svg>
  )
}

const CAPABILITIES = [
  {
    no: '01', en: 'PERCEPTION', icon: ScanEye, title: '感知生产力', subtitle: '让 AI 感知真实世界', color: '#2563EB', glow: 'rgba(37,99,235,.07)',
    verbs: ['看', '听', '识别', '检测'],
    tech: ['CV', 'Speech', 'Sensor Fusion'],
    visual: 'perception' as const,
  },
  {
    no: '02', en: 'COGNITION', icon: BrainCircuit, title: '认知生产力', subtitle: '让 AI 理解与推理', color: '#0891B2', glow: 'rgba(6,182,212,.07)',
    verbs: ['理解', '分析', '推理', '预测'],
    tech: ['Machine Learning', 'LLM', 'Knowledge Graph'],
    visual: 'cognition' as const,
  },
  {
    no: '03', en: 'ACTION', icon: Bot, title: '行动生产力', subtitle: '让 AI 执行与优化', color: '#0F9F8F', glow: 'rgba(20,184,166,.07)',
    verbs: ['规划', '控制', '执行', '优化'],
    tech: ['Robot', 'Agent', 'Automation'],
    visual: 'action' as const,
  },
]

function CapabilityCard({ capability }: { capability: (typeof CAPABILITIES)[number] }) {
  const [active, setActive] = useState(false)

  return (
    <motion.div
      tabIndex={0}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      className="card relative flex h-full min-h-[510px] flex-col overflow-hidden border border-white/90 outline-none transition-[border-color,box-shadow] duration-300 hover:border-sky-200 hover:shadow-[0_20px_48px_rgba(37,99,235,.12)] focus-visible:border-sky-300"
    >
      <span className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(circle at 100% 100%, ${capability.glow}, transparent 42%)` }} />
      <div className="relative p-7 pb-0">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[12px] font-bold tracking-[0.2em]" style={{ color: capability.color }}>{capability.no}</span>
            <p className="mt-1 text-[10px] font-bold tracking-[0.18em] text-muted">{capability.en}</p>
          </div>
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl" style={{ background: `${capability.color}12`, color: capability.color }}>
            <capability.icon size={21} />
          </span>
        </div>
        <h4 className="mt-5 text-[21px] font-bold text-ink">{capability.title}</h4>
        <p className="mt-1.5 text-[13px] text-muted">{capability.subtitle}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {capability.verbs.map((verb, index) => (
            <motion.span
              key={verb}
              animate={{ opacity: active ? 1 : 0.68, y: active ? [2, 0] : 0, backgroundColor: active ? `${capability.color}16` : `${capability.color}0C` }}
              transition={{ delay: active ? index * 0.08 : 0, duration: 0.22 }}
              className="rounded-lg border px-2.5 py-1 text-[12px] font-semibold"
              style={{ borderColor: `${capability.color}1F`, color: capability.color }}
            >
              {verb}
            </motion.span>
          ))}
        </div>
      </div>

      <div className="relative mx-5 mt-5 h-[190px] overflow-hidden rounded-2xl border border-slate-100 bg-white/55">
        {capability.visual === 'perception' && <PerceptionArt active={active} />}
        {capability.visual === 'cognition' && <CognitionArt active={active} />}
        {capability.visual === 'action' && <ActionArt active={active} />}
      </div>

      <div className="relative mt-auto border-t border-slate-100/90 px-7 py-5">
        <p className="mb-3 text-[9.5px] font-bold tracking-[0.16em] text-muted">TECH STACK</p>
        <div className="flex flex-wrap gap-2">
          {capability.tech.map((tech) => (
            <span key={tech} className="rounded-full border bg-white/80 px-2.5 py-1 text-[10px] font-semibold" style={{ borderColor: `${capability.color}24`, color: capability.color }}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Mechanism() {
  const [hoveredNode, setHoveredNode] = useState<LoopNodeId | null>(null)
  const [selectedNode, setSelectedNode] = useState<LoopNodeId>('analysis')
  const [playingNode, setPlayingNode] = useState<LoopNodeId | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [centerHovered, setCenterHovered] = useState(false)
  const [parallax, setParallax] = useState({ x: 0, y: 0 })
  const playbackRef = useRef(0)

  const displayNode = playingNode ?? hoveredNode ?? selectedNode
  const displayIndex = NODES.findIndex((node) => node.id === displayNode)
  const display = NODES[displayIndex]

  const stop = () => {
    playbackRef.current += 1
    setPlayingNode(null)
    setIsPlaying(false)
  }

  const play = async () => {
    if (isPlaying) return
    const playback = ++playbackRef.current
    setHoveredNode(null)
    setIsPlaying(true)
    for (const node of NODES) {
      if (playback !== playbackRef.current) return
      setPlayingNode(node.id)
      await pause(500)
    }
    if (playback !== playbackRef.current) return
    setPlayingNode(null)
    setIsPlaying(false)
  }

  const reset = () => {
    stop()
    setHoveredNode(null)
    setSelectedNode('analysis')
  }

  const handleParallax = (event: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = event.currentTarget.getBoundingClientRect()
    setParallax({
      x: ((event.clientX - rect.left) / rect.width - 0.5) * 6,
      y: ((event.clientY - rect.top) / rect.height - 0.5) * 6,
    })
  }

  useEffect(() => () => { playbackRef.current += 1 }, [])

  return (
    <section id="mechanism" className="scene scene-mechanism section-pad bg-canvas">
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
            <div
              className="card relative p-4 sm:p-8"
              onMouseMove={handleParallax}
              onMouseLeave={() => { setHoveredNode(null); setParallax({ x: 0, y: 0 }) }}
            >
              <motion.div animate={parallax} transition={{ type: 'spring', stiffness: 130, damping: 22 }}>
              <svg viewBox="0 0 600 600" className="w-full" role="group" aria-label="AI Productivity Engine 智能生产闭环">
                <defs>
                  <linearGradient id="node-g" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#2563EB" />
                    <stop offset="1" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>

                <circle cx={CC} cy={CC} r={R} fill="none" stroke="#E2E8F0" strokeWidth="1.2" opacity="0.42" />
                {NODES.map((_, i) => (
                  <motion.path
                    key={i}
                    d={arcPath(i)}
                    fill="none"
                    stroke={i === displayIndex || i === (displayIndex + 7) % 8 ? '#168BEB' : '#B9C8D9'}
                    strokeWidth={i === displayIndex || i === (displayIndex + 7) % 8 ? 2.6 : 1.25}
                    animate={{ opacity: i === displayIndex || i === (displayIndex + 7) % 8 ? 0.95 : 0.2 }}
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ pathLength: { duration: 0.55, delay: 0.78 }, opacity: { duration: 0.2 } }}
                  />
                ))}

                {NODES.map((_, i) => {
                  const arrow = arrowPos(i)
                  const highlighted = i === displayIndex || i === (displayIndex + 7) % 8
                  return (
                    <motion.path
                      key={`arrow-${i}`}
                      d="M-5 -3 L2 0 L-5 3"
                      fill="none"
                      stroke={highlighted ? '#168BEB' : '#A8B7C8'}
                      strokeWidth={highlighted ? 2.2 : 1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      transform={`translate(${arrow.x} ${arrow.y}) rotate(${arrow.rotate})`}
                      animate={{ opacity: highlighted ? 1 : 0.35 }}
                    />
                  )
                })}

                <motion.circle key={`particle-${displayNode}`} r="4" fill="#0F5BFB" opacity="0.9">
                  <animateMotion dur="0.9s" begin="0s" fill="freeze" path={flowPath(displayIndex)} />
                </motion.circle>

                {/* 中心 */}
                <motion.g
                  role="button"
                  tabIndex={0}
                  aria-label="播放完整闭环"
                  onMouseEnter={() => setCenterHovered(true)}
                  onMouseLeave={() => setCenterHovered(false)}
                  onFocus={() => setCenterHovered(true)}
                  onBlur={() => setCenterHovered(false)}
                  onClick={play}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); play() }
                  }}
                  animate={{ scale: centerHovered ? 1.02 : 1, x: -parallax.x * 0.35, y: -parallax.y * 0.35 }}
                  transition={{ duration: 0.2 }}
                  style={{ cursor: 'pointer', outline: 'none', transformBox: 'fill-box', transformOrigin: 'center' }}
                >
                  <circle cx={CC} cy={CC} r="86" fill="#F8FAFC" stroke={centerHovered || isPlaying ? '#60A5FA' : '#D8E2EE'} strokeWidth={centerHovered || isPlaying ? 2 : 1.2} />
                  <AnimatePresence mode="wait">
                    <motion.g
                      key={isPlaying ? `playing-${displayNode}` : displayNode}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                      style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                    >
                      <text x={CC} y={CC - 22} textAnchor="middle" fill="#0F5BFB" fontSize={isPlaying ? 10 : 13} fontWeight="800" letterSpacing="1.2">
                        {isPlaying ? 'AI PRODUCTIVITY ENGINE' : display.en.toUpperCase()}
                      </text>
                      <text x={CC} y={CC + 2} textAnchor="middle" fill="#0F172A" fontSize="15" fontWeight="700">
                        {isPlaying ? '运行中' : display.zh}
                      </text>
                      <text x={CC} y={CC + 23} textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="700">
                        {String(displayIndex + 1).padStart(2, '0')} / 08
                      </text>
                      <text x={CC} y={CC + 43} textAnchor="middle" fill="#94A3B8" fontSize="9.5" fontWeight="600">
                        {centerHovered && !isPlaying ? '播放完整闭环' : display.insight}
                      </text>
                    </motion.g>
                  </AnimatePresence>
                </motion.g>

                {/* 节点 */}
                {NODES.map((n, i) => {
                  const p = pos(i)
                  const hovered = hoveredNode === n.id
                  const selected = selectedNode === n.id
                  const playing = playingNode === n.id
                  const emphasized = playing || hovered || selected
                  return (
                    <g key={n.en} transform={`translate(${p.x},${p.y})`}>
                      <motion.g
                        role="button"
                        tabIndex={0}
                        aria-label={`${n.zh} ${n.en}`}
                        onMouseEnter={() => setHoveredNode(n.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                        onFocus={() => setHoveredNode(n.id)}
                        onBlur={() => setHoveredNode(null)}
                        onClick={() => setSelectedNode(n.id)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setSelectedNode(n.id) }
                        }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        animate={{ scale: playing || hovered ? 1.08 : selected ? 1.04 : 1, y: hovered ? -2 : 0 }}
                        transition={{ duration: 0.21, delay: i * 0.065 }}
                        style={{ cursor: 'pointer', outline: 'none', transformBox: 'fill-box', transformOrigin: 'center' }}
                      >
                        {(hovered || playing) && <circle r="49" fill="#2563EB" opacity="0.08" />}
                        {selected && !playing && <circle r="44" fill="none" stroke="#2563EB" strokeWidth="1.4" opacity="0.5" />}
                        <circle r="38" fill={playing ? 'url(#node-g)' : emphasized ? '#EFF6FF' : '#fff'} stroke={playing ? 'transparent' : emphasized ? '#2563EB' : '#CBD5E1'} strokeWidth={emphasized ? 1.9 : 1.2} />
                        <motion.g
                          animate={iconMotion(n.id, hovered || playing)}
                          transition={{ duration: 0.32, ease: 'easeOut' }}
                          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                        >
                          <n.icon size={19} color={playing ? '#fff' : emphasized ? '#0F5BFB' : '#64748B'} x={-9.5} y={-20} />
                        </motion.g>
                        <text y="12" textAnchor="middle" fill={playing ? '#fff' : emphasized ? '#0F5BFB' : '#0F172A'} fontSize="13" fontWeight="700">{n.zh}</text>
                        <text x="27" y="-26" textAnchor="middle" fill={emphasized ? '#2563EB' : '#94A3B8'} fontSize="7.5" fontWeight="800">{String(i + 1).padStart(2, '0')}</text>
                      </motion.g>
                    </g>
                  )
                })}
              </svg>
              </motion.div>

              <div className="mt-2 flex justify-center gap-3">
                <button className="btn btn-primary !py-2.5 !text-[14px]" onClick={play}>
                  <Play size={15} /> 播放完整闭环
                </button>
                <button className="btn btn-ghost !py-2.5 !text-[14px]" onClick={reset}>
                  <RotateCcw size={15} /> 重置
                </button>
              </div>
            </div>
          </Reveal>

          {/* 详情面板 */}
          <Reveal delay={0.1}>
            <div className="card h-full min-h-[360px] p-8">
              <div className="flex gap-1.5" aria-label={`闭环进度 ${displayIndex + 1} / 8`}>
                {NODES.map((node, index) => (
                  <motion.span
                    key={node.id}
                    className="h-1.5 flex-1 rounded-full"
                    animate={{ backgroundColor: index === displayIndex ? '#0F5BFB' : index < displayIndex ? '#BAE6FD' : '#E2E8F0' }}
                    transition={{ duration: 0.2 }}
                  />
                ))}
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={displayNode}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -5 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.p initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.03 }} className="mt-5 text-[12px] font-bold tracking-[0.24em] text-brand">
                    STEP {String(displayIndex + 1).padStart(2, '0')} / 08
                  </motion.p>
                  <motion.div initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.07 }} className="mt-4 flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                      {(() => {
                        const Icon = display.icon
                        return <Icon size={22} />
                      })()}
                    </span>
                    <div>
                      <h3 className="text-[22px] font-bold text-ink">{display.zh}</h3>
                      <p className="text-[12px] font-semibold tracking-widest text-muted">{display.en}</p>
                    </div>
                  </motion.div>
                  <motion.p initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.11 }} className="mt-5 text-[15px] leading-[1.8] text-body">{display.detail}</motion.p>
                  <motion.div initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="mt-6 flex flex-wrap gap-2">
                    {display.tags.map((tag) => (
                      <span key={tag} className="rounded-lg bg-canvas-2 px-3 py-1.5 text-[12.5px] font-medium text-body">
                        {tag}
                      </span>
                    ))}
                  </motion.div>
                </motion.div>
              </AnimatePresence>
              <p className="mt-8 text-[12.5px] text-muted">悬停可预览，点击或按 Enter 锁定当前环节。</p>
            </div>
          </Reveal>
        </div>

        {/* 三大核心生产力 */}
        <Reveal className="mt-20">
          <p className="text-center text-[10.5px] font-bold tracking-[0.24em] text-brand">AI PRODUCTIVITY CAPABILITIES</p>
          <h3 className="mt-2 text-center text-[26px] font-bold text-ink">
            AI 将三种能力，转化为新的生产力
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-center text-[14px] leading-relaxed text-muted">
            从感知、认知到行动，人工智能正不断把技术能力转化为真实生产价值。
          </p>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.no} delay={i * 0.1}>
              <CapabilityCard capability={c} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
