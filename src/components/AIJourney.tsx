import { useEffect, useRef, useState, type CSSProperties, type PointerEvent, type WheelEvent } from 'react'
import { motion } from 'framer-motion'
import lottie, { type AnimationItem } from 'lottie-web'
import {
  ArrowLeft,
  ArrowRight,
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
import Logo from './Logo'
import { useLanguage } from '@/i18n/LanguageContext'
import LanguageToggle from './ui/LanguageToggle'
import { loadWeights, recognizeDigit, type Recognition } from '@/utils/mnistNetwork'

interface Chapter {
  title: string
  en: string
  summary: string
  body: string[]
  icon: LucideIcon
}

const CHAPTERS: Chapter[] = [
  { title: '体验人工智能', en: 'Meet AI', summary: '从一个熟悉的问题开始：机器怎样看懂人写下的数字？', body: ['你有没有好奇过人工智能可以做些什么？接下来的旅程从一个能识别手写数字的交互模块开始。', '之后的章节会逐步拆解它背后的神经元、前向传播和识别流程。'], icon: Sparkles },
  { title: '手写数字识别', en: 'Try MNIST', summary: '亲手写下 0–9，观察神经网络给出的识别结果与概率。', body: ['在白色画布内写一个 0 到 9 之间的数字，然后点击“开始识别”。', '模型使用原页面的 784–200–10 神经网络和 MNIST 权重，原项目标注测试准确率为 98.08%。'], icon: PenLine },
  { title: 'AI 的发展历程', en: 'AI Timeline', summary: '从符号智能、机器学习到生成式 AI，能力边界持续扩展。', body: ['人工智能作为研究领域始于 1956 年。今天常见的系统仍属于面向具体任务的专用人工智能。', '研究者也在持续探索能够学习并完成更广泛任务的通用人工智能。'], icon: History },
  { title: '神经元信号传输', en: 'Neuron Signal', summary: '输入超过阈值后被激活，并把信号继续传向下一层。', body: ['生物神经元通过树突接收信号，在细胞体内处理，再通过轴突把信号传递出去。', '人工神经网络借鉴这一过程，用数学模型模拟输入、加权、激活与输出。'], icon: Zap },
  { title: '前向传播', en: 'Forward Pass', summary: '数据沿网络逐层计算，最终转换为可以解释的预测。', body: ['数据从输入层进入，经过隐藏层的计算，最终到达输出层。', '每个神经元对输入加权求和、加入偏置，再由激活函数产生新的输出。'], icon: Network },
  { title: 'MNIST 识别流程', en: 'Recognition Flow', summary: '图像经过预处理、特征计算和概率输出，形成完整闭环。', body: ['手写内容先被转换为 28×28 像素的灰度数据，随后经过多层计算提取特征。', '输出层产生数字 0–9 的十个概率，概率最高的数字成为识别结果。'], icon: ScanSearch },
  { title: '无处不在的人工智能', en: 'AI Everywhere', summary: 'AI 已进入交通、制造、医疗、科研与日常数字服务。', body: ['从自动驾驶、无人零售到围棋程序和生成式艺术，AI 正在越来越多的领域发挥作用。', '它也存在于日常服务中，例如商品推荐、路线规划和视频推荐。人工智能更像机器的“大脑”，而不是机械部件本身。'], icon: Eye },
  { title: '一些数字', en: 'AI Statistics', summary: '保留原页面的数据章节，并明确其历史统计口径。', body: ['3327 家 Crunchbase 登记的 AI 公司；40 亿台带智能语音助手的移动设备。', '50 亿美元 AI 相关公司风险投资；原页面预估 2025 年产业年收入 370 亿美元。以上均为原页面历史快照，不代表当前实时统计。'], icon: ChartNoAxesCombined },
  { title: '核心词汇', en: 'AI Vocabulary', summary: '用四个基础概念建立理解人工智能的共同语言。', body: ['算法：为达成目标而执行的一系列规则；人工智能：让计算机完成通常需要人类智能的任务。', '机器学习：利用数据训练模型获得任务能力；深度学习：使用多层神经网络处理复杂模式。'], icon: BookOpen },
]

const DIGITS = [7, 8, 6, 4, 5, 0, 9, 1, 2]
type Point = [number, number]

/** 每个数字卡片底部的“置信度”条（静态差异 + 呼吸微调） */
const DIGIT_CONFS = [92, 74, 86, 97, 71, 88, 79, 94, 76]

function DigitIntro() {
  const { lang } = useLanguage()
  return (
    <div className="journey-visual journey-digit-grid relative grid grid-cols-3 gap-3 p-6 sm:p-8">
      {/* 环境光斑 */}
      <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-brand/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-12 -right-8 h-44 w-44 rounded-full bg-cyan/12 blur-3xl" aria-hidden="true" />

      {/* 顶部标签行 */}
      <div className="relative col-span-3 mb-1 flex items-center justify-between px-1">
        <span className="text-[10px] font-black tracking-[.22em] text-brand">NEURAL INPUT · 0–9</span>
        <span className="flex items-center gap-1.5 text-[10px] font-bold text-teal">
          <motion.i
            className="h-1.5 w-1.5 rounded-full bg-teal"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1.25, 0.85] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
          {lang === 'en' ? 'READY' : '就绪'}
        </span>
      </div>

      {DIGITS.map((digit, index) => (
        <motion.div
          key={`${digit}-${index}`}
          className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-brand/12 bg-gradient-to-br from-white via-white to-cyan-50/80 shadow-[0_12px_28px_rgba(15,91,251,.09)]"
          animate={{ opacity: [0.55, 1, 0.55], y: [0, -4, 0], scale: [0.97, 1.02, 0.97] }}
          transition={{ duration: 3.4, repeat: Infinity, delay: index * 0.24, ease: 'easeInOut' }}
        >
          {/* 顶部微光条 */}
          <span className="absolute inset-x-4 top-0 h-[3px] rounded-b-full bg-gradient-to-r from-transparent via-brand/35 to-transparent" />
          <span className="text-gradient text-[34px] font-black tabular-nums">{digit}</span>
          {/* 底部置信度条 */}
          <span className="absolute inset-x-0 bottom-0 flex h-[22%] items-center justify-center" aria-hidden="true">
            <span className="h-[3px] w-[46%] overflow-hidden rounded-full bg-brand/10">
              <motion.i
                className="block h-full rounded-full bg-gradient-to-r from-brand to-cyan"
                animate={{ width: [`${DIGIT_CONFS[index]}%`, `${Math.min(99, DIGIT_CONFS[index] + 7)}%`, `${DIGIT_CONFS[index]}%`] }}
                transition={{ duration: 3.4, repeat: Infinity, delay: index * 0.24, ease: 'easeInOut' }}
              />
            </span>
          </span>
        </motion.div>
      ))}
    </div>
  )
}

