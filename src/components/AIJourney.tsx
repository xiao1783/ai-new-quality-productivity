import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Binary,
  BookOpen,
  BrainCircuit,
  ChartNoAxesCombined,
  Eraser,
  Eye,
  History,
  Network,
  PenLine,
  Play,
  ScanSearch,
  Sparkles,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import { loadWeights, recognizeDigit, type Recognition } from '@/utils/mnistNetwork'

interface Chapter {
  title: string
  en: string
  summary: string
  icon: LucideIcon
}

const CHAPTERS: Chapter[] = [
  { title: '体验人工智能', en: 'Meet AI', summary: '从一个熟悉的问题开始：机器怎样看懂人写下的数字？', icon: Sparkles },
  { title: '手写数字识别', en: 'Try MNIST', summary: '亲手写下 0–9，观察神经网络给出的识别结果与概率。', icon: PenLine },
  { title: 'AI 发展历程', en: 'AI Timeline', summary: '从符号智能、机器学习到生成式 AI，能力边界持续扩展。', icon: History },
  { title: '神经元信号', en: 'Neuron Signal', summary: '输入超过阈值后被激活，并把信号继续传向下一层。', icon: Zap },
  { title: '前向传播', en: 'Forward Pass', summary: '数据沿网络逐层计算，最终转换为可以解释的预测。', icon: Network },
  { title: 'MNIST 流程', en: 'Recognition Flow', summary: '图像经过预处理、特征计算和概率输出，形成完整闭环。', icon: ScanSearch },
  { title: 'AI 应用场景', en: 'AI Everywhere', summary: 'AI 已进入交通、制造、医疗、科研与日常数字服务。', icon: Eye },
  { title: '生产力信号', en: 'Productivity Signals', summary: '价值不只体现在规模，更体现在效率、创新、协同与质量。', icon: ChartNoAxesCombined },
  { title: '核心词汇', en: 'AI Vocabulary', summary: '用四个基础概念建立理解人工智能的共同语言。', icon: BookOpen },
]

const DIGITS = [7, 8, 6, 4, 5, 0, 9, 1, 2]
type Point = [number, number]

function DigitIntro() {
  return (
    <div className="journey-visual grid grid-cols-3 gap-3 p-6 sm:p-10">
      {DIGITS.map((digit, index) => (
        <motion.div
          key={`${digit}-${index}`}
          className="flex aspect-square items-center justify-center rounded-2xl border border-brand/15 bg-white/80 text-[32px] font-black text-ink shadow-[0_12px_28px_rgba(15,91,251,.1)]"
          animate={{ opacity: [0.35, 1, 0.35], scale: [0.96, 1.04, 0.96] }}
          transition={{ duration: 3.2, repeat: Infinity, delay: index * 0.22 }}
        >
          {digit}
        </motion.div>
      ))}
    </div>
  )
}

