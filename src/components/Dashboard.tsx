import { useMemo } from 'react'
import { TrendingUp, Users, Building2, FileCheck2, Database, Info } from 'lucide-react'
import type { EChartsOption } from 'echarts'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import CountUp from './ui/CountUp'
import EChart from './charts/EChart'
import SourceNote from './ui/SourceNote'
import { PALETTE } from '@/data/site'
import { INDUSTRIES } from '@/data/industryData'
import {
  DASHBOARD_KPIS,
  AI_INVESTMENT,
  ROBOT_DENSITY,
  LABOR_PRODUCTIVITY,
  INDUSTRY_SCALE,
  GENAI_USERS,
  COMPUTING_POWER,
} from '@/data/realData'

const KPI_ICONS = { trend: TrendingUp, globe: Users, factory: Building2, gauge: FileCheck2 } as const

const ts = { fontFamily: "Inter,'PingFang SC','Microsoft YaHei',sans-serif", color: PALETTE.body }

export default function Dashboard() {
  const donutOption = useMemo<EChartsOption>(() => {
    const colors = ['#2563EB', '#CBD5E1', '#06B6D4', '#14B8A6']
    return {
      textStyle: ts,
      tooltip: {
        trigger: 'item',
        formatter: (p) => {
          const d = p as { name: string; value: number; percent: number }
          return `${d.name}：${d.value} ${AI_INVESTMENT.unit}（${d.percent}%）`
        },
      },
      legend: { type: 'scroll', bottom: 0, textStyle: { color: PALETTE.body, fontSize: 11 } },
      color: colors,
      series: [
        {
          type: 'pie',
          radius: ['44%', '68%'],
          center: ['50%', '44%'],
          avoidLabelOverlap: true,
          itemStyle: { borderColor: '#fff', borderWidth: 2, borderRadius: 4 },
          label: { show: false },
          data: AI_INVESTMENT.items.map((it) => ({ name: it.name, value: it.value })),
        },
      ],
    }
  }, [])

  const robotOption = useMemo<EChartsOption>(() => {
    const colors = ['#CBD5E1', PALETTE.cyan, '#93C5FD', '#2563EB']
    return {
      textStyle: ts,
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, valueFormatter: (v) => `${v} 台/万人` },
      grid: { left: 8, right: 40, top: 16, bottom: 4, containLabel: true },
      xAxis: { type: 'value', splitLine: { lineStyle: { color: PALETTE.grid } }, axisLabel: { color: PALETTE.muted, fontSize: 10 } },
      yAxis: {
        type: 'category',
        data: ROBOT_DENSITY.categories,
        axisLine: { lineStyle: { color: PALETTE.line } },
        axisTick: { show: false },
        axisLabel: { color: PALETTE.body, fontSize: 11 },
      },
      series: [
        {
          type: 'bar',
          barWidth: 14,
          label: { show: true, position: 'right', fontWeight: 700, fontSize: 11.5, color: PALETTE.ink, formatter: (p) => String(p.value) },
          itemStyle: {
            borderRadius: [0, 6, 6, 0],
            color: (p) => colors[p.dataIndex as number] ?? PALETTE.brand,
          },
          data: ROBOT_DENSITY.values,
        },
      ],
    }
  }, [])

  const laborOption = useMemo<EChartsOption>(
    () => ({
      textStyle: ts,
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, valueFormatter: (v) => `${v} 万元/人` },
      grid: { left: 8, right: 12, top: 34, bottom: 4, containLabel: true },
      xAxis: {
        type: 'category',
        data: LABOR_PRODUCTIVITY.years,
        axisLine: { lineStyle: { color: PALETTE.line } },
        axisTick: { show: false },
        axisLabel: { color: PALETTE.body, fontSize: 12 },
      },
      yAxis: {
        type: 'value',
        min: 16,
        max: 19.5,
        splitLine: { lineStyle: { color: PALETTE.grid } },
        axisLabel: { color: PALETTE.muted, fontSize: 10 },
      },
      series: [
        {
          type: 'bar',
          barWidth: 44,
          label: {
            show: true,
            position: 'top',
            fontWeight: 700,
            fontSize: 12.5,
            color: PALETTE.ink,
            formatter: (p) => `${p.value} 万`,
          },
          itemStyle: {
            borderRadius: [8, 8, 0, 0],
            color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: PALETTE.teal }, { offset: 1, color: PALETTE.cyan }] },
          },
          data: LABOR_PRODUCTIVITY.values.map((v) => Number((v / 10000).toFixed(2))),
        },
      ],
    }),
    [],
  )

  const scaleOption = useMemo<EChartsOption>(
    () => ({
      textStyle: ts,
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: (p) => `${(p as { name: string }[])[0].name} 年：${INDUSTRY_SCALE.labels[(p as { dataIndex: number }[])[0].dataIndex]}`,
      },
      grid: { left: 8, right: 12, top: 34, bottom: 4, containLabel: true },
      xAxis: {
        type: 'category',
        data: INDUSTRY_SCALE.years,
        axisLine: { lineStyle: { color: PALETTE.line } },
        axisTick: { show: false },
        axisLabel: { color: PALETTE.body, fontSize: 12 },
      },
      yAxis: {
        type: 'value',
        max: 1.4,
        splitLine: { lineStyle: { color: PALETTE.grid } },
        axisLabel: { color: PALETTE.muted, fontSize: 10 },
      },
      series: [
        {
          type: 'bar',
          barWidth: 44,
          label: {
            show: true,
            position: 'top',
            fontWeight: 700,
            fontSize: 12,
            color: PALETTE.ink,
            formatter: (p) => INDUSTRY_SCALE.labels[p.dataIndex as number],
          },
          itemStyle: {
            borderRadius: [8, 8, 0, 0],
            color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: PALETTE.brand2 }, { offset: 1, color: PALETTE.brand }] },
          },
          data: INDUSTRY_SCALE.values.map((v) => v / 10000),
        },
      ],
    }),
    [],
  )

  const genaiOption = useMemo<EChartsOption>(
    () => ({
      textStyle: ts,
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, valueFormatter: (v) => `${v} ${GENAI_USERS.unit}` },
      grid: { left: 8, right: 12, top: 34, bottom: 4, containLabel: true },
      xAxis: {
        type: 'category',
        data: GENAI_USERS.points,
        axisLine: { lineStyle: { color: PALETTE.line } },
        axisTick: { show: false },
        axisLabel: { color: PALETTE.body, fontSize: 12 },
      },
      yAxis: {
        type: 'value',
        max: 6,
        splitLine: { lineStyle: { color: PALETTE.grid } },
        axisLabel: { color: PALETTE.muted, fontSize: 10 },
      },
      series: [
        {
          type: 'bar',
          barWidth: 44,
          label: {
            show: true,
            position: 'top',
            fontWeight: 700,
            fontSize: 12.5,
            color: PALETTE.ink,
            formatter: (p) => `${p.value} 亿`,
          },
          itemStyle: {
            borderRadius: [8, 8, 0, 0],
            color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: PALETTE.cyan }, { offset: 1, color: PALETTE.teal }] },
          },
          data: GENAI_USERS.values,
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
    <section id="dashboard" className="scene scene-dashboard section-pad relative bg-canvas-2">
      <div className="container-x">
        <SectionHeading
          index="05"
          en="DATA COMMAND CENTER"
          title="AI 生产力数据驾驶舱"
          subtitle="关键指标来自国家统计局、中国信通院、CNNIC、国家数据局、斯坦福 HAI 与 IFR 等权威机构公开发布。"
        />
        <Reveal className="mt-6">
          <span className="inline-flex items-center gap-2 rounded-xl bg-teal/8 px-4 py-2 text-[12.5px] font-semibold text-teal">
            <Info size={15} /> 权威数据 · 各图表下方均标注来源；产业热力图为编者定性整理
          </span>
        </Reveal>

        {/* KPI */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {DASHBOARD_KPIS.map((k, i) => {
            const Icon = KPI_ICONS[k.icon]
            const color = [PALETTE.brand, PALETTE.cyan, PALETTE.teal, PALETTE.brand2][i]
            return (
              <Reveal key={k.label} delay={i * 0.08}>
                <div className="card card-hover flex items-center gap-4 p-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: `${color}16`, color }}>
                    <Icon size={22} />
                  </span>
                  <div>
                    <p className="text-[12.5px] text-muted">{k.label}</p>
                    <p className="mt-1 text-[26px] font-bold leading-none text-ink">
                      <CountUp end={k.value as number} decimals={k.decimals ?? 0} suffix={k.suffix} />
                    </p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* 三图 */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Reveal>
            <div className="card h-full p-6">
              <h4 className="text-[15px] font-bold text-ink">全球私人 AI 投资分布</h4>
              <p className="mt-1 text-[12px] text-muted">{AI_INVESTMENT.year} 年 · 全球总额 {AI_INVESTMENT.total.toLocaleString()} 亿美元</p>
              <div className="mt-2 h-[280px]">
                <EChart option={donutOption} />
              </div>
              <SourceNote>{AI_INVESTMENT.source}</SourceNote>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="card h-full p-6">
              <h4 className="text-[15px] font-bold text-ink">制造业机器人密度对比</h4>
              <p className="mt-1 text-[12px] text-muted">台 / 万名员工（2023）</p>
              <div className="mt-2 h-[280px]">
                <EChart option={robotOption} />
              </div>
              <SourceNote>{ROBOT_DENSITY.source}</SourceNote>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="card h-full p-6">
              <h4 className="text-[15px] font-bold text-ink">中国全员劳动生产率</h4>
              <p className="mt-1 text-[12px] text-muted">2025 年达 184,413 元/人，同比 {LABOR_PRODUCTIVITY.growth}</p>
              <div className="mt-2 h-[280px]">
                <EChart option={laborOption} />
              </div>
              <SourceNote>{LABOR_PRODUCTIVITY.source}</SourceNote>
            </div>
          </Reveal>
        </div>

        {/* 中国动态 */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Reveal>
            <div className="card h-full p-6">
              <h4 className="text-[15px] font-bold text-ink">中国 AI 产业规模跃升</h4>
              <p className="mt-1 text-[12px] text-muted">一年间由 9,000 亿元级迈上 1.2 万亿元级（同比 {INDUSTRY_SCALE.growth}）</p>
              <div className="mt-2 h-[240px]">
                <EChart option={scaleOption} />
              </div>
              <SourceNote>{INDUSTRY_SCALE.source}</SourceNote>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="card h-full p-6">
              <h4 className="text-[15px] font-bold text-ink">生成式 AI 用户规模爆发</h4>
              <p className="mt-1 text-[12px] text-muted">{GENAI_USERS.note}</p>
              <div className="mt-2 h-[240px]">
                <EChart option={genaiOption} />
              </div>
              <SourceNote>{GENAI_USERS.source}</SourceNote>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="card flex h-full flex-col justify-between p-6">
              <div>
                <h4 className="text-[15px] font-bold text-ink">中国算力总规模</h4>
                <p className="mt-1 text-[12px] text-muted">{COMPUTING_POWER.note}</p>
              </div>
              <div className="my-6 flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                  <Database size={26} />
                </span>
                <p className="text-[40px] font-bold leading-none text-ink">
                  <CountUp end={COMPUTING_POWER.value} suffix=" " />
                  <span className="text-[18px] font-bold text-muted">{COMPUTING_POWER.unit}</span>
                </p>
              </div>
              <SourceNote>{COMPUTING_POWER.source}</SourceNote>
            </div>
          </Reveal>
        </div>

        {/* 热力图 */}
        <Reveal className="mt-6">
          <div className="card p-6">
            <h4 className="text-[15px] font-bold text-ink">产业智能化热力图</h4>
            <p className="mt-1 text-[12px] text-muted">产业 × 维度的综合热度 · 编者综合公开资料定性整理（非统计口径）</p>
            <div className="mt-2 h-[420px]">
              <EChart option={heatOption} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
