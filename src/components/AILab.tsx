import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { EChartsOption } from 'echarts'
import {
  ScanEye,
  CalendarCog,
  Activity,
  SlidersHorizontal,
  FlaskConical,
  Play,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Wrench,
  ArrowRight,
  BadgeCheck,
} from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import EChart from './charts/EChart'
import { PALETTE } from '@/data/site'
import { useLanguage } from '@/i18n/LanguageContext'

const TABS = [
  { id: 'vision', label: '机器视觉', icon: ScanEye, title: '机器视觉检测', en: 'Machine Vision Inspection', scenario: '工业质量检测', model: 'Visual Inspection Simulation' },
  { id: 'schedule', label: '智能调度', icon: CalendarCog, title: '智能生产调度', en: 'Intelligent Scheduling', scenario: '多机任务调度', model: 'Scheduling Simulation' },
  { id: 'maintenance', label: '预测性维护', icon: Activity, title: '设备预测性维护', en: 'Predictive Maintenance', scenario: '设备状态监测', model: 'Anomaly Detection Simulation' },
  { id: 'decision', label: 'AI 决策', icon: SlidersHorizontal, title: 'AI 生产决策', en: 'AI Decision Optimization', scenario: '生产方案优化', model: 'Decision Simulation' },
]

/* ================= 实验 1：机器视觉 ================= */
interface Sample {
  id: number
  defect: boolean
  confidence: number
  defectType: string
  rotation: number
  defectBox?: { x: number; y: number; width: number; height: number }
}
const SAMPLES: Sample[] = [
  { id: 1, defect: false, confidence: 96.4, defectType: 'None', rotation: -2 },
  { id: 2, defect: true, confidence: 93.1, defectType: 'Edge Damage', rotation: 1, defectBox: { x: 91, y: 38, width: 23, height: 24 } },
  { id: 3, defect: true, confidence: 89.7, defectType: 'Surface Crack', rotation: -1, defectBox: { x: 48, y: 55, width: 38, height: 17 } },
  { id: 4, defect: false, confidence: 97.2, defectType: 'None', rotation: 3 },
]

type InspectionState = 'waiting' | 'scanning' | 'done'

function ProductArt({ sample, state }: { sample: Sample; state: InspectionState }) {
  const done = state === 'done'
  return (
    <svg viewBox="0 0 160 120" className="h-full w-full" role="img" aria-label={`样品 ${sample.id} 工业机械法兰`}>
      <defs>
        <linearGradient id={`metal-${sample.id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F8FAFC" />
          <stop offset="0.52" stopColor="#DDE6F0" />
          <stop offset="1" stopColor="#BBC8D8" />
        </linearGradient>
      </defs>
      <g transform={`rotate(${sample.rotation} 80 60)`}>
        <path d="M48 26h64l13 13v42l-13 13H48L35 81V39z" fill={`url(#metal-${sample.id})`} stroke="#AFC0D3" strokeWidth="2" />
        <path d="M52 34h56l9 9v34l-9 9H52l-9-9V43z" fill="#EDF3F8" stroke="#CAD6E3" />
        <circle cx="80" cy="60" r="21" fill="#C4D1DF" stroke="#A8B8CA" strokeWidth="2" />
        <circle cx="80" cy="60" r="12" fill="#F8FAFC" stroke="#B7C5D4" strokeWidth="2" />
        {[[48,44],[112,44],[48,76],[112,76]].map(([x,y])=><circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill="#F8FAFC" stroke="#AFC0D3" />)}
        <path d="M52 35h52" stroke="#FFF" strokeWidth="2" strokeLinecap="round" opacity=".8" />
        {sample.id === 2 && <path d="M111 39l9 7-8 8-7-4z" fill="#F8FAFC" stroke="#F43F5E" strokeWidth="1.6" />}
        {sample.id === 3 && <path d="M58 57l9 6 7-5 10 7 8-3" fill="none" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" />}
      </g>
      {done && !sample.defect && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <path d="M31 29v-9h12M117 20h12v9M31 91v9h12M117 100h12v-9" fill="none" stroke="#14B8A6" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="112" y="10" width="36" height="15" rx="5" fill="#14B8A6" />
          <text x="130" y="20.5" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="white">NORMAL</text>
        </motion.g>
      )}
      {done && sample.defectBox && (
        <motion.g initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }}>
          <rect {...sample.defectBox} rx="3" fill="none" stroke="#F43F5E" strokeWidth="2" />
          <path d={`M${sample.defectBox.x + sample.defectBox.width} ${sample.defectBox.y} L138 24`} stroke="#F43F5E" strokeWidth="1" />
          <rect x="105" y="10" width="45" height="14" rx="4" fill="#FFF1F2" stroke="#F43F5E" />
          <text x="127.5" y="19.5" textAnchor="middle" fontSize="7" fontWeight="700" fill="#E11D48">DEFECT</text>
        </motion.g>
      )}
    </svg>
  )
}

