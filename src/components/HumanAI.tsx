import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Lightbulb, Scale, MessagesSquare, Compass, Calculator, Search, TrendingUp,
  Workflow, Plus, Equal, Sparkles, User, Cpu, Play, RotateCcw, Check,
  type LucideIcon,
} from 'lucide-react'
import Reveal from './ui/Reveal'

type HumanId = 'create' | 'judgment' | 'communication' | 'values'
type AiId = 'calculation' | 'search' | 'prediction' | 'automation'

type Ability<T extends string> = {
  id: T
  title: string
  en: string
  icon: LucideIcon
  contributes: string[]
  recommended: HumanId | AiId
}

type Collaboration = {
  title: string
  en: string
  description: string
  tags: string[]
  humanStrength: string
  aiStrength: string
  together: string
}

const HUMAN: Ability<HumanId>[] = [
  { id: 'create', title: '创造', en: 'CREATIVITY', icon: Lightbulb, contributes: ['构想', '想象', '原创'], recommended: 'search' },
  { id: 'judgment', title: '判断', en: 'JUDGMENT', icon: Scale, contributes: ['经验', '情境', '判断'], recommended: 'prediction' },
  { id: 'communication', title: '沟通', en: 'COMMUNICATION', icon: MessagesSquare, contributes: ['表达', '协调', '反馈'], recommended: 'automation' },
  { id: 'values', title: '价值决策', en: 'VALUE DECISION', icon: Compass, contributes: ['目标', '伦理', '权衡'], recommended: 'calculation' },
]

const AI: Ability<AiId>[] = [
  { id: 'calculation', title: '计算', en: 'COMPUTING', icon: Calculator, contributes: ['约束', '计算', '比较'], recommended: 'values' },
  { id: 'search', title: '搜索', en: 'SEARCH', icon: Search, contributes: ['检索', '连接', '整理'], recommended: 'create' },
  { id: 'prediction', title: '预测', en: 'PREDICTION', icon: TrendingUp, contributes: ['数据', '模式', '趋势'], recommended: 'judgment' },
  { id: 'automation', title: '自动化', en: 'AUTOMATION', icon: Workflow, contributes: ['规则', '流程', '执行'], recommended: 'communication' },
]

const result = (title: string, en: string, description: string, tags: string[], humanStrength: string, aiStrength: string, together: string): Collaboration =>
  ({ title, en, description, tags, humanStrength, aiStrength, together })

