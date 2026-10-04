import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  MonitorDot,
  Hand,
  Users,
  BrainCircuit,
  Info,
  Cloud,
  Cpu,
  Camera,
  Radio,
  Boxes,
  Bot,
  Truck,
  Play,
  RotateCcw,
  Database,
} from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import { FUTURE_FORECASTS } from '@/data/realData'
import { useLanguage } from '@/i18n/LanguageContext'

const TIMELINE = [
  {
    year: '2020',
    title: '数字化',
    en: 'Digitalization',
    icon: MonitorDot,
    desc: '业务上云、数据归集，生产过程开始被记录与连接。',
    tags: ['信息化系统', '数据采集'],
  },
  {
    year: '2025',
    title: 'AI 辅助',
    en: 'AI Assistance',
    icon: Hand,
    desc: 'AI 在检测、预测、调度等环节辅助人，提升决策质量。',
    tags: ['机器视觉', '预测模型', '智能助手'],
  },
  {
    year: '2030',
    title: '智能协同',
    en: 'Collaborative Intelligence',
    icon: Users,
    desc: '人机与多智能体协同，跨环节、跨企业实时联动优化。',
    tags: ['AI Agent', '数字孪生', '产业协同网络'],
  },
  {
    year: 'Future',
    title: '自主智能系统',
    en: 'Autonomous Systems',
    icon: BrainCircuit,
    desc: '系统具备自主感知、决策与进化能力，持续创造新价值。',
    tags: ['具身智能', '自主制造', 'AI 科研'],
  },
]

type FactoryNodeId = 'cloud' | 'twin' | 'ai' | 'camera' | 'sensor' | 'robot' | 'agv'

const FACTORY_NODES: Record<FactoryNodeId, { title: string; en: string; role: string; detail: string }> = {
  cloud: { title: '云平台', en: 'Cloud', role: '云端协同', detail: '汇聚数据、模型与服务能力' },
  twin: { title: '数字孪生', en: 'Digital Twin', role: '数字镜像', detail: '同步现实系统并进行仿真预测' },
  ai: { title: '智能决策中枢', en: 'AI CORE', role: '智能中枢', detail: '数据融合、智能分析与决策生成' },
  camera: { title: '视觉感知', en: 'Camera', role: '视觉感知', detail: '采集产品与生产现场图像' },
  sensor: { title: '状态感知', en: 'Sensor', role: '状态感知', detail: '采集温度、振动与设备负载' },
  robot: { title: '智能执行', en: 'Robot', role: '智能执行', detail: '接收决策并执行生产动作' },
  agv: { title: '智能物流', en: 'AGV', role: '自主搬运', detail: '完成物料运输与路径调度' },
}

const FACTORY_KEYS: FactoryNodeId[] = ['cloud', 'twin', 'ai', 'camera', 'sensor', 'robot', 'agv']
const DEMO_STEPS: { label: string; nodes: FactoryNodeId[] }[] = [
  { label: '现场感知', nodes: ['camera', 'sensor'] },
  { label: '数据上传', nodes: ['camera', 'sensor', 'ai'] },
  { label: 'AI 智能分析', nodes: ['ai'] },
  { label: '云端协同', nodes: ['ai', 'cloud'] },
  { label: '数字映射', nodes: ['twin'] },
  { label: '智能决策', nodes: ['ai'] },
  { label: '执行与反馈', nodes: ['robot', 'agv', 'sensor'] },
]