function VisionLab() {
  const { t } = useLanguage()
  const [status, setStatus] = useState<Record<number, InspectionState>>({})
  const [runState, setRunState] = useState<'ready' | 'scanning' | 'complete'>('ready')
  const [selectedSample, setSelectedSample] = useState<number | null>(null)
  const timers = useRef<number[]>([])

  useEffect(() => () => timers.current.forEach(window.clearTimeout), [])

  const runInspection = () => {
    timers.current.forEach(window.clearTimeout)
    timers.current = []
    setSelectedSample(null)
    setStatus({})
    setRunState('scanning')
    SAMPLES.forEach((sample, index) => {
      timers.current.push(window.setTimeout(() => setStatus((current) => ({ ...current, [sample.id]: 'scanning' })), index * 760))
      timers.current.push(window.setTimeout(() => setStatus((current) => ({ ...current, [sample.id]: 'done' })), index * 760 + 610))
    })
    timers.current.push(window.setTimeout(() => setRunState('complete'), SAMPLES.length * 760))
  }

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-line/70 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="max-w-3xl text-[13.5px] leading-6 text-body">{t('lab.vIntro')}</p>
          <span title={t('lab.mockTip')} className="mt-2 inline-flex rounded-full border border-brand/15 bg-brand/5 px-2.5 py-1 text-[10px] font-bold text-brand">{t('lab.mockBadge')}</span>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <div className="text-right">
            <p className="text-[9px] font-bold tracking-[.18em] text-muted">SYSTEM STATUS</p>
            <p className={`mt-1 flex items-center justify-end gap-1.5 text-[11px] font-bold ${runState === 'complete' ? 'text-teal' : runState === 'scanning' ? 'text-brand' : 'text-slate-500'}`}><span className={`h-1.5 w-1.5 rounded-full ${runState === 'complete' ? 'bg-teal' : runState === 'scanning' ? 'animate-pulse bg-brand' : 'bg-slate-400'}`} />{runState === 'complete' ? 'ANALYSIS COMPLETE' : runState === 'scanning' ? 'SCANNING' : 'READY'}</p>
          </div>
          <button type="button" onClick={runInspection} disabled={runState === 'scanning'} className="btn btn-primary min-h-11 justify-center !px-4 !py-2.5 !text-[12px] disabled:cursor-not-allowed disabled:opacity-60"><ScanEye size={15}/>{runState === 'scanning' ? `SCANNING ${Object.values(status).filter((v)=>v==='done').length + 1} / 04` : runState === 'complete' ? t('lab.rescan') : t('lab.start')}<ArrowRight size={13}/></button>
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {SAMPLES.map((sample) => {
          const sampleState = status[sample.id] ?? 'waiting'
          const scanning = sampleState === 'scanning'
          const done = sampleState === 'done'
          const selected = selectedSample === sample.id
          return (
            <motion.button key={sample.id} type="button" aria-pressed={selected} onClick={() => setSelectedSample(selected ? null : sample.id)} whileHover={{ y: -4 }} className={`group overflow-hidden rounded-[22px] border bg-white/85 text-left shadow-[0_12px_36px_rgba(15,23,42,.04)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${selected ? 'border-brand' : done ? sample.defect ? 'border-rose-200' : 'border-teal/25' : scanning ? 'border-brand/45' : 'border-[#E6EDF5]'} ${selectedSample !== null && !selected ? 'opacity-70' : ''}`}>
              <div className="flex items-center justify-between px-4 pt-3">
                <div><p className="text-[9px] font-bold tracking-[.16em] text-muted">SAMPLE</p><p className={`text-[13px] font-black ${scanning ? 'text-brand' : 'text-ink'}`}>{String(sample.id).padStart(2,'0')}</p></div>
                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[9px] font-bold ${done ? sample.defect ? 'bg-rose-50 text-rose-600' : 'bg-teal/10 text-teal' : scanning ? 'bg-brand/10 text-brand' : 'bg-slate-100 text-slate-500'}`}>{done ? sample.defect ? <AlertTriangle size={10}/> : <CheckCircle2 size={10}/> : scanning ? <ScanEye size={10}/> : null}{done ? sample.defect ? 'DEFECT' : 'NORMAL' : scanning ? 'SCANNING' : 'WAITING'}</span>
              </div>
              <div className="relative mx-3 mt-2 h-[132px] overflow-hidden rounded-2xl border border-slate-200/80 bg-[radial-gradient(circle_at_center,rgba(37,99,235,.05),transparent_68%)]">
                <div className="absolute inset-0 opacity-[.12] [background-image:radial-gradient(#64748b_.7px,transparent_.7px)] [background-size:12px_12px]" />
                <span className="absolute left-2 top-2 h-3 w-3 border-l border-t border-brand/35"/><span className="absolute right-2 top-2 h-3 w-3 border-r border-t border-brand/35"/><span className="absolute bottom-2 left-2 h-3 w-3 border-b border-l border-brand/35"/><span className="absolute bottom-2 right-2 h-3 w-3 border-b border-r border-brand/35"/>
                <ProductArt sample={sample} state={sampleState} />
                {scanning && (
                  <motion.span
                    className="absolute inset-x-3 h-px bg-gradient-to-r from-transparent via-cyan to-transparent shadow-[0_0_10px_rgba(24,185,234,.55)]"
                    initial={{ top: '12%' }} animate={{ top: '88%' }} transition={{ duration: .6, ease: 'easeInOut' }}
                  />
                )}
              </div>
              <div className="px-4 pb-4 pt-3">
                <div className="flex min-h-[34px] items-end justify-between"><div><p className="text-[9px] font-bold tracking-[.16em] text-muted">RESULT</p><p className={`mt-1 text-[13px] font-black ${done ? sample.defect ? 'text-rose-600' : 'text-teal' : 'text-slate-400'}`}>{done ? sample.defect ? t('lab.rDefect') : t('lab.rNormal') : scanning ? t('lab.rAnalyzing') : t('lab.rWaiting')}</p></div>{done && <p className="text-[9px] text-muted">{sample.defectType}</p>}</div>
                <div className="mt-3 flex items-center justify-between text-[9px] font-bold tracking-[.12em] text-muted"><span>CONFIDENCE</span><span className={done ? sample.defect ? 'text-rose-600' : 'text-teal' : ''}>{done ? `${sample.confidence}%` : '—'}</span></div>
                <div className="mt-1.5 h-[3px] overflow-hidden rounded-full bg-slate-100"><motion.div className={`h-full rounded-full ${sample.defect ? 'bg-rose-500' : 'bg-teal'}`} initial={{ width: 0 }} animate={{ width: done ? `${sample.confidence}%` : 0 }} transition={{ duration: .55 }}/></div>
                <AnimatePresence>{selected && done && <motion.p initial={{opacity:0,y:4}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="mt-2 border-t border-line/70 pt-2 text-[9px] text-body">{t('lab.type')}: {sample.defect ? 'Defect' : 'Normal'} · {t('lab.defectType')}: {sample.defectType}</motion.p>}</AnimatePresence>
              </div>
            </motion.button>
          )
        })}
      </div>
      <AnimatePresence>{runState === 'complete' && <motion.div initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 rounded-xl border border-teal/15 bg-teal/[.05] px-4 py-2.5 text-[11px] text-body"><span className="flex items-center gap-1.5 font-bold text-teal"><BadgeCheck size={14}/>{t('lab.complete')}</span><span>4 Samples</span><span>Normal 2</span><span>Defect 2</span></motion.div>}</AnimatePresence>
    </div>
  )
}

/* ================= 实验 2：智能调度 ================= */
const TASKS = [
  { id: 'T1', d: 14 },
  { id: 'T2', d: 11 },
  { id: 'T3', d: 12 },
  { id: 'T4', d: 9 },
  { id: 'T5', d: 10 },
]

function ScheduleLab() {
  const { t } = useLanguage()
  const [run, setRun] = useState(false)
  // 传统：全部排队，单线顺序处理 = 56
  // AI：LPT 贪心分配到 3 台机器
  const ai = useMemo(() => {
    const loads = [0, 0, 0]
    const assign: { t: string; m: number; start: number; d: number }[] = []
    ;[...TASKS]
      .sort((a, b) => b.d - a.d)
      .forEach((task) => {
        const m = loads[0] <= loads[1] && loads[0] <= loads[2] ? 0 : loads[1] <= loads[2] ? 1 : 2
        assign.push({ t: task.id, m, start: loads[m], d: task.d })
        loads[m] += task.d
      })
    return { assign, makespan: Math.max(...loads) }
  }, [])
  const trad = TASKS.reduce((s, t) => s + t.d, 0)
  const gain = Math.round(((trad - ai.makespan) / trad) * 100)

  const Row = ({ label, data, total, color }: { label: string; data: { t: string; start: number; d: number }[]; total: number; color: string }) => (
    <div className="flex items-center gap-3">
      <span className="w-20 shrink-0 text-[12.5px] font-semibold text-body">{label}</span>
      <div className="relative h-9 flex-1 rounded-lg bg-slate-100">
        {data.map((b, i) => (
          <motion.div
            key={`${b.t}-${i}`}
            className="absolute top-1 flex h-7 items-center justify-center rounded-md text-[11px] font-bold text-white"
            style={{ background: color }}
            initial={{ width: 0, opacity: 0 }}
            animate={run ? { width: `${(b.d / total) * 100}%`, left: `${(b.start / total) * 100}%`, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: i * 0.25 }}
          >
            {b.t}
          </motion.div>
        ))}
      </div>
      <span className="w-16 shrink-0 text-right text-[12px] text-muted">{total} min</span>
    </div>
  )

  return (
    <div>
      <p className="text-[14px] text-body">{t('lab.schedIntro')}</p>
      <div className="mt-5 space-y-3">
        <Row label={t('lab.tradLine')} total={trad} color="#94A3B8" data={TASKS.map((t, i) => ({ t: t.id, start: TASKS.slice(0, i).reduce((s, x) => s + x.d, 0), d: t.d }))} />
        {[0, 1, 2].map((m) => (
          <Row
            key={m}
            label={`${t('lab.machine')} ${m + 1}`}
            total={trad}
            color={[PALETTE.brand, PALETTE.cyan, PALETTE.teal][m]}
            data={ai.assign.filter((a) => a.m === m)}
          />
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button className="btn btn-primary !py-2.5 !text-[14px]" onClick={() => setRun(true)}>
          <Play size={15} /> {t('lab.startSim')}
        </button>
        <button className="btn btn-ghost !py-2.5 !text-[14px]" onClick={() => setRun(false)}>
          <RotateCcw size={15} /> {t('c.reset')}
        </button>
        {run && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 rounded-xl bg-teal/10 px-4 py-2.5 text-[13.5px]">
            <span className="text-muted">Traditional <b className="text-ink">{trad} min</b></span>
            <span className="text-muted">AI <b className="text-teal">{ai.makespan} min</b></span>
            <span className="font-bold text-brand">{t('lab.effGain')} {gain}%{t('lab.simNote')}</span>
          </motion.div>
        )}
      </div>
    </div>
  )
}

/* ================= 实验 3：预测性维护 ================= */
function MaintenanceLab() {
  const { t } = useLanguage()
  const [done, setDone] = useState(false)
  const data = useMemo(() => {
    const arr: number[] = []
    for (let i = 0; i < 40; i++) {
      if (i < 27) arr.push(+(0.45 + Math.random() * 0.22).toFixed(2))
      else arr.push(+(0.9 + Math.random() * 0.85).toFixed(2))
    }
    return arr
  }, [])

  const option = useMemo<EChartsOption>(
    () => ({
      textStyle: { fontFamily: "Inter,'PingFang SC',sans-serif", color: PALETTE.body },
      tooltip: { trigger: 'axis' },
      grid: { left: 8, right: 16, top: 24, bottom: 4, containLabel: true },
      xAxis: { type: 'category', data: data.map((_, i) => i), axisLabel: { color: PALETTE.muted, fontSize: 10, interval: 4 }, axisLine: { lineStyle: { color: PALETTE.line } } },
      yAxis: { type: 'value', splitLine: { lineStyle: { color: PALETTE.grid } }, axisLabel: { color: PALETTE.muted, fontSize: 10 }, name: t('lab.vibAxis'), nameTextStyle: { color: PALETTE.muted } },
      series: [
        {
          name: t('lab.seriesName'),
          type: 'line',
          smooth: true,
          showSymbol: false,
          lineStyle: { width: 2.4, color: PALETTE.brand },
          areaStyle: { color: 'rgba(37,99,235,0.08)' },
          data,
          markLine: done
            ? { silent: true, symbol: 'none', lineStyle: { color: PALETTE.amber, type: 'dashed' }, data: [{ xAxis: 27, label: { formatter: t('lab.anomalyStart') } }] }
            : undefined,
          markArea: done
            ? { itemStyle: { color: 'rgba(244,63,94,0.12)' }, data: [[{ xAxis: 27 }, { xAxis: 39 }]] }
            : undefined,
        },
      ],
    }),
    [data, done],
  )

  return (
    <div>
      <p className="text-[14px] text-body">{t('lab.vibIntro')}</p>
      <div className="mt-5 h-[280px]">
        <EChart option={option} />
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <button className="btn btn-primary !py-2.5 !text-[14px]" onClick={() => setDone(true)}>
          <Play size={15} /> {t('lab.aiAnalyze')}
        </button>
        <button className="btn btn-ghost !py-2.5 !text-[14px]" onClick={() => setDone(false)}>
          <RotateCcw size={15} /> {t('c.reset')}
        </button>
        {done && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2 rounded-xl bg-rose-50 px-4 py-2.5 text-[13.5px] font-bold text-rose-600">
              <AlertTriangle size={16} /> {t('lab.riskHigh')}
            </span>
            <span className="flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-2.5 text-[13.5px] font-semibold text-amber-700">
              <Wrench size={16} /> {t('lab.adviceMaint')}
            </span>
          </motion.div>
        )}
      </div>
    </div>
  )
}

/* ================= 实验 4：AI 决策 ================= */
function DecisionLab() {
  const { t } = useLanguage()
  const [orders, setOrders] = useState(1200)
  const [machines, setMachines] = useState(9)
  const [hours, setHours] = useState(8)
  const [done, setDone] = useState(false)

  const alloc = useMemo(() => {
    // 教学模型：订单压力、设备规模与时间窗口共同影响三条产线的负载倾向。
    const pressure = orders / Math.max(machines * hours, 1)
    const raw = [
      30 + pressure * 0.4 + machines * 0.6,
      35 + hours * 0.7 + (orders / 1000) * 2,
      28 + machines * 0.3 + Math.max(0, 20 - pressure * 0.2),
    ]
    const total = raw.reduce((sum, value) => sum + value, 0)
    const exact = raw.map((value) => (value / total) * 100)
    const base = exact.map(Math.floor)
    let remaining = 100 - base.reduce((sum, value) => sum + value, 0)
    exact
      .map((value, index) => ({ index, fraction: value - base[index] }))
      .sort((a, b) => b.fraction - a.fraction)
      .forEach(({ index }) => {
        if (remaining > 0) {
          base[index] += 1
          remaining -= 1
        }
      })
    return base
  }, [orders, machines, hours])

  const pieOption = useMemo<EChartsOption>(
    () => ({
      tooltip: { trigger: 'item', valueFormatter: (v) => `${v}%` },
      legend: { bottom: 0, textStyle: { color: PALETTE.body } },
      series: [
        {
          type: 'pie',
          radius: ['46%', '70%'],
          center: ['50%', '45%'],
          label: { formatter: '{b}\n{c}%', color: PALETTE.body, fontSize: 12 },
          data: [
            { value: alloc[0], name: `${t('lab.line')} A`, itemStyle: { color: PALETTE.brand } },
            { value: alloc[1], name: `${t('lab.line')} B`, itemStyle: { color: PALETTE.cyan } },
            { value: alloc[2], name: `${t('lab.line')} C`, itemStyle: { color: PALETTE.teal } },
          ],
          animationType: 'expansion',
        },
      ],
    }),
    [alloc],
  )

  const Field = ({ label, value, set, min, max, step }: { label: string; value: number; set: (n: number) => void; min: number; max: number; step: number }) => (
    <div className="rounded-2xl border border-line bg-canvas p-5">
      <p className="text-[13px] text-muted">{label}</p>
      <div className="mt-3 flex items-center gap-3">
        <input type="range" min={min} max={max} step={step} value={value} className="slider flex-1" onChange={(e) => set(Number(e.target.value))} style={{ background: `linear-gradient(to right,${PALETTE.brand} ${((value - min) / (max - min)) * 100}%,#E2E8F0 ${((value - min) / (max - min)) * 100}%)` }} />
        <span className="w-16 rounded-lg bg-white px-2 py-1.5 text-center text-[14px] font-bold text-ink">{value}</span>
      </div>
    </div>
  )

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <div className="space-y-4">
        <Field label={t('lab.orderField')} value={orders} set={setOrders} min={200} max={3000} step={50} />
        <Field label={t('lab.machineField')} value={machines} set={setMachines} min={3} max={20} step={1} />
        <Field label={t('lab.hoursField')} value={hours} set={setHours} min={2} max={24} step={1} />
        <button className="btn btn-primary w-full justify-center" onClick={() => setDone(true)}>
          <CheckCircle2 size={16} /> {t('lab.aiOptimize')}
        </button>
      </div>
      <div className="rounded-2xl border border-line bg-white p-4">
        {done ? (
          <>
            <div className="h-[300px]">
              <EChart option={pieOption} />
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2 text-center text-[13px]">
              {alloc.map((v, i) => (
                <div key={i} className="rounded-lg bg-canvas py-2.5">
                  {t('lab.line')} {String.fromCharCode(65 + i)} <b className="text-brand">{v}%</b>
                </div>
              ))}
            </div>
            <p className="mt-3 text-center text-[11.5px] text-muted">{t('lab.optimizedNote')}</p>
          </>
        ) : (
          <div className="flex h-full min-h-[280px] items-center justify-center text-[14px] text-muted">
            {t('lab.pickHint')}
          </div>
        )}
      </div>
    </div>
  )
}

/* ================= 实验室主框架 ================= */
export default function AILab() {
  const { lang, t, ta } = useLanguage()
  const [tab, setTab] = useState('vision')
  const activeTab = TABS.find((item) => item.id === tab) ?? TABS[0]
  return (
    <section id="lab" className="scene scene-lab section-pad bg-canvas">
      <div className="container-x">
        <SectionHeading
          index="07"
          en="AI LAB"
          title={t('lab.title')}
          subtitle={t('lab.sub')}
          align="center"
        />

        <Reveal className="mt-9">
          <div className="overflow-hidden rounded-[28px] border border-slate-300/25 bg-white/[.78] p-4 shadow-[0_18px_52px_rgba(37,99,235,.06)] backdrop-blur-sm sm:p-7">
            <div className="overflow-x-auto pb-1">
              <div className="mx-auto flex min-w-max justify-center gap-2" role="tablist" aria-label="AI 实验选择">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={tab === t.id}
                  onClick={() => setTab(t.id)}
                  className={`relative flex min-h-11 items-center gap-2 rounded-xl px-5 py-2.5 text-[13px] font-semibold transition hover:-translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${tab === t.id ? 'text-white' : 'bg-[#F4F7FB] text-body hover:bg-brand/[.06] hover:text-brand'}`}
                >
                  {tab === t.id && <motion.span layoutId="activeLabTab" className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand to-cyan shadow-[0_7px_16px_rgba(37,99,235,.18)]" transition={{duration:.25}} />}
                  <t.icon size={16} className="relative z-10" /> <span className="relative z-10">{ta('lab.tabs')[TABS.findIndex((x) => x.id === t.id)]}</span>
                </button>
              ))}
              </div>
            </div>

            <div className="mt-6 rounded-[24px] border border-line/70 bg-[radial-gradient(circle_at_50%_20%,rgba(37,99,235,.035),transparent_42%)] p-4 sm:p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: tab === 'vision' ? .22 : .18 }}
                >
                  <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-[10.5px] font-bold tracking-[0.18em] text-muted"><FlaskConical size={14} className="text-brand" />EXPERIMENT 0{TABS.findIndex((t) => t.id === tab) + 1}</div>
                      <h3 className="mt-2 text-[20px] font-black text-ink sm:text-[23px]">{t(['lab.t1', 'lab.t2', 'lab.t3', 'lab.t4'][TABS.findIndex((x) => x.id === tab)] as 'lab.t1')}</h3>
                      <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[.08em] text-brand">{activeTab.en}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 text-[9px]">
                      <span className="rounded-lg border border-line bg-white/80 px-3 py-2"><b className="mr-2 tracking-[.14em] text-muted">SCENARIO</b><span className="font-semibold text-body">{ta('lab.scenarios')[TABS.findIndex((x) => x.id === tab)]}</span></span>
                      <span className="rounded-lg border border-line bg-white/80 px-3 py-2"><b className="mr-2 tracking-[.14em] text-muted">MODEL</b><span className="font-semibold text-body">{activeTab.model}</span></span>
                    </div>
                  </div>
                  {tab === 'vision' && <VisionLab />}
                  {tab === 'schedule' && <ScheduleLab />}
                  {tab === 'maintenance' && <MaintenanceLab />}
                  {tab === 'decision' && <DecisionLab />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
