import { useMemo } from 'react'
import { LayoutGrid, CircleDot, Link2, Gauge, Info } from 'lucide-react'
import type { EChartsOption } from 'echarts'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import CountUp from './ui/CountUp'
import EChart from './charts/EChart'
import { PALETTE } from '@/data/site'
import { INDUSTRIES } from '@/data/industryData'

const KPI = [
  { icon: LayoutGrid, label: 'AI 应用领域', value: 8, suffix: '', color: PALETTE.brand },
  { icon: CircleDot, label: '应用节点', value: 24, suffix: '', color: PALETTE.cyan },
  { icon: Link2, label: '产业环节', value: 15, suffix: '', color: PALETTE.teal },
  { icon: Gauge, label: '智能化指标', value: 83, suffix: '%', color: PALETTE.brand2 },
]

const ts = { fontFamily: "Inter,'PingFang SC','Microsoft YaHei',sans-serif", color: PALETTE.body }

export default function Dashboard() {
  const donutOption = useMemo<EChartsOption>(
    () => ({
      textStyle: ts,
      tooltip: { trigger: 'item', valueFormatter: (v) => `${v}%` },
      legend: { type: 'scroll', bottom: 0, textStyle: { color: PALETTE.body, fontSize: 11 } },
      color: ['#2563EB', '#3B82F6', '#06B6D4', '#14B8A6', '#0EA5E9', '#6366F1', '#0891B2', '#2DD4BF'],
      series: [
        {
          type: 'pie',
          radius: ['44%', '68%'],
          center: ['50%', '44%'],
          avoidLabelOverlap: true,
          itemStyle: { borderColor: '#fff', borderWidth: 2, borderRadius: 4 },
          label: { show: false },
          data: INDUSTRIES.map((ind, i) => ({ name: ind.name, value: [18, 15, 13, 12, 12, 11, 10, 9][i] })),
        },
      ],
    }),
    [],
  )

  const radarOption = useMemo<EChartsOption>(
    () => ({
      textStyle: ts,
      tooltip: {},
      radar: {
        radius: '64%',
        center: ['50%', '50%'],
        indicator: [
          { name: '感知', max: 100 },
          { name: '认知', max: 100 },
          { name: '决策', max: 100 },
          { name: '生成', max: 100 },
          { name: '控制', max: 100 },
          { name: '协同', max: 100 },
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
              value: [86, 82, 79, 74, 80, 77],
              name: 'AI 能力分布',
              lineStyle: { color: PALETTE.brand, width: 2.4 },
              itemStyle: { color: PALETTE.cyan },
              areaStyle: { color: 'rgba(37,99,235,0.16)' },
            },
          ],
        },
      ],
    }),
    [],
  )

  const barOption = useMemo<EChartsOption>(
    () => ({
      textStyle: ts,
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, valueFormatter: (v) => `${v}%` },
      grid: { left: 8, right: 12, top: 16, bottom: 4, containLabel: true },
      xAxis: { type: 'value', splitLine: { lineStyle: { color: PALETTE.grid } }, axisLabel: { color: PALETTE.muted, fontSize: 10 } },
      yAxis: {
        type: 'category',
        data: ['教育', '金融', '农业', '交通', '能源', '制造', '医疗', '科研'],
        axisLine: { lineStyle: { color: PALETTE.line } },
        axisTick: { show: false },
        axisLabel: { color: PALETTE.body, fontSize: 11 },
      },
      series: [
        {
          type: 'bar',
          barWidth: 11,
          data: [20, 22, 24, 28, 30, 32, 35, 40],
          itemStyle: {
            borderRadius: [0, 6, 6, 0],
            color: { type: 'linear', x: 0, y: 0, x2: 1, y2: 0, colorStops: [{ offset: 0, color: PALETTE.brand }, { offset: 1, color: PALETTE.cyan }] },
          },
        },
      ],
    }),
    [],
  )

  const lineOption = useMemo<EChartsOption>(
    () => ({
      textStyle: ts,
      tooltip: { trigger: 'axis' },
      grid: { left: 8, right: 16, top: 20, bottom: 4, containLabel: true },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
        axisLine: { lineStyle: { color: PALETTE.line } },
        axisLabel: { color: PALETTE.muted, fontSize: 11 },
      },
      yAxis: { type: 'value', splitLine: { lineStyle: { color: PALETTE.grid } }, axisLabel: { color: PALETTE.muted, fontSize: 11 }, name: '应用指数', nameTextStyle: { color: PALETTE.muted } },
      series: [
        {
          name: 'AI 应用趋势',
          type: 'line',
          smooth: true,
          symbolSize: 8,
          lineStyle: { width: 3.2, color: PALETTE.brand },
          itemStyle: { color: PALETTE.cyan },
          areaStyle: {
            color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(37,99,235,0.22)' }, { offset: 1, color: 'rgba(6,182,212,0.02)' }] },
          },
          data: [8, 12, 17, 23, 31, 40, 52, 66],
        },
      ],
    }),
    [],
  )

  const heatOption = useMemo<EChartsOption>(() => {
    const dims = ['应用广度', '数据成熟', '自动化', '价值显现']
    const matrix: [number, number, number][] = []
    const table = [
      [82, 76, 88, 85],
      [74, 80, 70, 78],
      [70, 74, 76, 80],
      [66, 70, 64, 72],
      [72, 78, 74, 79],
      [78, 84, 60, 82],
      [68, 72, 66, 74],
      [72, 68, 58, 76],
    ]
    table.forEach((row, i) => row.forEach((v, j) => matrix.push([j, i, v])))
    return {
      textStyle: ts,
      tooltip: { position: 'top', formatter: (p) => `${INDUSTRIES[(p as { value: number[] }).value[1]].name} · ${dims[(p as { value: number[] }).value[0]]}：${(p as { value: number[] }).value[2]}` },
      grid: { left: 8, right: 12, top: 8, bottom: 70, containLabel: true },
      xAxis: { type: 'category', data: dims, splitArea: { show: true }, axisLabel: { color: PALETTE.body, fontSize: 12 }, axisLine: { lineStyle: { color: PALETTE.line } } },
      yAxis: { type: 'category', data: INDUSTRIES.map((i) => i.name), splitArea: { show: true }, axisLabel: { color: PALETTE.body, fontSize: 11 }, axisLine: { lineStyle: { color: PALETTE.line } } },
      visualMap: {
        min: 50,
        max: 90,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: 6,
        textStyle: { color: PALETTE.muted, fontSize: 11 },
        inRange: { color: ['#DBEAFE', '#60A5FA', '#2563EB', '#0E7490'] },
      },
      series: [
        {
          name: '产业热度',
          type: 'heatmap',
          data: matrix,
          label: { show: true, color: '#0F172A', fontSize: 10, formatter: (p) => String((p.value as number[])[2]) },
          itemStyle: { borderColor: '#fff', borderWidth: 2, borderRadius: 6 },
          emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(37,99,235,0.4)' } },
        },
      ],
    }
  }, [])

  return (
    <section id="dashboard" className="section-pad relative bg-canvas-2">
      <div className="container-x">
        <SectionHeading
          index="07"
          en="DATA COMMAND CENTER"
          title="AI 生产力数据驾驶舱"
          subtitle="以现代数据中心的方式，总览 AI 的应用版图、能力分布、效率变化与产业热度。"
        />
        <Reveal className="mt-6">
          <span className="inline-flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-2 text-[12.5px] font-semibold text-amber-600">
            <Info size={15} /> 全部为模拟数据 / 教学可视化口径，不代表真实统计
          </span>
        </Reveal>

        {/* KPI */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {KPI.map((k, i) => (
            <Reveal key={k.label} delay={i * 0.08}>
              <div className="card card-hover flex items-center gap-4 p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: `${k.color}16`, color: k.color }}>
                  <k.icon size={22} />
                </span>
                <div>
                  <p className="text-[12.5px] text-muted">{k.label}</p>
                  <p className="mt-1 text-[28px] font-bold leading-none text-ink">
                    <CountUp end={k.value} suffix={k.suffix} />
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 三图 */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Reveal>
            <div className="card h-full p-6">
              <h4 className="text-[15px] font-bold text-ink">产业应用比例</h4>
              <div className="mt-2 h-[300px]">
                <EChart option={donutOption} />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="card h-full p-6">
              <h4 className="text-[15px] font-bold text-ink">AI 能力分布</h4>
              <div className="mt-2 h-[300px]">
                <EChart option={radarOption} />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="card h-full p-6">
              <h4 className="text-[15px] font-bold text-ink">各领域效率提升</h4>
              <div className="mt-2 h-[300px]">
                <EChart option={barOption} />
              </div>
            </div>
          </Reveal>
        </div>

        {/* 趋势 */}
        <Reveal className="mt-6">
          <div className="card p-6">
            <h4 className="text-[15px] font-bold text-ink">AI 应用趋势</h4>
            <div className="mt-2 h-[300px]">
              <EChart option={lineOption} />
            </div>
          </div>
        </Reveal>

        {/* 热力图 */}
        <Reveal className="mt-6">
          <div className="card p-6">
            <h4 className="text-[15px] font-bold text-ink">产业智能化热力图</h4>
            <p className="mt-1 text-[12px] text-muted">产业 × 维度的综合热度（模拟）</p>
            <div className="mt-2 h-[420px]">
              <EChart option={heatOption} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