function DigitCanvas() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const paths = useRef<Point[][]>([])
  const drawing = useRef(false)
  const [result, setResult] = useState<Recognition | null>(null)
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle')

  const clear = () => {
    const context = canvas.current?.getContext('2d')
    if (!context || !canvas.current) return
    context.fillStyle = '#fff'
    context.fillRect(0, 0, canvas.current.width, canvas.current.height)
    paths.current = []
    setResult(null)
    setState('idle')
  }

  const example = () => {
    clear()
    const sample: Point[] = Array.from({ length: 41 }, (_, index) => {
      const angle = (index / 40) * Math.PI * 2
      return [140 + Math.cos(angle) * 67, 140 + Math.sin(angle) * 96]
    })
    paths.current = [sample]
    const context = canvas.current?.getContext('2d')
    if (!context) return
    context.strokeStyle = '#07122F'
    context.lineWidth = 22
    context.lineCap = 'round'
    context.lineJoin = 'round'
    context.beginPath()
    context.moveTo(sample[0][0], sample[0][1])
    sample.slice(1).forEach(([x, y]) => context.lineTo(x, y))
    context.stroke()
  }

  useEffect(clear, [])

  const point = (event: PointerEvent<HTMLCanvasElement>): Point => {
    const rect = event.currentTarget.getBoundingClientRect()
    return [
      ((event.clientX - rect.left) / rect.width) * event.currentTarget.width,
      ((event.clientY - rect.top) / rect.height) * event.currentTarget.height,
    ]
  }

  const start = (event: PointerEvent<HTMLCanvasElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    drawing.current = true
    paths.current.push([point(event)])
  }

  const draw = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return
    const path = paths.current.at(-1)
    const context = event.currentTarget.getContext('2d')
    if (!path || !context) return
    const next = point(event)
    const previous = path.at(-1)!
    path.push(next)
    context.strokeStyle = '#07122F'
    context.lineWidth = 22
    context.lineCap = 'round'
    context.lineJoin = 'round'
    context.beginPath()
    context.moveTo(previous[0], previous[1])
    context.lineTo(next[0], next[1])
    context.stroke()
  }

  const recognize = async () => {
    if (!paths.current.some((path) => path.length > 1)) return
    setState('loading')
    const loaded = await loadWeights()
    if (!loaded) {
      setState('error')
      return
    }
    setResult(recognizeDigit(paths.current))
    setState('idle')
  }

  return (
    <div className="journey-visual grid gap-5 p-5 sm:grid-cols-[1fr_.8fr] sm:p-7">
      <div>
        <canvas
          ref={canvas}
          width="280"
          height="280"
          className="mx-auto aspect-square w-full max-w-[280px] touch-none rounded-[22px] border border-brand/15 bg-white shadow-inner"
          onPointerDown={start}
          onPointerMove={draw}
          onPointerUp={() => (drawing.current = false)}
          onPointerCancel={() => (drawing.current = false)}
          aria-label="手写数字画布"
        />
        <div className="mt-4 flex justify-center gap-2">
          <button className="btn btn-primary !px-4 !py-2.5 !text-[13px]" onClick={recognize}>
            <Play size={14} /> {state === 'loading' ? '识别中…' : '开始识别'}
          </button>
          <button className="btn btn-ghost !px-4 !py-2.5 !text-[13px]" onClick={clear}>
            <Eraser size={14} /> 擦除
          </button>
          <button className="btn btn-ghost !px-4 !py-2.5 !text-[13px]" onClick={example}>
            <Sparkles size={14} /> 示例 0
          </button>
        </div>
      </div>
      <div className="flex min-h-[250px] flex-col items-center justify-center rounded-[22px] border border-white bg-white/70 p-5 text-center">
        {result ? (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
            <p className="text-[12px] font-bold tracking-[.2em] text-muted">NEURAL NETWORK OUTPUT</p>
            <p className="mt-2 text-[82px] font-black leading-none text-gradient">{result.digit}</p>
            <p className="mt-3 text-[14px] text-body">最高概率 {result.confidence.toFixed(1)}%</p>
            <div className="mt-4 flex items-end justify-center gap-1">
              {result.probabilities.map((value, digit) => (
                <span key={digit} className="flex flex-col items-center gap-1 text-[9px] text-muted">
                  <span className="w-3 rounded-t bg-brand/70" style={{ height: `${Math.max(3, value * 58)}px` }} />
                  {digit}
                </span>
              ))}
            </div>
          </motion.div>
        ) : (
          <>
            <BrainCircuit size={42} className="text-brand" />
            <p className="mt-4 text-[15px] font-bold text-ink">等待输入</p>
            <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
              在左侧写下一个数字。识别使用迁移自原项目的 784–200–10 教学神经网络。
            </p>
            {state === 'error' && <p className="mt-3 text-[12px] text-red-500">模型权重加载失败，请刷新后重试。</p>}
          </>
        )}
      </div>
    </div>
  )
}

function TimelineVisual() {
  const items = [['1956', '人工智能诞生'], ['1997', '深蓝击败棋王'], ['2012', '深度学习突破'], ['2022+', '生成式 AI 加速']]
  return (
    <div className="journey-visual flex flex-col justify-center gap-4 p-7">
      {items.map(([year, label], index) => (
        <motion.div key={year} className="flex items-center gap-4" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.12 }}>
          <span className="w-16 text-[16px] font-black text-brand">{year}</span>
          <span className="h-3 w-3 rounded-full bg-cyan shadow-[0_0_0_7px_rgba(24,185,234,.12)]" />
          <span className="flex-1 rounded-2xl border border-white bg-white/75 px-4 py-3 text-[14px] font-semibold text-ink">{label}</span>
        </motion.div>
      ))}
    </div>
  )
}