function FutureFactory() {
  const { t, ta } = useLanguage()
  const [hoveredNode, setHoveredNode] = useState<FactoryNodeId | null>(null)
  const [selectedNode, setSelectedNode] = useState<FactoryNodeId | null>(null)
  const [playingStep, setPlayingStep] = useState<number | null>(null)
  const activeNodes = playingStep === null ? [] : DEMO_STEPS[playingStep].nodes
  const displayNode = activeNodes[0] ?? hoveredNode ?? selectedNode
  const isPlaying = playingStep !== null

  useEffect(() => {
    if (playingStep === null) return
    const timer = window.setTimeout(() => {
      if (playingStep === DEMO_STEPS.length - 1) setPlayingStep(null)
      else setPlayingStep(playingStep + 1)
    }, 820)
    return () => window.clearTimeout(timer)
  }, [playingStep])

  const highlightedPaths = useMemo(() => {
    const active = new Set(activeNodes)
    if (hoveredNode) active.add(hoveredNode)
    else if (selectedNode && !isPlaying) active.add(selectedNode)
    const all = active.has('ai')
    return {
      cameraAI: all || active.has('camera'), sensorAI: all || active.has('sensor'),
      cloudAI: all || active.has('cloud'), twin: active.has('twin'),
      robot: all || active.has('robot'), agv: all || active.has('agv'),
    }
  }, [activeNodes, hoveredNode, selectedNode, isPlaying])

  const reset = () => { setPlayingStep(null); setSelectedNode(null); setHoveredNode(null) }

  const path = (id: keyof typeof highlightedPaths, d: string, color: string, bidirectional = false) => {
    const active = highlightedPaths[id]
    return <g>
      <motion.path d={d} fill="none" stroke={color} strokeWidth={active ? 2.5 : 1.4} strokeDasharray="6 8" animate={{ opacity: active ? 1 : displayNode ? .12 : .28, strokeDashoffset: active ? [28, 0] : 0 }} transition={{ strokeDashoffset: { duration: 1.2, repeat: Infinity, ease: 'linear' }, opacity: { duration: .2 } }} markerEnd={`url(#arrow-${color.slice(1)})`} markerStart={bidirectional ? `url(#arrow-${color.slice(1)})` : undefined} />
      {active && <motion.circle r="4" fill={color}><animateMotion dur="1.35s" repeatCount="indefinite" path={d} /></motion.circle>}
    </g>
  }

  const Node = ({ id, className, children }: { id: FactoryNodeId; className: string; children: ReactNode }) => {
    const active = activeNodes.includes(id) || hoveredNode === id || (!isPlaying && selectedNode === id)
    const dimmed = Boolean(displayNode) && !active && !(id === 'ai' && ['camera','sensor','robot','agv'].includes(displayNode!))
    return <motion.button
      type="button" aria-pressed={selectedNode === id} aria-label={`${FACTORY_NODES[id].en}：${FACTORY_NODES[id].detail}`}
      onMouseEnter={() => setHoveredNode(id)} onMouseLeave={() => setHoveredNode(null)}
      onFocus={() => setHoveredNode(id)} onBlur={() => setHoveredNode(null)} onClick={() => setSelectedNode(id)}
      animate={{ opacity: dimmed ? .42 : 1, y: active ? -3 : 0 }} whileHover={{ y: -3 }}
      className={`absolute z-20 outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${className}`}
    >{children}</motion.button>
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-[24px] font-bold text-ink">{t('f.factoryTitle')}</h3>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" disabled={isPlaying} onClick={()=>{setSelectedNode(null);setPlayingStep(0)}} className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-[12px] font-semibold text-white shadow-sm transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-65"><Play size={14}/>{isPlaying?`${t('f.demoPlaying')} ${playingStep! + 1} / ${DEMO_STEPS.length}`:t('f.demo')}</button>
          <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-white px-3 py-2.5 text-[12px] font-semibold text-body"><RotateCcw size={13}/>{t('c.reset')}</button>
          {isPlaying&&<span className="text-[11px] font-bold text-brand">STEP {String(playingStep!+1).padStart(2,'0')} / 07 · {ta('f.steps')[playingStep!]}</span>}
        </div>
      </div>

      <div className="relative mt-6 overflow-hidden rounded-[24px] border border-line/70 bg-[#F7FBFF] shadow-[0_18px_48px_rgba(38,103,169,.08)]">
      <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'radial-gradient(#B8D5EA 1px,transparent 1px)', backgroundSize: '24px 24px' }} />
      <div className="relative min-h-[680px] sm:min-h-[640px] lg:min-h-[600px]">
        <div className="absolute left-5 top-5 z-30 max-w-[310px] text-[11px] leading-relaxed text-muted">{t('f.sceneIntro')}</div>
        <div className="absolute right-5 top-5 z-30 text-right"><p className="text-[8px] font-bold tracking-[.18em] text-muted">SYSTEM STATUS</p><p className="mt-1 flex items-center justify-end gap-1.5 text-[10px] font-bold text-teal"><motion.i className="h-2 w-2 rounded-full bg-teal" animate={{ opacity: [.35,1,.35] }} transition={{ duration: 2, repeat: Infinity }} />{t('f.autonomous')}</p><div className="mt-2 hidden gap-1.5 sm:flex"><span className="rounded-full bg-white px-2 py-1 text-[8px] text-body">Data Flow ACTIVE</span><span className="rounded-full bg-white px-2 py-1 text-[8px] text-body">Twin Sync ONLINE</span><span className="rounded-full bg-white px-2 py-1 text-[8px] text-body">AI Engine RUNNING</span></div></div>

        <svg viewBox="0 0 1000 600" className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <defs>{['2563EB','06B6D4','14B8A6'].map(c=><marker key={c} id={`arrow-${c}`} markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto-start-reverse"><path d="M0 0L7 3.5L0 7Z" fill={`#${c}`} opacity=".75" /></marker>)}</defs>
          {path('cameraAI','M235 430C300 365 370 325 445 292','#06B6D4')}
          {path('sensorAI','M405 450C420 390 440 340 470 300','#2563EB')}
          {path('cloudAI','M500 150C500 195 500 230 500 265','#2563EB',true)}
          {path('twin','M555 270C645 205 715 190 805 190','#06B6D4',true)}
          {path('twin','M690 430C755 350 790 285 825 230','#06B6D4',true)}
          {path('robot','M535 300C590 345 620 380 650 425','#14B8A6')}
          {path('agv','M545 295C665 330 750 395 825 470','#14B8A6')}
        </svg>

        <Node id="cloud" className="left-1/2 top-[12%] w-40 -translate-x-1/2">
          <div className="rounded-2xl border border-brand/15 bg-white/90 px-4 py-3 shadow-sm backdrop-blur"><Cloud className="mx-auto text-brand" size={30}/><p className="mt-1 text-[12px] font-bold text-ink">Cloud · 云平台</p><div className="mt-2 flex justify-center gap-1"><span className="rounded bg-blue-50 px-1.5 py-0.5 text-[7px] text-brand">DATA</span><span className="rounded bg-blue-50 px-1.5 py-0.5 text-[7px] text-brand">MODEL</span><span className="rounded bg-blue-50 px-1.5 py-0.5 text-[7px] text-brand">SERVICE</span></div></div>
        </Node>

        <Node id="ai" className="left-1/2 top-[39%] w-48 -translate-x-1/2">
          <motion.div animate={activeNodes.includes('ai')?{scale:[1,1.045,1]}:{}} className="rounded-[22px] border border-brand/20 bg-white/85 px-5 py-4 shadow-[0_12px_32px_rgba(37,99,235,.13)] backdrop-blur"><span className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand"><Cpu size={22}/></span><p className="mt-2 text-[11px] font-bold tracking-[.12em] text-brand">AI CORE</p><p className="text-[13px] font-bold text-ink">{t('f.coreTitle')}</p><div className="mt-2 flex justify-center gap-2">{ta('f.aiDots').map((dot,i)=><span key={dot} className="flex items-center gap-1 text-[8px] text-muted"><i className="h-1.5 w-1.5 rounded-full" style={{background:['#3B82F6','#06B6D4','#14B8A6'][i]}}/>{dot}</span>)}</div></motion.div>
        </Node>

        <Node id="twin" className="right-[7%] top-[19%] w-52">
          <div className="rounded-[20px] border border-cyan/25 bg-white/90 p-4 text-left shadow-sm backdrop-blur"><div className="flex items-center justify-between"><div><p className="text-[10px] font-bold text-cyan">DIGITAL TWIN</p><p className="text-[12px] font-bold text-ink">数字孪生</p></div><Boxes size={23} className="text-cyan"/></div><p className="mt-1 text-[8px] tracking-[.12em] text-muted">REAL ↔ VIRTUAL</p><svg viewBox="0 0 170 68" className="mt-2 w-full"><path d="M12 44H155" stroke="#B5DDE6" strokeWidth="4"/><rect x="25" y="25" width="32" height="28" rx="4" fill="none" stroke="#06B6D4" strokeWidth="2"/><circle cx="87" cy="39" r="10" fill="none" stroke="#2563EB" strokeWidth="2"/><path d="M118 53V25l17-12 17 12v28" fill="none" stroke="#14B8A6" strokeWidth="2"/><motion.circle cx={hoveredNode==='camera'?41:hoveredNode==='sensor'?87:135} cy={hoveredNode==='camera'?39:hoveredNode==='sensor'?39:31} r="4" fill="#06B6D4" animate={{opacity:[.25,1,.25]}} transition={{duration:1.2,repeat:Infinity}}/></svg><AnimatePresence>{(selectedNode==='twin'||activeNodes.includes('twin'))&&<motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} className="mt-2 flex gap-1"><span className="rounded bg-cyan/8 px-1.5 py-1 text-[7px] text-cyan">实时状态</span><span className="rounded bg-cyan/8 px-1.5 py-1 text-[7px] text-cyan">设备映射</span><span className="rounded bg-cyan/8 px-1.5 py-1 text-[7px] text-cyan">仿真预测</span></motion.div>}</AnimatePresence></div>
        </Node>

        <Node id="camera" className="left-[13%] top-[63%] w-32"><div className="rounded-2xl border border-line bg-white/90 p-3 shadow-sm"><motion.div animate={hoveredNode==='camera'?{scale:[1,1.12,1]}:{}} className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-brand"><Camera size={22}/></motion.div><p className="mt-1 text-[11px] font-bold text-ink">Camera</p><p className="text-[8px] text-muted">视觉感知</p>{hoveredNode==='camera'&&<motion.div initial={{opacity:0}} animate={{opacity:1}} className="absolute left-1/2 top-full h-16 w-20 -translate-x-1/2 bg-gradient-to-b from-cyan/15 to-transparent [clip-path:polygon(35%_0,65%_0,100%_100%,0_100%)]"/>}</div></Node>
        <Node id="sensor" className="left-[33%] top-[67%] w-32"><div className="rounded-2xl border border-line bg-white/90 p-3 shadow-sm"><motion.div animate={hoveredNode==='sensor'?{scale:[1,1.14,1]}:{}} transition={{duration:.55}} className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-cyan/8 text-cyan"><Radio size={22}/></motion.div><p className="mt-1 text-[11px] font-bold text-ink">Sensor</p><p className="text-[8px] text-muted">状态感知</p>{(hoveredNode==='sensor'||selectedNode==='sensor')&&<div className="mt-1 flex justify-center gap-1"><span className="text-[6px] text-cyan">TEMP</span><span className="text-[6px] text-cyan">VIB</span><span className="text-[6px] text-cyan">LOAD</span></div>}</div></Node>
        <Node id="robot" className="left-[59%] top-[63%] w-32"><div className="rounded-2xl border border-line bg-white/90 p-3 shadow-sm"><motion.div animate={hoveredNode==='robot'||activeNodes.includes('robot')?{rotate:[0,5,-3,0]}:{}} transition={{duration:.45}} className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-teal/8 text-teal"><Bot size={23}/></motion.div><p className="mt-1 text-[11px] font-bold text-ink">Robot</p><p className="text-[8px] text-muted">智能执行</p></div></Node>
        <Node id="agv" className="right-[9%] top-[70%] w-32"><motion.div animate={hoveredNode==='agv'||activeNodes.includes('agv')?{x:[0,8,0]}:{}} className="rounded-2xl border border-line bg-white/90 p-3 shadow-sm"><span className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-teal/8 text-teal"><Truck size={23}/></span><p className="mt-1 text-[11px] font-bold text-ink">AGV</p><p className="text-[8px] text-muted">自主搬运</p></motion.div></Node>

        <div className="absolute inset-x-[4%] bottom-[5%] z-10 h-[92px] rounded-[22px] border border-[#DCE7EF] bg-[#EAF1F6]"><div className="absolute inset-x-[6%] top-4 h-8 rounded-xl border border-[#B8CBD9] bg-[#D7E4ED]"><motion.div className="h-full rounded-xl opacity-30" style={{backgroundImage:'repeating-linear-gradient(90deg,transparent 0 24px,#7CA6BE 24px 30px)'}} animate={{backgroundPositionX:[0,60]}} transition={{duration:6,repeat:Infinity,ease:'linear'}}/></div><div className="absolute bottom-3 left-[8%] right-[8%] h-4 rounded-full border border-dashed border-[#AFC4D3]"/><div className="absolute left-[47%] top-2 text-[7px] font-bold tracking-[.18em] text-muted">PHYSICAL FACTORY</div>{[150,310,470,630].map(x=><span key={x} className="absolute top-6 h-4 w-8 rounded-md border border-[#94B4C8] bg-white" style={{left:`${x/10}%`}}/>)}</div>

        <AnimatePresence>{displayNode&&<motion.div key={displayNode} initial={{opacity:0,y:5}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="absolute bottom-[20%] left-1/2 z-30 w-[210px] -translate-x-1/2 rounded-xl border border-line bg-white/95 px-3 py-2 text-center shadow-sm"><p className="text-[9px] font-bold text-brand">{t(['f.cloudRole','f.twinRole','f.coreRole','f.cameraRole','f.sensorRole','f.robotRole','f.agvRole'][FACTORY_KEYS.indexOf(displayNode)] as 'f.cloudRole')}</p><p className="mt-0.5 text-[9px] text-body">{t(['f.cloudDetail','f.twinDetail','f.coreDetail','f.cameraDetail','f.sensorDetail','f.robotDetail','f.agvDetail'][FACTORY_KEYS.indexOf(displayNode)] as 'f.cloudDetail')}</p></motion.div>}</AnimatePresence>

        <div className="absolute bottom-5 right-5 z-30 hidden items-center gap-1.5 text-[8px] text-muted md:flex"><Database size={11}/><span>Physical World</span><span>↔</span><span>AI</span><span>↔</span><span>Digital World</span></div>
      </div>
      </div>
    </div>
  )
}

