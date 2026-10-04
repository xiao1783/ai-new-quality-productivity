import { useMemo } from 'react'
import { TrendingUp, Globe2, Gauge, Factory, Info } from 'lucide-react'
import type { EChartsOption } from 'echarts'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import CountUp from './ui/CountUp'
import EChart from './charts/EChart'
import SourceNote from './ui/SourceNote'
import TakeawayNote from './ui/TakeawayNote'
import ProductivitySimulator from './ProductivitySimulator'
import HumanAI from './HumanAI'
import BeforeAfter from './BeforeAfter'
import NetworkGraph from './NetworkGraph'
import { PALETTE } from '@/data/site'
import { EFFICIENCY_KPIS, WEF_JOBS, AI_VALUE_ESTIMATES } from '@/data/realData'
import { useLanguage } from '@/i18n/LanguageContext'

const KPI_ICONS = { trend: TrendingUp, globe: Globe2, gauge: Gauge, factory: Factory } as const

const baseTextStyle = { fontFamily: "Inter,'PingFang SC','Microsoft YaHei',sans-serif", color: PALETTE.body }

export default function Efficiency() {
  const { lang, t, ta } = useLanguage()
  const barOption = useMemo<EChartsOption>(() => {
    const colors = [PALETTE.teal, '#CBD5E1', PALETTE.brand]
    return {
      textStyle: baseTextStyle,
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        valueFormatter: (v) => `${v} ${t('e.jobsUnit')}`,
      },
      grid: { left: 8, right: 16, top: 28, bottom: 4, containLabel: true },
      xAxis: {
        type: 'category',
        data: ta('e.jobsCats'),
        axisLine: { lineStyle: { color: PALETTE.line } },
        axisTick: { show: false },
        axisLabel: { color: PALETTE.body, fontSize: 12 },
      },
      yAxis: {
        type: 'value',
        max: 190,
        splitLine: { lineStyle: { color: PALETTE.grid } },
        axisLabel: { color: PALETTE.muted, fontSize: 11 },
      },
      series: [
        {
          name: lang === 'en' ? 'Jobs' : '岗位数量',
          type: 'bar',
          barWidth: 52,
          label: {
            show: true,
            position: 'top',
            fontWeight: 700,
            fontSize: 13,
            color: PALETTE.ink,
            formatter: (p) => `${p.value} ${t('e.jobsUnit')}`,
          },
          itemStyle: {
            borderRadius: [8, 8, 0, 0],
            color: (p) => colors[p.dataIndex as number] ?? PALETTE.brand,
          },
          data: WEF_JOBS.values,
        },
      ],
      animationDuration: 1100,
    }
  }, [lang, t, ta])

  const estimateOption = useMemo<EChartsOption>(() => {
    const names = ta('e.estCats')
    const ranges = ta('e.estRanges')
    return {
      textStyle: baseTextStyle,
      tooltip: {
        trigger: 'item',
        formatter: (p) => {
          const idx = (p as { dataIndex: number }).dataIndex
          return `${names[idx]}<br/>${ranges[idx]}`
        },
      },
      grid: { left: 8, right: 90, top: 12, bottom: 4, containLabel: true },
      xAxis: {
        type: 'value',
        max: 24,
        splitLine: { lineStyle: { color: PALETTE.grid } },
        axisLabel: { color: PALETTE.muted, fontSize: 11, formatter: '{value}' },
      },
      yAxis: {
        type: 'category',
        data: names,
        axisLine: { lineStyle: { color: PALETTE.line } },
        axisTick: { show: false },
        axisLabel: { color: PALETTE.body, fontSize: 11.5 },
      },
      series: [
        {
          name: lang === 'en' ? 'base' : '基座',
          type: 'bar',
          stack: 'estimate',
          barWidth: 26,
          itemStyle: { color: 'transparent' },
          emphasis: { itemStyle: { color: 'transparent' } },
          data: AI_VALUE_ESTIMATES.map((e) => (e.kind === 'point' ? 0 : e.low)),
          tooltip: { show: false },
        },
        {
          name: lang === 'en' ? 'range' : '测算区间',
          type: 'bar',
          stack: 'estimate',
          barWidth: 26,
          label: {
            show: true,
            position: 'right',
            fontWeight: 700,
            fontSize: 12.5,
            color: PALETTE.ink,
            formatter: (p) => ranges[p.dataIndex as number],
          },
          itemStyle: {
            borderRadius: [0, 8, 8, 0],
            color: (p) => {
              const colors = ['#93C5FD', PALETTE.cyan, PALETTE.brand]
              return colors[p.dataIndex as number] ?? PALETTE.brand
            },
          },
          data: AI_VALUE_ESTIMATES.map((e) => Number((e.kind === 'point' ? e.high : e.high - e.low).toFixed(2))),
        },
      ],
      animationDuration: 1100,
    }
  }, [lang, t, ta])

  const radarOption = useMemo<EChartsOption>(
    () => {
      const legends = ta('e.radarLegends')
      return {
      textStyle: baseTextStyle,
      tooltip: {},
      legend: { bottom: 0, itemWidth: 12, itemHeight: 8, textStyle: { color: PALETTE.body, fontSize: 12 } },
      radar: {
        radius: '62%',
        center: ['50%', '47%'],
        indicator: ta('e.radarInds').map((name) => ({ name, max: 100 })),
        axisName: { color: PALETTE.body, fontSize: 12 },
        splitLine: { lineStyle: { color: PALETTE.line } },
        splitArea: { areaStyle: { color: ['#fff', '#F8FAFC'] } },
        axisLine: { lineStyle: { color: PALETTE.line } },
      },
      series: [
        {
          type: 'radar',
          data: [
            { value: [55, 40, 35, 45, 60, 30], name: legends[0], lineStyle: { color: '#94A3B8' }, itemStyle: { color: '#94A3B8' }, areaStyle: { color: 'rgba(148,163,184,0.18)' } },
            { value: [72, 65, 60, 70, 75, 62], name: legends[1], lineStyle: { color: PALETTE.brand2 }, itemStyle: { color: PALETTE.brand2 }, areaStyle: { color: 'rgba(59,130,246,0.14)' } },
            { value: [90, 88, 85, 86, 92, 90], name: legends[2], lineStyle: { color: PALETTE.cyan }, itemStyle: { color: PALETTE.cyan }, areaStyle: { color: 'rgba(6,182,212,0.18)' } },
          ],
        },
      ],
      animationDuration: 1200,
      }
    },
    [lang, t, ta],
  )

  return (
    <section id="efficiency" className="scene scene-efficiency section-pad bg-canvas">
      <div className="container-x">
        <SectionHeading
          index="04"
          en="EFFICIENCY"
          title={t('e.title')}
          subtitle={t('e.sub')}
        />

        <Reveal className="mt-6">
          <span className="inline-flex items-center gap-2 rounded-xl bg-teal/8 px-4 py-2 text-[12.5px] font-semibold text-teal">
            <Info size={15} /> {t('e.banner')}
          </span>
        </Reveal>

        {/* KPI */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {EFFICIENCY_KPIS.map((k, i) => {
            const Icon = KPI_ICONS[k.icon]
            const color = [PALETTE.brand, PALETTE.brand2, PALETTE.teal, PALETTE.cyan][i]
            return (
              <Reveal key={k.label} delay={i * 0.08}>
                <div className="card card-hover flex items-center gap-4 p-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: `${color}16`, color }}>
                    <Icon size={22} />
                  </span>
                  <div>
                    <p className="text-[13px] text-muted">{t(['e.k1', 'e.k2', 'e.k3', 'e.k4'][i] as 'e.k1')}</p>
                    <p className="mt-0.5 text-[26px] font-bold leading-none" style={{ color }}>
                      {k.prefix}
                      {typeof k.value === 'number' ? <CountUp end={k.value} decimals={k.decimals ?? 0} suffix={k.suffix} /> : <span>{k.value}{k.suffix}</span>}
                    </p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* 图表 */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <div className="card h-full p-6">
              <h4 className="text-[16px] font-bold text-ink">{t('e.jobsTitle')}</h4>
              <p className="mt-1 text-[12.5px] text-muted">{t('e.jobsSub')}</p>
              <div className="mt-3 h-[320px]">
                <EChart option={barOption} />
              </div>
              <TakeawayNote accent={PALETTE.brand}>{t('e.tkJobs')}</TakeawayNote>
              <SourceNote>{t('e.jobsSource')}</SourceNote>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="card h-full p-6">
              <h4 className="text-[16px] font-bold text-ink">{t('e.radarTitle')}</h4>
              <p className="mt-1 text-[12.5px] text-muted">{t('e.radarSub')}</p>
              <div className="mt-3 h-[320px]">
                <EChart option={radarOption} />
              </div>
              <TakeawayNote accent={PALETTE.teal}>{t('e.tkRadar')}</TakeawayNote>
              <SourceNote>{t('e.radarSource')}</SourceNote>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-6">
          <div className="card p-6">
            <h4 className="text-[16px] font-bold text-ink">{t('e.estTitle')}</h4>
            <p className="mt-1 text-[12.5px] text-muted">{t('e.estSub')}</p>
            <div className="mt-3 h-[240px]">
              <EChart option={estimateOption} />
            </div>
            <TakeawayNote accent={PALETTE.cyan}>{t('e.tkEst')}</TakeawayNote>
            <SourceNote>{t('e.estSource')}</SourceNote>
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
