import { useEffect, useMemo, useRef, useState } from 'react'
import type { EChartsOption } from 'echarts'
import { RotateCcw, Info } from 'lucide-react'
import Reveal from './ui/Reveal'
import EChart from './charts/EChart'
import { PALETTE } from '@/data/site'

const SLIDERS = [
  { id: 'auto', label: 'AI 自动化率', color: PALETTE.brand },
  { id: 'data', label: '数据利用率', color: PALETTE.brand2 },
  { id: 'decision', label: '智能决策程度', color: PALETTE.cyan },
  { id: 'device', label: '设备智能化程度', color: PALETTE.teal },
] as const

type SliderId = (typeof SLIDERS)[number]['id']
type Values = Record<SliderId, number>

const DEFAULTS: Values = { auto: 45, data: 52, decision: 40, device: 36 }

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

function model(v: Values) {
  const efficiency = Math.round(
    clamp(38 + v.auto * 0.26 + v.data * 0.18 + v.decision * 0.2 + v.device * 0.18, 30, 99),
  )
  const innovation = Math.round(
    clamp(30 + v.decision * 0.28 + v.data * 0.22 + v.auto * 0.1 + v.device * 0.12, 25, 99),
  )
  const resource = Math.round(
    clamp(36 + v.data * 0.24 + v.device * 0.22 + v.auto * 0.2 + v.decision * 0.1, 30, 99),
  )
  const manual = Math.round(clamp(92 - v.auto * 0.55 - v.decision * 0.22 - v.device * 0.12, 8, 95))
  return { efficiency, innovation, resource, manual }
}

/** 数字补间滚动 */
function useTween(target: number) {
  const [val, setVal] = useState(target)
  const from = useRef(target)
  const raf = useRef(0)
  const latest = useRef(target)
  latest.current = target

  const start = (to: number) => {
    cancelAnimationFrame(raf.current)
    const startVal = from.current
    const t0 = performance.now()
    const dur = 480
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1)
      const e = 1 - Math.pow(1 - p, 3)
      const cur = startVal + (to - startVal) * e
      setVal(cur)
      if (p < 1) raf.current = requestAnimationFrame(tick)
      else from.current = to
    }
    raf.current = requestAnimationFrame(tick)
  }
  return { val, start }
}

function TweenNumber({ to, suffix, color }: { to: number; suffix?: string; color: string }) {
  const { val, start } = useTween(to)
  useEffect(() => {
    start(to)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [to])
  return (
    <span className="text-[30px] font-bold leading-none" style={{ color }}>
      {Math.round(val)}
      {suffix}
    </span>
  )
}

export default function ProductivitySimulator() {
  const [v, setV] = useState<Values>(DEFAULTS)
  const r = model(v)

  const radarOption = useMemo<EChartsOption>(
    () => ({
      tooltip: {},
      radar: {
        radius: '66%',
        center: ['50%', '52%'],
        indicator: [
          { name: '自动化', max: 100 },
          { name: '数据化', max: 100 },
          { name: '智能决策', max: 100 },
          { name: '设备智能', max: 100 },
          { name: '协同', max: 100 },
          { name: '效率', max: 100 },
        ],
        axisName: { color: PALETTE.body, fontSize: 12 },
        splitLine: { lineStyle: { color: PALETTE.line } },
        splitArea: { areaStyle: { color: ['#fff', '#F8FAFC'] } },
        axisLine: { lineStyle: { color: PALETTE.line } },
      },
      series: [
        {
          type: 'radar',
          data: [
            {
              value: [v.auto, v.data, v.decision, v.device, (v.data + v.decision) / 2, r.efficiency],
              name: '当前配置',
              lineStyle: { color: PALETTE.brand, width: 2.4 },
              itemStyle: { color: PALETTE.cyan },
              areaStyle: { color: 'rgba(37,99,235,0.16)' },
            },
          ],
        },
      ],
      animationDuration: 500,
      animationDurationUpdate: 500,
    }),
    [v, r.efficiency],
  )

  const outputs = [
    { label: '生产效率指数', to: r.efficiency, color: PALETTE.brand },
    { label: '创新指数', to: r.innovation, color: PALETTE.cyan },
    { label: '资源利用率', to: r.resource, color: PALETTE.teal },
    { label: '人工工作量', to: r.manual, suffix: '%', color: PALETTE.amber },
  ]

  return (
    <div className="mt-14">
      <Reveal>
        <div className="card overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-7 py-5">
            <div>
              <h3 className="text-[20px] font-bold text-ink">AI Productivity Simulator</h3>
              <p className="mt-1 text-[13px] text-muted">拖动滑块，实时观察生产指标如何变化</p>
            </div>
            <button className="btn btn-ghost !py-2 !text-[13px]" onClick={() => setV(DEFAULTS)}>
              <RotateCcw size={14} /> 恢复默认
            </button>
          </div>

          <div className="grid gap-8 p-7 lg:grid-cols-[1fr_1fr]">
            {/* 滑块 */}
            <div className="space-y-7">
              {SLIDERS.map((s) => (
                <div key={s.id}>
                  <div className="mb-3 flex items-center justify-between">
                    <label className="text-[14.5px] font-semibold text-ink">{s.label}</label>
                    <span className="rounded-lg px-2.5 py-1 text-[13.5px] font-bold" style={{ background: `${s.color}14`, color: s.color }}>
                      {v[s.id]}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={v[s.id]}
                    className="slider"
                    onChange={(e) => setV((prev) => ({ ...prev, [s.id]: Number(e.target.value) }))}
                    style={{ background: `linear-gradient(to right, ${s.color} ${v[s.id]}%, #E2E8F0 ${v[s.id]}%)` }}
                  />
                </div>
              ))}
              <p className="flex items-start gap-2 text-[12px] leading-relaxed text-muted">
                <Info size={14} className="mt-0.5 shrink-0" />
                本模型为教学可视化模型，采用简化加权公式，不代表真实产业预测。
              </p>
            </div>

            {/* 输出 */}
            <div>
              <div className="grid grid-cols-2 gap-4">
                {outputs.map((o) => (
                  <div key={o.label} className="rounded-2xl border border-line/80 bg-canvas p-5">
                    <p className="text-[12.5px] text-muted">{o.label}</p>
                    <div className="mt-2.5">
                      <TweenNumber to={o.to} suffix={o.suffix} color={o.color} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 h-[250px]">
                <EChart option={radarOption} />
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  )
}
