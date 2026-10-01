import { useMemo, useState } from 'react'
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
} from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import EChart from './charts/EChart'
import { PALETTE } from '@/data/site'

const TABS = [
  { id: 'vision', label: '机器视觉', icon: ScanEye },
  { id: 'schedule', label: '智能调度', icon: CalendarCog },
  { id: 'maintenance', label: '预测性维护', icon: Activity },
  { id: 'decision', label: 'AI 决策', icon: SlidersHorizontal },
]

/* ================= 实验 1：机器视觉 ================= */
interface Sample {
  id: number
  defect: boolean
  confidence: number
  defects: { x: number; y: number }[]
}
const SAMPLES: Sample[] = [
  { id: 1, defect: false, confidence: 96.4, defects: [] },
  { id: 2, defect: true, confidence: 93.1, defects: [{ x: 58, y: 46 }] },
  { id: 3, defect: true, confidence: 89.7, defects: [{ x: 40, y: 60 }] },
  { id: 4, defect: false, confidence: 97.2, defects: [] },
]

function ProductArt({ s, analyzed }: { s: Sample; analyzed: boolean }) {
  return (
    <svg viewBox="0 0 120 100" className="h-full w-full">
      <rect x="14" y="14" width="92" height="72" rx="12" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.5" />
      <rect x="24" y="24" width="72" height="52" rx="8" fill="#F8FAFC" />
      {analyzed && s.defect &&
        s.defects.map((d, i) => (
          <g key={i}>
          <path
            d={`M${d.x - 10} ${d.y} q10 -10 20 0 q-10 10 -20 0`}
            fill="none"
            stroke="#F43F5E"
            strokeWidth="2.4"
          />
          <motion.rect
            x={d.x - 15}
            y={d.y - 15}
            width="30"
            height="30"
            rx="4"
            fill="none"
            stroke="#E74E51"
            strokeWidth="2"
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
          />
          </g>
        ))}
    </svg>
  )
}