function DigitCanvas() {
  const { t } = useLanguage()
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
      <div className="mx-auto w-full max-w-[280px] self-center">
        <canvas
          ref={canvas}
          width="280"
          height="280"
          className="aspect-square w-full touch-none rounded-[22px] border border-brand/15 bg-white shadow-inner"
          onPointerDown={start}
          onPointerMove={draw}
          onPointerUp={() => (drawing.current = false)}
          onPointerCancel={() => (drawing.current = false)}
          aria-label={t('j.canvas')}
        />
        <div className="mt-4 flex flex-wrap justify-center gap-1.5">
          <button className="btn btn-primary !px-3 !py-2.5 !text-[13px]" onClick={recognize}>
            <Play size={14} /> {state === 'loading' ? t('j.recognizing') : t('j.start')}
          </button>
          <button className="btn btn-ghost !px-3 !py-2.5 !text-[13px]" onClick={clear}>
            <Eraser size={14} /> {t('j.erase')}
          </button>
          <button className="btn btn-ghost !px-3 !py-2.5 !text-[13px]" onClick={example}>
            <Sparkles size={14} /> {t('j.sample')}
          </button>
        </div>
      </div>
      <div className="flex min-h-[250px] flex-col items-center justify-center rounded-[22px] border border-white bg-white/70 p-5 text-center">
        {result ? (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
            <p className="text-[12px] font-bold tracking-[.2em] text-muted">NEURAL NETWORK OUTPUT</p>
            <p className="mt-2 text-[82px] font-black leading-none text-gradient">{result.digit}</p>
            <p className="mt-3 text-[14px] text-body">{t('j.topProb')} {result.confidence.toFixed(1)}%</p>
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
              {t('j.waitingSub')}
            </p>
            {state === 'error' && <p className="mt-3 text-[12px] text-red-500">{t('j.loadFail')}</p>}
          </>
        )}
      </div>
    </div>
  )
}

/**
 * 各段 Lottie 的「海报帧」比例。
 * 素材是从空白开始逐笔生长的动画，停在第 0 帧时整张卡片几乎是空的，
 * 因此进入章节时先停到画面最完整的位置，再让滚轮前后拖动。
 */
const POSTER_FRAME: Record<string, number> = {
  'ch1_robot.json': 0.36,
  'ch3_neuron.json': 0.55,
  'ch6_prop.json': 0.5,
  'ch6_mnist.json': 0.18,
  'ch1_seed.json': 0.68,
  'ch1_data.json': 0.5,
  'ch1_words.json': 0.2,
}

const posterFrame = (file: string, item: AnimationItem) =>
  Math.round((POSTER_FRAME[file] ?? 0) * (Number(item.totalFrames || 1) - 1))