const MATRIX: Record<`${HumanId}-${AiId}`, Collaboration> = {
  'create-calculation': result('可行创新能力', 'FEASIBLE INNOVATION', '人类提出新构想，AI 快速计算约束与可行性，让创意更快走向可执行方案。', ['创意验证', '约束计算', '方案落地'], '创意 / 想象', '计算 / 约束', '可行创新'),
  'create-search': result('创新探索能力', 'EXPANDED INNOVATION', '人类提出新颖构想，AI 快速检索、整理并连接大量信息，共同扩大方案探索空间。', ['创意生成', '信息发现', '方案探索'], '构想 / 原创', '检索 / 连接', '创新探索'),
  'create-prediction': result('前瞻创新能力', 'FUTURE-READY INNOVATION', '人类形成创新方向，AI 推演趋势与潜在影响，让新方案兼顾想象力与未来变化。', ['趋势洞察', '创意推演', '未来方案'], '构想 / 想象', '趋势 / 推演', '前瞻创新'),
  'create-automation': result('创意实现能力', 'CREATIVE EXECUTION', '人类定义创意与体验，AI 自动完成规则明确的制作流程，加速构想落地。', ['创意设计', '流程生成', '快速实现'], '创意 / 体验', '流程 / 执行', '创意实现'),
  'judgment-calculation': result('量化判断能力', 'QUANTIFIED JUDGMENT', 'AI 快速计算多种条件，人类结合经验和情境完成判断，使决策更全面。', ['量化分析', '情境判断', '方案选择'], '经验 / 情境', '计算 / 比较', '量化判断'),
  'judgment-search': result('信息增强判断', 'INFORMED JUDGMENT', 'AI 汇聚相关知识和证据，人类辨别信息质量并结合具体情境作出判断。', ['信息检索', '证据整合', '经验判断'], '辨别 / 经验', '检索 / 整理', '增强判断'),
  'judgment-prediction': result('前瞻决策能力', 'AUGMENTED DECISION', 'AI 提供趋势、风险和可能结果，人类结合经验与目标作出最终判断。', ['趋势预测', '风险识别', '辅助决策'], '情境 / 判断', '预测 / 模式', '前瞻决策'),
  'judgment-automation': result('智能审批能力', 'INTELLIGENT GOVERNANCE', 'AI 执行标准化规则，人类处理例外情况并监督关键判断，兼顾效率与可靠性。', ['规则执行', '异常处理', '人工监督'], '例外 / 监督', '规则 / 执行', '智能审批'),
  'communication-calculation': result('数据表达能力', 'DATA COMMUNICATION', 'AI 将复杂计算转为清晰依据，人类结合受众需求完成解释和沟通。', ['数据解释', '信息表达', '共识建立'], '表达 / 共情', '计算 / 结构', '数据表达'),
  'communication-search': result('知识增强沟通', 'KNOWLEDGE COMMUNICATION', 'AI 快速补充背景和知识，人类负责准确表达、倾听反馈并促进理解。', ['知识检索', '内容组织', '有效沟通'], '表达 / 反馈', '搜索 / 整理', '知识沟通'),
  'communication-prediction': result('预见式协同能力', 'ANTICIPATORY COLLABORATION', 'AI 预判需求和沟通风险，人类提前协调关系与资源，让合作更加顺畅。', ['需求预判', '风险沟通', '协同准备'], '协调 / 共情', '预测 / 风险', '预见协同'),
  'communication-automation': result('协同执行能力', 'COLLABORATIVE EXECUTION', '人类负责沟通、协调与反馈，AI 承担规则明确的重复流程，提升团队协同效率。', ['沟通协同', '流程自动化', '任务执行'], '协调 / 反馈', '流程 / 执行', '协同执行'),
  'values-calculation': result('复杂权衡能力', 'BALANCED DECISION', 'AI 快速计算多种方案与约束，人类根据价值目标和实际情境进行权衡。', ['多目标分析', '方案比较', '价值判断'], '目标 / 价值', '计算 / 比较', '复杂权衡'),
  'values-search': result('价值知情决策', 'VALUE-INFORMED DECISION', 'AI 汇聚规则、案例与利益相关信息，人类基于价值目标确定行动边界。', ['案例检索', '规则理解', '价值选择'], '价值 / 边界', '检索 / 归纳', '知情决策'),
  'values-prediction': result('风险辅助权衡', 'RISK-AWARE BALANCE', 'AI 预测不同选择的长期风险，人类结合价值目标与责任边界作出权衡。', ['风险预测', '长期影响', '价值权衡'], '价值 / 责任', '预测 / 风险', '风险权衡'),
  'values-automation': result('负责任自动化', 'RESPONSIBLE AUTOMATION', '人类设定价值原则与监督边界，AI 在明确规则内稳定执行任务。', ['原则设定', '边界监督', '可靠执行'], '原则 / 监督', '规则 / 自动化', '负责执行'),
}

const DEMO: [HumanId, AiId][] = [['create','search'], ['judgment','prediction'], ['communication','automation'], ['values','calculation']]