function VisionLab() {
  const [status, setStatus] = useState<Record<number, 'scanning' | 'done'>>({})
  const analyze = (id: number) => {
    setStatus((current) => ({ ...current, [id]: 'scanning' }))
    window.setTimeout(() => {
      setStatus((current) => ({ ...current, [id]: 'done' }))
    }, 720)
  }
  return (
    <div>
      <p className="text-[14px] text-body">
        选择示例产品并点击「AI 检测」，系统将框选缺陷区域并给出判定与置信度（完整交互模拟）。
      </p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {SAMPLES.map((s) => {
          const scanning = status[s.id] === 'scanning'
          const done = status[s.id] === 'done'
          return (
            <div key={s.id} className="card card-hover overflow-hidden">
              <div className="relative h-32 p-3">
                <ProductArt s={s} analyzed={Boolean(done)} />
                {scanning && (
                  <motion.span
                    className="absolute inset-x-5 h-0.5 bg-gradient-to-r from-transparent via-cyan to-transparent shadow-[0_0_16px_#18B9EA]"
                    initial={{ top: '20%' }}
                    animate={{ top: ['20%', '78%', '20%'] }}
                    transition={{ duration: 0.7, ease: 'easeInOut' }}
                  />
                )}
                {done && !s.defect && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-6 rounded-xl"
                    style={{
                      border: `2.5px solid ${PALETTE.teal}`,
                    }}
                  >
                    <span
                      className="absolute -top-6 left-0 rounded-md px-2 py-0.5 text-[11px] font-bold text-white"
                      style={{ background: PALETTE.teal }}
                    >
                      Normal
                    </span>
                  </motion.div>
                )}
              </div>
              <div className="px-4 pb-4">
                <p className="text-[13px] font-bold text-ink">样品 #{s.id}</p>
                {done ? (
                  <div className="mt-2">
                    <p className="text-[12px] text-muted">
                      结果：
                      <span
                        className="font-bold"
                        style={{ color: s.defect ? PALETTE.rose : PALETTE.teal }}
                      >
                        {s.defect ? '缺陷 Defect' : '正常 Normal'}
                      </span>
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-[11px] text-muted">置信度</span>
                      <div className="h-1.5 flex-1 rounded-full bg-line">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: s.defect ? PALETTE.rose : PALETTE.teal }}
                          initial={{ width: 0 }}
                          animate={{ width: `${s.confidence}%` }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                      <span className="text-[11px] font-bold text-ink">{s.confidence}%</span>
                    </div>
                  </div>
                ) : (
                  <button
                    className="btn btn-primary mt-3 w-full justify-center !py-2 !text-[13px]"
                    disabled={scanning}
                    onClick={() => analyze(s.id)}
                  >
                    <Play size={13} /> {scanning ? '扫描中…' : 'AI 检测'}
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
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
      <p className="text-[14px] text-body">场景：5 个任务、3 台机器。对比传统顺序排队与 AI 优化调度。</p>
      <div className="mt-5 space-y-3">
        <Row label="传统单线" total={trad} color="#94A3B8" data={TASKS.map((t, i) => ({ t: t.id, start: TASKS.slice(0, i).reduce((s, x) => s + x.d, 0), d: t.d }))} />
        {[0, 1, 2].map((m) => (
          <Row
            key={m}
            label={`机器 ${m + 1}`}
            total={trad}
            color={[PALETTE.brand, PALETTE.cyan, PALETTE.teal][m]}
            data={ai.assign.filter((a) => a.m === m)}
          />
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button className="btn btn-primary !py-2.5 !text-[14px]" onClick={() => setRun(true)}>
          <Play size={15} /> 开始模拟
        </button>
        <button className="btn btn-ghost !py-2.5 !text-[14px]" onClick={() => setRun(false)}>
          <RotateCcw size={15} /> 重置
        </button>
        {run && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 rounded-xl bg-teal/10 px-4 py-2.5 text-[13.5px]">
            <span className="text-muted">Traditional <b className="text-ink">{trad} min</b></span>
            <span className="text-muted">AI <b className="text-teal">{ai.makespan} min</b></span>
            <span className="font-bold text-brand">效率提升 {gain}%（模拟结果）</span>
          </motion.div>
        )}
      </div>
    </div>
  )
}

/* ================= 实验 3：预测性维护 ================= */
function MaintenanceLab() {
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
      yAxis: { type: 'value', splitLine: { lineStyle: { color: PALETTE.grid } }, axisLabel: { color: PALETTE.muted, fontSize: 10 }, name: '振动', nameTextStyle: { color: PALETTE.muted } },
      series: [
        {
          name: '设备振动',
          type: 'line',
          smooth: true,
          showSymbol: false,
          lineStyle: { width: 2.4, color: PALETTE.brand },
          areaStyle: { color: 'rgba(37,99,235,0.08)' },
          data,
          markLine: done
            ? { silent: true, symbol: 'none', lineStyle: { color: PALETTE.amber, type: 'dashed' }, data: [{ xAxis: 27, label: { formatter: '异常起点' } }] }
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
      <p className="text-[14px] text-body">设备振动监测曲线：前段平稳，后段出现异常波动。点击「AI 分析」自动标记。</p>
      <div className="mt-5 h-[280px]">
        <EChart option={option} />
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <button className="btn btn-primary !py-2.5 !text-[14px]" onClick={() => setDone(true)}>
          <Play size={15} /> AI 分析
        </button>
        <button className="btn btn-ghost !py-2.5 !text-[14px]" onClick={() => setDone(false)}>
          <RotateCcw size={15} /> 重置
        </button>
        {done && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2 rounded-xl bg-rose-50 px-4 py-2.5 text-[13.5px] font-bold text-rose-600">
              <AlertTriangle size={16} /> 设备风险：High
            </span>
            <span className="flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-2.5 text-[13.5px] font-semibold text-amber-700">
              <Wrench size={16} /> 建议：Maintenance Recommended
            </span>
          </motion.div>
        )}
      </div>
    </div>
  )
}

/* ================= 实验 4：AI 决策 ================= */
function DecisionLab() {
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
            { value: alloc[0], name: '生产线 A', itemStyle: { color: PALETTE.brand } },
            { value: alloc[1], name: '生产线 B', itemStyle: { color: PALETTE.cyan } },
            { value: alloc[2], name: '生产线 C', itemStyle: { color: PALETTE.teal } },
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
        <Field label="订单量（件）" value={orders} set={setOrders} min={200} max={3000} step={50} />
        <Field label="设备数量（台）" value={machines} set={setMachines} min={3} max={20} step={1} />
        <Field label="生产时间（小时）" value={hours} set={setHours} min={2} max={24} step={1} />
        <button className="btn btn-primary w-full justify-center" onClick={() => setDone(true)}>
          <CheckCircle2 size={16} /> AI 优化
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
                  生产线 {String.fromCharCode(65 + i)} <b className="text-brand">{v}%</b>
                </div>
              ))}
            </div>
            <p className="mt-3 text-center text-[11.5px] text-muted">教学优化模型输出，非真实排产结果。</p>
          </>
        ) : (
          <div className="flex h-full min-h-[280px] items-center justify-center text-[14px] text-muted">
            调整输入后点击「AI 优化」，查看最佳生产方案
          </div>
        )}
      </div>
    </div>
  )
}

/* ================= 实验室主框架 ================= */
export default function AILab() {
  const [tab, setTab] = useState('vision')
  return (
    <section id="lab" className="scene scene-lab section-pad bg-canvas">
      <div className="container-x">
        <SectionHeading
          index="07"
          en="AI LAB"
          title="亲手体验 AI 如何创造生产力"
          subtitle="四个交互式实验，模拟机器视觉、智能调度、预测性维护与智能决策的完整过程。"
          align="center"
        />

        <Reveal className="mt-10">
          <div className="card p-5 sm:p-8">
            <div className="flex flex-wrap justify-center gap-2">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-[14px] font-semibold transition-all ${
                    tab === t.id
                      ? 'bg-gradient-to-r from-brand to-cyan text-white shadow-[0_8px_20px_rgba(37,99,235,0.28)]'
                      : 'bg-canvas-2 text-body hover:text-ink'
                  }`}
                >
                  <t.icon size={16} /> {t.label}
                </button>
              ))}
            </div>

            <div className="mt-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-4 flex items-center gap-2 text-[12.5px] font-bold tracking-[0.18em] text-muted">
                    <FlaskConical size={15} className="text-brand" />
                    EXPERIMENT 0{TABS.findIndex((t) => t.id === tab) + 1}
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