function LottieScrollVisual({ file, active, accent = '#2563eb', tag }: { file: string; active: boolean; accent?: string; tag?: string }) {
  const { t } = useLanguage()
  const container = useRef<HTMLDivElement>(null)
  const animation = useRef<AnimationItem | null>(null)
  const pauseTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (!container.current) return
    const item = lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: `${import.meta.env.BASE_URL}assets/ai-journey/lottie/${file}`,
      rendererSettings: { preserveAspectRatio: 'xMidYMid meet' },
    })

    const goPoster = () => item.goToAndStop(posterFrame(file, item), true)
    item.addEventListener('DOMLoaded', goPoster)
    item.pause()
    animation.current = item

    return () => {
      if (pauseTimer.current) window.clearTimeout(pauseTimer.current)
      item.removeEventListener('DOMLoaded', goPoster)
      item.destroy()
      animation.current = null
    }
  }, [file])

  useEffect(() => {
    if (active || !animation.current) return
    animation.current.pause()
    animation.current.setSpeed(1)
    animation.current.goToAndStop(posterFrame(file, animation.current), true)
  }, [active, file])

  const scrub = (event: WheelEvent<HTMLDivElement>) => {
    const item = animation.current
    if (!active || !item) return
    const frame = Number(item.currentFrame || 0)
    const totalFrames = Number(item.totalFrames || 0)
    const atStart = event.deltaY < 0 && frame <= 0.5
    const atEnd = event.deltaY > 0 && totalFrames > 0 && frame >= totalFrames - 1.5
    if (atStart || atEnd) {
      item.pause()
      return
    }

    event.stopPropagation()
    if (pauseTimer.current) window.clearTimeout(pauseTimer.current)
    item.setSpeed(event.deltaY > 0 ? 2 : -2)
    item.play()
    pauseTimer.current = window.setTimeout(() => item.pause(), 300)
  }

  return (
    <div className="journey-visual journey-lottie-shell" style={{ '--stage-accent': accent } as CSSProperties} onWheel={scrub}>
      {/* 舞台四角括号（贴在卡片外侧） */}
      <span className="pointer-events-none absolute -left-2.5 -top-2.5 z-[2] h-9 w-9 rounded-tl-[10px] border-l-[2.5px] border-t-[2.5px]" style={{ borderColor: `${accent}66` }} aria-hidden="true" />
      <span className="pointer-events-none absolute -right-2.5 -top-2.5 z-[2] h-9 w-9 rounded-tr-[10px] border-r-[2.5px] border-t-[2.5px]" style={{ borderColor: `${accent}66` }} aria-hidden="true" />
      <span className="pointer-events-none absolute -bottom-2.5 -left-2.5 z-[2] h-9 w-9 rounded-bl-[10px] border-b-[2.5px] border-l-[2.5px]" style={{ borderColor: `${accent}66` }} aria-hidden="true" />
      <span className="pointer-events-none absolute -bottom-2.5 -right-2.5 z-[2] h-9 w-9 rounded-br-[10px] border-b-[2.5px] border-r-[2.5px]" style={{ borderColor: `${accent}66` }} aria-hidden="true" />
      {/* 旋转轨道环 */}
      <motion.span
        className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[86%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed lg:block"
        style={{ borderColor: `${accent}2e` }}
        aria-hidden="true"
        animate={{ rotate: 360 }}
        transition={{ duration: 46, repeat: Infinity, ease: 'linear' }}
      >
        <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: accent }} />
      </motion.span>
      <motion.span
        className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full border lg:block"
        style={{ borderColor: `${accent}1c` }}
        aria-hidden="true"
        animate={{ rotate: -360 }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
      />
      <div ref={container} className="journey-lottie-canvas" />
      {/* 章节标签 */}
      {tag && (
        <span
          className="absolute left-7 top-6 z-[2] rounded-lg px-2.5 py-1 text-[9px] font-black tracking-[.18em]"
          style={{ background: `${accent}14`, color: accent }}
        >
          {tag}
        </span>
      )}
      <div className="journey-lottie-hint"><span>↕</span> {t('j.wheelHint')}</div>
    </div>
  )
}

function TimelineVisual({ active }: { active: boolean }) {
  return <LottieScrollVisual file="ch1_robot.json" active={active} accent="#EC4899" tag="AI TIMELINE" />
}

function NeuronVisual({ active }: { active: boolean }) {
  return <LottieScrollVisual file="ch3_neuron.json" active={active} accent="#06B6D4" tag="NEURON SIGNAL" />
}

function ForwardVisual({ active }: { active: boolean }) {
  return <LottieScrollVisual file="ch6_prop.json" active={active} accent="#0EA5E9" tag="FORWARD PASS" />
}