export default function HumanAI() {
  const [selectedHuman, setSelectedHuman] = useState<HumanId | null>(null)
  const [selectedAI, setSelectedAI] = useState<AiId | null>(null)
  const [hoveredHuman, setHoveredHuman] = useState<HumanId | null>(null)
  const [hoveredAI, setHoveredAI] = useState<AiId | null>(null)
  const [demoStep, setDemoStep] = useState<number | null>(null)
  const [completed, setCompleted] = useState(false)

  const activeHuman = hoveredHuman ?? selectedHuman
  const activeAI = hoveredAI ?? selectedAI
  const selectedResult = selectedHuman && selectedAI ? MATRIX[`${selectedHuman}-${selectedAI}`] : null
  const previewHuman = HUMAN.find((item) => item.id === activeHuman)
  const previewAI = AI.find((item) => item.id === activeAI)
  const isDemoPlaying = demoStep !== null

  useEffect(() => {
    if (!selectedResult) return
    setCompleted(true)
    const timer = window.setTimeout(() => setCompleted(false), 700)
    return () => window.clearTimeout(timer)
  }, [selectedHuman, selectedAI, selectedResult])

  useEffect(() => {
    if (demoStep === null) return
    const [human, ai] = DEMO[demoStep]
    setSelectedHuman(human)
    const aiTimer = window.setTimeout(() => setSelectedAI(ai), 280)
    const nextTimer = window.setTimeout(() => {
      if (demoStep === DEMO.length - 1) setDemoStep(null)
      else setDemoStep(demoStep + 1)
    }, 1450)
    return () => { window.clearTimeout(aiTimer); window.clearTimeout(nextTimer) }
  }, [demoStep])

  const recommendation = useMemo(() => {
    if (hoveredHuman) return HUMAN.find((item) => item.id === hoveredHuman)?.recommended as AiId
    if (hoveredAI) return AI.find((item) => item.id === hoveredAI)?.recommended as HumanId
    return null
  }, [hoveredHuman, hoveredAI])

  const reset = () => {
    setDemoStep(null); setSelectedHuman(null); setSelectedAI(null); setHoveredHuman(null); setHoveredAI(null)
  }

  const abilityButton = <T extends HumanId | AiId>(item: Ability<T>, side: 'human' | 'ai', index: number) => {
    const selected = side === 'human' ? selectedHuman === item.id : selectedAI === item.id
    const active = side === 'human' ? activeHuman === item.id : activeAI === item.id
    const recommended = side === 'human' ? recommendation === item.id : recommendation === item.id
    const hasPair = Boolean(selectedHuman && selectedAI)
    const dimmed = hasPair && !selected
    const color = side === 'human' ? '#2563EB' : '#0891B2'
    return (
      <motion.button
        key={item.id}
        type="button"
        disabled={isDemoPlaying}
        aria-pressed={selected}
        aria-label={`${side === 'human' ? '人类能力' : 'AI 能力'}：${item.title}`}
        onMouseEnter={() => side === 'human' ? setHoveredHuman(item.id as HumanId) : setHoveredAI(item.id as AiId)}
        onMouseLeave={() => side === 'human' ? setHoveredHuman(null) : setHoveredAI(null)}
        onFocus={() => side === 'human' ? setHoveredHuman(item.id as HumanId) : setHoveredAI(item.id as AiId)}
        onBlur={() => side === 'human' ? setHoveredHuman(null) : setHoveredAI(null)}
        onClick={() => side === 'human' ? setSelectedHuman(item.id as HumanId) : setSelectedAI(item.id as AiId)}
        initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ delay: index * .06 + (side === 'ai' ? .1 : 0) }} whileHover={{ y: -2 }}
        className="relative flex min-h-[58px] items-center gap-2.5 rounded-xl border bg-white px-3.5 py-3 text-left outline-none transition-[border-color,background-color,opacity,box-shadow] focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-default"
        style={{
          borderColor: selected ? color : recommended ? `${color}70` : active ? `${color}66` : '#DCE5EF',
          background: selected ? `${color}0E` : active ? `${color}08` : '#fff',
          boxShadow: active ? `0 8px 22px ${color}12` : 'none', opacity: dimmed ? .52 : 1,
        }}
      >
        {selected && <motion.span layoutId={`${side}-selected-dot`} className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full" style={{ background: color }} />}
        <item.icon size={17} style={{ color: active || selected || recommended ? color : '#64748B' }} />
        <span><span className="block text-[13.5px] font-semibold text-ink">{item.title}</span><span className="block text-[8px] font-semibold tracking-[.1em] text-muted">{item.en}</span></span>
        {recommended && !selected && <span className="ml-auto text-[8px] font-bold" style={{ color }}>推荐协同</span>}
      </motion.button>
    )
  }

  return (
    <div className="mt-20">
      <Reveal>
        <h3 className="text-center text-[26px] font-bold text-ink">Human × AI</h3>
        <p className="mt-3 text-center text-[16px] text-body">AI 的价值，不只是「替代」—— 而是放大人的能力。</p>
      </Reveal>

      <Reveal className="mt-9">
        <div className="card p-5 sm:p-8">
          <div className="relative grid items-center gap-5 lg:grid-cols-[1fr_180px_1fr]">
            <AnimatePresence>
              {(activeHuman || activeAI) && (
                <motion.svg className="pointer-events-none absolute inset-0 z-10 hidden h-full w-full lg:block" viewBox="0 0 1000 300" preserveAspectRatio="none" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                  {activeHuman && <motion.path d="M325 150C390 150 420 132 486 150" fill="none" stroke="#2563EB" strokeWidth="2" strokeDasharray="6 7" initial={{pathLength:0}} animate={{pathLength:1}} transition={{duration:.45}} />}
                  {activeAI && <motion.path d="M675 150C610 150 580 132 514 150" fill="none" stroke="#06B6D4" strokeWidth="2" strokeDasharray="6 7" initial={{pathLength:0}} animate={{pathLength:1}} transition={{duration:.45}} />}
                  {activeHuman && <motion.circle r="4" fill="#2563EB" animate={{cx:[325,486],cy:[150,150]}} transition={{duration:.7,repeat:selectedResult?1:0}} />}
                  {activeAI && <motion.circle r="4" fill="#06B6D4" animate={{cx:[675,514],cy:[150,150]}} transition={{duration:.7,repeat:selectedResult?1:0}} />}
                </motion.svg>
              )}
            </AnimatePresence>

            <motion.section className="relative z-20 rounded-2xl border border-transparent bg-canvas p-5 transition-colors" animate={{backgroundColor:hoveredHuman?'#F3F8FF':'#F7FAFC'}}>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3"><motion.span animate={hoveredHuman?{scale:[1,1.08,1]}:{}} className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand"><User size={21}/></motion.span><div><p className="text-[18px] font-bold text-ink">人 · Human</p><p className="text-[11px] text-muted">HUMAN CONTRIBUTES</p></div></div>
                <AnimatePresence mode="wait">{previewHuman&&<motion.span key={previewHuman.id} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-right text-[9px] leading-4 text-brand">{previewHuman.contributes.join(' · ')}</motion.span>}</AnimatePresence>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">{HUMAN.map((item,i)=>abilityButton(item,'human',i))}</div>
            </motion.section>

            <div className="relative z-20 flex items-center justify-center gap-3 lg:flex-col">
              <motion.span animate={{color:selectedHuman?'#2563EB':'#94A3B8',backgroundColor:selectedHuman?'#EFF6FF':'#F1F5F9'}} className="flex h-10 w-10 items-center justify-center rounded-full"><Plus size={20}/></motion.span>
              <motion.div
                key={selectedResult?.title ?? `${activeHuman}-${activeAI}`}
                animate={selectedResult?{scale:[1,1.08,1]}:{scale:[1,1.035,1]}}
                transition={selectedResult?{duration:.45}:{duration:2.4,repeat:Infinity}}
                className="relative flex h-[116px] w-[116px] flex-col items-center justify-center rounded-full border-4 border-white text-center text-white shadow-[0_14px_34px_rgba(37,99,235,.28)]"
                style={{background:'linear-gradient(135deg,#2563EB,#06B6D4)'}}
              >
                <Sparkles size={20}/>
                <AnimatePresence mode="wait">
                  <motion.div key={`${activeHuman}-${activeAI}-${selectedResult?.title}`} initial={{opacity:0,scale:.94}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:.94}} className="mt-1 px-2">
                    <p className="text-[11px] font-bold leading-tight">{selectedResult?.title ?? ((activeHuman || activeAI) ? `${previewHuman?.title ?? '?'} + ${previewAI?.title ?? '?'}` : 'HUMAN × AI')}</p>
                    <p className="mt-1 text-[7px] tracking-[.12em] text-white/75">{selectedResult?.en ?? (activeHuman||activeAI?'SELECT PAIR':'SYNERGY CORE')}</p>
                  </motion.div>
                </AnimatePresence>
                <AnimatePresence>{completed&&<motion.span initial={{opacity:0,y:5}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="absolute -bottom-7 whitespace-nowrap text-[9px] font-semibold text-brand">能力协同完成</motion.span>}</AnimatePresence>
              </motion.div>
              <motion.span animate={{color:selectedResult?'#0891B2':'#94A3B8',backgroundColor:selectedResult?'#ECFEFF':'#F1F5F9'}} className="flex h-10 w-10 items-center justify-center rounded-full"><Equal size={20}/></motion.span>
            </div>

            <motion.section className="relative z-20 rounded-2xl border border-transparent bg-canvas p-5 transition-colors" animate={{backgroundColor:hoveredAI?'#F0FDFF':'#F7FAFC'}}>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3"><motion.span animate={hoveredAI?{x:[0,2,-2,0]}:{}} transition={{duration:.35}} className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan/10 text-cyan"><Cpu size={21}/></motion.span><div><p className="text-[18px] font-bold text-ink">AI · 机器</p><p className="text-[11px] text-muted">AI CONTRIBUTES</p></div></div>
                <AnimatePresence mode="wait">{previewAI&&<motion.span key={previewAI.id} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-right text-[9px] leading-4 text-cyan">{previewAI.contributes.join(' · ')}</motion.span>}</AnimatePresence>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">{AI.map((item,i)=>abilityButton(item,'ai',i))}</div>
            </motion.section>
          </div>

          <div className="mt-7 border-t border-line/70 pt-6 text-center">
            <AnimatePresence mode="wait">
              {selectedResult ? (
                <motion.div key={`${selectedHuman}-${selectedAI}`} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:.3}}>
                  <p className="text-[10px] font-bold tracking-[.18em] text-brand">{selectedResult.en}</p>
                  <h4 className="mt-1 text-[25px] font-bold text-ink">{selectedResult.title}</h4>
                  <p className="mx-auto mt-2 max-w-2xl text-[13px] leading-[1.7] text-body">{selectedResult.description}</p>
                  <div className="mt-3 flex flex-wrap justify-center gap-2">{selectedResult.tags.map(tag=><span key={tag} className="rounded-full bg-brand/7 px-3 py-1 text-[10px] font-semibold text-brand">{tag}</span>)}</div>
                  <div className="mx-auto mt-4 flex max-w-2xl flex-wrap items-center justify-center gap-2 text-[10px]"><span className="rounded-lg bg-blue-50 px-3 py-2 text-brand">Human · {selectedResult.humanStrength}</span><Plus size={12} className="text-muted"/><span className="rounded-lg bg-cyan-50 px-3 py-2 text-cyan">AI · {selectedResult.aiStrength}</span><Equal size={12} className="text-muted"/><span className="rounded-lg bg-teal/10 px-3 py-2 font-bold text-teal">Together · {selectedResult.together}</span></div>
                </motion.div>
              ) : (
                <motion.div key="default" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                  <p className="text-[13px] text-muted">{selectedHuman ? '选择一种 AI 能力完成协同。' : selectedAI ? '选择一种人类能力完成协同。' : '选择两种能力，探索人机协同'}</p>
                  <p className="mt-2 text-[24px] font-bold sm:text-[30px]">Human + AI = <span className="text-gradient">Augmented Productivity</span></p>
                  <p className="mt-1 text-[13px] text-body">人机协同，形成增强型生产力。</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <button type="button" disabled={isDemoPlaying} onClick={()=>{reset();setDemoStep(0)}} className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2 text-[12px] font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-65"><Play size={14}/>{isDemoPlaying?`协同演示 ${demoStep!+1} / 4`:'演示人机协同'}</button>
              <button type="button" onClick={reset} className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2 text-[12px] font-semibold text-body transition hover:border-brand/40 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"><RotateCcw size={14}/>重置</button>
              {selectedResult&&<span className="inline-flex items-center gap-1.5 px-2 text-[10px] font-semibold text-teal"><Check size={13}/>协同结果已生成</span>}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  )
}