function NeuronVisual() {
  return (
    <div className="journey-visual flex items-center justify-center p-5">
      <svg viewBox="0 0 520 300" className="w-full">
        {[70, 135, 200, 265].map((y, i) => <path key={y} d={`M30 ${y} C120 ${y},125 150,220 150`} fill="none" stroke="#8ECBF1" strokeWidth="3" />)}
        <circle cx="245" cy="150" r="55" fill="#fff" stroke="#0F5BFB" strokeWidth="4" />
        <BrainCircuit x="218" y="123" width="54" height="54" color="#0F5BFB" />
        <path d="M300 150 C355 150,365 90,420 90 S470 150,505 150" fill="none" stroke="#18B9EA" strokeWidth="5" strokeLinecap="round" />
        {[0, 1, 2].map((i) => <motion.circle key={i} r="7" fill="#0F5BFB" animate={{ cx: [35, 220, 300, 420, 500], cy: [70 + i * 65, 150, 150, 90, 150] }} transition={{ duration: 2.4, repeat: Infinity, delay: i * .5 }} />)}
        <text x="245" y="230" textAnchor="middle" fill="#526681" fontSize="13">输入加权 · 阈值激活 · 信号输出</text>
      </svg>
    </div>
  )
}

function ForwardVisual() {
  const layers = [[70, 100, 130, 160, 190, 220], [115, 155, 195], [135, 175]]
  const xs = [80, 270, 450]
  return (
    <div className="journey-visual flex items-center justify-center p-5">
      <svg viewBox="0 0 530 300" className="w-full">
        {layers.slice(0, -1).flatMap((layer, li) => layer.flatMap((y, i) => layers[li + 1].map((ny, j) => <line key={`${li}-${i}-${j}`} x1={xs[li]} y1={y} x2={xs[li + 1]} y2={ny} stroke="#BBD8F2" />)))}
        {layers.map((layer, li) => layer.map((y, i) => <motion.circle key={`${li}-${i}`} cx={xs[li]} cy={y} r={li === 2 ? 17 : 12} fill={li === 2 ? '#0F5BFB' : '#fff'} stroke={li === 1 ? '#18B9EA' : '#0F5BFB'} strokeWidth="3" animate={{ scale: [1, 1.16, 1] }} transition={{ duration: 1.8, repeat: Infinity, delay: li * .5 + i * .08 }} />))}
        <text x="80" y="265" textAnchor="middle" fill="#526681" fontSize="13">输入层</text><text x="270" y="265" textAnchor="middle" fill="#526681" fontSize="13">隐藏层</text><text x="450" y="265" textAnchor="middle" fill="#526681" fontSize="13">输出层</text>
      </svg>
    </div>
  )
}

function PipelineVisual() {
  const steps = [['01', '手写输入', PenLine], ['02', '28×28 灰度', Binary], ['03', '特征计算', BrainCircuit], ['04', '概率输出', ChartNoAxesCombined]] as const
  return (
    <div className="journey-visual grid content-center gap-3 p-7 sm:grid-cols-4">
      {steps.map(([number, label, Icon], index) => (
        <div key={number} className="relative rounded-2xl border border-white bg-white/76 p-4 text-center">
          <span className="text-[11px] font-bold tracking-widest text-muted">STEP {number}</span><Icon className="mx-auto mt-4 text-brand" size={30} /><p className="mt-3 text-[13px] font-bold text-ink">{label}</p>
          {index < steps.length - 1 && <ArrowRight className="absolute -right-5 top-1/2 z-10 hidden -translate-y-1/2 text-cyan sm:block" size={20} />}
        </div>
      ))}
    </div>
  )
}

function ApplicationsVisual() {
  return <div className="journey-visual grid content-center gap-3 p-7 sm:grid-cols-2">{['智能制造', '自动驾驶', '医学影像', '科研发现', '内容推荐', '能源优化'].map((item, index) => <motion.div key={item} className="rounded-2xl border border-white bg-white/76 px-5 py-4 text-[14px] font-bold text-ink" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .08 }}><Sparkles className="mr-2 inline text-brand" size={16} />{item}</motion.div>)}</div>
}

function SignalsVisual() {
  return <div className="journey-visual grid content-center gap-4 p-7 sm:grid-cols-2">{[['效率', '更快响应与更少重复劳动'], ['创新', '缩短试验与迭代周期'], ['协同', '连接人员、设备与数据'], ['质量', '稳定检测与持续优化']].map(([title, text], index) => <motion.div key={title} className="rounded-[22px] border border-white bg-white/76 p-5" initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * .1 }}><p className="text-[24px] font-black text-gradient">{title}</p><p className="mt-2 text-[12.5px] text-body">{text}</p></motion.div>)}</div>
}