function PipelineVisual({ active }: { active: boolean }) {
  return <LottieScrollVisual file="ch6_mnist.json" active={active} accent="#2563EB" tag="RECOGNITION FLOW" />
}

function ApplicationsVisual({ active }: { active: boolean }) {
  return <LottieScrollVisual file="ch1_seed.json" active={active} accent="#14B8A6" tag="AI EVERYWHERE" />
}

function SignalsVisual({ active }: { active: boolean }) {
  return <LottieScrollVisual file="ch1_data.json" active={active} accent="#0F5BFB" tag="AI STATISTICS" />
}

function VocabularyVisual({ active }: { active: boolean }) {
  return <LottieScrollVisual file="ch1_words.json" active={active} accent="#8B5CF6" tag="GLOSSARY" />
}

function ChapterVisual({ index, active }: { index: number; active: boolean }) {
  if (index === 0) return <DigitIntro />
  if (index === 1) return <DigitCanvas />
  if (index === 2) return <TimelineVisual active={active} />
  if (index === 3) return <NeuronVisual active={active} />
  if (index === 4) return <ForwardVisual active={active} />
  if (index === 5) return <PipelineVisual active={active} />
  if (index === 6) return <ApplicationsVisual active={active} />
  if (index === 7) return <SignalsVisual active={active} />
  return <VocabularyVisual active={active} />
}

export default function AIJourney({ onBack }: { onBack: () => void }) {
  const { lang, t } = useLanguage()
  const [chapter, setChapter] = useState(0)
  const wheelLock = useRef(false)
  const go = (next: number) => {
    const target = Math.max(0, Math.min(CHAPTERS.length - 1, next))
    if (target === chapter) return false
    setChapter(target)
    return true
  }

  const onWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (!event.deltaY || wheelLock.current) return
    if (!go(chapter + (event.deltaY > 0 ? 1 : -1))) return
    wheelLock.current = true
    window.setTimeout(() => { wheelLock.current = false }, 500)
  }

  return (
    <div className="experience-page" onWheel={onWheel}>
      <header className="experience-header glass">
        <div className="flex items-center gap-3"><LanguageToggle compact /></div>
        <div className="flex items-center gap-3 text-left">
          <Logo size={38} />
          <span className="text-[21px] font-black tracking-wide text-ink">智启新质</span>
        </div>
        <button className="btn btn-ghost !px-4 !py-2.5 !text-[13px]" onClick={onBack}><ArrowLeft size={15} /> {t('j.back')}</button>
      </header>

      <div className="experience-pages" style={{ transform: `translate3d(0, -${chapter * 100}svh, 0)` }}>
        {CHAPTERS.map((item, index) => (
          <main key={item.en} className="experience-stage" aria-hidden={chapter !== index}>
            <div className="experience-copy">
              <span className="chip">CHAPTER {String(index + 1).padStart(2, '0')} × {(lang === 'en' ? item.en : item.title).toUpperCase()}</span>
              <h1>{lang === 'en' ? item.en : item.title}</h1>
              <p className="experience-lead">{lang === 'en' ? t(((['j.c1s','j.c2s','j.c3s','j.c4s','j.c5s','j.c6s','j.c7s','j.c8s','j.c9s']) as const)[index]) : item.summary}</p>
              <div className="experience-body">{(lang === 'en' ? [['j.c1b1','j.c1b2'],['j.c2b1','j.c2b2'],['j.c3b1','j.c3b2'],['j.c4b1','j.c4b2'],['j.c5b1','j.c5b2'],['j.c6b1','j.c6b2'],['j.c7b1','j.c7b2'],['j.c8b1','j.c8b2'],['j.c9b1','j.c9b2']][index].map((k) => t(k as Parameters<typeof t>[0])) : item.body).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            </div>
            <ChapterVisual index={index} active={chapter === index} />
          </main>
        ))}
      </div>

      <nav className="experience-progress" aria-label="章节进度">
        <span>{String(chapter + 1).padStart(2, '0')} / 09</span>
        <div>{CHAPTERS.map((item, index) => <button key={item.en} className={chapter === index ? 'active' : ''} onClick={() => go(index)} aria-label={`第 ${index + 1} 章：${item.title}`} title={item.title} />)}</div>
      </nav>

      <div className="experience-controls">
        <button className="btn btn-ghost !py-2.5" disabled={chapter === 0} onClick={() => go(chapter - 1)}><ArrowLeft size={16} /> {t('j.prev')}</button>
        <button className="btn btn-primary !py-2.5" disabled={chapter === CHAPTERS.length - 1} onClick={() => go(chapter + 1)}>{t('j.next')} <ArrowRight size={16} /></button>
      </div>
      <p className="experience-wheel-hint">{t('j.scroll')}</p>
    </div>
  )
}
