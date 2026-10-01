import { useMemo } from 'react'
import { Gauge, Timer, UserX, Zap, Info } from 'lucide-react'
import type { EChartsOption } from 'echarts'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import CountUp from './ui/CountUp'
import EChart from './charts/EChart'
import ProductivitySimulator from './ProductivitySimulator'
import HumanAI from './HumanAI'
import BeforeAfter from './BeforeAfter'
import NetworkGraph from './NetworkGraph'
import { PALETTE } from '@/data/site'

const KPIS = [
  { icon: Gauge, label: '生产效率', value: 32, suffix: '%', sign: '+', color: PALETTE.brand },
  { icon: Timer, label: '故障响应时间', value: 41, suffix: '%', sign: '-', color: PALETTE.cyan },
  { icon: UserX, label: '人工重复工作', value: 55, suffix: '%', sign: '-', color: PALETTE.teal },
  { icon: Zap, label: '决策速度', value: 67, suffix: '%', sign: '+', color: PALETTE.brand2 },
]

const baseTextStyle = { fontFamily: "Inter,'PingFang SC','Microsoft YaHei',sans-serif", color: PALETTE.body }

export default function Efficiency() {
  const barOption = useMemo<EChartsOption>(
    () => ({
      textStyle: baseTextStyle,
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, valueFormatter: (v) => `${v} 指数` },
      legend: { top: 0, right: 0, itemWidth: 12, itemHeight: 12, textStyle: { color: PALETTE.body } },
      grid: { left: 8, right: 8, top: 44, bottom: 4, containLabel: true },
      xAxis: {
        type: 'category',
        data: ['生产效率', '预测准确率', '资源利用率', '响应速度'],
        axisLine: { lineStyle: { color: PALETTE.line } },
        axisTick: { show: false },
        axisLabel: { color: PALETTE.body, fontSize: 12 },
      },
      yAxis: {
        type: 'value',
        max: 100,
        splitLine: { lineStyle: { color: PALETTE.grid } },
        axisLabel: { color: PALETTE.muted, fontSize: 11 },
      },
      series: [
        {
          name: '传统流程',
          type: 'bar',
          barWidth: 18,
          itemStyle: { color: '#CBD5E1', borderRadius: [6, 6, 0, 0] },
          data: [55, 58, 52, 45],
        },
        {
          name: 'AI 流程',
          type: 'bar',
          barWidth: 18,
          itemStyle: {
            borderRadius: [6, 6, 0, 0],
            color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: PALETTE.brand2 }, { offset: 1, color: PALETTE.cyan }] },
          },
          data: [87, 90, 84, 92],
        },
      ],
      animationDuration: 1100,
    }),
    [],
  )

  const lineOption = useMemo<EChartsOption>(
    () => ({
      textStyle: baseTextStyle,
      tooltip: { trigger: 'axis' },
      legend: { top: 0, right: 0, itemWidth: 14, itemHeight: 4, textStyle: { color: PALETTE.body } },
      grid: { left: 8, right: 12, top: 44, bottom: 4, containLabel: true },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
        axisLine: { lineStyle: { color: PALETTE.line } },
        axisLabel: { color: PALETTE.muted, fontSize: 11 },
      },
      yAxis: {
        type: 'value',
        splitLine: { lineStyle: { color: PALETTE.grid } },
        axisLabel: { color: PALETTE.muted, fontSize: 11 },
      },
      series: [
        {
          name: 'AI 应用成熟度',
          type: 'line',
          smooth: true,
          symbolSize: 7,
          lineStyle: { width: 3, color: PALETTE.brand },
          itemStyle: { color: PALETTE.brand },
          areaStyle: { color: 'rgba(37,99,235,0.08)' },
          data: [20, 28, 36, 45, 55, 64, 74, 82],
        },
        {
          name: '生产效率指数',
          type: 'line',
          smooth: true,
          symbolSize: 7,
          lineStyle: { width: 3, color: PALETTE.cyan },
          itemStyle: { color: PALETTE.cyan },
          data: [50, 53, 57, 62, 68, 74, 80, 86],
        },
      ],
      animationDuration: 1300,
    }),
    [],
  )

  const radarOption = useMemo<EChartsOption>(
    () => ({
      textStyle: baseTextStyle,
      tooltip: {},
      legend: { bottom: 0, itemWidth: 12, itemHeight: 8, textStyle: { color: PALETTE.body, fontSize: 12 } },
      radar: {
        radius: '62%',
        center: ['50%', '47%'],
        indicator: [
          { name: '效率', max: 100 },
          { name: '灵活性', max: 100 },
          { name: '创新', max: 100 },
          { name: '协同', max: 100 },
          { name: '质量', max: 100 },
          { name: '自动化', max: 100 },
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
            { value: [55, 40, 35, 45, 60, 30], name: '传统生产', lineStyle: { color: '#94A3B8' }, itemStyle: { color: '#94A3B8' }, areaStyle: { color: 'rgba(148,163,184,0.18)' } },
            { value: [72, 65, 60, 70, 75, 62], name: '数字化生产', lineStyle: { color: PALETTE.brand2 }, itemStyle: { color: PALETTE.brand2 }, areaStyle: { color: 'rgba(59,130,246,0.14)' } },
            { value: [90, 88, 85, 86, 92, 90], name: 'AI 生产', lineStyle: { color: PALETTE.cyan }, itemStyle: { color: PALETTE.cyan }, areaStyle: { color: 'rgba(6,182,212,0.18)' } },
          ],
        },
      ],
      animationDuration: 1200,
    }),
    [],
  )

  return (
    <section id="efficiency" className="section-pad bg-canvas">
      <div className="container-x">
        <SectionHeading
          index="04"
          en="EFFICIENCY"
          title="生产力提升，最终体现在「效率」"
          subtitle="以下看板以统一的教学口径，对比传统流程与 AI 流程在关键维度上的差异。"
        />

        <Reveal className="mt-6">
          <span className="inline-flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-2 text-[12.5px] font-semibold text-amber-600">
            <Info size={15} /> 示意数据 / 模拟数据 · 仅用于教学可视化，不代表真实统计结果
          </span>
        </Reveal>

        {/* KPI */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {KPIS.map((k, i) => (
            <Reveal key={k.label} delay={i * 0.08}>
              <div className="card card-hover flex items-center gap-4 p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: `${k.color}16`, color: k.color }}>
                  <k.icon size={22} />
                </span>
                <div>
                  <p className="text-[13px] text-muted">{k.label}</p>
                  <p className="mt-0.5 text-[28px] font-bold leading-none" style={{ color: k.color }}>
                    {k.sign}
                    <CountUp end={k.value} suffix={k.suffix} />
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 图表 */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <div className="card h-full p-6">
              <h4 className="text-[16px] font-bold text-ink">传统流程 vs AI 流程</h4>
              <p className="mt-1 text-[12.5px] text-muted">关键维度综合指数（满分 100）</p>
              <div className="mt-3 h-[320px]">
                <EChart option={barOption} />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="card h-full p-6">
              <h4 className="text-[16px] font-bold text-ink">三种生产模式对比</h4>
              <p className="mt-1 text-[12.5px] text-muted">六维能力雷达</p>
              <div className="mt-3 h-[320px]">
                <EChart option={radarOption} />
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-6">
          <div className="card p-6">
            <h4 className="text-[16px] font-bold text-ink">AI 应用成熟度与生产效率趋势</h4>
            <p className="mt-1 text-[12.5px] text-muted">概念性趋势示意（2018–2025）</p>
            <div className="mt-3 h-[300px]">
              <EChart option={lineOption} />
            </div>
          </div>
        </Reveal>

        <ProductivitySimulator />
        <HumanAI />
        <BeforeAfter />
        <NetworkGraph />
      </div>
    </section>
  )
}