function VocabularyVisual() {
  const words = [['算法 Algorithm', '为达成目标而执行的一系列规则。'], ['人工智能 AI', '让计算机完成通常需要人类智能的任务。'], ['机器学习 ML', '利用数据训练模型获得任务能力。'], ['深度学习 DL', '使用多层神经网络处理复杂模式。']]
  return <div className="journey-visual grid content-center gap-3 p-7 sm:grid-cols-2">{words.map(([word, meaning]) => <div key={word} className="rounded-2xl border border-white bg-white/78 p-5"><p className="text-[14px] font-black text-ink">{word}</p><p className="mt-2 text-[12.5px] leading-relaxed text-body">{meaning}</p></div>)}</div>
}

function ChapterVisual({ index }: { index: number }) {
  if (index === 0) return <DigitIntro />
  if (index === 1) return <DigitCanvas />
  if (index === 2) return <TimelineVisual />
  if (index === 3) return <NeuronVisual />
  if (index === 4) return <ForwardVisual />
  if (index === 5) return <PipelineVisual />
  if (index === 6) return <ApplicationsVisual />
  if (index === 7) return <SignalsVisual />
  return <VocabularyVisual />
}

export default function AIJourney() {
  const [chapter, setChapter] = useState(0)
  const current = CHAPTERS[chapter]
  return (
    <section id="journey" className="scene scene-journey section-pad bg-canvas-2">
      <div className="container-x">
        <SectionHeading index="07" en="AI JOURNEY" title="体验 AI 之旅" subtitle="从一次真实的手写数字识别出发，用九个轻量章节理解人工智能如何感知、计算、预测并创造价值。" />
        <Reveal className="mt-10">
          <div className="card overflow-hidden p-4 sm:p-6">
            <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
              <nav className="journey-nav flex gap-2 overflow-x-auto lg:flex-col" aria-label="AI 体验章节">
                {CHAPTERS.map((item, index) => (
                  <button key={item.en} onClick={() => setChapter(index)} className={`flex min-w-[170px] items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all lg:min-w-0 ${chapter === index ? 'bg-gradient-to-r from-brand to-cyan text-white shadow-[0_12px_26px_rgba(15,91,251,.22)]' : 'bg-white/58 text-body hover:bg-white'}`}>
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${chapter === index ? 'bg-white/18' : 'bg-brand/8 text-brand'}`}><item.icon size={17} /></span>
                    <span><span className="block text-[13.5px] font-bold">{String(index + 1).padStart(2, '0')} · {item.title}</span><span className={`mt-0.5 block text-[9.5px] tracking-wider ${chapter === index ? 'text-white/72' : 'text-muted'}`}>{item.en}</span></span>
                  </button>
                ))}
              </nav>

              <div className="min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-4 px-1 pb-5">
                  <div><p className="text-[11px] font-bold tracking-[.2em] text-brand">CHAPTER {String(chapter + 1).padStart(2, '0')} / 09</p><h3 className="mt-2 text-[26px] font-black text-ink">{current.title}</h3><p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-body">{current.summary}</p></div>
                  <div className="flex gap-2"><button className="btn btn-ghost !h-10 !px-3 !py-0" disabled={chapter === 0} onClick={() => setChapter((value) => Math.max(0, value - 1))} aria-label="上一章"><ArrowLeft size={16} /></button><button className="btn btn-primary !h-10 !px-3 !py-0" disabled={chapter === CHAPTERS.length - 1} onClick={() => setChapter((value) => Math.min(CHAPTERS.length - 1, value + 1))} aria-label="下一章"><ArrowRight size={16} /></button></div>
                </div>
                <AnimatePresence mode="wait"><motion.div key={chapter} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }} transition={{ duration: .32 }}><ChapterVisual index={chapter} /></motion.div></AnimatePresence>
                <div className="mt-4 flex gap-1.5">{CHAPTERS.map((_, index) => <button key={index} aria-label={`第 ${index + 1} 章`} onClick={() => setChapter(index)} className={`h-1.5 flex-1 rounded-full transition-colors ${index <= chapter ? 'bg-brand' : 'bg-line'}`} />)}</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