export default function Future() {
  const { lang, t, ta } = useLanguage()
  return (
    <section id="future" className="scene scene-future section-pad bg-canvas-2">
      <div className="container-x">
        <SectionHeading
          index="06"
          en="FUTURE"
          title={t('f.title')}
          subtitle={t('f.sub')}
        />

        <Reveal className="mt-6">
          <span className="inline-flex items-center gap-2 rounded-xl bg-brand/8 px-4 py-2 text-[12.5px] font-semibold text-brand">
            <Info size={15} /> {t('f.banner')}
          </span>
        </Reveal>

        {/* 时间轴 */}
        <div className="relative mt-14">
          <div className="absolute left-0 right-0 top-[26px] hidden h-[2px] bg-line lg:block" />
          <motion.div
            className="absolute left-0 top-[26px] hidden h-[2px] bg-gradient-to-r from-brand to-cyan lg:block"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
          <div className="grid gap-8 lg:grid-cols-4">
            {TIMELINE.map((item, i) => (
              <Reveal key={item.year} delay={i * 0.12}>
                <div>
                  <motion.span
                    className="relative z-10 mx-auto flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 border-brand bg-white text-brand lg:mx-0"
                    whileInView={{ scale: [0.7, 1.1, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.25, duration: 0.6 }}
                  >
                    <item.icon size={23} />
                  </motion.span>
                  <div className="card card-hover mt-5 p-6">
                    <p className="text-[13px] font-bold tracking-[0.16em] text-brand">{item.year}</p>
                    <h4 className="mt-2 text-[19px] font-bold text-ink">{ta('f.tTitles')[i]}</h4>
                    <p className="mt-1 text-[11px] font-semibold tracking-widest text-muted">{item.en}</p>
                    <p className="mt-3 text-[13.5px] leading-relaxed text-body">{ta('f.tDescs')[i]}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {[ta('f.tTags1'), ta('f.tTags2'), ta('f.tTags3'), ta('f.tTags4')][i].map((tag) => (
                        <span key={tag} className="rounded-md bg-canvas-2 px-2 py-1 text-[11.5px] text-body">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* 权威机构量化预测 */}
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {FUTURE_FORECASTS.map((fc, i) => (
            <Reveal key={fc.label} delay={i * 0.1}>
              <div className="card card-hover flex h-full flex-col p-7">
                <p className="text-gradient text-[30px] font-bold leading-none">{lang === 'en' ? ['+78M', 'US$632B', '+7%'][i] : fc.value}</p>
                <p className="mt-3 text-[15px] font-bold text-ink">{t(['f.fc1l', 'f.fc2l', 'f.fc3l'][i] as 'f.fc1l')}</p>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed text-body">{t(['f.fc1d', 'f.fc2d', 'f.fc3d'][i] as 'f.fc1d')}</p>
                <p className="mt-4 border-t border-line/70 pt-3 text-[11px] leading-relaxed text-muted">来源：{t(['f.fc1s', 'f.fc2s', 'f.fc3s'][i] as 'f.fc1s')}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 未来智能工厂 */}
        <Reveal className="mt-14">
          <FutureFactory />
        </Reveal>
      </div>
    </section>
  )
}
